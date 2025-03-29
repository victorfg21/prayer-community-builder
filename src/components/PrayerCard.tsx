
import React from "react";
import { Heart, Clock, Moon, CalendarDays } from "lucide-react";
import { PrayerRequest } from "@/services/dataService";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { togglePrayedToday } from "@/services/dataService";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { toast } from "@/components/ui/sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface PrayerCardProps {
  prayer: PrayerRequest;
  onUpdate: () => void;
}

const PrayerCard: React.FC<PrayerCardProps> = ({ prayer, onUpdate }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const handlePrayedToday = async () => {
    if (!user) return;
    
    try {
      await togglePrayedToday(prayer.id, user.id);
      onUpdate();
      
      const hasAlreadyPrayed = prayer.prayedToday.includes(user.id);
      if (!hasAlreadyPrayed) {
        toast(t("prayer.prayed_recorded"));
      }
    } catch (error) {
      toast(t("prayer.prayed_error"));
    }
  };
  
  const getTypeIcon = () => {
    switch (prayer.type) {
      case 'fast':
        return <CalendarDays className="h-4 w-4" />;
      case 'nightPrayer':
        return <Moon className="h-4 w-4" />;
      default:
        return <Heart className="h-4 w-4" />;
    }
  };
  
  const getTypeLabel = () => {
    switch (prayer.type) {
      case 'fast':
        return t("prayer.type_fast");
      case 'nightPrayer':
        return t("prayer.type_night");
      default:
        return t("prayer.type_prayer");
    }
  };
  
  const hasPrayed = user && prayer.prayedToday.includes(user.id);
  
  return (
    <Card className={`shadow-sm transition-all ${hasPrayed ? 'border-primary/30' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium">{prayer.title}</CardTitle>
          <Badge variant={prayer.type === 'prayer' ? 'default' : prayer.type === 'fast' ? 'secondary' : 'outline'} className="ml-2">
            <span className="flex items-center">
              {getTypeIcon()}
              <span className="ml-1">{getTypeLabel()}</span>
            </span>
          </Badge>
        </div>
        <div className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(prayer.createdAt), { addSuffix: true })}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground/90">{prayer.description}</p>
        
        {prayer.reminderTime && (
          <div className="flex items-center mt-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            <span>{t("prayer.reminder_at")} {prayer.reminderTime}</span>
          </div>
        )}
        
        {prayer.endDate && (
          <div className="flex items-center mt-2 text-xs text-muted-foreground">
            <CalendarDays className="h-3 w-3 mr-1" />
            <span>{t("prayer.until")} {new Date(prayer.endDate).toLocaleDateString()}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-1 flex justify-between">
        <div className="text-xs text-muted-foreground">
          {prayer.prayedToday.length} {prayer.prayedToday.length !== 1 ? t("prayer.prayers_plural") : t("prayer.prayers_singular")} {t("prayer.today")}
        </div>
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant={hasPrayed ? "default" : "outline"}
            className={`${hasPrayed ? 'bg-primary text-primary-foreground' : ''}`}
            onClick={handlePrayedToday}
          >
            <Heart className={`h-4 w-4 mr-1 ${hasPrayed ? 'fill-current' : ''}`} />
            {hasPrayed ? t("prayer.prayed") : t("prayer.pray")}
          </Button>
          
          <Button
            size="sm"
            variant="ghost"
            onClick={() => navigate(`/prayer/${prayer.id}`)}
          >
            {t("prayer.details")}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PrayerCard;
