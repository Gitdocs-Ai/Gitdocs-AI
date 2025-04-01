import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  address1: { type: String, required: true },
  address2: { type: String, required: false },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  country: { type: String, required: true },
  taxId: { type: String, required: false },
  taxIdType: { type: String, required: false },
  isPrimary: { type: Boolean, default: false },
});

const billingHistorySchema = new mongoose.Schema(
  {
    razorpayOrderId: { type: String, required: true },
    razorpayPaymentId: { type: String },
    subscriptionType: {
      type: String,
      enum: ["Free", "Pro", "Enterprise"],
      required: true,
    },
    subscriptionStartDate: { type: Date, required: true },
    subscriptionEndDate: { type: Date, required: true },
    subscriptionPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["completed", "failed", "pending"],
      default: "pending",
      required: true,
    },
  },
  { timestamps: true },
);

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
    enum: ["Active", "Inactive", "Pending"],
    required: true,
    index: true, // Indexed for filtering by subscription status
  },
  subscriptionStartDate: {
    type: Date,
    required: true,
    index: true,
  }, // Indexed for filtering or sorting by start date
  subscriptionEndDate: {
    type: Date,
    required: true,
    index: true,
  }, // Indexed for filtering or sorting by end date
  subscriptionPrice: {
    type: Number,
    required: true,
    index: true,
  }, // Indexed for filtering or sorting by price
  leftOverTokens: {
    type: Number,
    required: true,
  },
  bonusTokens: {
    type: Number,
    required: true,
  },
  billingAddress: {
    type: [addressSchema],
    default: [],
  },
  billingHistory: {
    type: [billingHistorySchema],
    default: [],
  },
  createdAt: { type: Date, default: Date.now, index: true }, // Indexed for filtering or sorting by creation date
  updatedAt: { type: Date, default: Date.now, index: true }, // Indexed for filtering or sorting by last update
});

const Subscription =
  mongoose.models.Subscription ||
  mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
