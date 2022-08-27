import { HttpStatus, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Response } from 'express';
import { InjectModel } from 'nestjs-typegoose';
import { MovieEntity } from 'src/entities/movie.entity';
import { UserEntity } from 'src/entities/user.entity';
import { findAll, findAllWithPagination, findOne } from 'src/utils/dbQueries';
import { isMongoDbObjectId } from 'src/utils/validator';

interface IFilterParameters {
  name?: {
    $regex: string;
    $options: string;
  };
  group?: string;
  type?: string;
}

@Injectable()
export class MovieListService {
  constructor(
    @InjectModel(UserEntity)
    private readonly userModel: ReturnModelType<typeof UserEntity>,
    @InjectModel(MovieEntity)
    private readonly movieModel: ReturnModelType<typeof MovieEntity>,
  ) {}

  async dashboardMovieList(response: Response) {
    const resData = {
      statusCode: HttpStatus.OK,
      data: [],
      message: '',
    };

    const resultPerPage = 100;

    const findMovies = await findAll({
      model: this.movieModel,
      obj: {},
      limit: resultPerPage,
    });

    if (findMovies.success) {
      resData.data = findMovies.queryResponse;
    } else {
      resData.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      resData.message = findMovies.message;
    }

    return response.status(resData.statusCode).send(resData);
  }

  async movieList(
    response: Response,
    name?: string,
    group?: string,
    type?: string,
    page?: number,
  ) {
    const resData = {
      statusCode: HttpStatus.OK,
      responseCount: 0,
      paginationData: {
        totalNumberOfResults: 0,
        numberOfPages: 0,
      },
      data: [],
      message: '',
    };

    const resultPerPage = 50;
    let pageNumber = 0;
    let skip = 0;

    if (
      page &&
      Number(page) &&
      Number(page) > 0 &&
      Number.isInteger(Number(page))
    ) {
      pageNumber = Number(page);
    }

    if (pageNumber) {
      skip = (pageNumber - 1) * resultPerPage;
    }

    const filterParameters: IFilterParameters = {};

    if (name) {
      filterParameters.name = {
        $regex: name,
        $options: 'i',
      };
    }

    if (group) {
      filterParameters.group = group;
    }

    if (type) {
      filterParameters.type = type;
    }

    const findMovies = await findAllWithPagination({
      model: this.movieModel,
      obj: filterParameters,
      limit: resultPerPage,
      skip: skip,
    });

    if (findMovies.success) {
      resData.responseCount = findMovies.responseCount;
      resData.paginationData = findMovies.paginationData;
      resData.data = findMovies.queryResponse;
    } else {
      resData.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      resData.message = findMovies.message;
    }

    return response.status(resData.statusCode).send(resData);
  }

  async movieDetails(id: string, response: Response) {
    const resData = {
      statusCode: HttpStatus.OK,
      data: {},
      message: '',
    };

    if (isMongoDbObjectId(id)) {
      const findMovie = await findOne({
        model: this.movieModel,
        obj: {
          _id: id,
        },
      });

      if (findMovie.success && findMovie.queryResponse) {
        resData.data = findMovie.queryResponse;
      } else {
        resData.statusCode = HttpStatus.NOT_FOUND;
        resData.message = 'Movie was not found';
      }
    } else {
      resData.statusCode = HttpStatus.NOT_FOUND;
      resData.message = 'Movie was not found';
    }

    return response.status(resData.statusCode).send(resData);
  }
}
