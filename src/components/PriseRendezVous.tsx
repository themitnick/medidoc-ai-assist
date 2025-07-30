import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, Clock, User, FileText, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { mockCreneauxDisponibles, type RendezVous } from "@/data/mockData";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface PriseRendezVousProps {
  patientId: string;
  onRendezVousCreated: (rendezVous: RendezVous) => void;
}

export const PriseRendezVous = ({ patientId, onRendezVousCreated }: PriseRendezVousProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedHeure, setSelectedHeure] = useState("");
  const [motif, setMotif] = useState("");
  const [type, setType] = useState<"Consultation" | "Contrôle" | "Urgence" | "Téléconsultation">("Consultation");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const creneauxDisponibles = mockCreneauxDisponibles;
  
  // Obtenir les heures disponibles pour la date sélectionnée
  const heuresDisponibles = selectedDate 
    ? creneauxDisponibles.find(c => {
        const creneauDate = format(new Date(c.date), "yyyy-MM-dd");
        const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
        return creneauDate === selectedDateStr;
      })?.heures || []
    : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation de l'envoi
    await new Promise(resolve => setTimeout(resolve, 1500));

    const nouveauRendezVous: RendezVous = {
      id: `rdv-${Date.now()}`,
      patientId,
      medecinId: "med-001", // À adapter selon la logique métier
      date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
      heure: selectedHeure,
      motif,
      type,
      statut: "En attente",
      notes,
      dureeEstimee: type === "Consultation" ? 45 : 30,
      patientNom: "Patient", // À récupérer depuis les données patient
      patientPrenom: "Actuel",
      medecinNom: "Dr. Koné",
      medecinPrenom: "Ibrahim"
    };

    onRendezVousCreated(nouveauRendezVous);
    setShowSuccess(true);
    setIsSubmitting(false);

    // Reset form
    setTimeout(() => {
      setSelectedDate(undefined);
      setSelectedHeure("");
      setMotif("");
      setNotes("");
      setShowSuccess(false);
    }, 2000);
  };

  if (showSuccess) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-success mx-auto" />
            <h3 className="text-lg font-semibold">Rendez-vous demandé !</h3>
            <p className="text-muted-foreground">
              Votre demande de rendez-vous a été envoyée. Vous recevrez une confirmation par email.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center sm:text-left">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight">Prendre un rendez-vous</h2>
        <p className="text-muted-foreground mt-2">
          Choisissez un créneau disponible pour votre consultation
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Nouveau rendez-vous
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Type de consultation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type de consultation</Label>
                <Select value={type} onValueChange={(value: any) => setType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Consultation">Consultation</SelectItem>
                    <SelectItem value="Contrôle">Contrôle</SelectItem>
                    <SelectItem value="Urgence">Urgence</SelectItem>
                    <SelectItem value="Téléconsultation">Téléconsultation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="motif">Motif *</Label>
                <Input
                  id="motif"
                  placeholder="Ex: Douleur abdominale"
                  value={motif}
                  onChange={(e) => setMotif(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="date">Date souhaitée *</Label>
              <Select value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""} onValueChange={(value) => {
                setSelectedDate(value ? new Date(value) : undefined);
                setSelectedHeure(""); // Reset heure when date changes
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir une date" />
                </SelectTrigger>
                <SelectContent>
                  {creneauxDisponibles.map((creneau) => (
                    <SelectItem key={creneau.date} value={creneau.date}>
                      {new Date(creneau.date).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Heure */}
            {selectedDate && (
              <div className="space-y-2">
                <Label>Créneaux disponibles *</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {heuresDisponibles.map((heure) => (
                    <Button
                      key={heure}
                      type="button"
                      variant={selectedHeure === heure ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedHeure(heure)}
                      className="justify-center"
                    >
                      <Clock className="w-3 h-3 mr-1" />
                      {heure}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes supplémentaires</Label>
              <Textarea
                id="notes"
                placeholder="Informations complémentaires pour le médecin..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            {/* Récapitulatif */}
            {selectedDate && selectedHeure && motif && (
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <h4 className="font-medium">Récapitulatif</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <Badge variant="secondary">{type}</Badge>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium">
                      {format(selectedDate, "EEEE d MMMM yyyy", { locale: fr })}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <span className="text-muted-foreground">Heure:</span>
                    <span className="font-medium">{selectedHeure}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <span className="text-muted-foreground">Motif:</span>
                    <span className="font-medium">{motif}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                type="submit" 
                disabled={!selectedDate || !selectedHeure || !motif || isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? "Envoi en cours..." : "Demander le rendez-vous"}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setSelectedDate(undefined);
                  setSelectedHeure("");
                  setMotif("");
                  setNotes("");
                }}
                className="flex-1 sm:flex-initial"
              >
                Annuler
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
