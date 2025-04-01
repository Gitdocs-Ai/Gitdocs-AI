"use client";

import {
  useState,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { LuUser, LuBrain } from "react-icons/lu";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AppContext } from "@/contexts/AppContext";
import {
  LayoutDashboard,
  ScanSearch,
  FolderOpen,
  Package,
  CreditCard,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

interface User {
  subscriptionType: string;
  stepsCompleted: number;
}

interface AppContextType {
  storedUser: User | null;
  setStoredUser: Dispatch<SetStateAction<User | null>>;
}

export default function Sidebar() {
  const [isClient, setIsClient] = useState(false);
  const { storedUser } = useContext(AppContext) as AppContextType;
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    setIsClient(true); // Ensure the content is only rendered on the client
  }, []);

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/dashboard",
      isActive: pathname === "/dashboard",
    },
    {
      icon: ScanSearch,
      label: "Docs Review",
      href: "#",
      isActive: pathname === "/review",
    },
    {
      icon: Package,
      label: "AI Models",
      href: "/ai-models",
      isActive: pathname === "/ai-models",
    },
  ];

  const downMenuItems = [
    {
      icon: CreditCard,
      label: "Subscription",
      href: "/subscription",
      isActive: pathname === "/subscription",
    },
  ];

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen md:flex fixed top-0 left-0 hidden">
      <div
        className={cn(
          "h-screen bg-[#131314] border-r w-16 border-[#3D444D] relative flex flex-col transition-all duration-300",
        )}
      >
        {/* Logo Section */}
        <div className="px-4 h-16 border-b border-[#3D444D] flex items-center justify-between">
          <div className="relative mx-auto">
            <Image src={"/logo.png"} width={30} height={30} alt="logo" />
            <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-[#3D444D]" />
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 flex items-center flex-col gap-2 px-1.5 py-2.5 overflow-hidden">
          <ul>
            <TooltipProvider delayDuration={200}>
              {menuItems.map((item, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <li>
                      <a
                        onClick={() => {
                          router.push(item.href);
                        }}
                        className={cn(
                          "w-full flex p-2 mb-3 rounded-md group cursor-pointer",
                          item.isActive
                            ? "bg-white text-black"
                            : "hover:bg-[#232A34] text-[#cfcfd1]",
                        )}
                      >
                        <item.icon
                          className={cn(
                            "h-6 w-6",
                            item.isActive ? "text-black" : "text-[#E8E8E9]",
                          )}
                        />
                      </a>
                    </li>
                  </TooltipTrigger>
                  <TooltipContent
                    className="bg-white text-black text-xs"
                    side="right"
                    sideOffset={8}
                  >
                    <p>
                      {item.icon === ScanSearch
                        ? `${item.label} (To be added soon)`
                        : item.label}
                    </p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </ul>
          <ul>
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <li>
                    <a
                      onClick={() => {
                        router.push("/update_readme");
                      }}
                      className={cn(
                        "w-full flex px-1.5 py-1.5 -mt-2 rounded-md group cursor-pointer",
                        pathname === "/update_readme"
                          ? "bg-white text-black"
                          : "hover:bg-[#232A34] text-[#cfcfd1]",
                      )}
                    >
                      <Image
                        src={"/gitdoc_ai.png"}
                        width={30}
                        height={30}
                        alt="logo"
                      />
                    </a>
                  </li>
                </TooltipTrigger>
                <TooltipContent
                  className="bg-white text-black text-xs"
                  side="right"
                  sideOffset={8}
                >
                  <p>Gitdocs AI</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </ul>
          <ul className="mt-auto">
            <TooltipProvider delayDuration={200}>
              {downMenuItems.map((item, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <li>
                      <a
                        onClick={() => {
                          router.push(item.href);
                        }}
                        className={cn(
                          "w-full flex p-2 mt-3 rounded-md group cursor-pointer",
                          item.isActive
                            ? "bg-white text-black"
                            : "hover:bg-[#232A34] text-[#cfcfd1]",
                        )}
                      >
                        <item.icon
                          className={cn(
                            "h-6 w-6",
                            item.isActive ? "text-black" : "text-[#E8E8E9]",
                          )}
                        />
                      </a>
                    </li>
                  </TooltipTrigger>
                  <TooltipContent
                    className="bg-white text-black text-xs"
                    side="right"
                    sideOffset={8}
                  >
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </ul>
        </nav>

        {/* User Profile Section */}
        <div className="py-4 px-2 border-t border-[#3D444D] bg-[#171717]">
          <div className="flex items-center scale-150 justify-center">
            <SignedOut>
              <SignInButton>
                <div className="h-7 w-7 rounded-full bg-[#3D444D] cursor-pointer flex items-center justify-center">
                  <LuUser size={15} />
                </div>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center gap-3 px-1">
                <div className="flex items-center relative scale-90">
                  <div className="absolute text-[6px] left-1/2 -translate-x-1/2 px-1 z-10 -bottom-1.5 bg-[#18181B] rounded-full border-2 border-[#3D444D]">
                    {storedUser?.subscriptionType || "Free"}
                  </div>
                  <UserButton />
                </div>
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
}
