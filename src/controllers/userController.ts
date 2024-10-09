import { Request, Response } from 'express';
import User from '../models/Users';
import Post from '../models/Posts';
import Comment from '../models/Comments';

// Get all users with their posts and comments

// Get all users with posts and comments
export const getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await User.findAll({
        include: [
          { model: Post, as: 'posts', include: [{ model: Comment, as: 'comments' }] },
        ]
      });
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch users' });
    }
  };

// Get a specific user with their posts and comments
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      include: [
        { model: Post, as: 'posts' },
        { model: Comment, as: 'comments' }
      ]
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch user' });
  }
};

// Create a new user
// Create a new user
export const createUser = async (req: Request, res: Response) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: 'Unable to create user' });
    }
  };

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete user' });
  }
};
