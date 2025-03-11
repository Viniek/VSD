
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createAppointment = async (req, res) => {
  const { hospital, date } = req.body;
console.log(req.body);
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
        console.log(schedule,"schedule");
        res.status(200).json({success:true,data:schedule})
    }catch(error){
        console.log("Error fetching booked appointments",error.message);
        return res.status(500).json({success:false,message:"Internal Server Error"})
    }
}