import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { config } from './config';
import { DummyModule } from './modules/dummy/dummy.module';
import { LoginModule } from './modules/login/login.module';
import { MovieListModule } from './modules/movieList/movieList.module';

@Module({
  imports: [
    TypegooseModule.forRoot(config.mongoDBURL),
    LoginModule,
    MovieListModule,
    DummyModule,
  ],
})
export class AppModule {}
