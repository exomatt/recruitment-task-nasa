import * as mongoose from 'mongoose';

export enum CameraName {
  FHAZ = 'FHAZ',
  RHAZ = 'RHAZ',
  MAST = 'MAST',
  CHEMCAM = 'CHEMCAM',
  MAHLI = 'MAHLI',
  NAVCAM = 'NAVCAM',
  PANCAM = 'PANCAM',
  MINITES = 'MINITES',
}

export enum RoverName {
  CURIOSITY = 'CURIOSITY',
  SPIRIT = 'SPIRIT',
  OPPORTUNITY = 'OPPORTUNITY',
}

export const PictureSchema = new mongoose.Schema({
  earth_date: { type: Date, required: true },
  sol: { type: Number, required: true },
  camera: { type: CameraName, required: true },
  rover: { type: RoverName, required: true },
  img_src: { type: String, required: true },
});

export interface Picture extends mongoose.Document {
  earth_date: Date;
  sol: number;
  camera: CameraName;
  rover: RoverName;
  img_src: string;
}
