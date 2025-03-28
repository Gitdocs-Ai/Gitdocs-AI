import UpdateReadmePage from "@/components/Update_Readme/UpdateReadmePage";

// Main component for the page
const UpdateReadme = async ({
    params,
}: {
    params: Promise<{ doc_name: string }>;
}) => {
    const { doc_name } = await params;

    return <UpdateReadmePage doc_name={doc_name} />;
};

export default UpdateReadme;

// Generate metadata for the page
export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ doc_name: string }>;
}) => {
    const { doc_name } = await params;

    return {
        title: `Update Readme: ${doc_name} | GitDocs AI`,
        description: `Update the Readme file for ${doc_name}`,
    };
};
