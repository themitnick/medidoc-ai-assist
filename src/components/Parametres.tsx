import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Database, 
  Mail, 
  Phone, 
  Lock,
  Users,
  Activity,
  Save,
  RefreshCw
} from "lucide-react";
import { UserRole } from "@/types/auth";

interface ParametresProps {
  userRole: UserRole;
}

export const Parametres = ({ userRole }: ParametresProps) => {
  const [activeTab, setActiveTab] = useState("profil");
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    desktop: true,
    consultations: true,
    urgences: true,
    rappels: false
  });

  const [profile, setProfile] = useState({
    nom: "Koné",
    prenom: "Amadou",
    email: "dr.kone@medidoc.ci",
    telephone: "01 23 45 67 89",
    specialite: "Cardiologie",
    service: "",
    langue: "fr",
    timezone: "Africa/Abidjan"
  });

  const canManageSystem = userRole === "admin";
  const canManageUsers = userRole === "admin";

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Informations Personnelles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nom">Nom</Label>
              <Input
                id="nom"
                value={profile.nom}
                onChange={(e) => setProfile({...profile, nom: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="prenom">Prénom</Label>
              <Input
                id="prenom"
                value={profile.prenom}
                onChange={(e) => setProfile({...profile, prenom: e.target.value})}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({...profile, email: e.target.value})}
            />
          </div>
          
          <div>
            <Label htmlFor="telephone">Téléphone</Label>
            <Input
              id="telephone"
              value={profile.telephone}
              onChange={(e) => setProfile({...profile, telephone: e.target.value})}
            />
          </div>

          {userRole === "medecin" && (
            <div>
              <Label htmlFor="specialite">Spécialité</Label>
              <Select value={profile.specialite} onValueChange={(value) => setProfile({...profile, specialite: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une spécialité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cardiologie">Cardiologie</SelectItem>
                  <SelectItem value="Pneumologie">Pneumologie</SelectItem>
                  <SelectItem value="Neurologie">Neurologie</SelectItem>
                  <SelectItem value="Dermatologie">Dermatologie</SelectItem>
                  <SelectItem value="Gastro-entérologie">Gastro-entérologie</SelectItem>
                  <SelectItem value="Médecine générale">Médecine générale</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {userRole === "infirmier" && (
            <div>
              <Label htmlFor="service">Service</Label>
              <Select value={profile.service} onValueChange={(value) => setProfile({...profile, service: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Urgences">Urgences</SelectItem>
                  <SelectItem value="Chirurgie">Chirurgie</SelectItem>
                  <SelectItem value="Médecine interne">Médecine interne</SelectItem>
                  <SelectItem value="Pédiatrie">Pédiatrie</SelectItem>
                  <SelectItem value="Gériatrie">Gériatrie</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="langue">Langue</Label>
              <Select value={profile.langue} onValueChange={(value) => setProfile({...profile, langue: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="timezone">Fuseau Horaire</Label>
              <Select value={profile.timezone} onValueChange={(value) => setProfile({...profile, timezone: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Africa/Abidjan">Africa/Abidjan (GMT)</SelectItem>
                  <SelectItem value="Europe/Paris">Europe/Paris (GMT+1)</SelectItem>
                  <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                  <SelectItem value="America/New_York">America/New_York (GMT-5)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Sécurité
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full">
            Changer le mot de passe
          </Button>
          <Button variant="outline" className="w-full">
            Activer l'authentification à deux facteurs
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderNotificationSettings = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="text-sm font-medium mb-4">Canaux de notification</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="email-notif">Notifications par email</Label>
              </div>
              <Switch
                id="email-notif"
                checked={notifications.email}
                onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="sms-notif">Notifications par SMS</Label>
              </div>
              <Switch
                id="sms-notif"
                checked={notifications.sms}
                onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="desktop-notif">Notifications desktop</Label>
              </div>
              <Switch
                id="desktop-notif"
                checked={notifications.desktop}
                onCheckedChange={(checked) => setNotifications({...notifications, desktop: checked})}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="text-sm font-medium mb-4">Types de notifications</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="consultations-notif">Nouvelles consultations</Label>
              <Switch
                id="consultations-notif"
                checked={notifications.consultations}
                onCheckedChange={(checked) => setNotifications({...notifications, consultations: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="urgences-notif">Urgences médicales</Label>
              <Switch
                id="urgences-notif"
                checked={notifications.urgences}
                onCheckedChange={(checked) => setNotifications({...notifications, urgences: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="rappels-notif">Rappels de rendez-vous</Label>
              <Switch
                id="rappels-notif"
                checked={notifications.rappels}
                onCheckedChange={(checked) => setNotifications({...notifications, rappels: checked})}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Configuration Système
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="backup-freq">Fréquence de sauvegarde</Label>
            <Select defaultValue="daily">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">Toutes les heures</SelectItem>
                <SelectItem value="daily">Quotidienne</SelectItem>
                <SelectItem value="weekly">Hebdomadaire</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="session-timeout">Timeout de session (minutes)</Label>
            <Input type="number" defaultValue="60" />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="maintenance-mode">Mode maintenance</Label>
            <Switch id="maintenance-mode" />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="debug-mode">Mode debug</Label>
            <Switch id="debug-mode" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Logs & Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline">
              Voir les logs système
            </Button>
            <Button variant="outline">
              Rapport d'activité
            </Button>
          </div>
          
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2">État du système</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>CPU:</span>
                <Badge variant="secondary">23%</Badge>
              </div>
              <div className="flex justify-between">
                <span>Mémoire:</span>
                <Badge variant="secondary">45%</Badge>
              </div>
              <div className="flex justify-between">
                <span>Espace disque:</span>
                <Badge variant="secondary">67%</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Gestion des Utilisateurs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Utilisateurs actifs</h4>
            <Button size="sm">
              Ajouter un utilisateur
            </Button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Dr. Koné Amadou</p>
                <p className="text-sm text-muted-foreground">dr.kone@medidoc.ci - Médecin</p>
              </div>
              <div className="flex space-x-2">
                <Badge variant="default">Actif</Badge>
                <Button variant="outline" size="sm">Modifier</Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Touré Aïssatou</p>
                <p className="text-sm text-muted-foreground">infirmier@medidoc.ci - Infirmier</p>
              </div>
              <div className="flex space-x-2">
                <Badge variant="default">Actif</Badge>
                <Button variant="outline" size="sm">Modifier</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Permissions & Rôles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-3 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-2">Médecin</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span>✓ Consultation patients</span>
                <span>✓ Prescription médicaments</span>
                <span>✓ Accès dossiers médicaux</span>
                <span>✓ IA diagnostic</span>
              </div>
            </div>
            
            <div className="p-3 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-2">Infirmier</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span>✓ Consultation patients</span>
                <span>✗ Prescription médicaments</span>
                <span>✓ Accès dossiers (lecture)</span>
                <span>✓ Gestion soins</span>
              </div>
            </div>
            
            <div className="p-3 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-2">Administrateur</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span>✓ Gestion utilisateurs</span>
                <span>✓ Configuration système</span>
                <span>✓ Accès logs</span>
                <span>✓ Toutes permissions</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Paramètres</h2>
          <p className="text-muted-foreground">
            Configuration et préférences de l'application
          </p>
        </div>
        <Button className="gap-2">
          <Save className="h-4 w-4" />
          Sauvegarder
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profil">Profil</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          {canManageUsers && (
            <TabsTrigger value="utilisateurs">Utilisateurs</TabsTrigger>
          )}
          {canManageSystem && (
            <TabsTrigger value="systeme">Système</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="profil">
          {renderProfileSettings()}
        </TabsContent>

        <TabsContent value="notifications">
          {renderNotificationSettings()}
        </TabsContent>

        {canManageUsers && (
          <TabsContent value="utilisateurs">
            {renderUserManagement()}
          </TabsContent>
        )}

        {canManageSystem && (
          <TabsContent value="systeme">
            {renderSystemSettings()}
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};
