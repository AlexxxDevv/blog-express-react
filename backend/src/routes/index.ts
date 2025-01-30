import { Router } from 'express';
import { createUser, login } from '../controllers/users';
import {
  createPost, deletePost, getPosts, updatePost,
} from '../controllers/posts';
import auth from '../middlewares/auth';

const router = Router();
router.post('/signup', createUser);
router.post('/signin', login);
router.get('/post', getPosts);
router.post('/post', auth, createPost);
router.delete('/post/:id', auth, deletePost);
router.patch('/post/:id', auth, updatePost);

export default router;
