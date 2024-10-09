import { Router } from 'express';
import { getAllUsers, getUserById, createUser, deleteUser } from '../controllers/userController';

const router = Router();

router.get('/', getAllUsers);               // Get all users with posts and comments
router.get('/:id', getUserById);            // Get a specific user by ID
router.post('/', createUser);               // Create a new user
router.delete('/:id', deleteUser);          // Delete a user

export default router;
