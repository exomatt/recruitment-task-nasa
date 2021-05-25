import { Controller, Get, Param, Query, UsePipes } from '@nestjs/common';
import { ApodService } from './apod.service';
import { Apod } from './apod.model';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { DateValidationPipe } from './pipe/date-validation.pipes';

@Controller('apod')
export class ApodController {
  constructor(private readonly apodService: ApodService) {}

  @Get()
  @UsePipes(DateValidationPipe)
  @ApiImplicitQuery({
    name: 'date',
    required: false,
    type: Date,
  })
  async getPicture(@Query('date') date?: Date): Promise<Apod> {
    return await this.apodService.getPicture(date);
  }
}
