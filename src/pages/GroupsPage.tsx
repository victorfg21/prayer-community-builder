
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGroups, PrayerGroup } from "@/services/dataService";
import { Input } from "@/components/ui/input";
import { Search, PlusCircle } from "lucide-react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import GroupCard from "@/components/GroupCard";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const GroupsPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [groups, setGroups] = useState<PrayerGroup[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<PrayerGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadGroups = async () => {
      try {
        const data = await getGroups();
        setGroups(data);
        setFilteredGroups(data);
      } catch (error) {
        console.error("Failed to load groups:", error);
      } finally {
        setLoading(false);
      }
    };

    loadGroups();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredGroups(groups);
    } else {
      const filtered = groups.filter(
        (group) =>
          group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          group.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredGroups(filtered);
    }
  }, [searchQuery, groups]);

  return (
    <div className="pb-16">
      <Header
        title="groups.title"
        rightElement={
          <Button
            size="icon"
            variant="ghost"
            onClick={() => navigate("/create")}
          >
            <PlusCircle size={20} />
          </Button>
        }
      />

      <div className="p-4">
        <div className="mb-4 relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder={t("groups.search")}
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-pulse flex flex-col space-y-4 w-full">
              <div className="h-32 bg-muted rounded w-full"></div>
              <div className="h-32 bg-muted rounded w-full"></div>
              <div className="h-32 bg-muted rounded w-full"></div>
            </div>
          </div>
        ) : filteredGroups.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-2">{t("groups.no_groups")}</p>
            <Button 
              variant="link" 
              onClick={() => navigate("/create")}
            >
              {t("groups.create_new")}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default GroupsPage;
