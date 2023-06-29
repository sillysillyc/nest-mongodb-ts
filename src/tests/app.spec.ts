import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';

describe('AppController / AppService ', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('appService.getHello', () => {
    it('should return "Hello World! "', () => {
      expect(appService.getHello()).toBe('Hello World! ');
    });
  });

  describe('appController.getHello', () => {
    it('should return "Hello World! "', async () => {
      const result = await appController.getHello();
      expect(result).toBe('Hello World! ');
    });
  });
});
