import {Router} from 'express'
import { getusers,loginUser,updateUser,logOutUser,SignUp ,test} from '../Controllers/users.controllers.js';
const router = Router()

router.get("/getusers", getusers);
router.post("/login", loginUser);
router.patch("/update",updateUser)
router.post("/logout",logOutUser)
router.post("/register", SignUp);
router.get("/test",test)
export default router;