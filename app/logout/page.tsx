"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    // Clear localStorage
    localStorage.removeItem("storedUser");
    localStorage.removeItem("repositories");
    localStorage.removeItem("staleTime");
    localStorage.removeItem("numRepositories");

    // Redirect to home page
    router.push("/");
  }, [router]); // Dependency array ensures this runs only once

  return (
    <div className="h-screen w-full flex items-center justify-center text-[#746f6f] bg-[#0D0D0D]">
      Closing this window...
    </div>
  );
};

export default Logout;
