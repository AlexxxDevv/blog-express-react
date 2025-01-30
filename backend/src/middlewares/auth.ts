import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '../config';
import UnauthorizedError from '../errors/unauthorized-error';

interface JwtPayload {
  id: number;
}

interface SessionRequest extends Request {
  user?: number | JwtPayload;
}

const auth = (req: SessionRequest, res: Response, next: NextFunction) => {
  let token = req.headers.authorization;
  try {
    if (!token) {
      throw new UnauthorizedError('Токен не передан');
    }
    token = token.replace('Bearer ', '');

    let payload: JwtPayload | null = null;

    payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = payload;
    next();
  } catch (e) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
};

export default auth;
