import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { 
  Plus, 
  User, 
  FileText, 
  Calendar,
  Heart,
  AlertTriangle,
  Save,
  X,
  Pill
} from "lucide-react";
import { mockPatients, Patient } from "@/data/mockData";

interface NouveauDossierProps {
  onDossierCreated: (dossier: any) => void;
}

export const NouveauDossier = ({ onDossierCreated }: NouveauDossierProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [motifConsultation, setMotifConsultation] = useState("");
  const [symptomes, setSymptomes] = useState<string[]>([]);
  const [diagnostic, setDiagnostic] = useState("");
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [notes, setNotes] = useState("");
  const [examens, setExamens] = useState<string[]>([]);
  
  const [newSymptome, setNewSymptome] = useState("");
  const [newExamen, setNewExamen] = useState("");
  const [newPrescription, setNewPrescription] = useState({
    medicament: "",
    dosage: "",
    frequence: "",
    duree: ""
  });

  const resetForm = () => {
    setSelectedPatientId("");
    setMotifConsultation("");
    setSymptomes([]);
    setDiagnostic("");
    setPrescriptions([]);
    setNotes("");
    setExamens([]);
    setNewSymptome("");
    setNewExamen("");
    setNewPrescription({
      medicament: "",
      dosage: "",
      frequence: "",
      duree: ""
    });
  };

  const addSymptome = () => {
    if (newSymptome.trim() && !symptomes.includes(newSymptome.trim())) {
      setSymptomes([...symptomes, newSymptome.trim()]);
      setNewSymptome("");
    }
  };

  const removeSymptome = (symptome: string) => {
    setSymptomes(symptomes.filter(s => s !== symptome));
  };

  const addExamen = () => {
    if (newExamen.trim() && !examens.includes(newExamen.trim())) {
      setExamens([...examens, newExamen.trim()]);
      setNewExamen("");
    }
  };

  const removeExamen = (examen: string) => {
    setExamens(examens.filter(e => e !== examen));
  };

  const addPrescription = () => {
    if (newPrescription.medicament.trim() && newPrescription.dosage.trim()) {
      const prescription = {
        id: Date.now().toString(),
        ...newPrescription
      };
      setPrescriptions([...prescriptions, prescription]);
      setNewPrescription({
        medicament: "",
        dosage: "",
        frequence: "",
        duree: ""
      });
    }
  };

  const removePrescription = (index: number) => {
    setPrescriptions(prescriptions.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedPatient = mockPatients.find(p => p.id === selectedPatientId);
    if (!selectedPatient) return;

    const newConsultation = {
      id: Date.now().toString(),
      patientId: selectedPatientId,
      date: new Date().toISOString(),
      motif: motifConsultation,
      symptomes: symptomes,
      diagnostic: diagnostic,
      prescriptions: prescriptions,
      examens: examens,
      notes: notes
    };

    const newDossier = {
      id: `dossier-${Date.now()}`,
      patientId: selectedPatientId,
      dateCreation: new Date().toISOString().split('T')[0],
      derniereModification: new Date().toISOString().split('T')[0],
      antecedents: selectedPatient.antecedents || [],
      allergies: selectedPatient.allergie || [],
      traitements: selectedPatient.traitements || [],
      consultations: [newConsultation],
      examens: examens.map(examen => ({
        date: new Date().toISOString().split('T')[0],
        type: examen,
        resultat: "En attente",
        medecin: "Dr. Koné"
      })),
      notes: notes
    };

    onDossierCreated(newDossier);
    resetForm();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nouveau Dossier
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Créer un Nouveau Dossier Médical
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sélection du patient */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5" />
                Sélection du Patient
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="patient">Patient *</Label>
                <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un patient existant" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockPatients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.prenom} {patient.nom} - {patient.numeroSecu}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Consultation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5" />
                Nouvelle Consultation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="motif">Motif de consultation *</Label>
                <Input
                  id="motif"
                  value={motifConsultation}
                  onChange={(e) => setMotifConsultation(e.target.value)}
                  placeholder="Ex: Contrôle de routine, Douleurs abdominales..."
                  required
                />
              </div>

              {/* Symptômes */}
              <div>
                <Label className="mb-2 block">Symptômes observés</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newSymptome}
                    onChange={(e) => setNewSymptome(e.target.value)}
                    placeholder="Ajouter un symptôme"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSymptome())}
                  />
                  <Button type="button" onClick={addSymptome} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {symptomes.map((symptome, index) => (
                    <Badge key={index} variant="outline" className="gap-1">
                      {symptome}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeSymptome(symptome)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="diagnostic">Diagnostic *</Label>
                <Textarea
                  id="diagnostic"
                  value={diagnostic}
                  onChange={(e) => setDiagnostic(e.target.value)}
                  placeholder="Diagnostic médical détaillé"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Prescriptions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Pill className="h-5 w-5" />
                Prescriptions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="medicament">Médicament</Label>
                  <Input
                    id="medicament"
                    value={newPrescription.medicament}
                    onChange={(e) => setNewPrescription({...newPrescription, medicament: e.target.value})}
                    placeholder="Nom du médicament"
                  />
                </div>
                <div>
                  <Label htmlFor="dosage">Dosage</Label>
                  <Input
                    id="dosage"
                    value={newPrescription.dosage}
                    onChange={(e) => setNewPrescription({...newPrescription, dosage: e.target.value})}
                    placeholder="Ex: 500mg"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="frequence">Fréquence</Label>
                  <Input
                    id="frequence"
                    value={newPrescription.frequence}
                    onChange={(e) => setNewPrescription({...newPrescription, frequence: e.target.value})}
                    placeholder="Ex: 3 fois par jour"
                  />
                </div>
                <div>
                  <Label htmlFor="duree">Durée</Label>
                  <Input
                    id="duree"
                    value={newPrescription.duree}
                    onChange={(e) => setNewPrescription({...newPrescription, duree: e.target.value})}
                    placeholder="Ex: 7 jours"
                  />
                </div>
              </div>

              <Button type="button" onClick={addPrescription} size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Ajouter la prescription
              </Button>

              {prescriptions.length > 0 && (
                <div className="space-y-2">
                  <Label>Prescriptions ajoutées:</Label>
                  {prescriptions.map((prescription, index) => (
                    <div key={index} className="p-3 bg-blue-50 rounded-lg flex justify-between items-center">
                      <div>
                        <p className="font-medium">{prescription.medicament} - {prescription.dosage}</p>
                        <p className="text-sm text-muted-foreground">
                          {prescription.frequence} pendant {prescription.duree}
                        </p>
                      </div>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => removePrescription(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Examens */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Heart className="h-5 w-5" />
                Examens Prescrits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2 mb-2">
                <Input
                  value={newExamen}
                  onChange={(e) => setNewExamen(e.target.value)}
                  placeholder="Ex: Analyse sanguine, Radiographie..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addExamen())}
                />
                <Button type="button" onClick={addExamen} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {examens.map((examen, index) => (
                  <Badge key={index} variant="secondary" className="gap-1">
                    {examen}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeExamen(examen)}
                    />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5" />
                Notes Médicales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Notes complémentaires sur la consultation et le suivi du patient..."
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Boutons */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" className="gap-2" disabled={!selectedPatientId || !motifConsultation || !diagnostic}>
              <Save className="h-4 w-4" />
              Créer le Dossier
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
