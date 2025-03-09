import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function CreateHistory(request, response) {
    const { testResult, age, familyHistory, heartRate } = request.body;

    // Extract user from the middleware
    const userId = request.user?.id; // Get user ID from authenticated user
console.log(request.cookies,"cookie");
console.log("🟡 Request Headers:", request.headers.cookie); 
console.log("userid",userId);

    if (!userId) {
        return response.status(401).json({ success: false, message: "Unauthorized: No user found in token!" });
    }

    try {
        // Check if the user exists
        const userExists = await prisma.users.findUnique({
            where: { id: userId },
        });

        if (!userExists) {
            return response.status(404).json({ success: false, message: "User not found!" });
        }

        // Create history record
        const newHistory = await prisma.history.create({
            data: {
                userId,
                testResult,
                factors: { age, familyHistory, heartRate },
            },
        });

        response.status(201).json({ success: true, data: newHistory });
    } catch (error) {
        console.error("Error creating history:", error.message);
        return response.status(500).json({ success: false, message: "Internal server error!" });
    }
}
