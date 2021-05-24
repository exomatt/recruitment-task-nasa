import { Controller, Get } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { Weather } from './weather.model';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async findAll(): Promise<Weather[]> {
    return await this.weatherService.getWeather();
  }
  @Get('/init')
  async init(): Promise<void> {
    await this.weatherService.loadWeather();
  }
}
