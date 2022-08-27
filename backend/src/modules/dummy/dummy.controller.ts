import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserDataDto } from './dummy.dto';
import { DummyService } from './dummy.service';

@Controller()
export class DummyController {
  constructor(private readonly dummyService: DummyService) {}

  @Post('api/dummy/insert-user')
  async insertUser(@Body() userData: UserDataDto, @Res() response: Response) {
    return await this.dummyService.insertUser(userData, response);
  }

  @Post('api/dummy/insert-movies')
  async insertMovies(@Res() response: Response) {
    return await this.dummyService.insertMovies(response);
  }
}
