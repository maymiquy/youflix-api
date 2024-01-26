import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // Provider Home API
  getApi(): string {
    return 'Welcomme to Youflix REST-API';
  }

  // Provider Movies
  getAllMovie(): string {
    return 'GET All Movies';
  }
}
