import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWellcome(): string {
    const greating = 'Wellcome to yuoflix-api!';
    return greating;
  }
}
