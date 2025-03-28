
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { createGroup } from "@/services/dataService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { toast } from "@/components/ui/sonner";

const CreateGroupPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    if (!name.trim()) {
      toast("Please enter a group name");
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const newGroup = await createGroup({
        name,
        description,
        createdBy: user.id,
        imageUrl: imageUrl || undefined
      });
      
      toast("Prayer group created successfully!");
      navigate(`/group/${newGroup.id}`);
    } catch (error) {
      toast("Failed to create group");
      console.error("Error creating group:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="pb-16">
      <Header title="Create Prayer Group" showBackButton />
      
      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Group Name*</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter group name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the purpose of your prayer group"
              rows={4}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL (optional)</Label>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter an image URL for your group"
            />
            <p className="text-xs text-muted-foreground">
              Enter a URL to an image that represents your group
            </p>
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting || !name.trim()}
          >
            {isSubmitting ? "Creating..." : "Create Prayer Group"}
          </Button>
        </form>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default CreateGroupPage;
