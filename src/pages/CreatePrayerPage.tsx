
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { createPrayerRequest, getGroupById } from "@/services/dataService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { toast } from "@/components/ui/sonner";
import { Heart, CalendarDays, Moon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const CreatePrayerPage: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prayerType, setPrayerType] = useState<"prayer" | "fast" | "nightPrayer">("prayer");
  const [reminderTime, setReminderTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [groupName, setGroupName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadGroupInfo = async () => {
      if (!groupId) return;
      
      try {
        const group = await getGroupById(groupId);
        if (group) {
          setGroupName(group.name);
        }
      } catch (error) {
        console.error("Error loading group info:", error);
      }
    };
    
    loadGroupInfo();
  }, [groupId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !groupId) return;
    
    if (!title.trim()) {
      toast(t("create_prayer.title_required"));
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const newPrayer = await createPrayerRequest({
        groupId,
        title,
        description,
        createdBy: user.id,
        type: prayerType,
        reminderTime: reminderTime || undefined,
        endDate: endDate ? new Date(endDate) : undefined
      });
      
      toast(t("create_prayer.success"));
      navigate(`/group/${groupId}`);
    } catch (error) {
      toast(t("create_prayer.error"));
      console.error("Error creating prayer request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="pb-16">
      <Header title="create_prayer.title" showBackButton />
      
      <div className="p-4">
        {groupName && (
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              {t("create_prayer.for_group")} <span className="font-medium text-foreground">{groupName}</span>
            </p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">{t("create_prayer.prayer_title")}</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("create_prayer.title_placeholder")}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">{t("create_prayer.description")}</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("create_prayer.description_placeholder")}
              rows={4}
            />
          </div>
          
          <div className="space-y-2">
            <Label>{t("create_prayer.type")}</Label>
            <RadioGroup
              value={prayerType}
              onValueChange={(value) => setPrayerType(value as "prayer" | "fast" | "nightPrayer")}
              className="grid grid-cols-1 gap-2"
            >
              <div className="flex items-center space-x-2 rounded-md border p-3">
                <RadioGroupItem value="prayer" id="prayer" />
                <Label htmlFor="prayer" className="flex items-center cursor-pointer">
                  <Heart className="h-4 w-4 mr-2 text-primary" />
                  <div>
                    <span className="font-medium">{t("create_prayer.type_prayer")}</span>
                    <p className="text-xs text-muted-foreground">
                      {t("create_prayer.type_prayer_desc")}
                    </p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-3">
                <RadioGroupItem value="fast" id="fast" />
                <Label htmlFor="fast" className="flex items-center cursor-pointer">
                  <CalendarDays className="h-4 w-4 mr-2 text-primary" />
                  <div>
                    <span className="font-medium">{t("create_prayer.type_fast")}</span>
                    <p className="text-xs text-muted-foreground">
                      {t("create_prayer.type_fast_desc")}
                    </p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-3">
                <RadioGroupItem value="nightPrayer" id="nightPrayer" />
                <Label htmlFor="nightPrayer" className="flex items-center cursor-pointer">
                  <Moon className="h-4 w-4 mr-2 text-primary" />
                  <div>
                    <span className="font-medium">{t("create_prayer.type_night")}</span>
                    <p className="text-xs text-muted-foreground">
                      {t("create_prayer.type_night_desc")}
                    </p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reminderTime">{t("create_prayer.reminder")}</Label>
            <Input
              id="reminderTime"
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              {t("create_prayer.reminder_desc")}
            </p>
          </div>
          
          {prayerType === "fast" && (
            <div className="space-y-2">
              <Label htmlFor="endDate">{t("create_prayer.end_date")}</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                {t("create_prayer.end_date_desc")}
              </p>
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting || !title.trim()}
          >
            {isSubmitting ? t("create_prayer.creating") : t("create_prayer.button")}
          </Button>
        </form>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default CreatePrayerPage;
