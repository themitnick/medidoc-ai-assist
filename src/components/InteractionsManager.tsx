import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  AlertTriangle, 
  Search, 
  Pill, 
  Shield, 
  Info, 
  Download, 
  History,
  AlertCircle,
  Eye,
  Filter,
  BookOpen,
  Clock,
  FileText,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  RefreshCw
} from "lucide-react";
import { mockDrugInteractions, mockMedicaments, mockPatients, type DrugInteraction, type MedicamentInfo, type Patient } from "@/data/mockData";

interface PrescriptionHistory {
  id: string;
  date: string;
  patient?: Patient;
  medicaments: string[];
  interactions: DrugInteraction[];
  notes?: string;
}

export const InteractionsManager = () => {
  const [searchDrug, setSearchDrug] = useState("");
  const [selectedInteractions, setSelectedInteractions] = useState<DrugInteraction[]>([]);
  const [currentPrescription, setCurrentPrescription] = useState<string[]>([]);
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [prescriptionHistory, setPrescriptionHistory] = useState<PrescriptionHistory[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [notes, setNotes] = useState("");
  const [activeTab, setActiveTab] = useState("checker");
  const [selectedMedicament, setSelectedMedicament] = useState<MedicamentInfo | null>(null);
  const [categoryFilter, setCategoryFilter] = useState("Tous");

  // Vérification automatique des interactions lors des changements
  useEffect(() => {
    checkInteractions(currentPrescription);
  }, [currentPrescription, selectedPatient]);

  const addDrugToPrescription = (drug: string) => {
    if (!currentPrescription.includes(drug)) {
      const newPrescription = [...currentPrescription, drug];
      setCurrentPrescription(newPrescription);
    }
  };

  const removeDrugFromPrescription = (drug: string) => {
    const newPrescription = currentPrescription.filter(d => d !== drug);
    setCurrentPrescription(newPrescription);
  };

  const checkInteractions = (prescription: string[]) => {
    const interactions: DrugInteraction[] = [];
    
    for (let i = 0; i < prescription.length; i++) {
      for (let j = i + 1; j < prescription.length; j++) {
        const drugA = prescription[i];
        const drugB = prescription[j];
        
        const interaction = mockDrugInteractions.find(
          inter => 
            (inter.medicamentA === drugA && inter.medicamentB === drugB) ||
            (inter.medicamentA === drugB && inter.medicamentB === drugA) ||
            (inter.dciA && drugA.includes(inter.dciA)) ||
            (inter.dciB && drugB.includes(inter.dciB))
        );
        
        if (interaction) {
          interactions.push(interaction);
        }
      }
    }

    // Vérification des allergies du patient sélectionné
    if (selectedPatient) {
      prescription.forEach(drug => {
        selectedPatient.allergie?.forEach(allergie => {
          if (drug.toLowerCase().includes(allergie.toLowerCase())) {
            interactions.push({
              id: `allergie-${drug}`,
              medicamentA: drug,
              medicamentB: "Allergie connue",
              severite: "Critique",
              description: `Patient allergique à ${allergie}`,
              mecanisme: "Réaction allergique documentée dans le dossier patient",
              recommandation: "CONTRE-INDICATION ABSOLUE - Choisir une alternative",
              dateModification: new Date().toISOString().split('T')[0]
            });
          }
        });
      });
    }
    
    setSelectedInteractions(interactions);
  };

  const savePrescriptionToHistory = () => {
    if (currentPrescription.length === 0) return;

    const newEntry: PrescriptionHistory = {
      id: `hist-${Date.now()}`,
      date: new Date().toISOString(),
      patient: selectedPatient || undefined,
      medicaments: [...currentPrescription],
      interactions: [...selectedInteractions],
      notes: notes
    };

    setPrescriptionHistory([newEntry, ...prescriptionHistory]);
    setNotes("");
  };

  const clearPrescription = () => {
    setCurrentPrescription([]);
    setSelectedInteractions([]);
    setNotes("");
  };

  const getFilteredMedicaments = () => {
    return mockMedicaments.filter(medicament => {
      const matchesSearch = searchDrug === "" || 
        medicament.nom.toLowerCase().includes(searchDrug.toLowerCase()) ||
        medicament.dci.toLowerCase().includes(searchDrug.toLowerCase());
      
      const matchesCategory = categoryFilter === "Tous" || 
        medicament.categorie === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critique":
        return "destructive";
      case "Élevée":
        return "destructive";
      case "Modérée":
        return "default";
      case "Faible":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "Critique":
        return <XCircle className="w-4 h-4" />;
      case "Élevée":
        return <AlertTriangle className="w-4 h-4" />;
      case "Modérée":
        return <Info className="w-4 h-4" />;
      case "Faible":
        return <Shield className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  const getSeverityPriority = (severity: string): number => {
    switch (severity) {
      case "Critique": return 4;
      case "Élevée": return 3;
      case "Modérée": return 2;
      case "Faible": return 1;
      default: return 0;
    }
  };

  // Tri des interactions par sévérité
  const sortedInteractions = [...selectedInteractions].sort(
    (a, b) => getSeverityPriority(b.severite) - getSeverityPriority(a.severite)
  );

  const filteredInteractions = severityFilter === "all" 
    ? sortedInteractions 
    : sortedInteractions.filter(inter => inter.severite === severityFilter);

  const commonDrugs = [
    "Aspirine 500mg", "Paracétamol 1g", "Ibuprofène 400mg", "Warfarine 5mg", 
    "Metformine 850mg", "Simvastatine 20mg", "Lisinopril 10mg", "Amlodipine 5mg", 
    "Oméprazole 20mg", "Clarithromycine 500mg", "Digoxine 0,25mg", "Amiodarone 200mg",
    "Fluconazole 150mg", "Théophylline 300mg", "Ciprofloxacine 500mg", "Lithium 400mg"
  ];

  const criticalInteractions = selectedInteractions.filter(i => i.severite === "Critique").length;
  const highInteractions = selectedInteractions.filter(i => i.severite === "Élevée").length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestion des Interactions Médicamenteuses</h2>
          <p className="text-muted-foreground">
            Vérification automatique des interactions et contre-indications
          </p>
        </div>
        <div className="flex items-center gap-4">
          {criticalInteractions > 0 && (
            <Alert className="border-destructive bg-destructive/5 w-auto">
              <XCircle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-destructive font-medium">
                {criticalInteractions} interaction(s) critique(s) détectée(s)
              </AlertDescription>
            </Alert>
          )}
          <Badge variant={selectedInteractions.length > 0 ? "destructive" : "outline"} className="gap-2">
            <Pill className="w-4 h-4" />
            {selectedInteractions.length} interaction(s) détectée(s)
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="checker">Vérificateur</TabsTrigger>
          <TabsTrigger value="database">Base de Données</TabsTrigger>
          <TabsTrigger value="medicaments">Médicaments</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
        </TabsList>

        {/* Onglet Vérificateur Principal */}
        <TabsContent value="checker" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Sélection des médicaments et patient */}
            <div className="lg:col-span-1">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="w-5 h-5 text-primary" />
                    Prescription Actuelle
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Sélection du patient */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Patient (optionnel)</label>
                    <Select onValueChange={(value) => {
                      const patient = mockPatients.find(p => p.id === value);
                      setSelectedPatient(patient || null);
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un patient" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockPatients.map((patient) => (
                          <SelectItem key={patient.id} value={patient.id}>
                            <div className="flex items-center gap-2">
                              <span>{patient.prenom} {patient.nom}</span>
                              {patient.allergie && patient.allergie.length > 0 && (
                                <Badge variant="destructive" className="text-xs">
                                  Allergies
                                </Badge>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedPatient && selectedPatient.allergie && selectedPatient.allergie.length > 0 && (
                      <Alert className="mt-2 border-destructive bg-destructive/5">
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                        <AlertDescription>
                          <strong>Allergies connues :</strong> {selectedPatient.allergie.join(", ")}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>

                  {/* Recherche de médicaments */}
                  <div className="space-y-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Rechercher par nom commercial ou DCI..."
                        value={searchDrug}
                        onChange={(e) => setSearchDrug(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    
                    {/* Filtres de catégories */}
                    <div className="flex flex-wrap gap-2">
                      {["Tous", "Cardiovasculaire", "Antibiotiques", "Antalgiques", "Psychiatrie"].map((category) => (
                        <Button
                          key={category}
                          variant={categoryFilter === category ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCategoryFilter(category)}
                          className="text-xs"
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Suggestions intelligentes basées sur le patient */}
                  {selectedPatient && (
                    <div className="border rounded-lg p-3 bg-blue-50/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">Suggestions pour ce patient</span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-blue-700">
                          Âge: {selectedPatient.age} ans | Poids: {selectedPatient.poids}kg
                        </p>
                        {selectedPatient.conditions && selectedPatient.conditions.length > 0 && (
                          <p className="text-xs text-blue-700">
                            Conditions: {selectedPatient.conditions.join(", ")}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Liste enrichie des médicaments */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-medium">Médicaments disponibles:</p>
                      <Badge variant="outline" className="text-xs">
                        {getFilteredMedicaments().length} résultats
                      </Badge>
                    </div>
                    <ScrollArea className="h-60">
                      <div className="space-y-2">
                        {getFilteredMedicaments().map((medicament) => {
                          const isSelected = currentPrescription.includes(medicament.nom);
                          const hasAllergy = selectedPatient?.allergie?.some(allergen => 
                            medicament.nom.toLowerCase().includes(allergen.toLowerCase()) ||
                            medicament.dci.toLowerCase().includes(allergen.toLowerCase())
                          );
                          const hasContraindication = selectedPatient?.conditions?.some(condition =>
                            medicament.contrindications?.some(contra => 
                              contra.toLowerCase().includes(condition.toLowerCase())
                            )
                          );

                          return (
                            <div key={medicament.nom} className="relative">
                              <Button
                                variant={isSelected ? "secondary" : "outline"}
                                size="sm"
                                onClick={() => addDrugToPrescription(medicament.nom)}
                                disabled={isSelected || hasAllergy || hasContraindication}
                                className={`w-full justify-start text-left p-3 h-auto ${
                                  hasAllergy ? 'border-red-300 bg-red-50' : 
                                  hasContraindication ? 'border-orange-300 bg-orange-50' :
                                  isSelected ? 'border-green-300 bg-green-50' : ''
                                }`}
                              >
                                <div className="flex items-start gap-3 w-full">
                                  <div className="flex-shrink-0 mt-0.5">
                                    {hasAllergy ? (
                                      <AlertTriangle className="w-4 h-4 text-red-500" />
                                    ) : hasContraindication ? (
                                      <AlertCircle className="w-4 h-4 text-orange-500" />
                                    ) : isSelected ? (
                                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                                    ) : (
                                      <Pill className="w-4 h-4 text-primary" />
                                    )}
                                  </div>
                                  <div className="flex-1 text-left space-y-1">
                                    <div className="flex items-center justify-between">
                                      <span className="font-medium text-sm">{medicament.nom}</span>
                                      <Badge variant={
                                        medicament.categorie === 'Cardiovasculaire' ? 'destructive' :
                                        medicament.categorie === 'Antibiotiques' ? 'default' :
                                        medicament.categorie === 'Antalgiques' ? 'secondary' :
                                        'outline'
                                      } className="text-xs">
                                        {medicament.categorie}
                                      </Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                      DCI: {medicament.dci} | {medicament.dosage}
                                    </p>
                                    {medicament.forme && (
                                      <p className="text-xs text-muted-foreground">
                                        Forme: {medicament.forme}
                                      </p>
                                    )}
                                    {hasAllergy && (
                                      <p className="text-xs text-red-600 font-medium">
                                        ⚠️ Allergie connue du patient
                                      </p>
                                    )}
                                    {hasContraindication && (
                                      <p className="text-xs text-orange-600 font-medium">
                                        ⚠️ Contre-indication possible
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </Button>
                              
                              {/* Dialog pour détails du médicament */}
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute top-1 right-1 h-6 w-6 p-0"
                                  >
                                    <Info className="w-3 h-3" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2">
                                      <Pill className="w-5 h-5" />
                                      {medicament.nom}
                                    </DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <h4 className="font-semibold text-sm mb-2">Informations générales</h4>
                                        <div className="space-y-1 text-sm">
                                          <p><strong>DCI:</strong> {medicament.dci}</p>
                                          <p><strong>Dosage:</strong> {medicament.dosage}</p>
                                          <p><strong>Forme:</strong> {medicament.forme}</p>
                                          <p><strong>Catégorie:</strong> {medicament.categorie}</p>
                                        </div>
                                      </div>
                                      <div>
                                        <h4 className="font-semibold text-sm mb-2">Voie d'administration</h4>
                                        <p className="text-sm">{medicament.voieAdministration}</p>
                                      </div>
                                    </div>
                                    
                                    {medicament.contrindications && medicament.contrindications.length > 0 && (
                                      <div>
                                        <h4 className="font-semibold text-sm mb-2 text-red-700">Contre-indications</h4>
                                        <ul className="text-sm space-y-1">
                                          {medicament.contrindications.map((contra, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                              <AlertTriangle className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />
                                              {contra}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}

                                    {medicament.effetsSecondaires && medicament.effetsSecondaires.length > 0 && (
                                      <div>
                                        <h4 className="font-semibold text-sm mb-2 text-orange-700">Effets secondaires</h4>
                                        <div className="text-sm space-y-1">
                                          {medicament.effetsSecondaires.map((effet, index) => (
                                            <span key={index} className="inline-block bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs mr-2 mb-1">
                                              {effet}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          );
                        })}
                      </div>
                    </ScrollArea>
                  </div>

                  {/* Prescription actuelle */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">Prescription en cours:</p>
                      {currentPrescription.length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearPrescription}
                          className="text-xs text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Vider
                        </Button>
                      )}
                    </div>
                    {currentPrescription.length > 0 ? (
                      <div className="space-y-2">
                        {currentPrescription.map((drug) => (
                          <div key={drug} className="flex items-center justify-between p-2 border rounded">
                            <span className="text-sm flex-1">{drug}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeDrugFromPrescription(drug)}
                              className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                        <div className="pt-2 space-y-2">
                          <Textarea
                            placeholder="Notes sur la prescription..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={2}
                          />
                          <Button
                            onClick={savePrescriptionToHistory}
                            size="sm"
                            className="w-full"
                          >
                            <History className="w-4 h-4 mr-2" />
                            Sauvegarder
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Aucun médicament sélectionné
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Résultats des interactions */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {/* Filtres */}
                {selectedInteractions.length > 0 && (
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Filter className="w-4 h-4" />
                          <label className="text-sm font-medium">Filtrer par sévérité:</label>
                        </div>
                        <Select value={severityFilter} onValueChange={setSeverityFilter}>
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Toutes</SelectItem>
                            <SelectItem value="Critique">Critique</SelectItem>
                            <SelectItem value="Élevée">Élevée</SelectItem>
                            <SelectItem value="Modérée">Modérée</SelectItem>
                            <SelectItem value="Faible">Faible</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Exporter PDF
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Interactions détectées */}
                {filteredInteractions.length > 0 ? (
                  <div className="space-y-4">
                    {filteredInteractions.map((interaction, index) => (
                      <Card key={index} className={`shadow-card border-l-4 ${
                        interaction.severite === "Critique" ? "border-l-red-500 bg-red-50/50" :
                        interaction.severite === "Élevée" ? "border-l-orange-500 bg-orange-50/50" :
                        interaction.severite === "Modérée" ? "border-l-yellow-500 bg-yellow-50/50" :
                        "border-l-blue-500 bg-blue-50/50"
                      }`}>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <div className={`p-1 rounded ${
                              interaction.severite === "Critique" ? "bg-red-100 text-red-600" :
                              interaction.severite === "Élevée" ? "bg-orange-100 text-orange-600" :
                              interaction.severite === "Modérée" ? "bg-yellow-100 text-yellow-600" : 
                              "bg-blue-100 text-blue-600"
                            }`}>
                              {getSeverityIcon(interaction.severite)}
                            </div>
                            Interaction Détectée
                            <Badge variant={getSeverityColor(interaction.severite)}>
                              {interaction.severite}
                            </Badge>
                            {interaction.severite === "Critique" && (
                              <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
                                CONTRE-INDICATION
                              </Badge>
                            )}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <p className="font-medium">Médicaments concernés:</p>
                              <div className="flex gap-2 flex-wrap">
                                <Badge variant="outline">{interaction.medicamentA}</Badge>
                                <span className="text-muted-foreground">+</span>
                                <Badge variant="outline">{interaction.medicamentB}</Badge>
                              </div>
                              {(interaction.dciA || interaction.dciB) && (
                                <div className="text-xs text-muted-foreground">
                                  DCI: {interaction.dciA} / {interaction.dciB}
                                </div>
                              )}
                            </div>
                            <div className="space-y-2">
                              <p className="font-medium">Informations:</p>
                              <div className="text-sm text-muted-foreground">
                                <p>ID: {interaction.id}</p>
                                <p>Mise à jour: {new Date(interaction.dateModification).toLocaleDateString('fr-FR')}</p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <p className="font-medium">Description du risque:</p>
                            <p className="text-sm bg-muted p-3 rounded-lg">
                              {interaction.description}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <p className="font-medium">Mécanisme d'action:</p>
                            <p className="text-sm bg-blue-50 p-3 rounded-lg border border-blue-200">
                              {interaction.mecanisme}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <p className="font-medium">Recommandation:</p>
                            <div className={`p-3 rounded-lg border ${
                              interaction.severite === "Critique" ? "bg-red-50 border-red-200" :
                              interaction.severite === "Élevée" ? "bg-orange-50 border-orange-200" :
                              interaction.severite === "Modérée" ? "bg-yellow-50 border-yellow-200" : 
                              "bg-blue-50 border-blue-200"
                            }`}>
                              <p className="text-sm font-medium">
                                {interaction.recommandation}
                              </p>
                            </div>
                          </div>

                          {interaction.alternative && (
                            <div className="space-y-2">
                              <p className="font-medium">Alternative suggérée:</p>
                              <p className="text-sm bg-green-50 p-3 rounded-lg border border-green-200">
                                {interaction.alternative}
                              </p>
                            </div>
                          )}

                          {interaction.surveillance && (
                            <div className="space-y-2">
                              <p className="font-medium">Surveillance requise:</p>
                              <div className="flex flex-wrap gap-1">
                                {interaction.surveillance.map((item, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {item}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {interaction.references && (
                            <div className="text-xs text-muted-foreground border-t pt-2">
                              <p><strong>Référence:</strong> {interaction.references}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : selectedInteractions.length > 0 ? (
                  <Card className="shadow-card">
                    <CardContent className="pt-6">
                      <div className="text-center py-4">
                        <Info className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Aucune interaction pour la sévérité sélectionnée
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ) : currentPrescription.length > 0 ? (
                  <Card className="shadow-card">
                    <CardContent className="pt-6">
                      <div className="text-center py-8">
                        <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                        <p className="text-lg font-medium text-green-600">Aucune interaction détectée</p>
                        <p className="text-muted-foreground">
                          La prescription actuelle ne présente pas d'interactions connues
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="shadow-card h-96 flex items-center justify-center">
                    <CardContent>
                      <div className="text-center">
                        <Pill className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-lg font-medium">Sélectionnez des médicaments</p>
                        <p className="text-muted-foreground">
                          Ajoutez des médicaments à la prescription pour vérifier les interactions
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Onglet Base de Données */}
        <TabsContent value="database" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Base de Données des Interactions
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Répertoire complet des interactions médicamenteuses connues
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockDrugInteractions.map((interaction, index) => (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <Card className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant={getSeverityColor(interaction.severite)} className="gap-1">
                              {getSeverityIcon(interaction.severite)}
                              {interaction.severite}
                            </Badge>
                            <Eye className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex gap-2 text-sm">
                              <Badge variant="outline" className="text-xs">{interaction.medicamentA}</Badge>
                              <span className="text-muted-foreground">+</span>
                              <Badge variant="outline" className="text-xs">{interaction.medicamentB}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {interaction.description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <div className={`p-1 rounded ${
                            interaction.severite === "Critique" ? "bg-red-100 text-red-600" :
                            interaction.severite === "Élevée" ? "bg-orange-100 text-orange-600" :
                            interaction.severite === "Modérée" ? "bg-yellow-100 text-yellow-600" : 
                            "bg-blue-100 text-blue-600"
                          }`}>
                            {getSeverityIcon(interaction.severite)}
                          </div>
                          Interaction Médicamenteuse
                          <Badge variant={getSeverityColor(interaction.severite)}>
                            {interaction.severite}
                          </Badge>
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <p className="font-medium mb-2">Médicaments:</p>
                            <div className="flex gap-2">
                              <Badge variant="outline">{interaction.medicamentA}</Badge>
                              <span>+</span>
                              <Badge variant="outline">{interaction.medicamentB}</Badge>
                            </div>
                            {(interaction.dciA || interaction.dciB) && (
                              <div className="text-xs text-muted-foreground mt-1">
                                DCI: {interaction.dciA} / {interaction.dciB}
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium mb-2">Référence:</p>
                            <p className="text-sm">{interaction.id}</p>
                            <p className="text-xs text-muted-foreground">
                              Mis à jour le {new Date(interaction.dateModification).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <p className="font-medium mb-2">Description:</p>
                          <p className="text-sm bg-muted p-3 rounded-lg">{interaction.description}</p>
                        </div>
                        
                        <div>
                          <p className="font-medium mb-2">Mécanisme:</p>
                          <p className="text-sm bg-blue-50 p-3 rounded-lg border border-blue-200">
                            {interaction.mecanisme}
                          </p>
                        </div>
                        
                        <div>
                          <p className="font-medium mb-2">Recommandation:</p>
                          <p className="text-sm bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                            {interaction.recommandation}
                          </p>
                        </div>
                        
                        {interaction.alternative && (
                          <div>
                            <p className="font-medium mb-2">Alternative:</p>
                            <p className="text-sm bg-green-50 p-3 rounded-lg border border-green-200">
                              {interaction.alternative}
                            </p>
                          </div>
                        )}
                        
                        {interaction.surveillance && (
                          <div>
                            <p className="font-medium mb-2">Surveillance:</p>
                            <div className="flex flex-wrap gap-1">
                              {interaction.surveillance.map((item, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {interaction.references && (
                          <div className="text-xs text-muted-foreground border-t pt-2">
                            <p><strong>Source:</strong> {interaction.references}</p>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Médicaments */}
        <TabsContent value="medicaments" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill className="w-5 h-5 text-primary" />
                Répertoire des Médicaments
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Informations détaillées sur les médicaments
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockMedicaments.map((medicament, index) => (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <Card className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-sm">{medicament.nom}</h3>
                              <Eye className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <p className="text-xs text-muted-foreground">{medicament.dci}</p>
                            <Badge variant="secondary" className="text-xs">{medicament.classe}</Badge>
                            <div className="flex gap-1">
                              <Badge 
                                variant={medicament.grossesse === "Autorisé" ? "default" : "destructive"} 
                                className="text-xs"
                              >
                                G: {medicament.grossesse}
                              </Badge>
                              <Badge 
                                variant={medicament.allaitement === "Autorisé" ? "default" : "destructive"} 
                                className="text-xs"
                              >
                                A: {medicament.allaitement}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{medicament.nom}</DialogTitle>
                        <p className="text-muted-foreground">{medicament.dci} - {medicament.classe}</p>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <p className="font-medium mb-2">Posologie:</p>
                          <p className="text-sm bg-muted p-3 rounded-lg">{medicament.posologie}</p>
                        </div>
                        
                        <div>
                          <p className="font-medium mb-2">Contre-indications:</p>
                          <div className="flex flex-wrap gap-1">
                            {medicament.contrindications.map((ci, idx) => (
                              <Badge key={idx} variant="destructive" className="text-xs">
                                {ci}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <p className="font-medium mb-2">Effets secondaires:</p>
                          <div className="flex flex-wrap gap-1">
                            {medicament.effetsSecondaires.map((es, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {es}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <p className="font-medium mb-2">Interactions principales:</p>
                          <div className="flex flex-wrap gap-1">
                            {medicament.interactions.map((inter, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {inter}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <p className="font-medium mb-2">Grossesse:</p>
                            <Badge 
                              variant={medicament.grossesse === "Autorisé" ? "default" : "destructive"}
                            >
                              {medicament.grossesse}
                            </Badge>
                          </div>
                          <div>
                            <p className="font-medium mb-2">Allaitement:</p>
                            <Badge 
                              variant={medicament.allaitement === "Autorisé" ? "default" : "destructive"}
                            >
                              {medicament.allaitement}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Historique */}
        <TabsContent value="history" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5 text-primary" />
                Historique des Vérifications
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Prescriptions précédemment vérifiées
              </p>
            </CardHeader>
            <CardContent>
              {prescriptionHistory.length > 0 ? (
                <div className="space-y-4">
                  {prescriptionHistory.map((entry, index) => (
                    <Card key={entry.id} className="shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                            <div>
                              <p className="font-medium">
                                {entry.patient ? `${entry.patient.prenom} ${entry.patient.nom}` : "Patient non spécifié"}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(entry.date).toLocaleDateString('fr-FR')} à {new Date(entry.date).toLocaleTimeString('fr-FR')}
                              </p>
                            </div>
                          </div>
                          <Badge variant={entry.interactions.length > 0 ? "destructive" : "default"}>
                            {entry.interactions.length} interaction(s)
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div>
                            <p className="text-sm font-medium mb-1">Médicaments:</p>
                            <div className="flex flex-wrap gap-1">
                              {entry.medicaments.map((med, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {med}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          {entry.interactions.length > 0 && (
                            <div>
                              <p className="text-sm font-medium mb-1">Interactions détectées:</p>
                              <div className="space-y-1">
                                {entry.interactions.map((inter, idx) => (
                                  <div key={idx} className="text-xs bg-muted p-2 rounded">
                                    <span className="font-medium">{inter.medicamentA} + {inter.medicamentB}</span>
                                    <span className="ml-2">
                                      <Badge variant={getSeverityColor(inter.severite)} className="text-xs">
                                        {inter.severite}
                                      </Badge>
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {entry.notes && (
                            <div>
                              <p className="text-sm font-medium mb-1">Notes:</p>
                              <p className="text-xs text-muted-foreground bg-muted p-2 rounded">
                                {entry.notes}
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <History className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium">Aucun historique</p>
                  <p className="text-muted-foreground">
                    Les prescriptions vérifiées apparaîtront ici
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InteractionsManager;