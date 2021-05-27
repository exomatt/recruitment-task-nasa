import {
  BadRequestException,
  HttpService,
  Injectable,
  Logger,
} from '@nestjs/common';
import { PictureFilterDto } from './dto/pictureFilter.dto';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Picture, RoverName } from './picture.model';
import { PictureDto } from './dto/picture.dto';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class PictureService {
  private readonly logger = new Logger(PictureService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @InjectModel('Picture') private readonly pictureModel: Model<Picture>,
  ) {}

  async getPicture(pictureFilters: PictureFilterDto): Promise<Picture[]> {
    if (pictureFilters.earth_date != null) {
      if (await this.checkIfExistsByDate(pictureFilters.earth_date)) {
        this.logger.debug('Return pictures from DB');
        return await this.getByFilter(pictureFilters);
      } else {
        this.logger.debug('Load pictures from nasa api');
        let pictures = await this.loadPicturesFromApi(
          pictureFilters.earth_date,
        );
        if (pictureFilters.rover) {
          pictures = pictures.filter(
            (p: Picture) => p.rover === pictureFilters.rover,
          );
        }
        if (pictureFilters.camera) {
          pictures = pictures.filter(
            (p: Picture) => p.camera === pictureFilters.camera,
          );
        }
        return pictures;
      }
    } else {
      this.logger.error(
        `Could not fetch data from picture NASA api without filter`,
      );
      throw new BadRequestException(
        `Could not fetch data from picture NASA api without filter`,
      );
    }
  }

  @Cron('20 * * * * *')
  private async loadCurrentDayApod(): Promise<void> {
    const today = new Date();
    this.logger.debug(`Cron fetch picture for date: ${today}`);
    if (
      !(await this.checkIfExistsByDate(
        new Date(today.toISOString().split('T')[0]),
      ))
    ) {
      await this.loadPicturesFromApi(
        new Date(today.toISOString().split('T')[0]),
      );
    }
  }

  private loadPicturesFromApi(earth_date: Date): Promise<Picture[]> {
    return Object.keys(RoverName)
      .map(async (key: RoverName) => {
        return await this.downloadPictures(earth_date, key);
      })
      .reduce(async (previousValue, currentValue) => {
        const prev = await previousValue;
        const curr = await currentValue;
        return prev.concat(curr);
      });
  }

  private async downloadPictures(
    date: Date,
    rover: RoverName,
  ): Promise<Picture[]> {
    this.logger.debug(`Fetch picture for date: ${date} and rover ${rover}`);
    const nasaKey = this.configService.get<string>('NASA_KEY');
    return await this.httpService
      .get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`, {
        params: {
          api_key: nasaKey,
          earth_date: date,
        },
      })
      .toPromise()
      .then(async (res) => {
        return await this.saveAll(res.data.photos);
      })
      .catch((err) => {
        throw new BadRequestException(
          `Could not fetch data from picture NASA api for date: ${date} and rover ${rover}`,
        );
      });
  }

  private async getByFilter(
    pictureFilters: PictureFilterDto,
  ): Promise<Picture[]> {
    return await this.pictureModel.find({ ...pictureFilters }).exec();
  }

  private async checkIfExistsByDate(date: Date): Promise<boolean> {
    return await this.pictureModel.exists({ earth_date: date });
  }

  async saveAll(picList: PictureDto[]): Promise<Picture[]> {
    this.logger.debug(`Trying to save picture list`);
    return Promise.all(
      picList.map(async (p: PictureDto) => {
        const picture = new this.pictureModel({
          earth_date: p.earth_date,
          sol: p.sol,
          img_src: p.img_src,
          camera: p.camera.name.toUpperCase(),
          rover: p.rover.name.toUpperCase(),
        });
        return await this.savePicture(picture);
      }),
    );
  }

  async savePicture(picture: Picture): Promise<Picture> {
    this.logger.debug(`Trying to save picture ${picture}`);
    return await picture
      .save()
      .then((saved: Picture) => {
        return saved;
      })
      .catch((err: any) => {
        this.logger.error('Problem with saving picture ', err);
        throw new BadRequestException('Problem with saving picture');
      });
  }
}
