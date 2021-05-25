import * as mongoose from 'mongoose';

export const ApodSchema = new mongoose.Schema({
  date: { type: Date, unique: true, required: true },
  explanation: { type: String, required: true },
  media_type: { type: String, required: true },
  service_version: { type: String, required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
  hdurl: { type: String },
  copyright: { type: String },
});

export interface Apod extends mongoose.Document {
  date: Date;
  explanation: string;
  media_type: string;
  service_version: string;
  title: string;
  url: number;
  hdurl: string;
  copyright: string;
}
