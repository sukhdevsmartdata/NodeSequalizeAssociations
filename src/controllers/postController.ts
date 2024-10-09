import { Request, Response } from 'express';
import Post from '../models/Posts';
import User from '../models/Users';
import Comment from '../models/Comments';

// Get all posts with associated user and comments
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: User, as: 'user' },        // Include associated user
        { model: Comment, as: 'comments' }  // Include associated comments
      ]
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch posts' });
  }
};

// Get a specific post with associated user and comments
export const getPostById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id, {
      include: [
        { model: User, as: 'user' },        // Include associated user
        { model: Comment, as: 'comments' }  // Include associated comments
      ]
    });
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch post' });
  }
};

// Create a new post for a specific user
export const createPost = async (req: Request, res: Response) => {
  const { userId, title, content } = req.body;
  try {
    const post = await Post.create({ userId, title, content });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create post' });
  }
};

// Delete a post
export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id);
    if (post) {
      await post.destroy();
      res.json({ message: 'Post deleted' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete post' });
  }
};
