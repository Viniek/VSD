import { Router } from "express";
import { createAppointment,getApppointment } from "../Controllers/schedules.controllers.js";

const router=Router()
router.post("/bookAppointment",createAppointment)
router.get("/viewAppointment",getApppointment)

export default  router;