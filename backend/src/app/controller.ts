import {
  Controller,
  Get,
  UseGuards,
  Post,
  Request,
  Logger,
} from '@nestjs/common';
import { AppService } from './service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
