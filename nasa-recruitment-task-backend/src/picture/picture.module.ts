import { HttpModule, Module } from '@nestjs/common';
import { PictureController } from './picture.controller';
import { PictureService } from './picture.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PictureSchema } from './picture.model';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: 'Picture', schema: PictureSchema }]),
  ],
  controllers: [PictureController],
  providers: [PictureService],
})
export class PictureModule {}
