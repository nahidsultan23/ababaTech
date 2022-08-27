import { prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class MovieEntity extends TimeStamps {
  @prop({ required: true, index: true })
  name: string;

  @prop()
  description: string;

  @prop({ required: true, index: true })
  group: string;

  @prop({ required: true, index: true })
  type: string;

  @prop()
  coverPhoto: string;

  @prop()
  photo: string;

  @prop()
  releaseYear: number;

  @prop()
  imdbRating: number;
}
