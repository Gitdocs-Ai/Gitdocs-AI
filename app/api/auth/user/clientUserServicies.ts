import User from "@/app/api/lib/models/User";
import { UserType } from "@/app/api/lib/models/AllModelSchemas";

// Get User Data
export const getUser = async (userId: string): Promise<UserType | null> => {
    try {
        const user = (await User.findOne(
            { clerkUid: userId },
            "subscriptionType stepsCompleted",
        ).lean()) as UserType | null;

        return user;
    } catch (error) {
        console.error("Error in getUser:", error); // Log database query errors
        throw error;
    }
};

// Update User Data
export const updateUser = async (userId: string, data: any) => {
    try {
        const allowedUpdates = ["subscriptionType", "stepsCompleted"]; // Restrict updatable fields

        // Filter the update data
        const filteredData = Object.keys(data).reduce<Record<string, any>>(
            (result, key) => {
                if (allowedUpdates.includes(key)) {
                    result[key] = data[key];
                }
                return result;
            },
            {},
        );

        if (Object.keys(filteredData).length === 0) {
            throw new Error("No valid fields to update");
        }

        // Update and return the updated document
        const updatedUser = await User.findOneAndUpdate(
            { clerkUid: userId },
            { $set: filteredData },
            { new: true, fields: "subscriptionType stepsCompleted" }, // Only return required fields
        ).lean();

        return updatedUser;
    } catch (error) {
        console.error("Error in updateUser:", error); // Log database query errors
        throw error;
    }
};
