"use client";

import Sidebar from "../Dashboard/Sidebar";
import NavBar from "../Dashboard/NavBar";
import { AppContext, AppContextType } from "@/contexts/AppContext";
import { useContext, useEffect } from "react";
import SubscriptionHero from "../Subscription/SubscriptionHero";
import AiModelsHero from "../AiModels/AiModelsHero";
import ProjectHero from "../Projects/ProjectHero";
import { usePathname } from "next/navigation";
import { checkMobile } from "@/lib/MobileRestrict";
import MobileNotification from "./MobileNotification";

const TemplatePage = () => {
  const pathname = usePathname();

  const { setIsSidebarUsed, setNavbarTitle } = useContext(
    AppContext,
  ) as AppContextType;

  useEffect(() => {
    setIsSidebarUsed(true);
    setNavbarTitle("Subscription");
  }, [setIsSidebarUsed, setNavbarTitle]);

  if (checkMobile()) {
    return <MobileNotification />;
  }

  return (
    <div className="flex relative z-30 bg-[#0D0D0D] text-[#EDEDED]">
      <Sidebar />
      <div
        className={`flex-1 ms-16 transition-all duration-300 relative -z-10`}
      >
        <NavBar />
        <div className="max-w-[1600px] mx-auto">
          {pathname === "/subscription" && <SubscriptionHero />}
          {pathname === "/ai-models" && <AiModelsHero />}
          {pathname === "/projects" && <ProjectHero />}
        </div>
      </div>
    </div>
  );
};
export default TemplatePage;
