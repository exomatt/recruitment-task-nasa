import {
  BadRequestException,
  HttpService,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Apod } from './apod.model';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ApodService {
  private readonly logger = new Logger(ApodService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @InjectModel('Apod') private readonly apodModel: Model<Apod>,
  ) {}

  async getPicture(date: Date): Promise<Apod> {
    if (date == null) {
      date = new Date(new Date().toISOString().split('T')[0]);
    }
    const apod = await this.getByDate(date);
    if (apod != null) {
      this.logger.debug('Return apod from DB');
      return apod;
    } else {
      this.logger.debug('Load apod from nasa api');
      date = new Date(date);
      return this.loadPhoto(date.toISOString().split('T')[0]);
    }
  }

  private async loadPhoto(date: string): Promise<Apod> {
    this.logger.debug(`Fetch apod for date: ${date}`);
    const nasaKey = this.configService.get<string>('NASA_KEY');
    return await this.httpService
      .get<Apod>('https://api.nasa.gov/planetary/apod', {
        params: {
          api_key: nasaKey,
          date,
        },
      })
      .toPromise()
      .then(async (res) => {
        return await this.saveApod(res.data);
      })
      .catch((err) => {
        throw new BadRequestException(
          `Could not fetch data from apod NASA api with date ${date}`,
        );
      });
  }

  private async getByDate(date: Date): Promise<Apod> {
    return await this.apodModel.findOne({ date: date }).exec();
  }

  private async checkIfExistsByDate(date: Date): Promise<boolean> {
    return await this.apodModel.exists({ date: date });
  }

  private async saveApod(apod: Apod): Promise<Apod> {
    this.logger.debug(`Trying to save apod data ${JSON.stringify(apod)}`);
    const apodModelToSave = new this.apodModel(apod);
    return await apodModelToSave
      .save()
      .then((saved) => {
        return saved;
      })
      .catch((err: any) => {
        this.logger.error('Problem with saving apod ', err);
        throw new BadRequestException('Problem with saving apod');
      });
  }

  @Cron('20 * * * * *')
  private async loadCurrentDayApod(): Promise<void> {
    const today = new Date();
    if (
      !(await this.checkIfExistsByDate(
        new Date(today.toISOString().split('T')[0]),
      ))
    ) {
      await this.loadPhoto(today.toISOString().split('T')[0]);
    }
  }
}
