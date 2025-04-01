import UpdateReadmePage from "@/components/Update_Readme/UpdateReadmePage";

// Main component for the page
const UpdateReadme = async () => {
  return <UpdateReadmePage doc_name="#Chat-with-GitDocs-AI-Assistant#" />;
};

export default UpdateReadme;

// Generate metadata for the page
export const generateMetadata = async () => {
  return {
    title: `Chat with GitDocs AI`,
    description: `Chat with GitDocs AI`,
  };
};
