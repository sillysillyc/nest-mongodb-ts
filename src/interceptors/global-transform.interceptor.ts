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
import { IncomingMessage } from 'http';

interface Response<T> {
  data: T;
}

// 不需要处理的接口路径及方法
const whiteListMap = {
  get: [/\/blog.*/],
};

@Injectable()
export class GlobalTransformInterceptor<T>
  implements NestInterceptor<T, Response<T> | T>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T> | T> {
    const incomingMessage: IncomingMessage = context.getArgByIndex(0);
    const { method, url } = incomingMessage;

    const shouldSkipGlobalIntercepter = whiteListMap[
      method.toLowerCase()
    ]?.some((pathReg: RegExp) => pathReg.test(url));

    // console.log(method, url);
    return next.handle().pipe(
      map((data) => {
        context.switchToHttp().getResponse().status(HttpStatus.OK);
        if (!shouldSkipGlobalIntercepter) {
          return {
            data,
            resultCode: CustomCode.SUCCESS,
            resultMsg: '请求成功',
          };
        }
        return data;
      }),
    );
  }
}
