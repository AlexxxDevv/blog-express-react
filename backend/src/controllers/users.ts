import {
  Request,
  Response,
  NextFunction,
} from 'express';
import { User } from "../entity/user.entity";
import BadRequestError from "../errors/bad-request-error";
import ConflictError from "../errors/conflict-error";
import bcrypt from 'bcryptjs';
import { myDataSource } from "../app-data-source";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    username, password
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => myDataSource.getRepository(User).create({
      username, password: hash,
    }))
    .then((user) => myDataSource.getRepository(User).save(user))
    .then((data) => res.status(201).send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с данным username уже существует'));
      } else {
        next(err);
      }
    });
};

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;
  return myDataSource.getRepository(User).findOne({
    where: {
      username: username,
    },
  })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильная почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильная почта или пароль'));
          }
          const token = jwt.sign({ id: user.id }, JWT_SECRET)
          res.send({ token })
        })
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};