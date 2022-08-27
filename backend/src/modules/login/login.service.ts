import { HttpStatus, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Response } from 'express';
import { InjectModel } from 'nestjs-typegoose';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from 'src/entities/user.entity';
import { findOne } from 'src/utils/dbQueries';
import { comparePasswords, isValidEmail } from 'src/utils/validator';
import { LogInDataDto } from './login.dto';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel(UserEntity)
    private readonly userModel: ReturnModelType<typeof UserEntity>,
  ) {}

  async logIn(logInData: LogInDataDto, response: Response) {
    const resData = {
      statusCode: HttpStatus.OK,
      data: {},
      message: '',
      errorMessage: {
        email: '',
        password: '',
      },
    };

    if (logInData.email && logInData.password) {
      let errorOccurred = false;

      if (!isValidEmail(logInData.email)) {
        errorOccurred = true;
        resData.errorMessage.email = 'Invalid email address';
      }

      if (!errorOccurred) {
        const findUser = await findOne({
          model: this.userModel,
          obj: {
            email: logInData.email,
          },
        });

        if (findUser.success && findUser.queryResponse) {
          const passwordMatched = await comparePasswords(
            logInData.password.toString(),
            findUser.queryResponse.password,
          );

          if (passwordMatched) {
            const payload = {
              userId: findUser.queryResponse.id,
              email: logInData.email,
              username: findUser.queryResponse.username,
            };

            const key = fs.readFileSync('keys/jwtKey.pem', 'utf8');
            const encoded = jwt.sign(payload, key, {
              expiresIn: 24 * 60 * 60 * 1000,
            });

            resData.data = {
              user: {
                email: logInData.email,
                username: findUser.queryResponse.username,
              },
              accessToken: encoded,
            };
          } else {
            resData.errorMessage.password = 'Wrong password';
          }
        } else {
          resData.errorMessage.email = 'No user exists with this email address';
        }
      }
    } else {
      if (!logInData.email) {
        resData.errorMessage.email = 'Email is required';
      }

      if (!logInData.password) {
        resData.errorMessage.password = 'Password is required';
      }
    }

    return response.status(resData.statusCode).send(resData);
  }
}
