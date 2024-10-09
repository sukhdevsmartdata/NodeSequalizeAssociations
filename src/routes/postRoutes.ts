import { Router } from 'express';
import { getAllPosts, getPostById, createPost, deletePost } from '../controllers/postController';

const router = Router();

router.get('/', getAllPosts);               // Get all posts with user and comments
router.get('/:id', getPostById);            // Get a specific post by ID
router.post('/', createPost);               // Create a new post
router.delete('/:id', deletePost);          // Delete a post

export default router;
