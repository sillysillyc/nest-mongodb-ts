import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';

type SizeLimit = [min: number, max: number];

@Injectable()
export class ValidateValueLimitPipe implements PipeTransform<string | number> {
  private limit: SizeLimit;
  constructor(params: { limit: SizeLimit }) {
    this.limit = params.limit;
  }
  transform(value: string | number, argumentMetadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException(`${argumentMetadata.data} 必传`);
    }
    if (typeof value !== 'string') {
      throw new BadRequestException(`${argumentMetadata.data} 类型错误`);
    }
    const [min, max] = this.limit;
    const _value = Number(value);
    if (isNaN(_value) || _value < min || _value > max) {
      throw new BadRequestException(
        `${argumentMetadata.data} 的范围是 ${min} - ${max}`,
      );
    }
    return _value;
  }
}
