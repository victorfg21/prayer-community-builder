
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
import { useLanguage } from "@/contexts/LanguageContext";

const CreateGroupPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    if (!name.trim()) {
      toast(t("create_group.name") + " " + t("create_group.required"));
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
      
      toast(t("create_group.success"));
      navigate(`/group/${newGroup.id}`);
    } catch (error) {
      toast(t("create_group.error"));
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
      <Header title="create_group.title" showBackButton />
      
      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">{t("create_group.name")}</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("create_group.name_placeholder")}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">{t("create_group.description")}</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("create_group.description_placeholder")}
              rows={4}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="imageUrl">{t("create_group.image_url")}</Label>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder={t("create_group.image_url_placeholder")}
            />
            <p className="text-xs text-muted-foreground">
              {t("create_group.image_hint")}
            </p>
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting || !name.trim()}
          >
            {isSubmitting ? t("create_group.creating") : t("create_group.button")}
          </Button>
        </form>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default CreateGroupPage;
