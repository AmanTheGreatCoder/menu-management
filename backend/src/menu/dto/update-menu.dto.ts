import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

class UpdatedDataDto {
  @ApiProperty({ description: 'The name of the menu item', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'The children of the menu item',
    required: false,
    type: 'object',
  })
  @IsOptional()
  @IsObject()
  children?: Record<string, any>;
}

export class UpdateMenuDto {
  @ApiProperty({ description: 'The updated data for the menu item' })
  @IsNotEmpty()
  @IsObject()
  updatedData: UpdatedDataDto;
}
