import connectMongoWithRetry from "../../lib/db/connectMongo";
import Project from "../../lib/models/Project";

export const createProject = async (
    clerkId: string,
    projectName: string,
    repositoryId: string,
    messages: string,
    name: string,
) => {
    await connectMongoWithRetry();
    const newProject = await Project.create({
        clerkId,
        projectName,
        repositoryId,
        messages,
        name,
    });
    return newProject;
};

export const getProject = async (projectName: string) => {
    await connectMongoWithRetry();
    const project = await Project.findOne({ projectName });
    return project;
};

export const updateProject = async (
    projectName: string,
    project: typeof Project,
) => {
    await connectMongoWithRetry();
    const updatedProject = await Project.findOneAndUpdate(
        { projectName },
        project,
        { new: true },
    );
    return updatedProject;
};

export const deleteProject = async (projectName: string) => {
    await connectMongoWithRetry();
    await Project.findOneAndDelete({ projectName });
};
