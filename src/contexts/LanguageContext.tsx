
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
    "app.tagline": "Unite in prayer, grow in faith",
    
    // Navigation
    "nav.home": "Home",
    "nav.groups": "Groups",
    "nav.settings": "Settings",
    "nav.back": "Back",
    
    // Login
    "login.welcome": "Welcome to Oremus",
    "login.description": "Join our prayer community to share, support, and grow together in faith.",
    "login.sign_in": "Sign in with Google",
    "login.signing_in": "Signing in...",
    "login.terms": "By continuing, you agree to our Terms of Service and Privacy Policy.",
    
    // Home Page
    "home.title": "Prayer Dashboard",
    "home.latest": "Latest Prayers",
    "home.view_all": "View All",
    "home.welcome": "Welcome",
    "home.join_create": "Join or create a prayer group to share and support others in prayer.",
    "home.browse_groups": "Browse Groups",
    "home.create_group": "Create Group",
    "home.your_prayer_groups": "Your Prayer Groups",
    "home.no_groups": "You haven't joined any prayer groups yet.",
    "home.browse_available": "Browse available groups",
    
    // Groups Page
    "groups.title": "Prayer Groups",
    "groups.create": "Create Group",
    "groups.join": "Join Group",
    "groups.empty": "You're not part of any groups yet",
    "groups.search": "Search groups...",
    "groups.no_groups": "No groups found",
    "groups.create_new": "Create a new group",
    
    // Create Group Page
    "create_group.title": "Create Prayer Group",
    "create_group.name": "Group Name*",
    "create_group.name_placeholder": "Enter group name",
    "create_group.description": "Description",
    "create_group.description_placeholder": "Describe the purpose of your prayer group",
    "create_group.image_url": "Image URL (optional)",
    "create_group.image_url_placeholder": "Enter an image URL for your group",
    "create_group.image_hint": "Enter a URL to an image that represents your group",
    "create_group.button": "Create Prayer Group",
    "create_group.creating": "Creating...",
    "create_group.success": "Prayer group created successfully!",
    "create_group.error": "Failed to create group",
    "create_group.required": "is required",
    
    // Create Prayer Page
    "create_prayer.title": "Create Prayer Request",
    "create_prayer.for_group": "Creating a prayer request for",
    "create_prayer.prayer_title": "Prayer Title*",
    "create_prayer.title_placeholder": "Enter prayer title",
    "create_prayer.description": "Description",
    "create_prayer.description_placeholder": "Describe your prayer request",
    "create_prayer.type": "Prayer Type",
    "create_prayer.type_prayer": "Prayer Request",
    "create_prayer.type_prayer_desc": "A regular prayer request for support",
    "create_prayer.type_fast": "Fasting Prayer",
    "create_prayer.type_fast_desc": "A prayer accompanied by fasting",
    "create_prayer.type_night": "Night Prayer",
    "create_prayer.type_night_desc": "Prayer during night hours",
    "create_prayer.reminder": "Reminder Time (optional)",
    "create_prayer.reminder_desc": "Set a daily reminder time for this prayer",
    "create_prayer.end_date": "End Date (optional)",
    "create_prayer.end_date_desc": "Set an end date for the fasting period",
    "create_prayer.button": "Create Prayer Request",
    "create_prayer.creating": "Creating...",
    
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
    
    // Errors
    "errors.page_not_found": "Oops! Page not found",
    "errors.return_home": "Return to Home",
  },
  "pt-BR": {
    // General
    "app.name": "Oremus",
    "app.tagline": "Unidos em oração, crescendo na fé",
    
    // Navigation
    "nav.home": "Início",
    "nav.groups": "Grupos",
    "nav.settings": "Configurações",
    "nav.back": "Voltar",
    
    // Login
    "login.welcome": "Bem-vindo ao Oremus",
    "login.description": "Junte-se à nossa comunidade de oração para compartilhar, apoiar e crescer juntos na fé.",
    "login.sign_in": "Entrar com Google",
    "login.signing_in": "Entrando...",
    "login.terms": "Ao continuar, você concorda com nossos Termos de Serviço e Política de Privacidade.",
    
    // Home Page
    "home.title": "Painel de Oração",
    "home.latest": "Orações Recentes",
    "home.view_all": "Ver Todos",
    "home.welcome": "Bem-vindo",
    "home.join_create": "Participe ou crie um grupo de oração para compartilhar e apoiar outros em oração.",
    "home.browse_groups": "Explorar Grupos",
    "home.create_group": "Criar Grupo",
    "home.your_prayer_groups": "Seus Grupos de Oração",
    "home.no_groups": "Você ainda não participa de nenhum grupo de oração.",
    "home.browse_available": "Explorar grupos disponíveis",
    
    // Groups Page
    "groups.title": "Grupos de Oração",
    "groups.create": "Criar Grupo",
    "groups.join": "Entrar em Grupo",
    "groups.empty": "Você ainda não participa de nenhum grupo",
    "groups.search": "Buscar grupos...",
    "groups.no_groups": "Nenhum grupo encontrado",
    "groups.create_new": "Criar um novo grupo",
    
    // Create Group Page
    "create_group.title": "Criar Grupo de Oração",
    "create_group.name": "Nome do Grupo*",
    "create_group.name_placeholder": "Digite o nome do grupo",
    "create_group.description": "Descrição",
    "create_group.description_placeholder": "Descreva o propósito do seu grupo de oração",
    "create_group.image_url": "URL da Imagem (opcional)",
    "create_group.image_url_placeholder": "Digite uma URL de imagem para seu grupo",
    "create_group.image_hint": "Digite uma URL para uma imagem que represente seu grupo",
    "create_group.button": "Criar Grupo de Oração",
    "create_group.creating": "Criando...",
    "create_group.success": "Grupo de oração criado com sucesso!",
    "create_group.error": "Falha ao criar grupo",
    "create_group.required": "é obrigatório",
    
    // Create Prayer Page
    "create_prayer.title": "Criar Pedido de Oração",
    "create_prayer.for_group": "Criando um pedido de oração para",
    "create_prayer.prayer_title": "Título da Oração*",
    "create_prayer.title_placeholder": "Digite o título da oração",
    "create_prayer.description": "Descrição",
    "create_prayer.description_placeholder": "Descreva seu pedido de oração",
    "create_prayer.type": "Tipo de Oração",
    "create_prayer.type_prayer": "Pedido de Oração",
    "create_prayer.type_prayer_desc": "Um pedido regular de oração para apoio",
    "create_prayer.type_fast": "Oração com Jejum",
    "create_prayer.type_fast_desc": "Uma oração acompanhada de jejum",
    "create_prayer.type_night": "Oração Noturna",
    "create_prayer.type_night_desc": "Oração durante as horas noturnas",
    "create_prayer.reminder": "Horário de Lembrete (opcional)",
    "create_prayer.reminder_desc": "Defina um horário diário de lembrete para esta oração",
    "create_prayer.end_date": "Data de Término (opcional)",
    "create_prayer.end_date_desc": "Defina uma data de término para o período de jejum",
    "create_prayer.button": "Criar Pedido de Oração",
    "create_prayer.creating": "Criando...",
    
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
    
    // Errors
    "errors.page_not_found": "Ops! Página não encontrada",
    "errors.return_home": "Voltar para o Início",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageType>(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("oremus-language") as LanguageType;
      if (savedLanguage && (savedLanguage === "en-US" || savedLanguage === "pt-BR")) return savedLanguage;
      
      // Use browser language if available and supported
      const browserLang = navigator.language;
      if (browserLang.startsWith("pt")) return "pt-BR";
    }
    return "en-US"; // default
  });

  const setLanguage = (newLanguage: LanguageType) => {
    setLanguageState(newLanguage);
    localStorage.setItem("oremus-language", newLanguage);
    toast(newLanguage === "en-US" ? "Language changed to English" : "Idioma alterado para Português");
  };

  const t = (key: string): string => {
    if (!key) return '';
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
