import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
  Logger,
} from '@nestjs/common';

export class DateValidationPipe implements PipeTransform {
  private readonly logger = new Logger(DateValidationPipe.name);
  private readonly firstApod: Date = new Date('1995-06-16');

  transform(value: Date, metadata: ArgumentMetadata) {
    this.logger.debug(`Validate date ${value} in request query param.`);
    if (value == null) {
      console.log("jestem")
      return value;
    }
    const queryDate = new Date(value);
    const today = new Date();

    if (
      this.firstApod.getTime() > queryDate.getTime() ||
      today.getTime() < queryDate.getTime()
    ) {
      throw new BadRequestException(`"${value}" is invalid date`);
    }
    return value;
  }
}
