
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getPrayerRequestById, togglePrayedToday, updatePrayerRequestReminder, PrayerRequest } from "@/services/dataService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Clock, Moon, CalendarDays, Users, Bell, BellOff } from "lucide-react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { toast } from "@/components/ui/sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const PrayerDetailPage: React.FC = () => {
  const { prayerId } = useParams<{ prayerId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  
  const [prayer, setPrayer] = useState<PrayerRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [reminderTime, setReminderTime] = useState<string>("");
  const [isUpdatingReminder, setIsUpdatingReminder] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!prayerId) return;
        
        const prayerData = await getPrayerRequestById(prayerId);
        if (prayerData) {
          setPrayer(prayerData);
          if (prayerData.reminderTime) {
            setReminderTime(prayerData.reminderTime);
          }
        }
      } catch (error) {
        console.error("Failed to load prayer data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [prayerId]);
  
  const handlePrayedToday = async () => {
    if (!user || !prayer) return;
    
    try {
      const updatedPrayer = await togglePrayedToday(prayer.id, user.id);
      setPrayer(updatedPrayer);
      
      const hasAlreadyPrayed = prayer.prayedToday.includes(user.id);
      if (!hasAlreadyPrayed) {
        toast(t("prayer.prayed_recorded"));
      }
    } catch (error) {
      toast(t("prayer.prayed_error"));
    }
  };
  
  const handleSetReminder = async () => {
    if (!prayer) return;
    
    try {
      setIsUpdatingReminder(true);
      const updatedPrayer = await updatePrayerRequestReminder(
        prayer.id, 
        reminderTime || undefined
      );
      
      setPrayer(updatedPrayer);
      toast(t("prayer_detail.reminder_updated"));
    } catch (error) {
      toast(t("prayer_detail.reminder_error"));
    } finally {
      setIsUpdatingReminder(false);
    }
  };
  
  const clearReminder = async () => {
    if (!prayer) return;
    
    try {
      setIsUpdatingReminder(true);
      const updatedPrayer = await updatePrayerRequestReminder(prayer.id, undefined);
      
      setPrayer(updatedPrayer);
      setReminderTime("");
      toast(t("prayer_detail.reminder_cleared"));
    } catch (error) {
      toast(t("prayer_detail.reminder_clear_error"));
    } finally {
      setIsUpdatingReminder(false);
    }
  };
  
  const getTypeIcon = () => {
    if (!prayer) return null;
    
    switch (prayer.type) {
      case 'fast':
        return <CalendarDays className="h-5 w-5" />;
      case 'nightPrayer':
        return <Moon className="h-5 w-5" />;
      default:
        return <Heart className="h-5 w-5" />;
    }
  };
  
  const getTypeLabel = () => {
    if (!prayer) return "";
    
    switch (prayer.type) {
      case 'fast':
        return t("prayer.type_fast");
      case 'nightPrayer':
        return t("prayer.type_night");
      default:
        return t("prayer.type_prayer");
    }
  };

  if (!user) {
    return null;
  }
  
  if (loading) {
    return (
      <div className="pb-16">
        <Header title="prayer_detail.loading" showBackButton />
        <div className="p-4">
          <div className="animate-pulse space-y-4">
            <div className="h-16 bg-muted rounded w-3/4"></div>
            <div className="h-32 bg-muted rounded w-full"></div>
            <div className="h-32 bg-muted rounded w-full"></div>
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }
  
  if (!prayer) {
    return (
      <div className="pb-16">
        <Header title="prayer_detail.error" showBackButton />
        <div className="p-4 text-center">
          <p className="text-lg text-muted-foreground">{t("prayer_detail.not_found")}</p>
          <Button 
            onClick={() => navigate(-1)} 
            variant="link"
            className="mt-4"
          >
            {t("prayer_detail.go_back")}
          </Button>
        </div>
        <BottomNavigation />
      </div>
    );
  }
  
  const hasPrayed = user && prayer.prayedToday.includes(user.id);

  return (
    <div className="pb-16">
      <Header title="prayer_detail.title" showBackButton />
      
      <div className="p-4">
        <div className="flex items-center mb-2">
          <Badge className="mr-2" variant={prayer.type === 'prayer' ? 'default' : prayer.type === 'fast' ? 'secondary' : 'outline'}>
            <span className="flex items-center">
              {getTypeIcon()}
              <span className="ml-1">{getTypeLabel()}</span>
            </span>
          </Badge>
          <span className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(prayer.createdAt), { addSuffix: true })}
          </span>
        </div>
        
        <h1 className="text-2xl font-bold mb-4">{prayer.title}</h1>
        
        <p className="mb-6 text-foreground/90">{prayer.description}</p>
        
        <div className="grid grid-cols-1 gap-6 mb-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">{t("prayer_detail.prayer_status")}</h2>
            
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>
                    {prayer.prayedToday.length} {prayer.prayedToday.length !== 1 ? t("prayer_detail.people_plural") : t("prayer_detail.person")} {t("prayer_detail.prayed_today")}
                  </span>
                </div>
                
                <Button 
                  variant={hasPrayed ? "default" : "outline"}
                  className={`${hasPrayed ? 'bg-primary text-primary-foreground' : ''}`}
                  onClick={handlePrayedToday}
                >
                  <Heart className={`h-4 w-4 mr-1 ${hasPrayed ? 'fill-current' : ''}`} />
                  {hasPrayed ? t("prayer.prayed") : t("prayer.pray")}
                </Button>
              </div>
              
              {prayer.type === 'fast' && prayer.endDate && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  <span>{t("prayer_detail.fasting_until")} {new Date(prayer.endDate).toLocaleDateString()}</span>
                </div>
              )}
              
              {prayer.type === 'nightPrayer' && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Moon className="h-4 w-4 mr-2" />
                  <span>{t("prayer_detail.night_commitment")}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">{t("prayer_detail.prayer_reminder")}</h2>
            
            <div className="bg-card border border-border rounded-lg p-4">
              {prayer.reminderTime ? (
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Bell className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span>{t("prayer_detail.reminder_set")} {prayer.reminderTime}</span>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={clearReminder}
                    disabled={isUpdatingReminder}
                  >
                    <BellOff className="h-4 w-4 mr-1" />
                    {t("prayer_detail.clear")}
                  </Button>
                </div>
              ) : (
                <p className="text-muted-foreground mb-4">{t("prayer_detail.no_reminder")}</p>
              )}
              
              <div className="flex space-x-2">
                <Input
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSetReminder} 
                  disabled={isUpdatingReminder || !reminderTime}
                >
                  {isUpdatingReminder ? t("prayer_detail.updating") : t("prayer_detail.set_reminder")}
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => navigate(`/group/${prayer.groupId}`)}
        >
          {t("prayer_detail.back_to_group")}
        </Button>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default PrayerDetailPage;
