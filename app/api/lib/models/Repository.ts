import mongoose from "mongoose";

const metadataSchema = new mongoose.Schema({
  type: { type: String, enum: ["personal", "professional"], required: true },
  technologies: { type: String },
  features: { type: String },
  license: { type: String },
  additionalInfo: { type: String },
});

const repositorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
  }, // Indexed for searching repositories by name
  repositoryId: {
    type: String,
    required: true,
    unique: true,
  }, // Unique index
  description: {
    type: String,
  },
  gitLink: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    ref: "User",
    required: true,
    index: true,
  }, // Indexed for querying repositories by owner
  readme: {
    type: String,
    ref: "Readme",
    required: false,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
    index: true,
  }, // Indexed for sorting or filtering by last updated
  status: {
    type: String,
    enum: ["fine", "info", "needs-attention"],
    default: "fine",
  },
  recentCommitDescription: {
    type: String,
  },
  suggestions: {
    type: Number,
    default: 0,
    index: true,
  }, // Indexed for sorting or filtering by suggestions
  visibility: {
    type: String,
    enum: ["public", "private"],
    default: "public",
    index: true,
  }, // Indexed for filtering by visibility
  starred: {
    type: Boolean,
    default: false,
    index: true,
  }, // Indexed for filtering starred repositories
  score: {
    type: Number,
    default: 0,
    index: true,
  }, // Indexed for sorting or filtering by score
  projectMetadata: {
    type: metadataSchema,
    default: {},
  },
});

const Repository =
  mongoose.models.Repository || mongoose.model("Repository", repositorySchema);

export default Repository;
