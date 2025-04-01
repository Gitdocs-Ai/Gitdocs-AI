import DashboardPage from "@/components/Dashboard/DashboardPage";

const Dashboard = () => {
  return <DashboardPage />;
};

export const metadata = {
  title: {
    absolute: "Dashboard | Gitdocs AI",
    default: "Update Readme | Gitdocs AI",
    template: "%s | Gitdocs AI",
  },
  description: "Gitdocs AI",
};

export default Dashboard;
