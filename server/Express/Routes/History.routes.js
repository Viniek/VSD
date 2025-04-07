import { Router } from 'express' 
import { clearHistory, CreateHistory,getHistory } from '../Controllers/Hostory.controllers.js';
import Auth from '../Middlewares/Auth.js';

const router = Router()
router.post("/create", Auth,CreateHistory)
router.get("/getHistory",Auth,getHistory)
router.delete("/clearHistory",Auth,clearHistory)

export default router;