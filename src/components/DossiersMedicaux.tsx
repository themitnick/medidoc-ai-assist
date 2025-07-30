import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Search, 
  Plus, 
  Calendar, 
  User, 
  Heart, 
  Pill, 
  AlertTriangle,
  Eye,
  Edit,
  Download
} from "lucide-react";
import { mockPatients, mockConsultations, Patient, Consultation } from "@/data/mockData";
import { UserRole } from "@/types/auth";
import { NouveauDossier } from "@/components/NouveauDossier";

interface DossiersMedicauxProps {
  userRole: UserRole;
}

interface DossierMedical {
  id: string;
  patientId: string;
  dateCreation: string;
  derniereModification: string;
  antecedents: string[];
  allergies: string[];
  traitements: string[];
  consultations: Consultation[];
  examens: {
    date: string;
    type: string;
    resultat: string;
    medecin: string;
  }[];
  notes: string;
}

export const DossiersMedicaux = ({ userRole }: DossiersMedicauxProps) => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("liste");
  const [dossiers, setDossiers] = useState<DossierMedical[]>(() => 
    mockPatients.map(patient => ({
      id: `dossier-${patient.id}`,
      patientId: patient.id,
      dateCreation: "2023-01-15",
      derniereModification: new Date().toISOString().split('T')[0],
      antecedents: patient.antecedents || [],
      allergies: patient.allergie || [],
      traitements: patient.traitements || [],
      consultations: mockConsultations.filter(c => c.patientId === patient.id),
      examens: [
        {
          date: "2025-01-15",
          type: "Analyse sanguine",
          resultat: "Normal",
          medecin: "Dr. Koné"
        }
      ],
      notes: "Patient suivi régulièrement. Bon état général."
    }))
  );

  const handleDossierCreated = (newDossier: DossierMedical) => {
    setDossiers([...dossiers, newDossier]);
  };

  // Mock dossiers médicaux - remplacé par state dossiers

  const filteredPatients = mockPatients.filter(patient =>
    `${patient.prenom} ${patient.nom}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.numeroSecu.includes(searchTerm)
  );

  const selectedDossier = selectedPatient 
    ? dossiers.find(d => d.patientId === selectedPatient.id)
    : null;

  const canModifyDossiers = userRole === "medecin" || userRole === "admin";
  const canViewAllDossiers = userRole === "medecin" || userRole === "admin";

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dossiers Médicaux</h2>
          <p className="text-muted-foreground">
            Gestion et consultation des dossiers patients
          </p>
        </div>
        {canModifyDossiers && (
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nouveau Dossier
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="liste">Liste des Dossiers</TabsTrigger>
          {selectedPatient && (
            <TabsTrigger value="details">Dossier Détaillé</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="liste" className="space-y-6">
          {/* Barre de recherche */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par nom, prénom ou numéro de sécurité sociale..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline">
                  Rechercher
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Liste des patients */}
          <div className="grid gap-4">
            {filteredPatients.map((patient) => {
              const dossier = dossiers.find(d => d.patientId === patient.id);
              const consultationsCount = dossier?.consultations.length || 0;
              
              return (
                <Card key={patient.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-medical-light rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-medical-blue" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">
                            {patient.prenom} {patient.nom}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Né(e) le {new Date(patient.dateNaissance).toLocaleDateString('fr-FR')} - 
                            {patient.sexe === 'M' ? ' Homme' : ' Femme'}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            N° Sécu: {patient.numeroSecu}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{consultationsCount} consultation(s)</p>
                          <p className="text-xs text-muted-foreground">
                            Dernière modification: {dossier?.derniereModification}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {patient.allergie && patient.allergie.length > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              Allergies
                            </Badge>
                          )}
                          {patient.traitements && patient.traitements.length > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              Traitements
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedPatient(patient);
                              setActiveTab("details");
                            }}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Voir
                          </Button>
                          {canModifyDossiers && (
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-1" />
                              Modifier
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          {selectedPatient && selectedDossier && (
            <>
              {/* En-tête du dossier */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-medical-light rounded-full flex items-center justify-center">
                        <User className="h-8 w-8 text-medical-blue" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">
                          {selectedPatient.prenom} {selectedPatient.nom}
                        </CardTitle>
                        <p className="text-muted-foreground">
                          Dossier médical - Créé le {new Date(selectedDossier.dateCreation).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Exporter PDF
                      </Button>
                      {canModifyDossiers && (
                        <Button size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Modifier
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Informations personnelles */}
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
                        <Label className="text-sm font-medium">Date de naissance</Label>
                        <p className="text-sm text-muted-foreground">
                          {new Date(selectedPatient.dateNaissance).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Sexe</Label>
                        <p className="text-sm text-muted-foreground">
                          {selectedPatient.sexe === 'M' ? 'Homme' : 'Femme'}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Téléphone</Label>
                        <p className="text-sm text-muted-foreground">{selectedPatient.telephone}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Email</Label>
                        <p className="text-sm text-muted-foreground">{selectedPatient.email}</p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Adresse</Label>
                      <p className="text-sm text-muted-foreground">{selectedPatient.adresse}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">N° Sécurité Sociale</Label>
                      <p className="text-sm text-muted-foreground">{selectedPatient.numeroSecu}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Antécédents et allergies */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Antécédents & Allergies
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Antécédents médicaux</Label>
                      <div className="mt-2 space-y-1">
                        {selectedDossier.antecedents.length > 0 ? (
                          selectedDossier.antecedents.map((antecedent, index) => (
                            <Badge key={index} variant="secondary" className="mr-2 mb-1">
                              {antecedent}
                            </Badge>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">Aucun antécédent connu</p>
                        )}
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <Label className="text-sm font-medium">Allergies</Label>
                      <div className="mt-2 space-y-1">
                        {selectedDossier.allergies.length > 0 ? (
                          selectedDossier.allergies.map((allergie, index) => (
                            <Badge key={index} variant="destructive" className="mr-2 mb-1">
                              {allergie}
                            </Badge>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">Aucune allergie connue</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Traitements en cours */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Pill className="h-5 w-5" />
                      Traitements en Cours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedDossier.traitements.length > 0 ? (
                      <div className="space-y-2">
                        {selectedDossier.traitements.map((traitement, index) => (
                          <div key={index} className="p-3 bg-muted/50 rounded-lg">
                            <p className="font-medium">{traitement}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Aucun traitement en cours</p>
                    )}
                  </CardContent>
                </Card>

                {/* Consultations récentes */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Consultations Récentes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-48">
                      {selectedDossier.consultations.length > 0 ? (
                        <div className="space-y-3">
                          {selectedDossier.consultations.slice(0, 5).map((consultation) => (
                            <div key={consultation.id} className="p-3 bg-muted/50 rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                <p className="font-medium">{consultation.motif}</p>
                                <Badge variant="outline" className="text-xs">
                                  {new Date(consultation.date).toLocaleDateString('fr-FR')}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">
                                Diagnostic: {consultation.diagnostic}
                              </p>
                              {consultation.symptomes.length > 0 && (
                                <p className="text-xs text-muted-foreground">
                                  Symptômes: {consultation.symptomes.join(', ')}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">Aucune consultation enregistrée</p>
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>

              {/* Notes du dossier */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Notes du Dossier
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {canModifyDossiers ? (
                    <Textarea
                      placeholder="Ajouter des notes au dossier..."
                      value={selectedDossier.notes}
                      rows={4}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {selectedDossier.notes || "Aucune note disponible"}
                    </p>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
