
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Sun, Moon, LogOut, Globe } from "lucide-react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import ThemeSelector from "@/components/ThemeSelector";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SettingsPage: React.FC = () => {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  if (!user) {
    return null;
  }

  return (
    <div className="pb-16">
      <Header title={t("settings.title")} />
      
      <div className="p-4 space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.photoURL} alt={user.name} />
            <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-6">
          <h3 className="text-lg font-medium">{t("settings.appearance")}</h3>
          
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="theme-toggle">{t("settings.dark_mode")}</Label>
                <p className="text-sm text-muted-foreground">
                  {t("settings.dark_mode.desc")}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4 text-muted-foreground" />
                <Switch
                  id="theme-toggle"
                  checked={theme === "dark"}
                  onCheckedChange={toggleTheme}
                />
                <Moon className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{t("settings.color_theme")}</Label>
                <p className="text-sm text-muted-foreground">
                  {t("settings.color_theme.desc")}
                </p>
              </div>
              <ThemeSelector />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{t("settings.language")}</Label>
                <p className="text-sm text-muted-foreground">
                  {t("settings.language.desc")}
                </p>
              </div>
              <Select
                value={language}
                onValueChange={(value) => setLanguage(value as "en-US" | "pt-BR")}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en-US">
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2" />
                      English
                    </div>
                  </SelectItem>
                  <SelectItem value="pt-BR">
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2" />
                      Português
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-6">
          <h3 className="text-lg font-medium">{t("settings.notifications")}</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="prayer-notifications">{t("settings.prayer_reminders")}</Label>
                <p className="text-sm text-muted-foreground">
                  {t("settings.prayer_reminders.desc")}
                </p>
              </div>
              <Switch id="prayer-notifications" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="group-notifications">{t("settings.group_updates")}</Label>
                <p className="text-sm text-muted-foreground">
                  {t("settings.group_updates.desc")}
                </p>
              </div>
              <Switch id="group-notifications" defaultChecked />
            </div>
          </div>
        </div>
        
        <Separator />
        
        <Button 
          variant="destructive" 
          className="w-full"
          onClick={signOut}
        >
          <LogOut className="h-4 w-4 mr-2" />
          {t("settings.sign_out")}
        </Button>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default SettingsPage;
