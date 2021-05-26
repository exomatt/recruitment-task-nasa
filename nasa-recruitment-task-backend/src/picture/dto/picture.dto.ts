import { CameraDto } from './camera.dto';
import { RoverDto } from './rover.dto';

export class PictureDto {
  id: number;
  sol: number;
  earth_date: Date;
  img_src: string;
  rover: RoverDto;
  camera: CameraDto;
}
