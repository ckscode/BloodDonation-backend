import express, { Router } from "express";
import { protect } from "../Middlewares/AuthMiddleware.js";
import { addInventory, getInventory } from "../Controllers/inventoryController.js";


const router = express.Router();

router.post('/inventory/add',protect,addInventory);
router.get('/inventory/get',protect,getInventory);

export default router;