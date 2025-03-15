import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a notification
export const createNotification = async (req, res) => {
    try {
        const { userid, message } = req.body;
        if (!userid || !message) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Validate user exists
        const userExists = await prisma.users.findUnique({ where: { id: userid } });
        if (!userExists) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        console.log("Attempting to create notification for user:", userid);

        const newNotification = await prisma.notification.create({
            data: { userid, message, read: false },  // Changed isRead to read
        });

        console.log("Notification created successfully:", newNotification);
        return res.status(201).json({ success: true, data: newNotification });
    } catch (error) {
        console.error("Error creating notification:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Get all notifications for a user
export const getNotifications = async (req, res) => {
    const userid = req.user?.id;
    if (!userid) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try {
        const notifications = await prisma.notification.findMany({
            where: { userid },
            orderBy: { createdAt: "desc" },
        });

        res.status(200).json({ success: true, data: notifications });
    } catch (error) {
        console.error("Error fetching notifications:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Mark notifications as read
export const markNotificationsAsRead = async (req, res) => {
    const userid = req.user?.id;
    if (!userid) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try {
        await prisma.notification.updateMany({
            where: { userid },
            data: { read: true },  // Changed isRead to read
        });

        res.status(200).json({ success: true, message: "Notifications marked as read" });
    } catch (error) {
        console.error("Error updating notifications:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
