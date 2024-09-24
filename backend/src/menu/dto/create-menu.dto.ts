import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMenuDto {
  @ApiProperty({ description: 'The unique identifier of the parent menu' })
  @IsOptional()
  @IsString()
  parentId?: string;

  @ApiProperty({ description: 'The name of the node' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The depth of the node' })
  @IsNotEmpty()
  @IsNumber()
  depth: number;
}
