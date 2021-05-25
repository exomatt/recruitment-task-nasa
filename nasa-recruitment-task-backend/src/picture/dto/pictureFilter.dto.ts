import { CameraName, RoverName } from '../picture.model';
import { IsOptional, IsDate, IsEnum } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class PictureFilterDto {
  @IsDate()
  @IsOptional()
  @ApiProperty({ required: false })
  date: Date;
  @IsOptional()
  @IsEnum(RoverName)
  @ApiProperty({ required: false })
  rover: RoverName;
  @IsOptional()
  @IsEnum(CameraName)
  @ApiProperty({ required: false })
  camera: CameraName;
}
