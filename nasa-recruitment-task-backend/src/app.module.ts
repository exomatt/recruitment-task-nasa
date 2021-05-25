import { Module } from '@nestjs/common';

import { WeatherModule } from './weather/weather.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ApodModule } from './apod/apod.module';

@Module({
  imports: [
    WeatherModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost/nasa'),
    ApodModule,
  ],
})
export class AppModule {}
