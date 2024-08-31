import express from 'express'
import { protect } from '../Middlewares/AuthMiddleware.js';
import { bloodgroupData } from '../Controllers/bloodgroupController.js';

const router = express.Router();

router.get('/dashboard/blood-groups-data',protect,bloodgroupData)

export default router;