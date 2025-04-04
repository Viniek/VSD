
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createAppointment = async (req, res) => {
  const { hospital, date } = req.body;
// console.log(req.body);
  const userid = req.user?.id; 

  if (!userid) {
    return res.status(401).json({ success: false, message: "Unauthorized: User not found" });
  }

  try {
   
    const userExists = await prisma.users.findUnique({
      where: { id: userid },
    });

    if (!userExists) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    
    const newAppointment = await prisma.schedule.create({
      data: {
        userid,
        hospital,
        date,
      },
    });

    return res.status(201).json({ success: true, data: newAppointment });
  } catch (error) {
    console.error("Error creating Appointment:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error!" });
  }
};

export const getApppointment= async (req,res)=>{
    const userid=req.user?.id;

    if(!userid){
        return res.status(401).json({success:false, message:"Unauthorised:No user found in token"});
    }
    try{

        const schedule= await prisma.schedule.findMany({
            where:{userid},
        });
        if(schedule.length ===0){
            return res.status(404).json({success:false,message:"No booked appointments found"});

        }
       
        res.status(200).json({success:true,data:schedule})
    }catch(error){
        console.log("Error fetching booked appointments",error.message);
        return res.status(500).json({success:false,message:"Internal Server Error"})
    }
}

export const updateAppointment = async (req, res) => {
  const { id } = req.params; 
  const { hospital, date } = req.body; 
  const userid = req.user?.id; 

  if (!userid) {
    return res.status(401).json({ success: false, message: "Unauthorized: User not found" });
  }

  try {
    const appointment = await prisma.schedule.findUnique({
      where: { id },
    });

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    if (appointment.userid !== userid) {
      return res.status(403).json({ success: false, message: "Forbidden: You cannot update this appointment" });
    }

   
    
    const updatedAppointment = await prisma.schedule.update({
      where: { id },
      data: { hospital, date },
    });

    return res.status(200).json({ success: true, data: updatedAppointment });
  } catch (error) {
    console.error("Error updating Appointment:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error!" });
  }
};
export async function deleteAllAppointments(request,response){
  try {
    const appointments = await prisma.schedule.findMany({})
    if (appointments.length===0)return response.status(404).json({success:false, message:"No appointments found"})

      await prisma.schedule.deleteMany({})
      response.status(200).json({success:true,message:"All Appointments deleted"})
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({success:false,message:"internal server error"})
    
  }
}
export async function deleteAppointment(request,response){
  const {id} =request.params;
  try {
    const appointment = await prisma.schedule.findUnique({where:{id:id}})
    if(!appointment)return response.status(404).json({success:false, message:"Appointment not found"})
      await prisma.schedule.delete({where:{id:id}})
    response.status(200).json({success:true,message:"Appointment deleted"})
  } catch (error) {
    console.log("error deleting an appointment",error.message);
    return response.status(500).json({success:false,message:"internal server error"})
  }
}