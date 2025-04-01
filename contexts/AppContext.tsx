"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";

interface UsageOverview {
  tokensUsed: number;
  totalTokens: number;
  maxRepositories: number;
  weeklyTokensUsed: {
    day: string;
    tokensUsed: number;
  }[];
  monthlyTokensUsed: {
    month: string;
    tokensUsed: number;
  }[];
}

interface User {
  subscriptionType: string;
  stepsCompleted: number;
  usageOverview: UsageOverview;
}

export interface AppContextType {
  stopAllActions: boolean;
  setStopAllActions: Dispatch<SetStateAction<boolean>>;
  selectedModel: Model;
  setSelectedModel: Dispatch<SetStateAction<Model>>;
  selectedProvider: string;
  setSelectedProvider: Dispatch<SetStateAction<string>>;
  showModel: boolean;
  setShowModel: Dispatch<SetStateAction<boolean>>;
  storedUser: User | null;
  setStoredUser: Dispatch<SetStateAction<User | null>>;
  navbarTitle: string;
  setNavbarTitle: Dispatch<SetStateAction<string>>;
  isSidebarUsed: boolean;
  setIsSidebarUsed: Dispatch<SetStateAction<boolean>>;
  gridView: boolean;
  setGridView: Dispatch<SetStateAction<boolean>>;
  repositoriesUpdated: boolean;
  setRepositoriesUpdated: Dispatch<SetStateAction<boolean>>;
  numRepositories: number;
  setNumRepositories: Dispatch<SetStateAction<number>>;
}

interface Model {
  name: string;
  value: string;
  base_url: string;
}

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [storedUser, setStoredUser] = useState<User | null>(null);
  const [navbarTitle, setNavbarTitle] = useState<string>("");
  const [isSidebarUsed, setIsSidebarUsed] = useState<boolean>(false);
  const [gridView, setGridView] = useState<boolean>(true);
  const [repositoriesUpdated, setRepositoriesUpdated] = useState(false);
  const [showModel, setShowModel] = useState<boolean>(false);
  const [selectedProvider, setSelectedProvider] = useState<string>("Gemini");
  const [selectedModel, setSelectedModel] = useState<Model>({
    name: "Gemini 2.0 Flash",
    value: "gemini-2.0-flash",
    base_url: "https://generativelanguage.googleapis.com/v1beta/openai/",
  });
  const [stopAllActions, setStopAllActions] = useState<boolean>(false);
  const [numRepositories, setNumRepositories] = useState<number>(0);

  useEffect(() => {
    if (localStorage.getItem("gridView")) {
      setGridView(localStorage.getItem("gridView") === "true");
    } else {
      setGridView(true);
    }

    if (localStorage.getItem("numRepositories")) {
      setNumRepositories(
        parseInt(localStorage.getItem("numRepositories") || "0"),
      );
    }

    if (localStorage.getItem("storedUser")) {
      setStoredUser(JSON.parse(localStorage.getItem("storedUser") || "{}"));
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        storedUser,
        setStoredUser,
        navbarTitle,
        setNavbarTitle,
        isSidebarUsed,
        setIsSidebarUsed,
        gridView,
        setGridView,
        repositoriesUpdated,
        setRepositoriesUpdated,
        showModel,
        setShowModel,
        selectedProvider,
        setSelectedProvider,
        selectedModel,
        setSelectedModel,
        stopAllActions,
        setStopAllActions,
        numRepositories,
        setNumRepositories,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
