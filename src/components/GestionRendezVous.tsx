import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, User, Phone, Mail, Check, X, Eye } from "lucide-react";
import { mockRendezVous, type RendezVous } from "@/data/mockData";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const GestionRendezVous = () => {
  const [rendezVous, setRendezVous] = useState<RendezVous[]>(mockRendezVous);
  const [selectedRdv, setSelectedRdv] = useState<RendezVous | null>(null);
  const [notes, setNotes] = useState("");

  const handleValidation = (rdvId: string, statut: "Confirmé" | "Annulé") => {
    setRendezVous(prev => 
      prev.map(rdv => 
        rdv.id === rdvId 
          ? { ...rdv, statut, notes: statut === "Annulé" ? notes : rdv.notes }
          : rdv
      )
    );
    setNotes("");
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case "Confirmé": return "default";
      case "En attente": return "secondary";
      case "Annulé": return "destructive";
      case "Terminé": return "outline";
      default: return "secondary";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Urgence": return "destructive";
      case "Consultation": return "default";
      case "Contrôle": return "secondary";
      case "Téléconsultation": return "outline";
      default: return "secondary";
    }
  };

  const filteredByStatut = (statut: string) => {
    return rendezVous.filter(rdv => rdv.statut === statut);
  };

  const today = new Date().toISOString().split('T')[0];
  const todayRdv = rendezVous.filter(rdv => rdv.date === today);

  const RendezVousCard = ({ rdv }: { rdv: RendezVous }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">
                {rdv.patientPrenom} {rdv.patientNom}
              </span>
            </div>
            <div className="flex gap-2">
              <Badge variant={getStatutColor(rdv.statut)}>{rdv.statut}</Badge>
              <Badge variant={getTypeColor(rdv.type)}>{rdv.type}</Badge>
            </div>
          </div>

          {/* Date et heure */}
          <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(rdv.date).toLocaleDateString('fr-FR')}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {rdv.heure} ({rdv.dureeEstimee} min)
            </div>
          </div>

          {/* Motif */}
          <div>
            <span className="text-sm font-medium">Motif: </span>
            <span className="text-sm">{rdv.motif}</span>
          </div>

          {/* Notes */}
          {rdv.notes && (
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">Notes: </span>
              {rdv.notes}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => setSelectedRdv(rdv)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Détails
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Détails du rendez-vous</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Patient:</span>
                      <p>{rdv.patientPrenom} {rdv.patientNom}</p>
                    </div>
                    <div>
                      <span className="font-medium">Date:</span>
                      <p>{new Date(rdv.date).toLocaleDateString('fr-FR')}</p>
                    </div>
                    <div>
                      <span className="font-medium">Heure:</span>
                      <p>{rdv.heure}</p>
                    </div>
                    <div>
                      <span className="font-medium">Durée:</span>
                      <p>{rdv.dureeEstimee} minutes</p>
                    </div>
                    <div className="col-span-2">
                      <span className="font-medium">Motif:</span>
                      <p>{rdv.motif}</p>
                    </div>
                    {rdv.notes && (
                      <div className="col-span-2">
                        <span className="font-medium">Notes:</span>
                        <p>{rdv.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {rdv.statut === "En attente" && (
              <>
                <Button 
                  size="sm" 
                  onClick={() => handleValidation(rdv.id, "Confirmé")}
                  className="flex-1"
                >
                  <Check className="w-4 h-4 mr-1" />
                  Confirmer
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      className="flex-1"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Annuler
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Annuler le rendez-vous</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Label htmlFor="notes">Motif d'annulation</Label>
                      <Textarea
                        id="notes"
                        placeholder="Expliquez la raison de l'annulation..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                      <div className="flex gap-2">
                        <Button 
                          variant="destructive" 
                          onClick={() => handleValidation(rdv.id, "Annulé")}
                          className="flex-1"
                        >
                          Confirmer l'annulation
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="text-center sm:text-left">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight">Gestion des rendez-vous</h2>
        <p className="text-muted-foreground mt-2">
          Gérez vos consultations et validez les demandes de rendez-vous
        </p>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Aujourd'hui</p>
                <p className="text-2xl font-bold">{todayRdv.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">En attente</p>
                <p className="text-2xl font-bold">{filteredByStatut("En attente").length}</p>
              </div>
              <Clock className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Confirmés</p>
                <p className="text-2xl font-bold">{filteredByStatut("Confirmé").length}</p>
              </div>
              <Check className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{rendezVous.length}</p>
              </div>
              <User className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Onglets */}
      <Tabs defaultValue="tous" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="tous">Tous</TabsTrigger>
          <TabsTrigger value="attente">En attente</TabsTrigger>
          <TabsTrigger value="confirmes">Confirmés</TabsTrigger>
          <TabsTrigger value="aujourdhui">Aujourd'hui</TabsTrigger>
        </TabsList>

        <TabsContent value="tous" className="space-y-4">
          {rendezVous.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Aucun rendez-vous trouvé</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {rendezVous.map((rdv) => (
                <RendezVousCard key={rdv.id} rdv={rdv} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="attente" className="space-y-4">
          <div className="grid gap-4">
            {filteredByStatut("En attente").map((rdv) => (
              <RendezVousCard key={rdv.id} rdv={rdv} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="confirmes" className="space-y-4">
          <div className="grid gap-4">
            {filteredByStatut("Confirmé").map((rdv) => (
              <RendezVousCard key={rdv.id} rdv={rdv} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="aujourdhui" className="space-y-4">
          <div className="grid gap-4">
            {todayRdv.map((rdv) => (
              <RendezVousCard key={rdv.id} rdv={rdv} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
