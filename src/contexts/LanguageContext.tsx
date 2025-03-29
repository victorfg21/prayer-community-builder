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
    "nav.create": "Create",
    
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
    "prayer.prayed_recorded": "Your prayer has been recorded. Thank you!",
    "prayer.prayed_error": "Could not update prayer status",
    "prayer.type_prayer": "Prayer",
    "prayer.type_fast": "Fast",
    "prayer.type_night": "Night Prayer",
    "prayer.reminder_at": "Reminder at",
    "prayer.until": "Until",
    "prayer.prayers_singular": "prayer",
    "prayer.prayers_plural": "prayers",
    "prayer.today": "today",
    "prayer.prayed": "Prayed",
    "prayer.pray": "Pray",
    "prayer.details": "Details",
    
    // Errors
    "errors.page_not_found": "Oops! Page not found",
    "errors.return_home": "Return to Home",

    // Create Prayer Page - Additional translations
    "create_prayer.title_required": "Please enter a prayer title",
    "create_prayer.success": "Prayer request created successfully!",
    "create_prayer.error": "Failed to create prayer request",
    
    // Group Detail Page
    "group_detail.prayer_requests": "Prayer Requests",
    "group_detail.new_prayer": "New Prayer",
    "group_detail.tab_all": "All",
    "group_detail.tab_prayers": "Prayers",
    "group_detail.tab_fasts": "Fasts",
    "group_detail.tab_night": "Night",
    "group_detail.no_prayers": "No prayer requests found",
    "group_detail.no_prayers_create": "Create the first prayer request",
    "group_detail.no_prayers_regular": "No prayer requests found",
    "group_detail.no_prayers_create_regular": "Create a prayer request",
    "group_detail.no_fasts": "No fasting prayers found",
    "group_detail.no_fasts_create": "Create a fasting prayer",
    "group_detail.no_night": "No night prayer requests found",
    "group_detail.no_night_create": "Create a night prayer",
    "group_detail.members": "member",
    "group_detail.members_plural": "members",
    "group_detail.group_not_found": "Group not found",
    "group_detail.back_to_groups": "Back to groups",
    "group_detail.loading": "Loading...",

    // Prayer Detail Page
    "prayer_detail.title": "Prayer Details",
    "prayer_detail.loading": "Loading...",
    "prayer_detail.error": "Error",
    "prayer_detail.not_found": "Prayer request not found",
    "prayer_detail.go_back": "Go Back",
    "prayer_detail.prayer_status": "Prayer Status",
    "prayer_detail.prayer_reminder": "Prayer Reminder",
    "prayer_detail.reminder_updated": "Reminder updated successfully",
    "prayer_detail.reminder_error": "Could not update reminder",
    "prayer_detail.reminder_cleared": "Reminder removed",
    "prayer_detail.reminder_clear_error": "Could not remove reminder",
    "prayer_detail.people_plural": "people",
    "prayer_detail.person": "person",
    "prayer_detail.prayed_today": "prayed today",
    "prayer_detail.fasting_until": "Fasting until",
    "prayer_detail.night_commitment": "Night prayer commitment",
    "prayer_detail.reminder_set": "Reminder set for",
    "prayer_detail.clear": "Clear",
    "prayer_detail.no_reminder": "No reminder set for this prayer",
    "prayer_detail.updating": "Updating...",
    "prayer_detail.set_reminder": "Set Reminder",
    "prayer_detail.back_to_group": "Back to Group",
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
    "nav.create": "Criar",
    
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
    "prayer.prayed_recorded": "Sua oração foi registrada. Obrigado!",
    "prayer.prayed_error": "Não foi possível atualizar o status da oração",
    "prayer.type_prayer": "Oração",
    "prayer.type_fast": "Jejum",
    "prayer.type_night": "Oração Noturna",
    "prayer.reminder_at": "Lembrete às",
    "prayer.until": "Até",
    "prayer.prayers_singular": "oração",
    "prayer.prayers_plural": "orações",
    "prayer.today": "hoje",
    "prayer.prayed": "Orei",
    "prayer.pray": "Orar",
    "prayer.details": "Detalhes",
    
    // Errors
    "errors.page_not_found": "Ops! Página não encontrada",
    "errors.return_home": "Voltar para o Início",

    // Create Prayer Page - Additional translations
    "create_prayer.title_required": "Por favor insira um título para a oração",
    "create_prayer.success": "Pedido de oração criado com sucesso!",
    "create_prayer.error": "Falha ao criar pedido de oração",
    
    // Group Detail Page
    "group_detail.prayer_requests": "Pedidos de Oração",
    "group_detail.new_prayer": "Nova Oração",
    "group_detail.tab_all": "Todos",
    "group_detail.tab_prayers": "Orações",
    "group_detail.tab_fasts": "Jejuns",
    "group_detail.tab_night": "Noturna",
    "group_detail.no_prayers": "Nenhum pedido de oração encontrado",
    "group_detail.no_prayers_create": "Criar o primeiro pedido de oração",
    "group_detail.no_prayers_regular": "Nenhum pedido de oração encontrado",
    "group_detail.no_prayers_create_regular": "Criar um pedido de oração",
    "group_detail.no_fasts": "Nenhuma oração com jejum encontrada",
    "group_detail.no_fasts_create": "Criar uma oração com jejum",
    "group_detail.no_night": "Nenhuma oração noturna encontrada",
    "group_detail.no_night_create": "Criar uma oração noturna",
    "group_detail.members": "membro",
    "group_detail.members_plural": "membros",
    "group_detail.group_not_found": "Grupo não encontrado",
    "group_detail.back_to_groups": "Voltar para grupos",
    "group_detail.loading": "Carregando...",

    // Prayer Detail Page
    "prayer_detail.title": "Detalhes da Oração",
    "prayer_detail.loading": "Carregando...",
    "prayer_detail.error": "Erro",
    "prayer_detail.not_found": "Pedido de oração não encontrado",
    "prayer_detail.go_back": "Voltar",
    "prayer_detail.prayer_status": "Status da Oração",
    "prayer_detail.prayer_reminder": "Lembrete de Oração",
    "prayer_detail.reminder_updated": "Lembrete atualizado com sucesso",
    "prayer_detail.reminder_error": "Não foi possível atualizar o lembrete",
    "prayer_detail.reminder_cleared": "Lembrete removido",
    "prayer_detail.reminder_clear_error": "Não foi possível remover o lembrete",
    "prayer_detail.people_plural": "pessoas",
    "prayer_detail.person": "pessoa",
    "prayer_detail.prayed_today": "oraram hoje",
    "prayer_detail.fasting_until": "Jejum até",
    "prayer_detail.night_commitment": "Compromisso de oração noturna",
    "prayer_detail.reminder_set": "Lembrete configurado para",
    "prayer_detail.clear": "Remover",
    "prayer_detail.no_reminder": "Nenhum lembrete configurado para esta oração",
    "prayer_detail.updating": "Atualizando...",
    "prayer_detail.set_reminder": "Definir Lembrete",
    "prayer_detail.back_to_group": "Voltar para o Grupo",
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
