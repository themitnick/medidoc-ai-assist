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
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  Heart,
  AlertTriangle,
  Save,
  X
} from "lucide-react";
import { Patient } from "@/data/mockData";

interface NouveauPatientProps {
  onPatientAdded: (patient: Patient) => void;
}

export const NouveauPatient = ({ onPatientAdded }: NouveauPatientProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [antecedents, setAntecedents] = useState<string[]>([]);
  const [traitements, setTraitements] = useState<string[]>([]);
  const [newAllergie, setNewAllergie] = useState("");
  const [newAntecedent, setNewAntecedent] = useState("");
  const [newTraitement, setNewTraitement] = useState("");

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    dateNaissance: "",
    sexe: "" as "M" | "F" | "",
    telephone: "",
    email: "",
    adresse: "",
    numeroSecu: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addAllergie = () => {
    if (newAllergie.trim() && !allergies.includes(newAllergie.trim())) {
      setAllergies([...allergies, newAllergie.trim()]);
      setNewAllergie("");
    }
  };

  const removeAllergie = (allergie: string) => {
    setAllergies(allergies.filter(a => a !== allergie));
  };

  const addAntecedent = () => {
    if (newAntecedent.trim() && !antecedents.includes(newAntecedent.trim())) {
      setAntecedents([...antecedents, newAntecedent.trim()]);
      setNewAntecedent("");
    }
  };

  const removeAntecedent = (antecedent: string) => {
    setAntecedents(antecedents.filter(a => a !== antecedent));
  };

  const addTraitement = () => {
    if (newTraitement.trim() && !traitements.includes(newTraitement.trim())) {
      setTraitements([...traitements, newTraitement.trim()]);
      setNewTraitement("");
    }
  };

  const removeTraitement = (traitement: string) => {
    setTraitements(traitements.filter(t => t !== traitement));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPatient: Patient = {
      id: Date.now().toString(),
      nom: formData.nom,
      prenom: formData.prenom,
      dateNaissance: formData.dateNaissance,
      sexe: formData.sexe as "M" | "F",
      telephone: formData.telephone,
      email: formData.email,
      adresse: formData.adresse,
      numeroSecu: formData.numeroSecu,
      allergie: allergies.length > 0 ? allergies : undefined,
      antecedents: antecedents.length > 0 ? antecedents : undefined,
      traitements: traitements.length > 0 ? traitements : undefined
    };

    onPatientAdded(newPatient);
    
    // Reset form
    setFormData({
      nom: "",
      prenom: "",
      dateNaissance: "",
      sexe: "",
      telephone: "",
      email: "",
      adresse: "",
      numeroSecu: ""
    });
    setAllergies([]);
    setAntecedents([]);
    setTraitements([]);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nouveau Patient
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Ajouter un Nouveau Patient
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations personnelles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5" />
                Informations Personnelles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nom">Nom *</Label>
                  <Input
                    id="nom"
                    value={formData.nom}
                    onChange={(e) => handleInputChange("nom", e.target.value)}
                    placeholder="Nom de famille"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="prenom">Prénom *</Label>
                  <Input
                    id="prenom"
                    value={formData.prenom}
                    onChange={(e) => handleInputChange("prenom", e.target.value)}
                    placeholder="Prénom"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dateNaissance">Date de naissance *</Label>
                  <Input
                    id="dateNaissance"
                    type="date"
                    value={formData.dateNaissance}
                    onChange={(e) => handleInputChange("dateNaissance", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="sexe">Sexe *</Label>
                  <Select value={formData.sexe} onValueChange={(value) => handleInputChange("sexe", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">Homme</SelectItem>
                      <SelectItem value="F">Femme</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="numeroSecu">Numéro de Sécurité Sociale *</Label>
                <Input
                  id="numeroSecu"
                  value={formData.numeroSecu}
                  onChange={(e) => handleInputChange("numeroSecu", e.target.value)}
                  placeholder="0000000000000"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Coordonnées */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Phone className="h-5 w-5" />
                Coordonnées
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="telephone">Téléphone *</Label>
                  <Input
                    id="telephone"
                    value={formData.telephone}
                    onChange={(e) => handleInputChange("telephone", e.target.value)}
                    placeholder="01 23 45 67 89"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="patient@email.ci"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="adresse">Adresse complète *</Label>
                <Textarea
                  id="adresse"
                  value={formData.adresse}
                  onChange={(e) => handleInputChange("adresse", e.target.value)}
                  placeholder="Adresse complète avec quartier et ville"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Informations médicales */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Heart className="h-5 w-5" />
                Informations Médicales
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Allergies */}
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  Allergies connues
                </Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newAllergie}
                    onChange={(e) => setNewAllergie(e.target.value)}
                    placeholder="Ajouter une allergie"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAllergie())}
                  />
                  <Button type="button" onClick={addAllergie} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {allergies.map((allergie, index) => (
                    <Badge key={index} variant="destructive" className="gap-1">
                      {allergie}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeAllergie(allergie)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Antécédents */}
              <div>
                <Label className="mb-2 block">Antécédents médicaux</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newAntecedent}
                    onChange={(e) => setNewAntecedent(e.target.value)}
                    placeholder="Ajouter un antécédent"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAntecedent())}
                  />
                  <Button type="button" onClick={addAntecedent} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {antecedents.map((antecedent, index) => (
                    <Badge key={index} variant="secondary" className="gap-1">
                      {antecedent}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeAntecedent(antecedent)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Traitements */}
              <div>
                <Label className="mb-2 block">Traitements en cours</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newTraitement}
                    onChange={(e) => setNewTraitement(e.target.value)}
                    placeholder="Ajouter un traitement"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTraitement())}
                  />
                  <Button type="button" onClick={addTraitement} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {traitements.map((traitement, index) => (
                    <Badge key={index} variant="outline" className="gap-1">
                      {traitement}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeTraitement(traitement)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Boutons */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" className="gap-2">
              <Save className="h-4 w-4" />
              Enregistrer le Patient
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
