
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Users, PlusCircle, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNavigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center h-16 bg-background border-t border-border w-full max-w-[390px] mx-auto">
      <Link 
        to="/" 
        className={cn(
          "flex flex-col items-center justify-center w-full h-full", 
          isActive("/") ? "text-primary" : "text-muted-foreground"
        )}
      >
        <Home size={22} />
        <span className="text-xs mt-1">Home</span>
      </Link>
      
      <Link 
        to="/groups" 
        className={cn(
          "flex flex-col items-center justify-center w-full h-full", 
          isActive("/groups") ? "text-primary" : "text-muted-foreground"
        )}
      >
        <Users size={22} />
        <span className="text-xs mt-1">Groups</span>
      </Link>
      
      <Link 
        to="/create" 
        className={cn(
          "flex flex-col items-center justify-center w-full h-full", 
          isActive("/create") ? "text-primary" : "text-muted-foreground"
        )}
      >
        <PlusCircle size={22} />
        <span className="text-xs mt-1">Create</span>
      </Link>
      
      <Link 
        to="/settings" 
        className={cn(
          "flex flex-col items-center justify-center w-full h-full", 
          isActive("/settings") ? "text-primary" : "text-muted-foreground"
        )}
      >
        <Settings size={22} />
        <span className="text-xs mt-1">Settings</span>
      </Link>
    </div>
  );
};

export default BottomNavigation;
