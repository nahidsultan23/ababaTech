import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { MovieEntity } from 'src/entities/movie.entity';
import { UserEntity } from 'src/entities/user.entity';
import { MovieListController } from './movieList.controller';
import { MovieListService } from './movieList.service';

@Module({
  imports: [TypegooseModule.forFeature([UserEntity, MovieEntity])],
  controllers: [MovieListController],
  providers: [MovieListService],
})
export class MovieListModule {}
