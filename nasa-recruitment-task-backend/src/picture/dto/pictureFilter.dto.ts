import { CameraName, RoverName } from '../picture.model';
import { IsOptional, IsDate, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export class PictureFilterDto {
  @IsDate()
  @IsOptional()
  @ApiProperty({ required: false })
  @Type(() => Date)
  earth_date: Date;
  @IsOptional()
  @IsEnum(RoverName)
  @ApiProperty({ required: false })
  rover: RoverName;
  @IsOptional()
  @IsEnum(CameraName)
  @ApiProperty({ required: false })
  camera: CameraName;
}
