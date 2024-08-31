import express, { Router } from "express";
import { protect } from "../Middlewares/AuthMiddleware.js";
import { addInventory, getInventory, getInventoryWithFilters } from "../Controllers/inventoryController.js";


const router = express.Router();

router.post('/inventory/add',protect,addInventory);
router.get('/inventory/get',protect,getInventory);
router.post('/inventory/getWithFilters',protect,getInventoryWithFilters);

export default router;