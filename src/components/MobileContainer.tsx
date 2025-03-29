
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface MobileContainerProps {
  children: React.ReactNode;
}

const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
  const { language } = useLanguage();
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50/70 to-violet-50 dark:from-slate-900 dark:via-indigo-950/30 dark:to-slate-900 p-4">
      <div className="mobile-container bg-gradient-to-b from-background to-background/95 shadow-xl shadow-black/5 dark:shadow-primary/5 border border-white/20 dark:border-slate-800/80" lang={language}>
        <div className="mobile-screen no-scrollbar mobile-safe-area overflow-hidden">
          {children}
        </div>
        <div className="absolute top-3 left-1/2 -translate-x-1/2 h-1 w-16 bg-black/10 dark:bg-white/15 rounded-full"></div>
      </div>
      
      <style jsx="true">{`
        .mobile-container {
          position: relative;
          width: 100%;
          max-width: 390px;
          height: 100%;
          max-height: 844px;
          overflow: hidden;
          border-radius: 40px;
        }
        
        .mobile-screen {
          position: relative;
          height: 100%;
          width: 100%;
          overflow-y: auto;
        }
        
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .mobile-safe-area {
          padding-top: env(safe-area-inset-top, 0px);
          padding-bottom: env(safe-area-inset-bottom, 0px);
        }
        
        @media (max-width: 390px) {
          .mobile-container {
            border-radius: 0;
            max-height: 100vh;
          }
        }
      `}</style>
    </div>
  );
};

export default MobileContainer;
