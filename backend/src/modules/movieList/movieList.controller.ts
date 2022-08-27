import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { MovieListService } from './movieList.service';

@UseGuards(AuthGuard)
@Controller()
export class MovieListController {
  constructor(private readonly movieListService: MovieListService) {}

  @Get('api/movie-list/get-dashboard-movies')
  async dashboardMovieList(@Res() response: Response) {
    return await this.movieListService.dashboardMovieList(response);
  }

  @Get('api/movie-list/get-movies')
  async movieList(
    @Query('name') name: string,
    @Query('group') group: string,
    @Query('type') type: string,
    @Query('page') page: number,
    @Res() response: Response,
  ) {
    return await this.movieListService.movieList(
      response,
      name,
      group,
      type,
      page,
    );
  }

  @Get('api/movie-list/movie-details')
  async movieDetails(@Query('id') id: string, @Res() response: Response) {
    return await this.movieListService.movieDetails(id, response);
  }
}
