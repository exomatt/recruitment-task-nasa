import { HttpModule, Module } from '@nestjs/common';
import { ApodController } from './apod.controller';
import { ApodService } from './apod.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ApodSchema } from './apod.model';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: 'Apod', schema: ApodSchema }]),
  ],
  controllers: [ApodController],
  providers: [ApodService],
})
export class ApodModule {}
