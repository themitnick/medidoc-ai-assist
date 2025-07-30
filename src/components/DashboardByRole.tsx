import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, Pill, AlertTriangle, TrendingUp, Calendar, Activity, Clock } from "lucide-react";
import { mockStats, mockConsultations, mockPatients } from "@/data/mockData";
import { UserRole } from "@/types/auth";

interface DashboardProps {
  userRole: UserRole;
}

export const Dashboard = ({ userRole }: DashboardProps) => {
  const recentConsultations = mockConsultations.slice(0, 3);
  const recentPatients = mockPatients.slice(0, 3);

  const getStatCards = () => {
    switch (userRole) {
      case "medecin":
        return [
          {
            title: "Patients Suivis",
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

      case "infirmier":
        return [
          {
            title: "Patients Assignés",
            value: "23",
            icon: Users,
            trend: "Garde actuelle",
            color: "text-medical-blue"
          },
          {
            title: "Soins à Effectuer",
            value: "8",
            icon: Activity,
            trend: "2 urgents",
            color: "text-warning"
          },
          {
            title: "Médicaments à Distribuer",
            value: "15",
            icon: Pill,
            trend: "Prochain: 14h00",
            color: "text-primary"
          },
          {
            title: "Temps Moyen Soins",
            value: "25 min",
            icon: Clock,
            trend: "-3 min vs hier",
            color: "text-success"
          }
        ];

      case "admin":
        return [
          {
            title: "Utilisateurs Actifs",
            value: "145",
            icon: Users,
            trend: "+8 cette semaine",
            color: "text-medical-blue"
          },
          {
            title: "Système",
            value: "99.9%",
            icon: TrendingUp,
            trend: "Disponibilité",
            color: "text-success"
          },
          {
            title: "Données Traitées",
            value: "2.3 GB",
            icon: FileText,
            trend: "Aujourd'hui",
            color: "text-primary"
          },
          {
            title: "Alertes Système",
            value: "2",
            icon: AlertTriangle,
            trend: "Non critiques",
            color: "text-warning"
          }
        ];

      default:
        return [];
    }
  };

  const statCards = getStatCards();

  const getDashboardTitle = () => {
    switch (userRole) {
      case "medecin":
        return "Tableau de bord - Médecin";
      case "infirmier":
        return "Tableau de bord - Infirmier";
      case "admin":
        return "Tableau de bord - Administrateur";
      default:
        return "Tableau de bord";
    }
  };

  const getDashboardDescription = () => {
    switch (userRole) {
      case "medecin":
        return "Vue d'ensemble de vos consultations et patients";
      case "infirmier":
        return "Gestion des soins et suivi des patients";
      case "admin":
        return "Administration système et gestion des utilisateurs";
      default:
        return "Vue d'ensemble";
    }
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">{getDashboardTitle()}</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {getDashboardDescription()}
          </p>
        </div>
        <Badge variant="secondary" className="text-xs sm:text-sm w-fit">
          {new Date().toLocaleDateString('fr-FR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-lg sm:text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.trend}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Role-specific content */}
      {userRole === "medecin" && (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
          {/* Recent Consultations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Consultations Récentes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentConsultations.map((consultation) => {
                const patient = mockPatients.find(p => p.id === consultation.patientId);
                return (
                  <div key={consultation.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">
                        {patient ? `${patient.prenom} ${patient.nom}` : 'Patient inconnu'}
                      </p>
                      <p className="text-sm text-muted-foreground">{consultation.motif}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {new Date(consultation.date).toLocaleDateString('fr-FR')}
                    </Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Recent Patients */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Patients Récents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentPatients.map((patient) => (
                <div key={patient.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{patient.prenom} {patient.nom}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date().getFullYear() - new Date(patient.dateNaissance).getFullYear()} ans
                    </p>
                  </div>
                  <Badge variant={patient.allergie?.length ? "destructive" : "secondary"} className="text-xs">
                    {patient.allergie?.length ? "Allergies" : "Aucune allergie"}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {userRole === "infirmier" && (
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          {/* Soins à effectuer */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Soins Programmés
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200 gap-2">
                <div>
                  <p className="font-medium">Adjoua Kouamé - Pansement</p>
                  <p className="text-sm text-muted-foreground">Chambre 204 - 14:00</p>
                </div>
                <Badge variant="destructive" className="text-xs w-fit">Urgent</Badge>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-muted/50 rounded-lg gap-2">
                <div>
                  <p className="font-medium">Mamadou Traoré - Prise de tension</p>
                  <p className="text-sm text-muted-foreground">Chambre 101 - 15:30</p>
                </div>
                <Badge variant="secondary" className="text-xs w-fit">Programmé</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Distribution médicaments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill className="h-5 w-5" />
                Distribution Médicaments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200 gap-2">
                <div>
                  <p className="font-medium">Kouassi Bamba - Doliprane 1g</p>
                  <p className="text-sm text-muted-foreground">Chambre 305 - 14:30</p>
                </div>
                <Badge variant="default" className="text-xs w-fit">À distribuer</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {userRole === "admin" && (
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          {/* Gestion utilisateurs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Activité Utilisateurs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div>
                  <p className="font-medium">Dr. Koné - Connecté</p>
                  <p className="text-sm text-muted-foreground">Dernière activité: il y a 5 min</p>
                </div>
                <Badge variant="default" className="text-xs bg-green-600">En ligne</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Inf. Touré - Hors ligne</p>
                  <p className="text-sm text-muted-foreground">Dernière connexion: 13:45</p>
                </div>
                <Badge variant="secondary" className="text-xs">Hors ligne</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Système */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                État du Système
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div>
                  <p className="font-medium">Base de données</p>
                  <p className="text-sm text-muted-foreground">Temps de réponse: 45ms</p>
                </div>
                <Badge variant="default" className="text-xs bg-green-600">Optimal</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div>
                  <p className="font-medium">Serveur Web</p>
                  <p className="text-sm text-muted-foreground">CPU: 23% - RAM: 45%</p>
                </div>
                <Badge variant="default" className="text-xs bg-green-600">Stable</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
