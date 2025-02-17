import {Router} from 'express'
import {loginUser,updateUser,logOutUser,SignUp} from '../Controllers/users.controllers.js';
import { validate } from '../Middlewares/validateUser.js';
const router = Router()


router.post("/login", loginUser);
router.patch("/update/:id",updateUser)
router.post("/logout",logOutUser)
router.post("/register",validate, SignUp);
export default router;