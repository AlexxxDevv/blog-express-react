import { Router } from 'express';
import { createUser, getUserData, login } from '../controllers/users';
import {
  createPost, deletePost, getPostById, getPosts, updatePost,
} from '../controllers/posts';
import auth from '../middlewares/auth';

const router = Router();
router.post('/signup', createUser);
router.post('/signin', login);
router.get('/post', getPosts);
router.get('/profile', auth, getUserData);
router.get('/post/:id', getPostById);
router.post('/post', auth, createPost);
router.delete('/post/:id', auth, deletePost);
router.patch('/post/:id', auth, updatePost);

export default router;
