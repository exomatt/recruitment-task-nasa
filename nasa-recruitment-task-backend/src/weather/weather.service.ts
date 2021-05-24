import {
  BadRequestException,
  HttpService,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Weather } from './weather.model';
import { WeatherDto } from './dto/weather.dto';
import { Cron, Timeout } from "@nestjs/schedule";

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @InjectModel('Weather') private readonly weatherModel: Model<Weather>,
  ) {}

  async getWeather(): Promise<Weather[]> {
    return await this.weatherModel.find().exec();
  }

  @Cron('20 * * * * *')
  @Timeout(10000)
  async loadWeather(): Promise<void> {
    this.logger.debug(`Loading mars weather`);
    // const nasakey = this.configService.get<string>('NASA_KEY');
    await this.httpService
      .get<WeatherDto[]>(
        'https://mars.nasa.gov/rss/api/?feed=weather&category=mars2020&feedtype=json',
      )
      .toPromise()
      .then((res) => {
        this.saveWeather(res.data['sols']);
      })
      .catch((err) => {
        throw new BadRequestException('Could not fetch data from NASA api');
      });
  }

  private saveWeather(data: WeatherDto[]): void {
    this.logger.debug(`Trying to save loaded data`);
    data.forEach(async (p: WeatherDto) => {
      if (!(await this.checkIfExistsByDate(p))) {
        const weatherModel = new this.weatherModel(p);
        this.logger.debug(`Trying to save weather model: ${JSON.stringify(p)}`);
        weatherModel.save().catch((err: any) => {
          this.logger.error('problem with saving ', err);
        });
      }
    });
  }

  private async checkIfExistsByDate(p: WeatherDto): Promise<boolean> {
    return await this.weatherModel.exists({
      terrestrial_date: p.terrestrial_date,
    });
  }
}
