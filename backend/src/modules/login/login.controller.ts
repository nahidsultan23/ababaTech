import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { LogInDataDto } from './login.dto';
import { LoginService } from './login.service';

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('api/log-in')
  async logIn(@Body() logInData: LogInDataDto, @Res() response: Response) {
    return await this.loginService.logIn(logInData, response);
  }
}
