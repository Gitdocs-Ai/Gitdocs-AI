import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    clerkUid: {
      type: String,
      required: true,
      unique: true,
    },
    githubUid: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple null or undefined values
    },
    installationId: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple null or undefined values
    },
    githubUsername: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple null or undefined values
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    subscriptionType: {
      type: String,
      enum: ["Free", "Pro", "Enterprise"], // Define possible subscription types
      default: "Free",
    },
    signupDate: {
      type: Date,
      default: Date.now,
      index: true, // Indexed to allow filtering users by signup date
    },
    lastLogin: {
      type: Date,
      default: null, // To track when the user last logged in
      index: true, // Indexed for filtering or sorting by last login
    },
    repositories: {
      type: [String],
      default: [],
      ref: "Repository",
    },
    stepsCompleted: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  },
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
