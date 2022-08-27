import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { MovieEntity } from 'src/entities/movie.entity';
import { UserEntity } from 'src/entities/user.entity';
import { DummyController } from './dummy.controller';
import { DummyService } from './dummy.service';

@Module({
  imports: [TypegooseModule.forFeature([UserEntity, MovieEntity])],
  controllers: [DummyController],
  providers: [DummyService],
})
export class DummyModule {}
