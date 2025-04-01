import mongoose from "mongoose";

const readmeSchema = new mongoose.Schema({
  owner: { type: String, required: true },
  repositoryId: { type: String, required: true, unique: true }, // Indexed for quick lookup by repository ID
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, index: true }, // Indexed for sorting or filtering by creation date
});

const Readme = mongoose.models.Readme || mongoose.model("Readme", readmeSchema);

export default Readme;
