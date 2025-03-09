import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function validate(request, response, next) {
  try {
    const {
      firstname,
      lastname,
      email,
      gender,
      disability,
      maritual_status,
      password,
      phone,
      next_of_kin,
      next_of_kin_phone,
    } = request.body;

    // Convert phone numbers to strings to prevent Prisma type errors
    const userPhone = String(phone);
    const userNextOfKinPhone = String(next_of_kin_phone);

    // Basic required field validation
    if (!firstname || firstname.trim() === "")
      return response
        .status(400)
        .json({ success: false, message: "First name is required" });
    if (firstname.length < 3 || firstname.length > 15)
      return response
        .status(400)
        .json({
          success: false,
          message: "First name must be between 3 and 15 characters",
        });

    if (!lastname || lastname.trim() === "")
      return response
        .status(400)
        .json({ success: false, message: "Last name is required" });
    if (lastname.length < 3 || lastname.length > 15)
      return response
        .status(400)
        .json({
          success: false,
          message: "Last name must be between 3 and 15 characters",
        });

    if (!email || email.trim() === "")
      return response
        .status(400)
        .json({ success: false, message: "Email is required" });
    if (!/^\S+@\S+\.\S+$/.test(email))
      return response
        .status(400)
        .json({ success: false, message: "Invalid email format" });

    if (!gender || gender.trim() === "")
      return response
        .status(400)
        .json({ success: false, message: "Gender is required" });
    if (!disability || disability.trim() === "")
      return response
        .status(400)
        .json({ success: false, message: "Disability status is required" });
    if (!maritual_status || maritual_status.trim() === "")
      return response
        .status(400)
        .json({ success: false, message: "Marital status is required" });

    if (!password || password.trim() === "")
      return response
        .status(400)
        .json({ success: false, message: "Password is required" });
    if (password.length < 8 || password.length > 20)
      return response
        .status(400)
        .json({
          success: false,
          message: "Password must be between 8 and 20 characters",
        });

    if (!userPhone || userPhone.trim() === "")
      return response
        .status(400)
        .json({ success: false, message: "Phone number is required" });
    if (!/^\d{9}$/.test(userPhone))
      return response
        .status(400)
        .json({
          success: false,
          message: "Invalid phone number format. Must be 10 digits",
        });

    if (!next_of_kin || next_of_kin.trim() === "")
      return response
        .status(400)
        .json({ success: false, message: "Next of kin is required" });
    if (next_of_kin.length < 3 || next_of_kin.length > 15)
      return response
        .status(400)
        .json({
          success: false,
          message: "Next of kin name must be between 3 and 15 characters",
        });

    if (!userNextOfKinPhone || userNextOfKinPhone.trim() === "")
      return response
        .status(400)
        .json({
          success: false,
          message: "Next of kin phone number is required",
        });
    if (!/^\d{9}$/.test(userNextOfKinPhone))
      return response
        .status(400)
        .json({
          success: false,
          message: "Invalid next of kin phone number. Must be 10 digits",
        });

    // Check if email, phone, or next_of_kin_phone already exists in the database
    const [userWithEmail, userWithPhone, userWithNextOfKinPhone] =
      await Promise.all([
        prisma.users.findFirst({ where: { email } }),
        prisma.users.findFirst({ where: { phone: userPhone } }),
        prisma.users.findFirst({
          where: { next_of_kin_phone: userNextOfKinPhone },
        }),
      ]);

    if (userWithEmail)
      return response
        .status(400)
        .json({
          success: false,
          message: "User with this email already exists",
        });
    if (userWithPhone)
      return response
        .status(400)
        .json({
          success: false,
          message: "User with this phone number already exists",
        });
    if (userWithNextOfKinPhone)
      return response
        .status(400)
        .json({
          success: false,
          message: "User with this next of kin phone number already exists",
        });

    // Move to the next middleware
    next();
  } catch (error) {
    console.error("Error in validation middleware:", error.message);
    return response
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
