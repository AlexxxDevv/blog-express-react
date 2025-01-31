/* eslint-disable import/prefer-default-export */
require('dotenv').config();

export const { JWT_SECRET = 'JWT_SECRET' } = process.env;
