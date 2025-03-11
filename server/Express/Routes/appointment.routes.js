import { Router } from "express";
import { createAppointment,getApppointment, updateAppointment} from "../Controllers/schedules.controllers.js";

const router=Router()
router.post("/bookAppointment",createAppointment)
router.get("/viewAppointment",getApppointment)
router.patch("/editAppointment/:id",updateAppointment)

export default  router;