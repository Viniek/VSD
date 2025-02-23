import {Router} from 'express'
<<<<<<< HEAD
import {loginUser,getUser,updateUser,logOutUser,SignUp} from '../Controllers/users.controllers.js';
import { validate} from '../Middlewares/validateUser.js';
const router = Router()

router.get("/getuser/:id",getUser)
router.post("/login",loginUser);
router.patch("/update/:id",updateUser)
router.post("/logout",logOutUser)
router.post("/register",validate, SignUp);
=======
import { getusers,loginUser,updateUser,logOutUser,SignUp ,test} from '../Controllers/users.controllers.js';
import { createUser } from '../Controllers/users.controllers.js';
import jwt from "jsonwebtoken";
import { validateInformation } from '../Middlewares/users.middleware.js';

const payload = { password: "1234567" };
const secret = "your_secret_key";

const token = jwt.sign(payload, secret);
console.log(token);



const router = Router()
router.get("/getusers", getusers);
router.post("/login", loginUser);
router.patch("/update",updateUser)
router.post("/logout",logOutUser)
router.post("/signup",validateInformation, createUser);
router.get("/test",test)
>>>>>>> 0b5b078bb0ceb97d87d31e91c8e99b98973bc2ff
export default router;