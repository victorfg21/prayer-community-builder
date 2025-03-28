
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "@/components/ui/sonner";

type LanguageType = "en-US" | "pt-BR";

interface LanguageContextType {
  language: LanguageType;
  setLanguage: (language: LanguageType) => void;
  t: (key: string) => string;
}

const translations = {
  "en-US": {
    // General
    "app.name": "Oremus",
    
    // Navigation
    "nav.home": "Home",
    "nav.groups": "Groups",
    "nav.settings": "Settings",
    
    // Home Page
    "home.title": "Prayer Dashboard",
    "home.latest": "Latest Prayers",
    "home.view_all": "View All",
    
    // Groups Page
    "groups.title": "Prayer Groups",
    "groups.create": "Create Group",
    "groups.join": "Join Group",
    "groups.empty": "You're not part of any groups yet",
    
    // Settings Page
    "settings.title": "Settings",
    "settings.appearance": "Appearance",
    "settings.dark_mode": "Dark Mode",
    "settings.dark_mode.desc": "Switch between light and dark themes",
    "settings.color_theme": "Color Theme",
    "settings.color_theme.desc": "Choose your preferred color theme",
    "settings.language": "Language",
    "settings.language.desc": "Choose your preferred language",
    "settings.notifications": "Notifications",
    "settings.prayer_reminders": "Prayer Reminders",
    "settings.prayer_reminders.desc": "Receive notifications for prayer reminders",
    "settings.group_updates": "Group Updates",
    "settings.group_updates.desc": "Receive notifications for new group prayer requests",
    "settings.sign_out": "Sign Out",
    
    // Prayer Items
    "prayer.create": "New Prayer Request",
    "prayer.title": "Title",
    "prayer.description": "Description",
    "prayer.group": "Group",
    "prayer.created": "Prayer request created",
  },
  "pt-BR": {
    // General
    "app.name": "Oremus",
    
    // Navigation
    "nav.home": "Início",
    "nav.groups": "Grupos",
    "nav.settings": "Configurações",
    
    // Home Page
    "home.title": "Painel de Oração",
    "home.latest": "Orações Recentes",
    "home.view_all": "Ver Todos",
    
    // Groups Page
    "groups.title": "Grupos de Oração",
    "groups.create": "Criar Grupo",
    "groups.join": "Entrar em Grupo",
    "groups.empty": "Você ainda não participa de nenhum grupo",
    
    // Settings Page
    "settings.title": "Configurações",
    "settings.appearance": "Aparência",
    "settings.dark_mode": "Modo Escuro",
    "settings.dark_mode.desc": "Alternar entre temas claro e escuro",
    "settings.color_theme": "Tema de Cor",
    "settings.color_theme.desc": "Escolha seu tema de cor preferido",
    "settings.language": "Idioma",
    "settings.language.desc": "Escolha seu idioma preferido",
    "settings.notifications": "Notificações",
    "settings.prayer_reminders": "Lembretes de Oração",
    "settings.prayer_reminders.desc": "Receber notificações para lembretes de oração",
    "settings.group_updates": "Atualizações de Grupo",
    "settings.group_updates.desc": "Receber notificações para novos pedidos de oração do grupo",
    "settings.sign_out": "Sair",
    
    // Prayer Items
    "prayer.create": "Novo Pedido de Oração",
    "prayer.title": "Título",
    "prayer.description": "Descrição",
    "prayer.group": "Grupo",
    "prayer.created": "Pedido de oração criado",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageType>(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("oremus-language") as LanguageType;
      if (savedLanguage) return savedLanguage;
      
      // Use browser language if available and supported
      const browserLang = navigator.language;
      if (browserLang.startsWith("pt")) return "pt-BR";
    }
    return "en-US"; // default
  });

  const setLanguage = (newLanguage: LanguageType) => {
    setLanguageState(newLanguage);
    localStorage.setItem("oremus-language", newLanguage);
    toast(`${newLanguage === "en-US" ? "Language changed to English" : "Idioma alterado para Português"}`);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
