import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { Weather } from './weather.model';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  @ApiImplicitQuery({
    name: 'date',
    required: false,
    type: Date,
  })
  async find(@Query('date') date?: Date): Promise<Weather> {
    return await this.weatherService.getWeather(date);
  }
}
