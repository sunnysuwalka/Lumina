import express from 'express'
import { getLeaderboard, getUsersByDepartment } from '../controllers/userController.js';

const router = express.Router();

router.get('/leaderboard', getLeaderboard)
router.get('/team/:department', getUsersByDepartment)

export default router;
