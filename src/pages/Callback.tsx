import { useAuth } from "@/contexts/AuthContext";
import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Callback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { signInWithGoogleCallback } = useAuth();

  useEffect(() => {
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
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Processando autenticação...</p>
    </div>
  );
};

export default Callback;