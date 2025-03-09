import jwt from "jsonwebtoken";

export default async function Auth(request, response, next) {

    
    const token = request.cookies.token; // Extract token from cookies
    // console.log("Extracted Token:", token);

    if (!token) {
        return response.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Decoded User:", decoded); 

        request.user = decoded; 
        next();
    } catch (error) {
        console.log("JWT Verification Error:", error.message);
        return response.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
    }
};
