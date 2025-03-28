
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import GroupsPage from "./pages/GroupsPage";
import GroupDetailPage from "./pages/GroupDetailPage";
import PrayerDetailPage from "./pages/PrayerDetailPage";
import CreateGroupPage from "./pages/CreateGroupPage";
import CreatePrayerPage from "./pages/CreatePrayerPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import MobileContainer from "@/components/MobileContainer";
import { Suspense } from "react";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    
    <Route path="/" element={
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    } />
    
    <Route path="/groups" element={
      <ProtectedRoute>
        <GroupsPage />
      </ProtectedRoute>
    } />
    
    <Route path="/group/:groupId" element={
      <ProtectedRoute>
        <GroupDetailPage />
      </ProtectedRoute>
    } />
    
    <Route path="/prayer/:prayerId" element={
      <ProtectedRoute>
        <PrayerDetailPage />
      </ProtectedRoute>
    } />
    
    <Route path="/create" element={
      <ProtectedRoute>
        <CreateGroupPage />
      </ProtectedRoute>
    } />
    
    <Route path="/create-prayer/:groupId" element={
      <ProtectedRoute>
        <CreatePrayerPage />
      </ProtectedRoute>
    } />
    
    <Route path="/settings" element={
      <ProtectedRoute>
        <SettingsPage />
      </ProtectedRoute>
    } />
    
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <MobileContainer>
                <Suspense fallback={<div>Loading...</div>}>
                  <AppRoutes />
                </Suspense>
              </MobileContainer>
            </BrowserRouter>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
