import * as mongoose from 'mongoose';

export const WeatherSchema = new mongoose.Schema({
  terrestrial_date: { type: Date, unique: true, required: true },
  sol: { type: String, unique: true, required: true },
  season: { type: String, required: true },
  min_temp: { type: Number, required: true },
  max_temp: { type: Number, required: true },
  pressure: { type: Number, required: true },
  sunrise: { type: String, required: true },
  sunset: { type: String, required: true },
});

export interface Weather extends mongoose.Document {
  terrestrial_date: Date;
  sol: string;
  season: string;
  min_temp: number;
  max_temp: number;
  pressure: number;
  sunrise: string;
  sunset: string;
}
