import { Router } from "express";
import Auth from "../Middlewares/Auth.js";
import { createNotification,deleteAllNotifications,deleteNotification,getNotifications,markNotificationsAsReadOrNot, } from "../Controllers/notifications.controller.js";


const router=Router();

router.get("/getNotifications",Auth,getNotifications)
router.post("/createNotification",Auth,createNotification)
router.patch("/markAsRead/:id", Auth, markNotificationsAsReadOrNot)
router.delete("/deleteNotification/:id",Auth,deleteNotification)
router.delete("/deleteAllNotifications",Auth,deleteAllNotifications)

export default router;