import { Document } from "mongoose";

export interface UserType extends Document {
  subscriptionType: "Free" | "Pro" | "Enterprise"; // Subscription type with enum values
  stepsCompleted: number; // Tracks completed steps
}

export interface RepositoryUserType extends Document {
  githubUid: string;
}

export interface ProjectMetadataType {
  type: string;
  technologies?: string;
  features?: string;
  license?: string;
  additionalInfo?: string;
}

export interface RepositoryType extends Document {
  name: string;
  repositoryId: string;
  description?: string;
  gitLink: string;
  owner: string;
  readme?: string;
  lastUpdated?: Date;
  status?: string;
  recentCommitDescription?: string;
  suggestions?: number;
  visibility: string;
  starred: boolean;
  score?: number;
  projectMetadata: ProjectMetadataType;
}
