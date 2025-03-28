
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

const CreatePrayerPage: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
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
      toast("Please enter a prayer title");
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
      
      toast("Prayer request created successfully!");
      navigate(`/group/${groupId}`);
    } catch (error) {
      toast("Failed to create prayer request");
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
      <Header title="Create Prayer Request" showBackButton />
      
      <div className="p-4">
        {groupName && (
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Creating a prayer request for <span className="font-medium text-foreground">{groupName}</span>
            </p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Prayer Title*</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter prayer title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your prayer request"
              rows={4}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Prayer Type</Label>
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
                    <span className="font-medium">Prayer Request</span>
                    <p className="text-xs text-muted-foreground">
                      A regular prayer request for support
                    </p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-3">
                <RadioGroupItem value="fast" id="fast" />
                <Label htmlFor="fast" className="flex items-center cursor-pointer">
                  <CalendarDays className="h-4 w-4 mr-2 text-primary" />
                  <div>
                    <span className="font-medium">Fasting Prayer</span>
                    <p className="text-xs text-muted-foreground">
                      A prayer accompanied by fasting
                    </p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-3">
                <RadioGroupItem value="nightPrayer" id="nightPrayer" />
                <Label htmlFor="nightPrayer" className="flex items-center cursor-pointer">
                  <Moon className="h-4 w-4 mr-2 text-primary" />
                  <div>
                    <span className="font-medium">Night Prayer</span>
                    <p className="text-xs text-muted-foreground">
                      Prayer during night hours
                    </p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reminderTime">Reminder Time (optional)</Label>
            <Input
              id="reminderTime"
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Set a daily reminder time for this prayer
            </p>
          </div>
          
          {prayerType === "fast" && (
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date (optional)</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Set an end date for the fasting period
              </p>
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting || !title.trim()}
          >
            {isSubmitting ? "Creating..." : "Create Prayer Request"}
          </Button>
        </form>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default CreatePrayerPage;
