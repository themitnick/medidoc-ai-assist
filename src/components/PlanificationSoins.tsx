import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Activity, 
  Plus, 
  Clock, 
  User, 
  MapPin, 
  CheckCircle,
  AlertCircle,
  Calendar,
  Pill,
  Heart,
  Edit,
  Save,
  Stethoscope
} from "lucide-react";

interface Soin {
  id: string;
  patientId: string;
  patientNom: string;
  patientPrenom: string;
  chambre: string;
  type: string;
  description: string;
  dateHeure: string;
  statut: "A_faire" | "En_cours" | "Termine" | "Reporte";
  priorite: "Faible" | "Normale" | "Urgente";
  notes?: string;
  tempsEstime: number; // en minutes
  infirmierAssigne: string;
}

interface PlanificationSoins {
  userRole: string;
}

export const PlanificationSoins = ({ userRole }: PlanificationSoins) => {
  const [activeTab, setActiveTab] = useState("planning");
  const [selectedSoin, setSelectedSoin] = useState<Soin | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mock data des soins
  const [soins, setSoins] = useState<Soin[]>([
    {
      id: "1",
      patientId: "1",
      patientNom: "Kouamé",
      patientPrenom: "Adjoua",
      chambre: "204",
      type: "Pansement",
      description: "Changement de pansement post-opératoire",
      dateHeure: "2025-02-01T14:00:00",
      statut: "A_faire",
      priorite: "Urgente",
      notes: "Vérifier signes d'infection",
      tempsEstime: 30,
      infirmierAssigne: "Touré Aïssatou"
    },
    {
      id: "2",
      patientId: "2",
      patientNom: "Traoré",
      patientPrenom: "Mamadou",
      chambre: "101",
      type: "Prise de tension",
      description: "Contrôle tension artérielle",
      dateHeure: "2025-02-01T15:30:00",
      statut: "A_faire",
      priorite: "Normale",
      tempsEstime: 15,
      infirmierAssigne: "Touré Aïssatou"
    },
    {
      id: "3",
      patientId: "3",
      patientNom: "Ouattara",
      patientPrenom: "Fatou",
      chambre: "302",
      type: "Distribution médicament",
      description: "Administration Doliprane 1g",
      dateHeure: "2025-02-01T16:00:00",
      statut: "Termine",
      priorite: "Normale",
      notes: "Patient a bien toléré",
      tempsEstime: 10,
      infirmierAssigne: "Touré Aïssatou"
    },
    {
      id: "4",
      patientId: "1",
      patientNom: "Kouamé",
      patientPrenom: "Adjoua",
      chambre: "204",
      type: "Surveillance",
      description: "Surveillance post-opératoire",
      dateHeure: "2025-02-01T18:00:00",
      statut: "En_cours",
      priorite: "Urgente",
      tempsEstime: 45,
      infirmierAssigne: "Touré Aïssatou"
    }
  ]);

  const [nouveauSoin, setNouveauSoin] = useState({
    patientNom: "",
    patientPrenom: "",
    chambre: "",
    type: "",
    description: "",
    dateHeure: "",
    priorite: "Normale" as "Faible" | "Normale" | "Urgente",
    tempsEstime: 15
  });

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case "A_faire": return "destructive";
      case "En_cours": return "default";
      case "Termine": return "secondary";
      case "Reporte": return "outline";
      default: return "secondary";
    }
  };

  const getPrioriteColor = (priorite: string) => {
    switch (priorite) {
      case "Urgente": return "text-red-600";
      case "Normale": return "text-blue-600";
      case "Faible": return "text-gray-600";
      default: return "text-gray-600";
    }
  };

  const handleStatutChange = (soinId: string, newStatut: Soin["statut"]) => {
    setSoins(soins.map(soin => 
      soin.id === soinId ? { ...soin, statut: newStatut } : soin
    ));
  };

  const handleAjouterSoin = () => {
    const newSoin: Soin = {
      id: Date.now().toString(),
      patientId: Date.now().toString(),
      patientNom: nouveauSoin.patientNom,
      patientPrenom: nouveauSoin.patientPrenom,
      chambre: nouveauSoin.chambre,
      type: nouveauSoin.type,
      description: nouveauSoin.description,
      dateHeure: nouveauSoin.dateHeure,
      statut: "A_faire",
      priorite: nouveauSoin.priorite,
      tempsEstime: nouveauSoin.tempsEstime,
      infirmierAssigne: "Touré Aïssatou"
    };

    setSoins([...soins, newSoin]);
    setNouveauSoin({
      patientNom: "",
      patientPrenom: "",
      chambre: "",
      type: "",
      description: "",
      dateHeure: "",
      priorite: "Normale",
      tempsEstime: 15
    });
    setIsDialogOpen(false);
  };

  const soinsAujourdhui = soins.filter(soin => {
    const today = new Date().toISOString().split('T')[0];
    return soin.dateHeure.startsWith(today);
  });

  const soinsParStatut = {
    A_faire: soins.filter(s => s.statut === "A_faire"),
    En_cours: soins.filter(s => s.statut === "En_cours"),
    Termine: soins.filter(s => s.statut === "Termine"),
    Reporte: soins.filter(s => s.statut === "Reporte")
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestion des Soins</h2>
          <p className="text-muted-foreground">
            Planning et suivi des soins infirmiers
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Programmer un Soin
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Programmer un Nouveau Soin
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="patientNom">Nom du patient</Label>
                  <Input
                    id="patientNom"
                    value={nouveauSoin.patientNom}
                    onChange={(e) => setNouveauSoin({...nouveauSoin, patientNom: e.target.value})}
                    placeholder="Nom de famille"
                  />
                </div>
                <div>
                  <Label htmlFor="patientPrenom">Prénom du patient</Label>
                  <Input
                    id="patientPrenom"
                    value={nouveauSoin.patientPrenom}
                    onChange={(e) => setNouveauSoin({...nouveauSoin, patientPrenom: e.target.value})}
                    placeholder="Prénom"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="chambre">Chambre</Label>
                  <Input
                    id="chambre"
                    value={nouveauSoin.chambre}
                    onChange={(e) => setNouveauSoin({...nouveauSoin, chambre: e.target.value})}
                    placeholder="ex: 204"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type de soin</Label>
                  <Select value={nouveauSoin.type} onValueChange={(value) => setNouveauSoin({...nouveauSoin, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pansement">Pansement</SelectItem>
                      <SelectItem value="Prise de tension">Prise de tension</SelectItem>
                      <SelectItem value="Distribution médicament">Distribution médicament</SelectItem>
                      <SelectItem value="Surveillance">Surveillance</SelectItem>
                      <SelectItem value="Prise de sang">Prise de sang</SelectItem>
                      <SelectItem value="Toilette">Toilette</SelectItem>
                      <SelectItem value="Autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={nouveauSoin.description}
                  onChange={(e) => setNouveauSoin({...nouveauSoin, description: e.target.value})}
                  placeholder="Description détaillée du soin à effectuer"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dateHeure">Date et heure</Label>
                  <Input
                    id="dateHeure"
                    type="datetime-local"
                    value={nouveauSoin.dateHeure}
                    onChange={(e) => setNouveauSoin({...nouveauSoin, dateHeure: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="tempsEstime">Temps estimé (minutes)</Label>
                  <Input
                    id="tempsEstime"
                    type="number"
                    value={nouveauSoin.tempsEstime}
                    onChange={(e) => setNouveauSoin({...nouveauSoin, tempsEstime: parseInt(e.target.value)})}
                    min="5"
                    max="120"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="priorite">Priorité</Label>
                <Select value={nouveauSoin.priorite} onValueChange={(value: "Faible" | "Normale" | "Urgente") => setNouveauSoin({...nouveauSoin, priorite: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Faible">Faible</SelectItem>
                    <SelectItem value="Normale">Normale</SelectItem>
                    <SelectItem value="Urgente">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleAjouterSoin} className="gap-2">
                  <Save className="h-4 w-4" />
                  Programmer
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistiques rapides */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">À faire</p>
                <p className="text-2xl font-bold text-red-600">{soinsParStatut.A_faire.length}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">En cours</p>
                <p className="text-2xl font-bold text-blue-600">{soinsParStatut.En_cours.length}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Terminés</p>
                <p className="text-2xl font-bold text-green-600">{soinsParStatut.Termine.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Temps moyen</p>
                <p className="text-2xl font-bold">25 min</p>
              </div>
              <Clock className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="planning">Planning du jour</TabsTrigger>
          <TabsTrigger value="tous">Tous les soins</TabsTrigger>
          <TabsTrigger value="historique">Historique</TabsTrigger>
        </TabsList>

        <TabsContent value="planning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Soins d'aujourd'hui ({new Date().toLocaleDateString('fr-FR')})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-4">
                  {soinsAujourdhui.map((soin) => (
                    <div key={soin.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Stethoscope className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">{soin.patientPrenom} {soin.patientNom}</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                Chambre {soin.chambre}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {new Date(soin.dateHeure).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                              </span>
                              <span className={`font-medium ${getPrioriteColor(soin.priorite)}`}>
                                {soin.priorite}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={getStatutColor(soin.statut) as any}>
                            {soin.statut.replace('_', ' ')}
                          </Badge>
                          <Select value={soin.statut} onValueChange={(value: Soin["statut"]) => handleStatutChange(soin.id, value)}>
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="A_faire">À faire</SelectItem>
                              <SelectItem value="En_cours">En cours</SelectItem>
                              <SelectItem value="Termine">Terminé</SelectItem>
                              <SelectItem value="Reporte">Reporté</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium text-sm">Type de soin: </span>
                          <span className="text-sm">{soin.type}</span>
                        </div>
                        <div>
                          <span className="font-medium text-sm">Description: </span>
                          <span className="text-sm text-muted-foreground">{soin.description}</span>
                        </div>
                        {soin.notes && (
                          <div>
                            <span className="font-medium text-sm">Notes: </span>
                            <span className="text-sm text-muted-foreground">{soin.notes}</span>
                          </div>
                        )}
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-xs text-muted-foreground">
                            Temps estimé: {soin.tempsEstime} minutes
                          </span>
                          <Button variant="outline" size="sm" className="gap-1">
                            <Edit className="h-3 w-3" />
                            Modifier
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tous" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tous les soins programmés</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-3">
                  {soins.map((soin) => (
                    <div key={soin.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">{soin.patientPrenom} {soin.patientNom} - {soin.type}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(soin.dateHeure).toLocaleString('fr-FR')} - Chambre {soin.chambre}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatutColor(soin.statut) as any}>
                          {soin.statut.replace('_', ' ')}
                        </Badge>
                        <span className={`text-sm font-medium ${getPrioriteColor(soin.priorite)}`}>
                          {soin.priorite}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historique" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historique des soins terminés</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-3">
                  {soinsParStatut.Termine.map((soin) => (
                    <div key={soin.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <div>
                        <p className="font-medium">{soin.patientPrenom} {soin.patientNom} - {soin.type}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(soin.dateHeure).toLocaleString('fr-FR')} - Chambre {soin.chambre}
                        </p>
                        {soin.notes && (
                          <p className="text-sm text-green-700 mt-1">Notes: {soin.notes}</p>
                        )}
                      </div>
                      <Badge variant="secondary" className="bg-green-600 text-white">
                        Terminé
                      </Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
