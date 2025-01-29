import { Router } from "express";
import { createUser, login } from "../controllers/users";
import { createPost } from "../controllers/posts";

const router = Router();
router.post('/signup', createUser);
router.post('/signin', login);
router.post('/post', createPost);


export default router;