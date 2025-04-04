
import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  rightElement?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  rightElement,
}) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between h-14 px-4 border-b border-border bg-background">
      <div className="flex items-center">
        {showBackButton && (
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 text-foreground"
            onClick={() => navigate(-1)}
            aria-label={t("nav.back")}
          >
            <ArrowLeft size={20} />
          </Button>
        )}
        <h1 className="text-lg font-semibold">{t(title)}</h1>
      </div>
      {rightElement && <div>{rightElement}</div>}
    </div>
  );
};

export default Header;
