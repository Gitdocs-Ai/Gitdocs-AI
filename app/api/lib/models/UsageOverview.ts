import mongoose from "mongoose";

const weeklyTokensUsedSchema = new mongoose.Schema({
    day: { type: String, required: true },
    tokensUsed: { type: Number, required: true },
});

const monthlyTokensUsedSchema = new mongoose.Schema({
    month: { type: String, required: true },
    tokensUsed: { type: Number, required: true },
});

const usageOverviewSchema = new mongoose.Schema({
    userId: { type: String, required: true, ref: "User" },
    tokensUsed: { type: Number, required: true },
    totalTokens: { type: Number, required: true },
    maxRepositories: { type: Number, required: true },
    weeklyTokensUsed: {
        type: [weeklyTokensUsedSchema],
        default: [],
    },
    monthlyTokensUsed: {
        type: [monthlyTokensUsedSchema],
        default: [],
    },
    createdAt: { type: Date, default: Date.now, index: true }, // Indexed for filtering or sorting by creation date
    updatedAt: { type: Date, default: Date.now, index: true }, // Indexed for filtering or sorting by last update
});

const UsageOverview =
    mongoose.models.UsageOverview ||
    mongoose.model("UsageOverview", usageOverviewSchema);

export default UsageOverview;
