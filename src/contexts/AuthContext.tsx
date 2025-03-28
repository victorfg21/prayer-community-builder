
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "@/components/ui/sonner";

// Mock user data interface
export interface User {
  id: string;
  name: string;
  email: string;
  photoURL: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for previously saved user
    const savedUser = localStorage.getItem("oremus-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    // Simulate auth initialization delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const signInWithGoogle = () => {
    // Mock Google sign-in
    setLoading(true);
    
    // Simulate auth delay
    setTimeout(() => {
      const mockUser: User = {
        id: "google-user-123",
        name: "John Doe",
        email: "john.doe@example.com",
        photoURL: "https://randomuser.me/api/portraits/men/32.jpg"
      };
      
      setUser(mockUser);
      localStorage.setItem("oremus-user", JSON.stringify(mockUser));
      setLoading(false);
      toast("You are now signed in!");
    }, 1500);
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("oremus-user");
    toast("You have been signed out");
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
