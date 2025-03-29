
import { useAuth } from "@/contexts/AuthContext";
import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import MobileContainer from "@/components/MobileContainer";

const Callback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { signInWithGoogleCallback, isDemoMode } = useAuth();

  useEffect(() => {
    // If in demo mode, just navigate to home
    if (isDemoMode) {
      navigate("/");
      return;
    }
    
    const handleCallback = async () => {
      const token = searchParams.get("token");
      if (token) {
        await signInWithGoogleCallback(token);
        localStorage.setItem("accessToken", token);
        toast.success("Login realizado com sucesso!");
        navigate("/");
      } else {
        toast.error("Erro ao autenticar. Tente novamente.");
        navigate("/login");
      }
    };

    handleCallback();
  }, [searchParams, navigate, isDemoMode]);

  return (
    <MobileContainer>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6">
          <div className="animate-pulse mb-4">
            <div className="h-8 w-8 mx-auto rounded-full bg-primary/30"></div>
          </div>
          <p className="text-muted-foreground">Processando autenticação...</p>
        </div>
      </div>
    </MobileContainer>
  );
};

export default Callback;
