import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Route '/api'
  @Get('/api')
  getApi(): string {
    return this.appService.getApi();
  }
  // Route '/api/movies'
  @Get('/api/movies')
  getAllMovie(): string {
    return this.appService.getAllMovie();
  }
}
