import * as dotenv from 'dotenv';

export interface IConfig {
  mongoDBURL: string;
}

dotenv.config();

const getConfig = (): IConfig => {
  const { MONGODB_URL: mongoDBURL } = process.env;

  if (!mongoDBURL) throw new Error('MongoDB Url is required');

  return {
    mongoDBURL,
  };
};

export const config = getConfig();
