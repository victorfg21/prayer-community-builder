
import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import MobileContainer from "@/components/MobileContainer";
import { Heart, Eye } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Login: React.FC = () => {
  const { user, loading, signInWithGoogle, enterDemoMode } = useAuth();
  const { t } = useLanguage();
  
  // Redirect if already logged in
  if (user && !loading) {
    return <Navigate to="/" />;
  }

  return (
    <MobileContainer>
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30">
        <div className="w-full max-w-md flex flex-col items-center">
          <div className="mb-8 text-center animate-float">
            <div className="bg-primary/10 text-primary p-5 rounded-full inline-block mb-6 shadow-sm border border-primary/5">
              <Heart size={40} className="animate-pulse-gentle" />
            </div>
            <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              {t("app.name")}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t("app.tagline") || "Unite in prayer, grow in faith"}
            </p>
          </div>

          <div className="w-full space-y-6 mb-8">
            <div className="card-soft p-6 rounded-xl bg-white/80 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-4">{t("login.welcome") || "Welcome to Oremus"}</h2>
              <p className="text-muted-foreground mb-6">
                {t("login.description") || "Join our prayer community to share, support, and grow together in faith."}
              </p>
              
              <Button
                onClick={signInWithGoogle}
                disabled={loading}
                className="w-full shadow-sm"
                size="lg"
              >
                {loading ? t("login.signing_in") || "Signing in..." : t("login.sign_in") || "Sign in with Google"}
              </Button>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-muted"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white/90 px-2 text-muted-foreground">ou</span>
                </div>
              </div>
              
              <Button
                onClick={enterDemoMode}
                variant="outline"
                className="w-full"
              >
                <Eye size={18} className="mr-2" />
                Modo de demonstração
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p>{t("login.terms") || "By continuing, you agree to our Terms of Service and Privacy Policy."}</p>
            </div>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
};

export default Login;
