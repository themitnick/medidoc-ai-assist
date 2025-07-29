import { useState } from "react";
import { LoginForm } from "@/components/LoginForm";
import { Navigation } from "@/components/ui/navigation";
import { Dashboard } from "@/components/Dashboard";
import { PatientsManager } from "@/components/PatientsManager";
import { AIAssistant } from "@/components/AIAssistant";
import { InteractionsManager } from "@/components/InteractionsManager";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLogin = (credentials: { email: string; password: string }) => {
    // Simple demo authentication
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab("dashboard");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "patients":
        return <PatientsManager />;
      case "diagnostic":
        return <AIAssistant />;
      case "interactions":
        return <InteractionsManager />;
      case "dossiers":
        return <div className="p-6"><h2 className="text-2xl font-bold">Dossiers Médicaux - En développement</h2></div>;
      case "settings":
        return <div className="p-6"><h2 className="text-2xl font-bold">Paramètres - En développement</h2></div>;
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-background">
      <Navigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onLogout={handleLogout} 
      />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
