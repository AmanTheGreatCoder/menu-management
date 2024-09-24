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

  async findById(id: string): Promise<MenuItem> {
    const menu = await this.prisma.menuItem.findUnique({
      where: { id },
      include: { children: true },
    });

    if (!menu) {
      throw new NotFoundException('Menu not found');
    }
    return menu;
  }

  async findAll(): Promise<MenuItem[]> {
    return this.prisma.menuItem.findMany({
      include: { children: true },
    });
  }

  async create(dto: CreateMenuDto): Promise<MenuItem> {
    if (dto.parentId) {
      const parentMenu = await this.findById(dto.parentId);

      console.log('parentMenu', parentMenu);
      if (!parentMenu) {
        throw new NotFoundException('Parent menu not found');
      }
    }
    try {
      const menu = await this.prisma.menuItem.create({
        data: {
          name: dto.name,
          ...(dto.parentId && {
            parent: {
              connectOrCreate: {
                where: { id: dto.parentId },
                create: { id: dto.parentId, name: dto.name },
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

  async read(id: string): Promise<MenuItem> {
    return this.findById(id);
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
      await this.prisma.menuItem.delete({
        where: { id },
      });
      this.logger.log(`Menu deleted: ${id}`);
    } catch (error) {
      if (isPrismaNotFound(error)) {
        throw new NotFoundException(`Menu not found: ${id}`);
      }
      throw error;
    }
  }
}
