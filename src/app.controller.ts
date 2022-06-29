import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import * as path from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<any> {
    return this.appService.getHello();
  }
  @Get('/ai-svc')
  async aiFn() {
    return '111';
  }
}
