import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';

export const isValidEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

export const comparePasswords = async (
  password: string,
  passwordFromDb: string,
) => {
  return await new Promise((resolve) => {
    bcrypt.compare(password, passwordFromDb).then((result: boolean) => {
      resolve(result);
    });
  });
};

export const isMongoDbObjectId = (id: string) => {
  const objectId = mongoose.Types.ObjectId;
  return objectId.isValid(id);
};
