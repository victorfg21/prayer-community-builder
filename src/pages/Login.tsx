
import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import MobileContainer from "@/components/MobileContainer";
import { Heart } from "lucide-react";

const Login: React.FC = () => {
  const { user, loading, signInWithGoogle } = useAuth();
  
  // Redirect if already logged in
  if (user && !loading) {
    return <Navigate to="/" />;
  }

  return (
    <MobileContainer>
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-md flex flex-col items-center">
          <div className="mb-8 text-center animate-float">
            <div className="bg-primary/10 text-primary p-4 rounded-full inline-block mb-4">
              <Heart size={40} className="animate-pulse-gentle" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Oremus</h1>
            <p className="text-xl text-muted-foreground">
              Unite in prayer, grow in faith
            </p>
          </div>

          <div className="w-full space-y-6 mb-8">
            <div className="bg-card text-card-foreground border border-border p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Welcome to Oremus</h2>
              <p className="text-muted-foreground mb-6">
                Join our prayer community to share, support, and grow together in faith.
              </p>
              
              <Button
                onClick={signInWithGoogle}
                disabled={loading}
                className="w-full"
                size="lg"
              >
                {loading ? "Signing in..." : "Sign in with Google"}
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p>By continuing, you agree to our Terms of Service and Privacy Policy.</p>
            </div>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
};

export default Login;
