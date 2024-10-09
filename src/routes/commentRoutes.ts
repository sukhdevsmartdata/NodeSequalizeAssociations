import { Router } from 'express';
import { getAllComments, getCommentById, createComment, deleteComment } from '../controllers/commentController';

const router = Router();

router.get('/', getAllComments);            // Get all comments with user and post
router.get('/:id', getCommentById);         // Get a specific comment by ID
router.post('/', createComment);            // Create a new comment associated with a post
router.delete('/:id', deleteComment);       // Delete a comment

export default router;
