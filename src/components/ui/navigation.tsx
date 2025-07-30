import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Heart, Users, FileText, Brain, AlertTriangle, Settings, LogOut, Activity, Home, User, Menu, Calendar } from "lucide-react";
import { UserRole } from "@/types/auth";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar
} from "./sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  userRole: UserRole;
}

export const Navigation = ({ activeTab, onTabChange, onLogout, userRole }: NavigationProps) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const getNavItems = () => {
    const baseItems = [
      { id: "dashboard", label: "Tableau de bord", icon: Heart },
      { id: "settings", label: "Paramètres", icon: Settings },
    ];

    switch (userRole) {
      case "medecin":
        return [
          { id: "dashboard", label: "Tableau de bord", icon: Heart },
          { id: "patients", label: "Patients", icon: Users },
          { id: "rendezvous", label: "Rendez-vous", icon: Calendar },
          { id: "dossiers", label: "Dossiers", icon: FileText },
          { id: "diagnostic", label: "IA Diagnostic", icon: Brain },
          { id: "interactions", label: "Interactions", icon: AlertTriangle },
          { id: "settings", label: "Paramètres", icon: Settings },
        ];
      
      case "infirmier":
        return [
          { id: "dashboard", label: "Tableau de bord", icon: Heart },
          { id: "patients", label: "Patients", icon: Users },
          { id: "dossiers", label: "Dossiers", icon: FileText },
          { id: "soins", label: "Soins", icon: Activity },
          { id: "settings", label: "Paramètres", icon: Settings },
        ];
      
      case "admin":
        return [
          { id: "dashboard", label: "Tableau de bord", icon: Heart },
          { id: "patients", label: "Patients", icon: Users },
          { id: "rendezvous", label: "Rendez-vous", icon: Calendar },
          { id: "dossiers", label: "Dossiers", icon: FileText },
          { id: "interactions", label: "Interactions", icon: AlertTriangle },
          { id: "settings", label: "Paramètres", icon: Settings },
        ];
      
      case "patient":
        return [
          { id: "dashboard", label: "Mon Espace", icon: Home },
          { id: "consultations", label: "Mes Consultations", icon: FileText },
          { id: "informations", label: "Mes Informations", icon: User },
          { id: "settings", label: "Paramètres", icon: Settings },
        ];
      
      default:
        return baseItems;
    }
  };

  const navItems = getNavItems();

  return (
    <TooltipProvider>
      {/* Mobile Header with Sidebar Toggle */}
      <div className="flex md:hidden items-center justify-between p-4 border-b bg-card/50 backdrop-blur">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="h-8 w-8" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-medical-blue to-medical-dark rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-lg font-bold text-foreground">FER MediDoc AI</h1>
          </div>
        </div>
      </div>

      <Sidebar variant="inset" className="border-r-0" collapsible="icon">
        <SidebarHeader className="border-b border-border p-4">
          {/* Desktop Header with Toggle */}
          <div className="flex items-center justify-between">
            <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
              <div className="w-8 h-8 bg-gradient-to-br from-medical-blue to-medical-dark rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="text-lg font-bold text-foreground">FER MediDoc AI</h1>
                  <p className="text-xs text-muted-foreground">Assistant Médical</p>
                </div>
              )}
            </div>
            <SidebarTrigger className={cn("h-6 w-6 transition-all", isCollapsed && "mx-auto")} />
          </div>
        </SidebarHeader>

        <SidebarContent className="p-2">
          <SidebarMenu className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <SidebarMenuItem key={item.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        onClick={() => onTabChange(item.id)}
                        isActive={activeTab === item.id}
                        className={cn(
                          "w-full justify-start gap-3 h-10 transition-all",
                          activeTab === item.id 
                            ? "bg-primary text-primary-foreground shadow-md" 
                            : "hover:bg-accent",
                          isCollapsed && "justify-center px-2",
                          isCollapsed && activeTab === item.id && "ring-2 ring-primary/20"
                        )}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        {!isCollapsed && <span>{item.label}</span>}
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    {isCollapsed && (
                      <TooltipContent side="right" className="font-medium">
                        {item.label}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="p-2 border-t border-border">
          <SidebarMenu>
            <SidebarMenuItem>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton
                    onClick={onLogout}
                    className={cn(
                      "w-full justify-start gap-3 h-10 text-destructive hover:bg-destructive/10",
                      isCollapsed && "justify-center px-2"
                    )}
                  >
                    <LogOut className="w-4 h-4 flex-shrink-0" />
                    {!isCollapsed && <span>Déconnexion</span>}
                  </SidebarMenuButton>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right" className="font-medium">
                    Déconnexion
                  </TooltipContent>
                )}
              </Tooltip>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  );
};