import express from 'express'
import bcrypt from 'bcryptjs'
import { getAllDonorOfOrg, getAllHospitalsOfOrg, getAllOrganisationOfOrg, getCurrentUser, Login, Register } from '../Controllers/userController.js';
import { protect } from '../Middlewares/AuthMiddleware.js';

const router = express.Router();

router.post('/user/register',Register)
router.post('/user/login',Login)
router.get('/user/get-current-user',protect,getCurrentUser)
router.get('/user/get-all-donors',protect,getAllDonorOfOrg)
router.get('/user/get-all-hospitals',protect,getAllHospitalsOfOrg)
router.get('/user/get-all-organisations',protect,getAllOrganisationOfOrg)



export default router;