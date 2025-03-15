import { Router } from "express";
import Auth from "../Middlewares/Auth.js";
import { createNotification,getNotifications,markNotificationsAsRead, } from "../Controllers/notifications.controller.js";


const router=Router();

router.get("/getNotifications",Auth,getNotifications)
router.post("/createNotification",Auth,createNotification)
router.patch("/markAsRead", Auth, markNotificationsAsRead)

export default router;