import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';

@Injectable()
export class TransformStringToNumberPipe
  implements PipeTransform<string | number>
{
  transform(value: string, argumentMetadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException(`${argumentMetadata.data} 必传`);
    }

    const _value = Number(value);
    if (typeof value !== 'string' || isNaN(_value)) {
      throw new BadRequestException(`${argumentMetadata.data} 类型错误`);
    }
    return _value;
  }
}
