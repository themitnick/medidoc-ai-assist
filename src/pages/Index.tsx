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
import { PlanificationSoins } from "@/components/PlanificationSoins";
import { GestionRendezVous } from "@/components/GestionRendezVous";
import { User } from "@/types/auth";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

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
      case "rendezvous":
        return <GestionRendezVous />;
      case "diagnostic":
        return user.role === "medecin" ? <AIAssistant /> : <div className="p-6"><h2 className="text-2xl font-bold">Accès non autorisé</h2></div>;
      case "interactions":
        return (user.role === "medecin" || user.role === "admin") ? <InteractionsManager /> : <div className="p-6"><h2 className="text-2xl font-bold">Accès non autorisé</h2></div>;
      case "dossiers":
        return <DossiersMedicaux userRole={user.role} />;
      case "settings":
        return <Parametres userRole={user.role} />;
      case "soins":
        return user.role === "infirmier" ? <PlanificationSoins userRole={user.role} /> : <div className="p-6"><h2 className="text-2xl font-bold">Accès non autorisé</h2></div>;
      default:
        return <Dashboard userRole={user.role} />;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoginForm onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Navigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          onLogout={handleLogout} 
          userRole={user.role}
        />
        <SidebarInset className="flex-1 flex flex-col">
          <main className="flex-1 overflow-auto">
            <div className="p-2 sm:p-4 lg:p-6">
              {renderContent()}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
