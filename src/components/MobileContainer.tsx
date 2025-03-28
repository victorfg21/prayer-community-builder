
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface MobileContainerProps {
  children: React.ReactNode;
}

const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
  const { language } = useLanguage();
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="mobile-container bg-background" lang={language}>
        <div className="mobile-screen no-scrollbar mobile-safe-area">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MobileContainer;
