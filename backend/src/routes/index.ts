import { Router } from 'express';
import { createUser, getUserData, login } from '../controllers/users';
import {
  createPost, deletePost, getPostById, getPosts, updatePost,
} from '../controllers/posts';
import auth from '../middlewares/auth';
import upload from '../utils/multer-config';

const router = Router();
router.post('/signup', createUser);
router.post('/signin', login);
router.get('/post', getPosts);
router.get('/profile', auth, getUserData);
router.get('/post/:id', getPostById);
router.post('/post', auth, upload.single('media'), createPost);
router.delete('/post/:id', auth, deletePost);
router.patch('/post/:id', auth, upload.single('media'), updatePost);

export default router;
