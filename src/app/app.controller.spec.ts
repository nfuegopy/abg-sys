// src/app/app.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
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

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('getGreeting', () => {
    it('should return a personalized greeting', () => {
      const name = 'Antonio';
      expect(appController.getGreeting(name)).toBe(`Hello, ${name}!`);
    });
  });

  describe('getFarewell', () => {
    it('should return a personalized farewell', () => {
      const name = 'Antonio';
      expect(appController.getFarewell(name)).toBe(`Goodbye, ${name}!`);
    });
  });
});
