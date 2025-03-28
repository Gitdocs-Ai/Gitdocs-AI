import Readme from "@/app/api/lib/models/Readme";

export const updateReadmeDb = async (
    githubUserId: string,
    repositoryId: string,
    readmeData: any,
) => {
    try {
        const readme = await Readme.findOne({ repositoryId });

        if (readme) {
            readme.content = readmeData.decodedContent;
            await readme.save();
        } else {
            await Readme.create({
                owner: githubUserId,
                repositoryId,
                content: readmeData.decodedContent,
            });
        }
    } catch (error) {
        console.error("Error updating readme in db:", error);
    }
};

export const fetchReadmeDb = async (repositoryId: string) => {
    const readme = await Readme.findOne({ repositoryId });
    return readme?.content;
};
