
import React from "react";
import { Check, Circle } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const THEMES = [
  { name: "Blue", value: "blue", color: "bg-blue-500" },
  { name: "Purple", value: "purple", color: "bg-purple-500" },
  { name: "Green", value: "green", color: "bg-green-500" },
  { name: "Amber", value: "amber", color: "bg-amber-500" },
  { name: "Rose", value: "rose", color: "bg-rose-500" },
];

const ThemeSelector: React.FC = () => {
  const { colorTheme, setColorTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 h-9 shadow-sm border-border/60">
          <div className={cn("h-4 w-4 rounded-full", {
            "bg-blue-500 shadow-sm shadow-blue-200": colorTheme === "blue",
            "bg-purple-500 shadow-sm shadow-purple-200": colorTheme === "purple",
            "bg-green-500 shadow-sm shadow-green-200": colorTheme === "green",
            "bg-amber-500 shadow-sm shadow-amber-200": colorTheme === "amber",
            "bg-rose-500 shadow-sm shadow-rose-200": colorTheme === "rose",
          })}></div>
          <span className="capitalize">{colorTheme}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2 shadow-lg border-border/60" align="end">
        <div className="space-y-1">
          {THEMES.map((theme) => (
            <Button
              key={theme.value}
              variant="ghost"
              className="w-full justify-start hover:bg-accent/50"
              onClick={() => setColorTheme(theme.value as any)}
            >
              <div className="flex items-center gap-2 w-full">
                <div className={`h-4 w-4 rounded-full shadow-sm ${
                  theme.value === 'blue' ? 'bg-blue-500 shadow-blue-200' : 
                  theme.value === 'purple' ? 'bg-purple-500 shadow-purple-200' : 
                  theme.value === 'green' ? 'bg-green-500 shadow-green-200' : 
                  theme.value === 'amber' ? 'bg-amber-500 shadow-amber-200' : 
                  'bg-rose-500 shadow-rose-200'
                }`}></div>
                <span>{theme.name}</span>
                {colorTheme === theme.value && (
                  <Check className="h-4 w-4 ml-auto text-primary" />
                )}
              </div>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeSelector;
