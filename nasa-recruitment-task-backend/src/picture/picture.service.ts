import { HttpService, Injectable } from '@nestjs/common';
import { PictureFilterDto } from './dto/pictureFilter.dto';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Picture } from './picture.model';

@Injectable()
export class PictureService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @InjectModel('Picture') private readonly pictureModel: Model<Picture>,
  ) {}

  async getPicture(pictureFilters: PictureFilterDto) {
    return [];
  }
}
