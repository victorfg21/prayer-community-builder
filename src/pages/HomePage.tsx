
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getGroups, PrayerGroup } from "@/services/dataService";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, Plus, Users } from "lucide-react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import GroupCard from "@/components/GroupCard";
import { useLanguage } from "@/contexts/LanguageContext";

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [groups, setGroups] = useState<PrayerGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGroups = async () => {
      try {
        const data = await getGroups();
        setGroups(data);
      } catch (error) {
        console.error("Failed to load groups:", error);
      } finally {
        setLoading(false);
      }
    };

    loadGroups();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="pb-16">
      <Header 
        title="home.title" 
        rightElement={
          <Button size="icon" variant="ghost">
            <Bell size={20} />
          </Button>
        } 
      />
      
      <div className="p-4">
        <Card className="mb-6 bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <h2 className="font-medium text-lg mb-2">{t("home.welcome")}, {user.name.split(' ')[0]}!</h2>
            <p className="text-sm text-muted-foreground mb-4">
              {t("home.join_create")}
            </p>
            <div className="flex space-x-3">
              <Button 
                size="sm"
                onClick={() => navigate('/groups')}
                variant="outline"
                className="flex-1"
              >
                <Users size={16} className="mr-1" />
                {t("home.browse_groups")}
              </Button>
              <Button 
                size="sm"
                onClick={() => navigate('/create')}
                className="flex-1"
              >
                <Plus size={16} className="mr-1" />
                {t("home.create_group")}
              </Button>
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-pulse flex flex-col space-y-4 w-full">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-32 bg-muted rounded w-full"></div>
              <div className="h-32 bg-muted rounded w-full"></div>
            </div>
          </div>
        ) : (
          <>
            <h2 className="font-semibold text-lg mb-3">{t("home.your_prayer_groups")}</h2>
            {groups.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  {t("home.no_groups")}
                </p>
                <Button 
                  onClick={() => navigate('/groups')} 
                  variant="link" 
                  className="mt-2"
                >
                  {t("home.browse_available")}
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {groups.map((group) => (
                  <GroupCard key={group.id} group={group} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default HomePage;
