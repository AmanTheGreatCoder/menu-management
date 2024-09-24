import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuService } from './menu.service';
import { MenuItem } from '@prisma/client';

@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new menu item' })
  @ApiResponse({
    status: 201,
    description: 'The menu item has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createMenuDto: CreateMenuDto): Promise<MenuItem> {
    return this.menuService.create(createMenuDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a menu item by ID' })
  @ApiResponse({
    status: 200,
    description: 'The menu item has been successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'Menu item not found.' })
  async findById(@Param('id') id: string): Promise<MenuItem> {
    return this.menuService.findById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve a menu item by ID' })
  @ApiResponse({
    status: 200,
    description: 'The menu item has been successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'Menu item not found.' })
  async findAll(): Promise<MenuItem[]> {
    return this.menuService.findAll();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a menu item by ID' })
  @ApiResponse({
    status: 200,
    description: 'The menu item has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Menu item not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateMenuDto: UpdateMenuDto,
  ): Promise<MenuItem> {
    return this.menuService.update(id, updateMenuDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a menu item by ID' })
  @ApiResponse({
    status: 200,
    description: 'The menu item has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Menu item not found.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.menuService.remove(id);
  }
}
