import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function getusers(request,response) {
    // respomse.send("getting users")
    try {
        const users = await prisma.users.findMany({
            select:{
                firstname:true,
            }
        })
        if(!users){
            return response.status(400).json({success:false,message:"THere are no users"})
        } 
        response.status(201).json({success:true,data:users})
    } catch (error) {
        console.log(error.message);
        return response.status(500).json({sccess:false, message:"internal server error"})
    }
}

export async function SignUp(request, response) {
    const { firstname, lastname, email, gender, disability, maritual_status, password, phone, next_of_kin, next_of_kin_phone } = request.body;

    console.log(request.body);


}
export async function loginUser(request, response){
    response.send("loging user")
}

export async function deleteUser(request, response){
    response.send("deleting user")
}

export async function updateUser(request,response){
    response.send("updating user")
}
export async function logOutUser(request,response){
    response.send("loging out user")
}


export async function test(req,res) {
    res.send("testing") 
}