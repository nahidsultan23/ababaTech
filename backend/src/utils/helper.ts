import * as bcrypt from 'bcryptjs';

export const encryptPassword = async (password: string) => {
  const saltRounds = 10;

  return new Promise((resolve) => {
    bcrypt.hash(password, saltRounds).then((encryptedPassword) => {
      resolve(encryptedPassword);
    });
  });
};
