import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, Pill, AlertTriangle, TrendingUp, Calendar } from "lucide-react";
import { mockStats, mockConsultations, mockPatients } from "@/data/mockData";

export const Dashboard = () => {
  const recentConsultations = mockConsultations.slice(0, 3);
  const recentPatients = mockPatients.slice(0, 3);

  const statCards = [
    {
      title: "Total Patients",
      value: mockStats.totalPatients.toLocaleString(),
      icon: Users,
      trend: "+12% ce mois",
      color: "text-medical-blue"
    },
    {
      title: "Consultations Aujourd'hui",
      value: mockStats.consultationsAujourdhui.toString(),
      icon: Calendar,
      trend: "+5 depuis hier",
      color: "text-success"
    },
    {
      title: "Prescriptions Actives",
      value: mockStats.prescriptionsActives.toString(),
      icon: Pill,
      trend: "89% conformes",
      color: "text-primary"
    },
    {
      title: "Alertes Interactions",
      value: mockStats.alertesInteractions.toString(),
      icon: AlertTriangle,
      trend: "Urgent",
      color: "text-warning"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tableau de bord</h2>
          <p className="text-muted-foreground">
            Vue d'ensemble de votre activité médicale
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          Mis à jour il y a 2 min
        </Badge>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="shadow-card hover:shadow-medical transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.trend}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Consultations */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Consultations Récentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentConsultations.map((consultation) => {
                const patient = mockPatients.find(p => p.id === consultation.patientId);
                return (
                  <div key={consultation.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{patient?.prenom} {patient?.nom}</p>
                      <p className="text-sm text-muted-foreground">{consultation.motif}</p>
                      <p className="text-xs text-muted-foreground">{consultation.date}</p>
                    </div>
                    <Badge variant={consultation.diagnostic.includes("déséquilibré") ? "destructive" : "default"}>
                      {consultation.diagnostic.split(" ")[0]}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Patients */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Nouveaux Patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPatients.map((patient) => (
                <div key={patient.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{patient.prenom} {patient.nom}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date().getFullYear() - new Date(patient.dateNaissance).getFullYear()} ans - {patient.sexe === "M" ? "Homme" : "Femme"}
                    </p>
                    <p className="text-xs text-muted-foreground">{patient.telephone}</p>
                  </div>
                  <div className="text-right">
                    {patient.allergie && patient.allergie.length > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {patient.allergie.length} allergie(s)
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Actions Rapides
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            <button className="p-4 border rounded-lg hover:bg-accent transition-colors text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Nouveau Patient</p>
                  <p className="text-sm text-muted-foreground">Créer un dossier</p>
                </div>
              </div>
            </button>
            
            <button className="p-4 border rounded-lg hover:bg-accent transition-colors text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="font-medium">Nouvelle Consultation</p>
                  <p className="text-sm text-muted-foreground">Commencer un RDV</p>
                </div>
              </div>
            </button>
            
            <button className="p-4 border rounded-lg hover:bg-accent transition-colors text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="font-medium">Vérifier Interactions</p>
                  <p className="text-sm text-muted-foreground">Analyse des risques</p>
                </div>
              </div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};