import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function CreateHistory(request, response) {
    const { 
        vsd_status,
        severity,
        condition, 
        age,
        gender,
        oxygenSaturation,
        ejectionFraction,
        weight,
        height,
        heartRate,
        cyanosis,
        murmur,
        systolic,
        diastolic,
        vsdSize,
        familyHistory } = request.body;

    // Extract user from the middleware
    const userId = request.user?.id; // Get user ID from authenticated user

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
                testResult:{
                    vsd_status,
                    severity,
                    condition,
                },
                factors: { 
                    age,
                    gender,
                    oxygenSaturation,
                    ejectionFraction,
                    weight,
                    height,
                    heartRate,
                    cyanosis,
                    murmur,
                    systolic,
                    diastolic,
                    vsdSize,
                    familyHistory
                },
            },
        });

        response.status(201).json({ success: true, data: newHistory });
    } catch (error) {
        console.error("Error creating history:", error.message);
        return response.status(500).json({ success: false, message: "Internal server error!" });
    }
}

export async function getHistory(request, response) {
    const userId = request.user?.id;

    if (!userId) {
        return response.status(401).json({ success: false, message: "Unauthorized: No user found in token!" });
    }

    try {
        const history = await prisma.history.findMany({
            where: { userId }, // Ensure we're filtering by userId
        });

        if (history.length === 0) {
            return response.status(404).json({ success: false, message: "No history records found" });
        }

        console.log(history, "history");

        response.status(200).json({ success: true, data: history });
    } catch (error) {
        console.log("Error fetching history:", error.message);
        return response.status(500).json({ success: false, message: "Internal server error" });
    }
}

