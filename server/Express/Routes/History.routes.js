import { Router } from 'express' 
import { CreateHistory,getHistory } from '../Controllers/Hostory.controllers.js';
import Auth from '../Middlewares/Auth.js';

const router = Router()
router.post("/create", Auth,CreateHistory)
router.get("/getHistory",Auth,getHistory)

export default router;