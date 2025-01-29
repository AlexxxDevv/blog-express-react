import {
  Request,
  Response,
  NextFunction,
} from 'express';
import { myDataSource } from "../app-data-source";
import { Post } from '../entity/post.entity';

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  //  const owner = req.user._id;
  try {
    const { text } = req.body;
    const post = myDataSource.getRepository(Post).create({ text });
    const result = await myDataSource.getRepository(Post).save(post);
    res.status(201).send(result)
  }
  catch (error) {
    console.error(error);
  }
}
