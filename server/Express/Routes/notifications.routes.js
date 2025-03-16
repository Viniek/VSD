import { Router } from "express";
import Auth from "../Middlewares/Auth.js";
import { createNotification,getNotifications,markNotificationsAsReadOrNot, } from "../Controllers/notifications.controller.js";


const router=Router();

router.get("/getNotifications",Auth,getNotifications)
router.post("/createNotification",Auth,createNotification)
router.patch("/markAsRead/:id", Auth, markNotificationsAsReadOrNot)

export default router;