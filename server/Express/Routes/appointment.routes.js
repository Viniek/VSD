import { Router } from "express";
import { createAppointment,getApppointment, updateAppointment,deleteAppointment} from "../Controllers/schedules.controllers.js";

const router=Router()
router.post("/bookAppointment",createAppointment)
router.get("/viewAppointment",getApppointment)
router.patch("/editAppointment/:id",updateAppointment)
router.delete("/deleteAppointment/:id",deleteAppointment)

export default  router;