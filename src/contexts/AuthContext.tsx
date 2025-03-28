
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "@/components/ui/sonner";
import axios from "axios";

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
  signInWithGoogleCallback: (token: string) => Promise<void>;
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

    setLoading(false);
  }, []);

  const signInWithGoogle = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
    const scope = "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline`;

    window.location.href = authUrl;
  };

  const signInWithGoogleCallback = async (token: string) => {
    setLoading(true);

    const userInfo = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const user: User = {
      id: userInfo.data.sub,
      name: userInfo.data.name,
      email: userInfo.data.email,
      photoURL: userInfo.data.picture
    };

    setUser(user);
    localStorage.setItem("oremus-user", JSON.stringify(user));
    setLoading(false);
  };


  const signOut = () => {
    setUser(null);
    localStorage.removeItem("oremus-user");
    toast("You have been signed out");
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut, signInWithGoogleCallback }}>
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
