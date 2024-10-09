import { Request, Response } from 'express';
import Comment from '../models/Comments';
import User from '../models/Users';
import Post from '../models/Posts';

// Get all comments with associated user and post
export const getAllComments = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.findAll({
      include: [
        { model: User, as: 'user' },       // Include associated user
        { model: Post, as: 'post' }        // Include associated post
      ]
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch comments' });
  }
};

// Get a specific comment with associated user and post
export const getCommentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByPk(id, {
      include: [
        { model: User, as: 'user' },       // Include associated user
        { model: Post, as: 'post' }        // Include associated post
      ]
    });
    if (comment) {
      res.json(comment);
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch comment' });
  }
};

// Create a new comment associated with a post
export const createComment = async (req: Request, res: Response) => {
  const { postId, userId, content } = req.body;
  try {
    const post = await Post.findByPk(postId);  // Check if post exists
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const comment = await Comment.create({ postId, userId, content });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create comment' });
  }
};

// Delete a comment
export const deleteComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByPk(id);
    if (comment) {
      await comment.destroy();
      res.json({ message: 'Comment deleted' });
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete comment' });
  }
};
