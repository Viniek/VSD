import { Router } from 'express' 
import { CreateHistory } from '../Controllers/Hostory.controllers.js';
import { Auth } from '../Middlewares/Auth.js';
const router = Router()
router.post("/create",CreateHistory)

export default router;