import {
  BadRequestException,
  HttpService,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Weather } from './weather.model';
import { Cron, Timeout } from '@nestjs/schedule';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);

  constructor(
    private readonly httpService: HttpService,
    @InjectModel('Weather') private readonly weatherModel: Model<Weather>,
  ) {}

  async getWeather(date: Date): Promise<Weather> {
    if (date) {
      return this.getWeatherByDate(date);
    } else {
      return this.getWeatherLatest();
    }
  }

  async getWeatherByDate(date: Date): Promise<Weather> {
    return await this.weatherModel
      .findOne({ terrestrial_date: date })
      .exec()
      .then((find) => {
        if (!find) {
          throw new NotFoundException(`Could not found data for date: ${date}`);
        }
        return find;
      })
      .catch(() => {
        throw new NotFoundException(`Could not found data for date: ${date}`);
      });
  }

  async getWeatherLatest(): Promise<Weather> {
    return await this.weatherModel
      .findOne({}, {}, { sort: { terrestrial_date: -1 } })
      .exec()
      .then((find) => {
        if (!find) {
          throw new NotFoundException(`Could not found latest weather info.`);
        }
        return find;
      })
      .catch(() => {
        throw new NotFoundException(`Could not found latest weather info.`);
      });
  }

  @Timeout(10000)
  async loadOnStartup(): Promise<void> {
    this.logger.debug('Load on startup');
    await this.loadWeather();
  }

  @Cron('0 17 12 * * *')
  async loadWeather(): Promise<void> {
    this.logger.debug(`Loading mars weather`);
    await this.httpService
      .get(
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

  private saveWeather(data: Weather[]): void {
    this.logger.debug(`Trying to save loaded data`);
    data.forEach(async (p: Weather) => {
      if (!(await this.checkIfExistsByDate(p))) {
        const weatherModel = new this.weatherModel(p);
        this.logger.debug(`Trying to save weather model: ${JSON.stringify(p)}`);
        weatherModel.save().catch((err: any) => {
          this.logger.error('problem with saving ', err);
        });
      }
    });
  }

  private async checkIfExistsByDate(p: Weather): Promise<boolean> {
    return await this.weatherModel.exists({
      terrestrial_date: p.terrestrial_date,
    });
  }
}
