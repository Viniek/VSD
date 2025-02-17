import {Router} from 'express'
import { getusers,loginUser,updateUser,logOutUser,SignUp ,test} from '../Controllers/users.controllers.js';
import { validate } from '../Middlewares/validateUser.js';
const router = Router()

router.get("/getusers", getusers);
router.post("/login", loginUser);
router.patch("/update/:id",updateUser)
router.post("/logout",logOutUser)
router.post("/register",validate, SignUp);
router.get("/test",test)
export default router;