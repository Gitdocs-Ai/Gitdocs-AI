"use client";

import { useContext } from "react";
import { AppContext, AppContextType } from "@/contexts/AppContext";
import UsageSummary from "./UsageSummary";
import DataDashboard from "./DataDashboard";

const SubOverview = () => {
    const { storedUser, numRepositories } = useContext(
        AppContext,
    ) as AppContextType;

    const stats = {
        tokens: storedUser?.usageOverview?.tokensUsed || 0,
        totalTokens: storedUser?.usageOverview?.totalTokens || 0,
        repositories: numRepositories || 0,
        maxRepositories: storedUser?.usageOverview?.maxRepositories || 0,
    };

    const weeklyStats = {
        monday: storedUser?.usageOverview?.weeklyTokensUsed[0]?.tokensUsed || 0,
        tuesday:
            storedUser?.usageOverview?.weeklyTokensUsed[1]?.tokensUsed || 0,
        wednesday:
            storedUser?.usageOverview?.weeklyTokensUsed[2]?.tokensUsed || 0,
        thursday:
            storedUser?.usageOverview?.weeklyTokensUsed[3]?.tokensUsed || 0,
        friday: storedUser?.usageOverview?.weeklyTokensUsed[4]?.tokensUsed || 0,
        saturday:
            storedUser?.usageOverview?.weeklyTokensUsed[5]?.tokensUsed || 0,
        sunday: storedUser?.usageOverview?.weeklyTokensUsed[6]?.tokensUsed || 0,
    };

    const monthlyStats = {
        january:
            storedUser?.usageOverview?.monthlyTokensUsed[0]?.tokensUsed || 0,
        february:
            storedUser?.usageOverview?.monthlyTokensUsed[1]?.tokensUsed || 0,
        march: storedUser?.usageOverview?.monthlyTokensUsed[2]?.tokensUsed || 0,
        april: storedUser?.usageOverview?.monthlyTokensUsed[3]?.tokensUsed || 0,
        may: storedUser?.usageOverview?.monthlyTokensUsed[4]?.tokensUsed || 0,
        june: storedUser?.usageOverview?.monthlyTokensUsed[5]?.tokensUsed || 0,
        july: storedUser?.usageOverview?.monthlyTokensUsed[6]?.tokensUsed || 0,
        august:
            storedUser?.usageOverview?.monthlyTokensUsed[7]?.tokensUsed || 0,
        september:
            storedUser?.usageOverview?.monthlyTokensUsed[8]?.tokensUsed || 0,
        october:
            storedUser?.usageOverview?.monthlyTokensUsed[9]?.tokensUsed || 0,
        november:
            storedUser?.usageOverview?.monthlyTokensUsed[10]?.tokensUsed || 0,
        december:
            storedUser?.usageOverview?.monthlyTokensUsed[11]?.tokensUsed || 0,
    };

    return (
        <div>
            <h1 className="text-xl font-semibold mt-2">Overview</h1>
            <p className="text-sm mt-1 text-[#999]">
                View your subscription and billing information.
            </p>
            <UsageSummary stats={stats} weeklyStats={weeklyStats} />
            <DataDashboard stats={stats} monthlyStats={monthlyStats} />
        </div>
    );
};
export default SubOverview;
