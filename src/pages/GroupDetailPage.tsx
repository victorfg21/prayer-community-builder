
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getGroupById, getPrayerRequestsByGroupId, PrayerGroup, PrayerRequest } from "@/services/dataService";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, CalendarDays, Moon, Plus, Users } from "lucide-react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import PrayerCard from "@/components/PrayerCard";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const GroupDetailPage: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  
  const [group, setGroup] = useState<PrayerGroup | null>(null);
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!groupId) return;
        
        const groupData = await getGroupById(groupId);
        if (groupData) {
          setGroup(groupData);
          
          const requests = await getPrayerRequestsByGroupId(groupId);
          setPrayerRequests(requests);
        }
      } catch (error) {
        console.error("Failed to load group data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [groupId]);
  
  const handleCreatePrayer = () => {
    if (groupId) {
      navigate(`/create-prayer/${groupId}`);
    }
  };
  
  const refreshPrayerRequests = async () => {
    if (!groupId) return;
    const requests = await getPrayerRequestsByGroupId(groupId);
    setPrayerRequests(requests);
  };
  
  const filteredPrayerRequests = prayerRequests.filter((prayer) => {
    if (activeTab === "all") return true;
    if (activeTab === "prayers") return prayer.type === "prayer";
    if (activeTab === "fasts") return prayer.type === "fast";
    if (activeTab === "night") return prayer.type === "nightPrayer";
    return true;
  });

  if (!user) {
    return null;
  }
  
  if (loading) {
    return (
      <div className="pb-16">
        <Header title="group_detail.loading" showBackButton />
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
  
  if (!group) {
    return (
      <div className="pb-16">
        <Header title="group_detail.group_not_found" showBackButton />
        <div className="p-4 text-center">
          <p className="text-lg text-muted-foreground">{t("group_detail.group_not_found")}</p>
          <Button 
            onClick={() => navigate('/groups')} 
            variant="link"
            className="mt-4"
          >
            {t("group_detail.back_to_groups")}
          </Button>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="pb-16">
      <Header title={group.name} showBackButton />
      
      <div className="p-4">
        {group.imageUrl && (
          <div className="rounded-lg overflow-hidden h-40 mb-4">
            <img 
              src={group.imageUrl} 
              alt={group.name} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-2">{group.name}</h1>
          <p className="text-muted-foreground">{group.description}</p>
          
          <div className="flex items-center mt-3 text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-1" />
            <span>
              {group.memberCount} {group.memberCount !== 1 ? t("group_detail.members_plural") : t("group_detail.members")}
            </span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{t("group_detail.prayer_requests")}</h2>
          <Button 
            onClick={handleCreatePrayer} 
            size="sm"
          >
            <Plus className="h-4 w-4 mr-1" />
            {t("group_detail.new_prayer")}
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="mb-4" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="all">{t("group_detail.tab_all")}</TabsTrigger>
            <TabsTrigger value="prayers" className="flex items-center justify-center">
              <Heart className="h-3 w-3 mr-1" />
              <span>{t("group_detail.tab_prayers")}</span>
            </TabsTrigger>
            <TabsTrigger value="fasts" className="flex items-center justify-center">
              <CalendarDays className="h-3 w-3 mr-1" />
              <span>{t("group_detail.tab_fasts")}</span>
            </TabsTrigger>
            <TabsTrigger value="night" className="flex items-center justify-center">
              <Moon className="h-3 w-3 mr-1" />
              <span>{t("group_detail.tab_night")}</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            {filteredPrayerRequests.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">{t("group_detail.no_prayers")}</p>
                <Button 
                  onClick={handleCreatePrayer} 
                  variant="link" 
                  className="mt-2"
                >
                  {t("group_detail.no_prayers_create")}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPrayerRequests.map((prayer) => (
                  <PrayerCard key={prayer.id} prayer={prayer} onUpdate={refreshPrayerRequests} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="prayers">
            {filteredPrayerRequests.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">{t("group_detail.no_prayers_regular")}</p>
                <Button 
                  onClick={handleCreatePrayer} 
                  variant="link" 
                  className="mt-2"
                >
                  {t("group_detail.no_prayers_create_regular")}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPrayerRequests.map((prayer) => (
                  <PrayerCard key={prayer.id} prayer={prayer} onUpdate={refreshPrayerRequests} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="fasts">
            {filteredPrayerRequests.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">{t("group_detail.no_fasts")}</p>
                <Button 
                  onClick={handleCreatePrayer} 
                  variant="link" 
                  className="mt-2"
                >
                  {t("group_detail.no_fasts_create")}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPrayerRequests.map((prayer) => (
                  <PrayerCard key={prayer.id} prayer={prayer} onUpdate={refreshPrayerRequests} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="night">
            {filteredPrayerRequests.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">{t("group_detail.no_night")}</p>
                <Button 
                  onClick={handleCreatePrayer} 
                  variant="link" 
                  className="mt-2"
                >
                  {t("group_detail.no_night_create")}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPrayerRequests.map((prayer) => (
                  <PrayerCard key={prayer.id} prayer={prayer} onUpdate={refreshPrayerRequests} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default GroupDetailPage;
