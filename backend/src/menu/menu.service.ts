import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Assuming you have a PrismaService to handle Prisma client
import { BadRequestException } from 'src/lib/exceptions/bad-request.exception';
import {
  isPrismaNotFound,
  isPrismaUniqueConstraintViolation,
} from 'src/common/utils/prismaError';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuItem } from '@prisma/client';

@Injectable()
export class MenuService {
  private readonly logger = new Logger(MenuService.name);

  constructor(private readonly prisma: PrismaService) {}

  private buildHierarchy(items: MenuItem[]): MenuItem[] {
    const itemMap = new Map();
    const rootItems: MenuItem[] = [];

    items.forEach((item) => {
      itemMap.set(item.id, { ...item, children: [] });
    });

    items.forEach((item) => {
      const mappedItem = itemMap.get(item.id);
      if (item.parentId === null) {
        rootItems.push(mappedItem);
      } else {
        const parent = itemMap.get(item.parentId);
        if (parent) {
          parent.children.push(mappedItem);
        }
      }
    });

    return rootItems;
  }

  async findById(id: string): Promise<MenuItem> {
    const menu = await this.prisma.menuItem.findUnique({
      where: { id },
      include: { children: true, parent: true },
    });

    if (!menu) {
      throw new NotFoundException('Menu not found');
    }
    return menu;
  }

  async findAll(): Promise<MenuItem[]> {
    const items = await this.prisma.menuItem.findMany({
      include: { children: true },
    });
    return this.buildHierarchy(items);
  }

  async create(dto: CreateMenuDto): Promise<MenuItem> {
    try {
      const menu = await this.prisma.menuItem.create({
        data: {
          name: dto.name,
          depth: dto.depth,
          ...(dto.parentId && {
            parent: {
              connectOrCreate: {
                where: { id: dto.parentId },
                create: {
                  id: dto.parentId,
                  name: dto.name,
                  depth: dto.depth - 1,
                },
              },
            },
          }),
        },
        include: { children: true },
      });

      this.logger.log(`Menu created: ${menu.id}-${menu.name}`);
      return menu;
    } catch (error) {
      if (isPrismaUniqueConstraintViolation(error)) {
        throw new BadRequestException('Menu with this name already exists');
      } else {
        this.logger.error(error);
        throw new BadRequestException(error.message || 'Something went wrong');
      }
    }
  }

  async update(id: string, dto: UpdateMenuDto): Promise<MenuItem> {
    try {
      const menu = await this.prisma.menuItem.update({
        where: { id },
        data: {
          name: dto.name,
        },
        include: { children: true },
      });

      this.logger.log(`Menu updated: ${menu.id}-${menu.name}`);
      return menu;
    } catch (error) {
      if (isPrismaNotFound(error)) {
        throw new NotFoundException(`Menu not found: ${id}`);
      } else if (isPrismaUniqueConstraintViolation(error)) {
        throw new BadRequestException('Menu with this name already exists');
      }
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.recursiveDelete(id);
      this.logger.log(`Menu deleted: ${id}`);
    } catch (error) {
      if (isPrismaNotFound(error)) {
        throw new NotFoundException(`Menu not found: ${id}`);
      }
      throw error;
    }
  }

  private async recursiveDelete(id: string): Promise<void> {
    const children = await this.prisma.menuItem.findMany({
      where: { parentId: id },
    });

    await Promise.all(
      children.map(async (child) => await this.recursiveDelete(child.id)),
    );

    await this.prisma.menuItem.delete({
      where: { id },
    });
  }
}
