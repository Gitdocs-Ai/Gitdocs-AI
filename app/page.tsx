import LandingPage from "@/components/LandingPage/LandingPage";

const Landingpage = () => {
    return <LandingPage />;
};

export const metadata = {
    title: {
        absolute: "Gitdocs AI",
        default: "Update Readme | Gitdocs AI",
        template: "%s | Gitdocs AI",
    },
    description: "Gitdocs AI",
};

export default Landingpage;
