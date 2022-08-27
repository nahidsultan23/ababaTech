import { HttpStatus, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Response } from 'express';
import { InjectModel } from 'nestjs-typegoose';
import { MovieEntity } from 'src/entities/movie.entity';
import { UserEntity } from 'src/entities/user.entity';
import { addMany, addNew, findOne, updateOne } from 'src/utils/dbQueries';
import { encryptPassword } from 'src/utils/helper';
import { dummyMoviesData } from './dummy.data';
import { UserDataDto } from './dummy.dto';

@Injectable()
export class DummyService {
  constructor(
    @InjectModel(UserEntity)
    private readonly userModel: ReturnModelType<typeof UserEntity>,
    @InjectModel(MovieEntity)
    private readonly movieModel: ReturnModelType<typeof MovieEntity>,
  ) {}

  async insertUser(userData: UserDataDto, response: Response) {
    const resData = {
      statusCode: HttpStatus.OK,
      data: {},
      message: '',
    };

    const password = await encryptPassword(userData.password.toString());

    const findUser = await findOne({
      model: this.userModel,
      obj: {
        email: userData.email,
      },
    });

    if (findUser.queryResponse) {
      const updateUser = await updateOne({
        element: findUser.queryResponse,
        updateObject: {
          password: password,
          username: userData.username,
        },
      });

      if (updateUser.success) {
        resData.statusCode = HttpStatus.OK;
      } else {
        resData.statusCode = HttpStatus.BAD_REQUEST;
      }
    } else {
      const addUser = await addNew({
        model: this.userModel,
        obj: {
          email: userData.email,
          password: password,
          username: userData.username,
        },
      });

      if (addUser.success) {
        resData.statusCode = HttpStatus.CREATED;
      } else {
        resData.statusCode = HttpStatus.BAD_REQUEST;
      }
    }

    return response.status(resData.statusCode).send(resData);
  }

  async insertMovies(response: Response) {
    const resData = {
      statusCode: HttpStatus.OK,
      data: '',
      message: '',
    };

    const addMovies = await addMany({
      model: this.movieModel,
      obj: dummyMoviesData,
    });

    if (addMovies.success) {
      resData.statusCode = HttpStatus.CREATED;
    } else {
      resData.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      resData.message = addMovies.message;
    }

    return response.status(resData.statusCode).send(resData);
  }
}
