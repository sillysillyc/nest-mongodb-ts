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
import type { Request } from 'express';

interface Response<T> {
  data?: T;
}

// 不需要处理的接口路径及方法
const whiteListMap = {
  get: ['/blog'],
};

@Injectable()
export class GlobalTransformInterceptor<T>
  implements NestInterceptor<T, Response<T> | T>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T> | T> {
    const req = context.switchToHttp().getRequest<Request>();
    const path = req.route.path;
    const method = req.method;
    const shouldSkipGlobalIntercepter =
      whiteListMap[method.toLowerCase()]?.includes(path);

    // console.log(method, url);
    return next.handle().pipe(
      map((data) => {
        context.switchToHttp().getResponse().status(HttpStatus.OK);
        if (!shouldSkipGlobalIntercepter) {
          const resTemplate: {
            data?: T;
            resultCode: CustomCode;
            resultMsg: string;
          } = {
            resultCode: CustomCode.SUCCESS,
            resultMsg: '请求成功',
          };
          if (data) {
            resTemplate.data = data;
          }
          return resTemplate;
        }
        return data;
      }),
    );
  }
}
