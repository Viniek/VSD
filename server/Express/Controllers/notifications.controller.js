import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function createNotification (request, response){
    const {message,read} = request.body
    const userid = request.user?.id
     
    if(!userid) return response.status(401).json({success:false, message:"Unauthorized"})
       
try {

    const userExists = await prisma.users.findUnique({
        where: { id: userid },
    });

    if (!userExists) {
        return response.status(404).json({ success: false, message: "User not found!" });
    }
    const newNotification = await prisma.notification.create({
        data:{
            userid,
            message,
            read
        }
    })
    response.status(201).json({success:true,data:newNotification})
} catch (error) {
   console.log(error.message,"error creating notification");
    return response.status(500).json({success:false, message:"Internal server error!"})
}
};


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
if (notifications.length ==0) return res.status(404).json({success:false,message:"You have no notifications"})
        res.status(200).json({ success: true, data: notifications });
    } catch (error) {
        console.error("Error fetching notifications:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export const markNotificationsAsReadOrNot = async (req, res) => {

const {id} = req.params;
const {message,read} = req.body
    try {

const notificationToUpdate = await prisma.notification.findFirst({
    where:{id:id}
})
if(!notificationToUpdate)return res.status(404).json({success:false,message:"Notification not found"})
const updatedNotification =  await prisma.notification.update({
    where: { id:id },
    data: { read,message },
});
        res.status(200).json({ success: true, message: "Notification updated",data:updatedNotification });
    } catch (error) {
        console.error("Error updating notifications:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
