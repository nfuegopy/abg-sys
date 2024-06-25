import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('greeting')
  getGreeting(@Query('name') name: string): string {
    return this.appService.getGreeting(name);
  }

  @Get('farewell')
  getFarewell(@Query('name') name: string): string {
    return this.appService.getFarewell(name);
  }
}
