import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Search, Pill, Shield, Info } from "lucide-react";
import { mockDrugInteractions, type DrugInteraction } from "@/data/mockData";

export const InteractionsManager = () => {
  const [searchDrug, setSearchDrug] = useState("");
  const [selectedInteractions, setSelectedInteractions] = useState<DrugInteraction[]>([]);
  const [currentPrescription, setCurrentPrescription] = useState<string[]>([]);

  const addDrugToPrescription = (drug: string) => {
    if (!currentPrescription.includes(drug)) {
      const newPrescription = [...currentPrescription, drug];
      setCurrentPrescription(newPrescription);
      checkInteractions(newPrescription);
    }
  };

  const removeDrugFromPrescription = (drug: string) => {
    const newPrescription = currentPrescription.filter(d => d !== drug);
    setCurrentPrescription(newPrescription);
    checkInteractions(newPrescription);
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
            (inter.medicamentA === drugB && inter.medicamentB === drugA)
        );
        
        if (interaction) {
          interactions.push(interaction);
        }
      }
    }
    
    setSelectedInteractions(interactions);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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

  const commonDrugs = [
    "Aspirine", "Paracétamol", "Ibuprofène", "Warfarine", "Metformine", 
    "Simvastatine", "Lisinopril", "Amlodipine", "Oméprazole", "Clarithromycine"
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestion des Interactions Médicamenteuses</h2>
          <p className="text-muted-foreground">
            Vérification automatique des interactions et contre-indications
          </p>
        </div>
        <Badge variant="outline" className="gap-2">
          <Pill className="w-4 h-4" />
          {selectedInteractions.length} interaction(s) détectée(s)
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Drug Selection */}
        <div className="lg:col-span-1">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5 text-primary" />
                Prescription Actuelle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un médicament..."
                  value={searchDrug}
                  onChange={(e) => setSearchDrug(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Médicaments courants:</p>
                <div className="grid gap-2">
                  {commonDrugs
                    .filter(drug => 
                      drug.toLowerCase().includes(searchDrug.toLowerCase())
                    )
                    .map((drug) => (
                      <Button
                        key={drug}
                        variant="outline"
                        size="sm"
                        onClick={() => addDrugToPrescription(drug)}
                        disabled={currentPrescription.includes(drug)}
                        className="justify-start"
                      >
                        <Pill className="w-4 h-4 mr-2" />
                        {drug}
                      </Button>
                    ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Prescription en cours:</p>
                {currentPrescription.length > 0 ? (
                  <div className="space-y-2">
                    {currentPrescription.map((drug) => (
                      <div key={drug} className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">{drug}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeDrugFromPrescription(drug)}
                          className="h-6 w-6 p-0"
                        >
                          ×
                        </Button>
                      </div>
                    ))}
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

        {/* Interactions Results */}
        <div className="lg:col-span-2">
          {selectedInteractions.length > 0 ? (
            <div className="space-y-4">
              {selectedInteractions.map((interaction, index) => (
                <Card key={index} className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className={`p-1 rounded ${
                        interaction.severite === "Élevée" ? "bg-destructive/10" :
                        interaction.severite === "Modérée" ? "bg-warning/10" : "bg-secondary/10"
                      }`}>
                        {getSeverityIcon(interaction.severite)}
                      </div>
                      Interaction Détectée
                      <Badge variant={getSeverityColor(interaction.severite)}>
                        {interaction.severite}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <p className="font-medium">Médicaments concernés:</p>
                        <div className="flex gap-2">
                          <Badge variant="outline">{interaction.medicamentA}</Badge>
                          <span className="text-muted-foreground">+</span>
                          <Badge variant="outline">{interaction.medicamentB}</Badge>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="font-medium">Niveau de sévérité:</p>
                        <Badge variant={getSeverityColor(interaction.severite)} className="gap-1">
                          {getSeverityIcon(interaction.severite)}
                          {interaction.severite}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="font-medium">Description du risque:</p>
                      <p className="text-sm bg-muted p-3 rounded-lg">
                        {interaction.description}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="font-medium">Recommandation:</p>
                      <div className={`p-3 rounded-lg border ${
                        interaction.severite === "Élevée" ? "bg-destructive/5 border-destructive/20" :
                        interaction.severite === "Modérée" ? "bg-warning/5 border-warning/20" : 
                        "bg-success/5 border-success/20"
                      }`}>
                        <p className="text-sm font-medium">
                          {interaction.recommandation}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : currentPrescription.length > 0 ? (
            <Card className="shadow-card">
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <Shield className="w-12 h-12 text-success mx-auto mb-4" />
                  <p className="text-lg font-medium text-success">Aucune interaction détectée</p>
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

      {/* All Known Interactions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            Base de Données des Interactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockDrugInteractions.map((interaction, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={getSeverityColor(interaction.severite)} className="gap-1">
                    {getSeverityIcon(interaction.severite)}
                    {interaction.severite}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex gap-2 text-sm">
                    <Badge variant="outline" className="text-xs">{interaction.medicamentA}</Badge>
                    <span className="text-muted-foreground">+</span>
                    <Badge variant="outline" className="text-xs">{interaction.medicamentB}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {interaction.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};