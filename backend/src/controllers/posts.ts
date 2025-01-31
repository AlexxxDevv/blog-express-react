import {
  Request,
  Response,
  NextFunction,
} from 'express';
import { myDataSource } from '../app-data-source';
import { Post } from '../entity/post.entity';
import { User } from '../entity/user.entity';
import NotFoundError from '../errors/not-found-error';
import ForbiddenError from '../errors/forbidden-error';

interface JwtPayload {
  id: number
}
interface SessionRequest extends Request {
  user?: JwtPayload;
}

export const createPost = async (req: SessionRequest, res: Response) => {
  const user: User = await myDataSource.getRepository(User).findOneOrFail({
    where: {
      id: req.user?.id,
    },
  });
  try {
    const { text } = req.body;
    const post = await myDataSource.getRepository(Post).save({ text, owner: user });
    res.status(201).send(post);
  } catch (error) {
    console.error(error);
  }
};

export const deletePost = async (req: SessionRequest, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  const post = await myDataSource.getRepository(Post).findOneOrFail({
    where: {
      id,
    },
    relations: ['owner'],
  });
  if (!post) {
    throw new NotFoundError('Нет поста по заданному id');
  }
  if (post.owner.id !== req.user?.id) {
    throw new ForbiddenError('Нельзя удалить чужой пост');
  } else {
    await myDataSource.getRepository(Post).delete({ id: post.id })
      .then(() => res.send(post))
      .catch(next);
  }
};

export const updatePost = async (req: SessionRequest, res: Response, next: NextFunction) => {
  const { text } = req.body;
  const id = Number(req.params.id);
  const post = await myDataSource.getRepository(Post).findOneOrFail({
    where: {
      id,
    },
    relations: ['owner'],
  });
  if (!post) {
    throw new NotFoundError('Нет поста по заданному id');
  }
  if (post.owner.id !== req.user?.id) {
    throw new ForbiddenError('Нельзя изменить чужой пост');
  } else {
    post.text = text;
    await myDataSource.getRepository(Post).save(post)
      .then(() => res.send(post))
      .catch(next);
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await myDataSource.getRepository(Post).find({ relations: ['owner'] });
    res.send(posts);
  } catch (err) {
    console.log(err);
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const post = await myDataSource.getRepository(Post).findOneOrFail({
      where: {
        id,
      },
      relations: ['owner'],
    });
    res.send(post);
  } catch (err) {
    console.log(err);
  }
};
