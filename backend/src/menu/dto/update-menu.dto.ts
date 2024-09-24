import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateMenuDto {
  @ApiProperty({ description: 'The name of the menu item' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
