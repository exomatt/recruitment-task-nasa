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

  @Get('/roverNames')
  async getRoverNames() {
    return await this.pictureService.getRoverNames();
  }

  @Get('/cameraNames')
  async getCameraNames() {
    return await this.pictureService.getCameraNames();
  }
}
