import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PictureService } from './picture.service';
import { PictureFilterDto } from './dto/pictureFilter.dto';
import { Picture } from './picture.model';

@Controller('picture')
export class PictureController {
  constructor(private readonly pictureService: PictureService) {}

  @Get()
  @UsePipes(ValidationPipe)
  async getPicture(
    @Query() pictureFilters: PictureFilterDto,
  ): Promise<Picture[]> {
    return await this.pictureService.getPicture(pictureFilters);
  }
}
