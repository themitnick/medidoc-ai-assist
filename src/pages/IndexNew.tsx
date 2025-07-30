import { useState } from "react";
import { LoginForm } from "@/components/LoginForm";
import { Navigation } from "@/components/ui/navigation";
import { Dashboard } from "@/components/DashboardByRole";
import { PatientsManager } from "@/components/PatientsManager";
import { AIAssistant } from "@/components/AIAssistant";
import { InteractionsManager } from "@/components/InteractionsManager";
import { DossiersMedicaux } from "@/components/DossiersMedicaux";
import { Parametres } from "@/components/Parametres";
import { PatientPortail } from "@/components/PatientPortail";
import { User } from "@/types/auth";

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLogin = (userData: User) => {
    setUser(userData);
    // Set default tab based on user role
    if (userData.role === "patient") {
      setActiveTab("dashboard");
    } else {
      setActiveTab("dashboard");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab("dashboard");
  };

  const renderContent = () => {
    if (!user) return null;

    // Patient portal
    if (user.role === "patient") {
      switch (activeTab) {
        case "dashboard":
          return <PatientPortail patientId={user.id} />;
        case "consultations":
          return <PatientPortail patientId={user.id} />;
        case "informations":
          return <PatientPortail patientId={user.id} />;
        case "settings":
          return <Parametres userRole={user.role} />;
        default:
          return <PatientPortail patientId={user.id} />;
      }
    }

    // Medical staff portal
    switch (activeTab) {
      case "dashboard":
        return <Dashboard userRole={user.role} />;
      case "patients":
        return <PatientsManager />;
      case "diagnostic":
        return user.role === "medecin" ? <AIAssistant /> : <div className="p-6"><h2 className="text-2xl font-bold">Accès non autorisé</h2></div>;
      case "interactions":
        return (user.role === "medecin" || user.role === "admin") ? <InteractionsManager /> : <div className="p-6"><h2 className="text-2xl font-bold">Accès non autorisé</h2></div>;
      case "dossiers":
        return <DossiersMedicaux userRole={user.role} />;
      case "settings":
        return <Parametres userRole={user.role} />;
      case "soins":
        return user.role === "infirmier" ? <div className="p-6"><h2 className="text-2xl font-bold">Gestion des Soins - En développement</h2></div> : <div className="p-6"><h2 className="text-2xl font-bold">Accès non autorisé</h2></div>;
      default:
        return <Dashboard userRole={user.role} />;
    }
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-background">
      <Navigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onLogout={handleLogout} 
        userRole={user.role}
      />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
