import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { CustomCode } from '../helpers/codes';

interface IExceptionResponse {
  statusCode: number;
  message: string[] | string;
  error: string;
  [key: string]: any;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // const message = exception.message;
    let message;
    const exceptionResponse = exception.getResponse() as IExceptionResponse;
    if (typeof exceptionResponse.message === 'string') {
      message = exceptionResponse.message;
    } else {
      message = exceptionResponse.message[0] || '';
    }
    Logger.log('错误提示', message);
    const errorResponse = {
      data: {
        // error: message,
        requestUrl: request.originalUrl, // 错误的url地址
      },
      // 获取全部的错误信息
      resultMsg: message || '请求失败',
      resultCode: CustomCode.ERROR, // 自定义code
    };
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    // 设置返回的状态码、请求头、发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
