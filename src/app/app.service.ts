import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getGreeting(name: string): string {
    return `Hello, ${name}!`;
  }

  getFarewell(name: string): string {
    return `Goodbye, ${name}!`;
  }
}
