
import React from "react";
import { Check, Circle } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const THEMES = [
  { name: "Blue", value: "blue", color: "bg-theme-blue-DEFAULT" },
  { name: "Purple", value: "purple", color: "bg-theme-purple-DEFAULT" },
  { name: "Green", value: "green", color: "bg-theme-green-DEFAULT" },
  { name: "Amber", value: "amber", color: "bg-theme-amber-DEFAULT" },
  { name: "Rose", value: "rose", color: "bg-theme-rose-DEFAULT" },
];

const ThemeSelector: React.FC = () => {
  const { colorTheme, setColorTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 h-9">
          <div className={cn("h-4 w-4 rounded-full", {
            "bg-blue-500": colorTheme === "blue",
            "bg-purple-500": colorTheme === "purple",
            "bg-green-500": colorTheme === "green",
            "bg-amber-500": colorTheme === "amber",
            "bg-rose-500": colorTheme === "rose",
          })}></div>
          <span className="capitalize">{colorTheme}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2" align="end">
        <div className="space-y-1">
          {THEMES.map((theme) => (
            <Button
              key={theme.value}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setColorTheme(theme.value as any)}
            >
              <div className="flex items-center gap-2 w-full">
                <div className={`h-4 w-4 rounded-full ${theme.value === 'blue' ? 'bg-blue-500' : theme.value === 'purple' ? 'bg-purple-500' : theme.value === 'green' ? 'bg-green-500' : theme.value === 'amber' ? 'bg-amber-500' : 'bg-rose-500'}`}></div>
                <span>{theme.name}</span>
                {colorTheme === theme.value && (
                  <Check className="h-4 w-4 ml-auto" />
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
