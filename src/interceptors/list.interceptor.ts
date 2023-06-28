import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CustomCode } from '../helpers/codes';

interface Response<T> {
  data: {
    data: T;
    total: number;
    page: number;
    pageSize: number;
  };
}

@Injectable()
export class ListInterceptor<T>
  implements NestInterceptor<Response<T>, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<Response<T>>,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        context.switchToHttp().getResponse().status(HttpStatus.OK);
        return {
          resultCode: CustomCode.SUCCESS,
          resultMsg: '请求成功',
          ...data,
        };
      }),
    );
  }
}
