import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// createuser
export const createUser = async (req, res) => {
    try {
      const { firstname, lastname, email, gender,disability, password,phone, next_of_kin, next_of_kin_phone } = req.body;
       if(!firstname)return res.status(400).json({success:false, message:"First name required..."})
  
      const hashedPassword = bcrypt.hashSync(password, 12);
      const newUser = await prisma.user.create({
        data: {
          firstname,
          lastname,
          email,
          gender,
          disability,
          password: hashedPassword,
          phone,
           next_of_kin, 
           next_of_kin_phone ,         
              },
      });
      res.status(201).json({ success: true, message: "hurray!!user created successfuly..." });
    } catch (e) {onsole.log(e.message);
      res.status(500).json({ success: false, message: e.message });
    }
  };
  



// export async function getusers(request,response) {
//     // respomse.send("getting users")
//     try {
//         const users = await prisma.users.findMany({
//             select:{
//                 firstname:true,
//             }
//         })
//         if(!users){
//             return response.status(400).json({success:false,message:"THere are no users"})
//         } 
//         response.status(201).json({success:true,data:users})
//     } catch (error) {
//         console.log(error.message);
//         return response.status(500).json({sccess:false, message:"internal server error"})
//     }
// }
// // Sign up users
// export const logIn=async(req, res) =>{
//     const { firstname, lastname, email, gender,disability,marital-status, password,phone, next_of_kin, next_of_kin_phone } = req.body;
// try{
//     const user=await prisma.user.FindFirst({
//     Where:{emailaddress},
// })
// if (user) {
//     const passwordMatch = bcrypt.compareSync(password, user.password);
//     if (passwordMatch === true) {
//       const payload = {
//         id: user.id,
//         fullname: user.fullname,
//         emailaddress: user.emailaddress,
//         role: user.role,
//         // password:user.password
//       };

//       const token = jwt.sign(payload, process.env.JWT_SECRET, {
//         expiresIn: "100h",
//       });
//       //   return res.json({ success: true, message: "Signed in successfully...", user });
//       res.cookie("access_token", token);
//       res.status(200).json({ success: true, data: payload });
//     } else {
//       return res
//         .status(400)
//         .json({
//           success: false,
//           message: "Oops! Wrong login credentials...",
//         });
//     }
//   } else {
//     return res
//       .status(404)
//       .json({ success: false, message: "User not found..." });
//   }
// } catch (e) {
//   return res.status(500).json({ success: false, message: e.message });
// }
// ;
//  } // console.log(request.body);



// export async function loginUser(request, response){
//     response.send("loging user")
// }

// export async function deleteUser(request, response){
//     response.send("deleting user")
// }

// export async function updateUser(request,response){
//     response.send("updating user")
// }
// export async function logOutUser(request,response){
//     response.send("loging out user")
// }


// export async function test(req,res) {
//     res.send("testing") 
// }