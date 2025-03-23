import dotenv from 'dotenv';

dotenv.config();

interface Config {
  PORT: number;
  NODE_ENV: string;
  LOG_HTTP?: boolean;
}

export const config: Config = {
  PORT: parseInt(process.env.PORT || '8000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  LOG_HTTP: process.env.LOG_HTTP === 'true' || false,
};
