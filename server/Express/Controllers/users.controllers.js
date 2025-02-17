import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function SignUp(request, response) {
    const { firstname, lastname, email, gender, disability, maritual_status, password, phone, next_of_kin, next_of_kin_phone } = request.body;
    const hashedPassword = bcrypt.hashSync(password,10)
  try {
    const newUser = await prisma.users.create({
        data:{
            firstname,lastname, email, gender, disability, maritual_status, password:hashedPassword
            , phone, next_of_kin, next_of_kin_phone

        },
        select:{
            firstname:true,
            lastname:true,
            email:true,
            gender:true,
            disability:true,
            maritual_status:true,
            phone:true,
            next_of_kin:true,
            next_of_kin_phone:true,         
        }
    })
    response.status(201).json({success:true, message:"Acccount created", data:newUser})
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({success:false, message:"Internal server error"})
    
  }


} 
export async function loginUser(request, response){
    const {email,password} = request.body;
    try {
        const user = await prisma.users.findUnique({where:{email}})
        if(!user) {return response.status(404).json({success:false,message:"Wrong email or password"})}
        const passwordMatch = bcrypt.compareSync(password,user.password);
        if(!passwordMatch) {return response.status(402).json({success:false, message:"Wrong email or Password"})}
        else {
            const payload = {
                id:user.id,
                firstname:user.firstname,
                lastname:user.lastname,
                email:user.email,
                gender:user.gender,
                disability:user.disability,
                maritual_status:user.maritual_status,
                phone:user.phone,
                next_of_kin:user.next_of_kin,
                next_of_kin_phone:user.next_of_kin_phone,

            }
            const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'24h'})
            response.cookie("token",token).json({success:true,data:payload,message:"Log in succesful"})
        }
    } catch (error) {
        console.log(error.message);
        return response.status(500).json({success:false,message:"internal server error"})
        
    }
}



export async function updateUser(request,response){
    const { firstname, lastname, email, gender, disability, maritual_status, password, phone, next_of_kin, next_of_kin_phone } = request.body;
    const { id } = request.params;
    try {
        const user = await prisma.users.findUnique({where:{id:id}})
        if(!user){return response.status(400).json({success:false,message:"user not found"})}

        const updateUser = await prisma.users.update({
            where:{id:id},
            data:{
                firstname:firstname|| user.firstname,
                lastname: lastname || user.lastname,
                email:email || user.email,
                gender:gender || user.gender,
                disability:disability || user.disability,
                maritual_status:maritual_status || user.maritual_status,
                password:password||user.password,
                phone:phone || user.phone,
                next_of_kin: next_of_kin || user.next_of_kin,
                next_of_kin_phone: next_of_kin_phone || user.next_of_kin_phone
            },
            select:{
                firstname:true,
                lastname:true,
                email:true,
                gender:true,
                disability:true,
                maritual_status:true,
                phone:true,
                next_of_kin:true,
                next_of_kin_phone:true,
            },
        });
        response.status(200).json({success:true,message:"User updated", data:updateUser})
    } catch (error) {
        console.log(error.message);
        return response.status(500).json({success:false, message:"internal server error"})
        
    }
}
export async function logOutUser(request,response){
    response.send("loging out user")
}

