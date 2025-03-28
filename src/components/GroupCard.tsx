
import React from "react";
import { Users } from "lucide-react";
import { PrayerGroup } from "@/services/dataService";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface GroupCardProps {
  group: PrayerGroup;
}

const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  const navigate = useNavigate();
  
  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow overflow-hidden"
      onClick={() => navigate(`/group/${group.id}`)}
    >
      {group.imageUrl && (
        <div className="h-32 overflow-hidden">
          <img 
            src={group.imageUrl} 
            alt={group.name} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardContent className={`${group.imageUrl ? 'pt-4' : 'pt-5'}`}>
        <h3 className="font-semibold text-lg mb-1">{group.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{group.description}</p>
      </CardContent>
      <CardFooter className="pt-0 pb-4">
        <div className="flex items-center text-xs text-muted-foreground">
          <Users className="w-3 h-3 mr-1" />
          <span>{group.memberCount} member{group.memberCount !== 1 ? 's' : ''}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default GroupCard;
