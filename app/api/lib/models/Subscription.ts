import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    userId: { type: String, required: true, index: true }, // Indexed for searching subscriptions by user ID
    subscriptionType: {
        type: String,
        enum: ["Free", "Pro", "Enterprise"],
        required: true,
        index: true, // Indexed for filtering by subscription type
    },
    subscriptionStatus: {
        type: String,
        enum: ["Active", "Inactive", "Expired"],
        required: true,
        index: true, // Indexed for filtering by subscription status
    },
    subscriptionStartDate: { type: Date, required: true, index: true }, // Indexed for filtering or sorting by start date
    subscriptionEndDate: { type: Date, required: true, index: true }, // Indexed for filtering or sorting by end date
    subscriptionPrice: { type: Number, required: true, index: true }, // Indexed for filtering or sorting by price
    leftOverTokens: { type: Number, required: true },
    bonusTokens: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now, index: true }, // Indexed for filtering or sorting by creation date
    updatedAt: { type: Date, default: Date.now, index: true }, // Indexed for filtering or sorting by last update
});

// Explicit compound indexes
subscriptionSchema.index({ userId: 1, subscriptionStatus: 1 }); // Compound index for filtering by user ID and subscription status
subscriptionSchema.index({ subscriptionType: 1, subscriptionEndDate: -1 }); // Compound index for filtering by type and sorting by end date

const Subscription =
    mongoose.models.Subscription || mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
