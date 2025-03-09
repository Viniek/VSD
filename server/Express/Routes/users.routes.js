import { Router } from "express";
import Auth from "../Middlewares/Auth.js";
import {
  loginUser,
  getUser,
  updateUser,
  logOutUser,
  SignUp,
} from "../Controllers/users.controllers.js";

import { validate } from "../Middlewares/validateUser.js";
const router = Router();

router.get("/getuser/:id",Auth, getUser);
router.post("/login", loginUser);
router.patch("/update/:id",Auth, updateUser);
router.post("/logout", logOutUser);
router.post("/register", validate, SignUp);

export default router;
