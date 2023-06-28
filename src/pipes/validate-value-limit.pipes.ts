import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';

type SizeLimit = [min: number, max: number];

@Injectable()
export class ValidateValueLimitPipe implements PipeTransform<number> {
  private limit: SizeLimit;
  constructor(params: { limit: SizeLimit }) {
    this.limit = params.limit;
  }
  async transform(value: number, argumentMetadata: ArgumentMetadata) {
    const [min, max] = this.limit;
    if (value < min || value > max) {
      throw new BadRequestException(
        `${argumentMetadata.data} 的范围是 ${min} - ${max}`,
      );
    }
    return value;
  }
}
