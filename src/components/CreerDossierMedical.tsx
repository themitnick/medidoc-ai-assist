import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, FileText, User, Calendar, Save, X } from "lucide-react";
import { mockPatients, type DossierMedical, type Patient } from "@/data/mockData";

interface CreerDossierMedicalProps {
  onDossierCreated: (dossier: DossierMedical) => void;
}

export const CreerDossierMedical = ({ onDossierCreated }: CreerDossierMedicalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<string>("");
  const [antecedentsFamiliaux, setAntecedentsFamiliaux] = useState<string[]>([]);
  const [antecedentsPersonnels, setAntecedentsPersonnels] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [traitements, setTraitements] = useState<string[]>([]);
  const [vaccinations, setVaccinations] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [medecinTraitant, setMedecinTraitant] = useState("");
  
  // États pour l'ajout d'éléments
  const [newAntecedentFamilial, setNewAntecedentFamilial] = useState("");
  const [newAntecedentPersonnel, setNewAntecedentPersonnel] = useState("");
  const [newAllergie, setNewAllergie] = useState("");
  const [newTraitement, setNewTraitement] = useState("");
  const [newVaccination, setNewVaccination] = useState("");

  const resetForm = () => {
    setSelectedPatient("");
    setAntecedentsFamiliaux([]);
    setAntecedentsPersonnels([]);
    setAllergies([]);
    setTraitements([]);
    setVaccinations([]);
    setNotes("");
    setMedecinTraitant("");
    setNewAntecedentFamilial("");
    setNewAntecedentPersonnel("");
    setNewAllergie("");
    setNewTraitement("");
    setNewVaccination("");
  };

  const addItem = (
    newItem: string, 
    setNewItem: (value: string) => void, 
    currentList: string[], 
    setCurrentList: (value: string[]) => void
  ) => {
    if (newItem.trim()) {
      setCurrentList([...currentList, newItem.trim()]);
      setNewItem("");
    }
  };

  const removeItem = (index: number, currentList: string[], setCurrentList: (value: string[]) => void) => {
    setCurrentList(currentList.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPatient) return;

    const nouveauDossier: DossierMedical = {
      id: `dos-${Date.now()}`,
      patientId: selectedPatient,
      dateCreation: new Date().toISOString().split('T')[0],
      dateModification: new Date().toISOString().split('T')[0],
      antecedentsFamiliaux,
      antecedentsPersonnels,
      allergies,
      traitements,
      vaccinations,
      examensComplementaires: [],
      hospitalisations: [],
      notes,
      medecinTraitant
    };

    onDossierCreated(nouveauDossier);
    setIsOpen(false);
    resetForm();
  };

  const ListSection = ({ 
    title, 
    items, 
    newItem, 
    setNewItem, 
    setItems, 
    placeholder 
  }: {
    title: string;
    items: string[];
    newItem: string;
    setNewItem: (value: string) => void;
    setItems: (value: string[]) => void;
    placeholder: string;
  }) => (
    <div className="space-y-2">
      <Label>{title}</Label>
      <div className="flex gap-2">
        <Input
          placeholder={placeholder}
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addItem(newItem, setNewItem, items, setItems);
            }
          }}
          className="flex-1"
        />
        <Button
          type="button"
          size="sm"
          onClick={() => addItem(newItem, setNewItem, items, setItems)}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      {items.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {items.map((item, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              <span className="break-all">{item}</span>
              <button
                type="button"
                onClick={() => removeItem(index, items, setItems)}
                className="ml-1 hover:text-destructive"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Nouveau Dossier</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Créer un nouveau dossier médical
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sélection du patient */}
          <div className="space-y-2">
            <Label htmlFor="patient">Patient *</Label>
            <Select value={selectedPatient} onValueChange={setSelectedPatient}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un patient" />
              </SelectTrigger>
              <SelectContent>
                {mockPatients.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id}>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {patient.prenom} {patient.nom}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Médecin traitant */}
          <div className="space-y-2">
            <Label htmlFor="medecin">Médecin traitant</Label>
            <Input
              id="medecin"
              placeholder="Dr. Nom Prénom"
              value={medecinTraitant}
              onChange={(e) => setMedecinTraitant(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Antécédents familiaux */}
            <ListSection
              title="Antécédents familiaux"
              items={antecedentsFamiliaux}
              newItem={newAntecedentFamilial}
              setNewItem={setNewAntecedentFamilial}
              setItems={setAntecedentsFamiliaux}
              placeholder="Ex: Diabète (père)"
            />

            {/* Antécédents personnels */}
            <ListSection
              title="Antécédents personnels"
              items={antecedentsPersonnels}
              newItem={newAntecedentPersonnel}
              setNewItem={setNewAntecedentPersonnel}
              setItems={setAntecedentsPersonnels}
              placeholder="Ex: Hypertension depuis 2020"
            />

            {/* Allergies */}
            <ListSection
              title="Allergies"
              items={allergies}
              newItem={newAllergie}
              setNewItem={setNewAllergie}
              setItems={setAllergies}
              placeholder="Ex: Pénicilline"
            />

            {/* Traitements */}
            <ListSection
              title="Traitements actuels"
              items={traitements}
              newItem={newTraitement}
              setNewItem={setNewTraitement}
              setItems={setTraitements}
              placeholder="Ex: Metformine 850mg 2x/j"
            />

            {/* Vaccinations */}
            <div className="lg:col-span-2">
              <ListSection
                title="Vaccinations"
                items={vaccinations}
                newItem={newVaccination}
                setNewItem={setNewVaccination}
                setItems={setVaccinations}
                placeholder="Ex: COVID-19 (3 doses)"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes médicales</Label>
            <Textarea
              id="notes"
              placeholder="Notes et observations générales..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button type="submit" disabled={!selectedPatient} className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              Créer le dossier
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                setIsOpen(false);
                resetForm();
              }}
              className="flex-1 sm:flex-initial"
            >
              Annuler
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
