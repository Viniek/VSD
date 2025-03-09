import { Router } from 'express' 
import { CreateHistory,getHistory } from '../Controllers/Hostory.controllers.js';

const router = Router()
router.post("/create",CreateHistory)
router.get("/getHistory",getHistory)

export default router;