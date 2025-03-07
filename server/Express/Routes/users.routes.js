import { Router } from "express";

import {
  loginUser,
  getUser,
  updateUser,
  logOutUser,
  SignUp,
} from "../Controllers/users.controllers.js";

import { validate } from "../Middlewares/validateUser.js";
const router = Router();

router.get("/getuser/:id", getUser);
router.post("/login", loginUser);
router.patch("/update/:id", updateUser);
router.post("/logout", logOutUser);
router.post("/register", validate, SignUp);

export default router;
