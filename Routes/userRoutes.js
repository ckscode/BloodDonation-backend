import express from 'express'
import bcrypt from 'bcryptjs'
import { getCurrentUser, Login, Register } from '../Controllers/userController.js';
import { protect } from '../Middlewares/AuthMiddleware.js';

const router = express.Router();

router.post('/register',Register)
router.post('/login',Login)
router.get('/get-current-user',protect,getCurrentUser)


export default router;