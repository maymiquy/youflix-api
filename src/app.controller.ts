import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller({
  path: 'api',
  version: '1',
})
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService
  ) {}

  @Get()
  index(@Res() res: Response) {
    const result = this.appService.getWellcome();
    return res.status(HttpStatus.OK).send(
      JSON.stringify({
        message: result,
      })
    );
  }

  @Get('config')
  getConfig(@Res() res: Response) {
    const port = Number(this.configService.get<number>('PORT'));
    const appName = this.configService.get<string>('APP_NAME');
    // const dbHost = this.configService.get('DB_HOST');

    return res.status(HttpStatus.OK).send(
      JSON.stringify({
        appName: appName,
        port: port,
      })
    );
  }
}
