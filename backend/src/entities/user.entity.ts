import { prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class UserEntity extends TimeStamps {
  @prop({ required: true })
  email: string;

  @prop({ required: true })
  password: string;

  @prop({ required: true })
  username: string;
}
