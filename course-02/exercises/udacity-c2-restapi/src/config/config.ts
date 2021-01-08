const dotenv = require('dotenv');
dotenv.config();

export const config = {
  "dev": {
    "username": process.env.POSTGRES_USER_NAME,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_DATABASE,
    "host": process.env.POSTGRES_HOST,
    "dialect": process.env.DIALECT,
    "aws_region": process.env.AWS_REGION,
    "aws_profile": process.env.AWS_PROFILE,
    "aws_media_bucket": process.env.AWS_MEDIA_BUCKET
  },
  "jwt": {
    "secret_key": process.env.JWT_SECRET_KEY
  },
  "prod": {
    "username": "",
    "password": "",
    "database": process.env.POSTGRES_DATABASE,
    "host": "",
    "dialect": process.env.DIALECT
  }
}
