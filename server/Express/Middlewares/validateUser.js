import { PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

export async function validate(request,response,next){
   

    const { firstname, lastname, email, gender, disability, maritual_status, password, phone, next_of_kin, next_of_kin_phone } = request.body;

    const useWithEmailrExists = await prisma.users.findUnique({where:{email:email}})
    const nextOfKinWithPhoneExists = await prisma.users.findFirst({where:{next_of_kin_phone}})
    const userWithPhoneNumberExist = await prisma.users.findUnique({where:{phone:phone}})

    if(next_of_kin_phone.length !==10){return response.status(400).json({success:false,message:"Enter A valid next of kin phone number"})}
    if(phone.length!==10 ){return response.status(400).json({success:false, message:"Please enter a valid phone number"})}
    if(nextOfKinWithPhoneExists) {return response.status(400).json({success:false,message:"user with next of kin  phone number already exists"})}
    if (useWithEmailrExists){return response.status(400).json({success:false,message:"user with the email already exists"})}
    if(userWithPhoneNumberExist){return response.status(400).json({success:false, message:"user with phone number already exists"})}

    if(firstname=="" || !firstname){return response.status(404).json({success:false, message:"First name is required"})}
    if(firstname.length <= 3){return response.status(400).json({success:false,message:"First name must have more than 3 characters"})}
    if(firstname.length >=15){return response.status(400).json({success:false,message:"first name must have atmost 15 characters"})}

    if(!lastname || lastname == ""){return response.status(404).json({success:false, message:"Last name is required"})}
    if(lastname.length <=3){return response.status(400).json({success:false, message:"last name must have more than 3 characters"})}
    if(lastname.length>= 15){return response.status(400).json({success:false, message:"last name must have atmost 15 characters"})}

    if(!email || email=="") {return response.status(404).json({success:false,message:"Email is required"})}
    if(!gender || gender == ""){return response.status(404).json({success:false, message:"Gender is required"})}
    if(!disability || disability == ""){return response.status(404).json({success:false, message:"disability is required"})}
    if(!maritual_status|| maritual_status==""){return response.status(404).json({success:false, message:"maritual status is required"})}
    if(!password || password==""){return response.status(404).json({success:false, message:"password is required"})}
    if(password.length <8) {return response.status(400).json({success:false, message:"password must have atleast 8 characters"})}
    if(password.length>20){return response.status(400).json({success:false, message:"password must be less than 20 characters"})}

    if(!phone || phone == ""){return response.status(404).json({success:false,message:"phone number is required"})}
    if(!next_of_kin || next_of_kin==""){return response.status(404).json({success:false,message:"next of kin is required"})}
    if(!next_of_kin_phone || next_of_kin_phone == ''){return response.status(404).json({success:false,message:"next of kin phone number is required"})}
    if(next_of_kin.length <=3){return response.status(400).json({success:false, message:"next of kin name must have more than 3 characters"})}
    if(next_of_kin.length>= 15){return response.status(400).json({success:false, message:"next of kin name must have atmost 15 characters"})}

    next()
}