import { Router } from "express";
import { createAppointment,deleteAllAppointments,deleteAppointment,getApppointment, updateAppointment} from "../Controllers/schedules.controllers.js";
import Auth from "../Middlewares/Auth.js";

const router=Router()
router.post("/bookAppointment",Auth,createAppointment)
router.get("/viewAppointment",Auth,getApppointment)
router.patch("/editAppointment/:id",Auth,updateAppointment)
router.delete("/deleteAllAppointments",Auth,deleteAllAppointments)
router.delete("/deleteAppointment/:id",Auth,deleteAppointment)

export default  router;