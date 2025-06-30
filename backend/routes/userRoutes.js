import express from 'express';
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  updateUserOnboarding
} from '../controllers/userController.js';

const router = express.Router();

// @route   GET /api/users
// @desc    Get all users
// @access  Private/Admin
router.get('/', getUsers);

// @route   GET /api/users/:id
// @desc    Get single user
// @access  Private
router.get('/:id', getUser);

// @route   POST /api/users
// @desc    Create user
// @access  Public
router.post('/', createUser);

// @route   POST /api/users/login
// @desc    Login user
// @access  Public
router.post('/login', loginUser);

// @route   PUT /api/users/:id
// @desc    Update user
// @access  Private
router.put('/:id', updateUser);

// @route   PATCH /api/users/:id/onboarding
// @desc    Update user onboarding info
// @access  Private
router.patch('/:id/onboarding', updateUserOnboarding);

// @route   DELETE /api/users/:id
// @desc    Delete user
// @access  Private/Admin
router.delete('/:id', deleteUser);

export default router; 