import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  clerkId: { type: String, required: true },
  messages: { type: String, required: true },
  repositoryId: { type: String, required: true },
  name: { type: String, required: true },
  projectName: { type: String, required: true, unique: true },
  enabled: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
});

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
