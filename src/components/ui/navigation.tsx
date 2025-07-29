import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Heart, Users, FileText, Brain, AlertTriangle, Settings, LogOut } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

export const Navigation = ({ activeTab, onTabChange, onLogout }: NavigationProps) => {
  const navItems = [
    { id: "dashboard", label: "Tableau de bord", icon: Heart },
    { id: "patients", label: "Patients", icon: Users },
    { id: "dossiers", label: "Dossiers", icon: FileText },
    { id: "diagnostic", label: "IA Diagnostic", icon: Brain },
    { id: "interactions", label: "Interactions", icon: AlertTriangle },
    { id: "settings", label: "Paramètres", icon: Settings },
  ];

  return (
    <nav className="bg-card border-r border-border h-screen w-64 flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-medical-blue to-medical-dark rounded-lg flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">MediDoc AI</h1>
            <p className="text-sm text-muted-foreground">Assistant Médical</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-12",
                activeTab === item.id 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "hover:bg-accent"
              )}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Button>
          );
        })}
      </div>

      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-12 text-destructive hover:bg-destructive/10"
          onClick={onLogout}
        >
          <LogOut className="w-5 h-5" />
          Déconnexion
        </Button>
      </div>
    </nav>
  );
};