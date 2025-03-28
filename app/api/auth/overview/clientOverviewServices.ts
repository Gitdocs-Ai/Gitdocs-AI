import UsageOverview from "@/app/api/lib/models/UsageOverview";

export const getUsageOverview = async (userId: string) => {
    const usageOverview = await UsageOverview.findOne({ userId });
    return usageOverview;
};

export const updateUsageOverview = async (userId: string, data: any) => {
    const allowedUpdates = ["totalTokens", "maxRepositories"];

    const filteredData = Object.keys(data).reduce<Record<string, any>>(
        (result, key) => {
            if (allowedUpdates.includes(key)) {
                result[key] = data[key];
            }
            return result;
        },
        {},
    );

    const usageOverview = await UsageOverview.findOneAndUpdate(
        { userId },
        filteredData,
        { new: true },
    );
    return usageOverview;
};

export const updateTokensUsedOverview = async (
    userId: string,
    tokensUsed: number,
) => {
    if (!userId) {
        throw new Error("User not found");
    }

    const today = new Date();
    const dayOfWeek = today.toLocaleString("en-US", { weekday: "long" });
    const monthNumber = today.getMonth();
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const currentMonth = months[monthNumber];

    const currentOverview = await UsageOverview.findOne({ userId });

    if (!currentOverview) {
        return;
    }

    currentOverview.tokensUsed += tokensUsed;

    const weeklyEntry = currentOverview.weeklyTokensUsed.find(
        (entry: any) => entry.day === dayOfWeek,
    );
    if (weeklyEntry) {
        weeklyEntry.tokensUsed += tokensUsed;
    } else {
        currentOverview.weeklyTokensUsed.push({ day: dayOfWeek, tokensUsed });
    }

    const monthlyEntry = currentOverview.monthlyTokensUsed.find(
        (entry: any) => entry.month === currentMonth,
    );
    if (monthlyEntry) {
        monthlyEntry.tokensUsed += tokensUsed;
    } else {
        currentOverview.monthlyTokensUsed.push({
            month: currentMonth,
            tokensUsed,
        });
    }

    return await currentOverview.save();
};
