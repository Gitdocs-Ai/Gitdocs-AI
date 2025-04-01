"use client";
import { useEffect } from "react";

const QuitPage = () => {
  useEffect(() => {
    const quitWindow = setTimeout(() => {
      window.close();
    }, 1);

    return () => clearTimeout(quitWindow);
  });

  return (
    <div className="h-screen w-full flex items-center justify-center text-[#746f6f] bg-[#0D0D0D]">
      Closing this window...
    </div>
  );
};
export default QuitPage;
