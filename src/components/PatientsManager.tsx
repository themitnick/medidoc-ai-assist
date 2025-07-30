import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, User, Phone, Mail, AlertTriangle } from "lucide-react";
import { mockPatients, type Patient } from "@/data/mockData";
import { NouveauPatient } from "@/components/NouveauPatient";

export const PatientsManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patients, setPatients] = useState<Patient[]>(mockPatients);

  const handlePatientAdded = (newPatient: Patient) => {
    setPatients([...patients, newPatient]);
  };

  const filteredPatients = patients.filter(patient =>
    `${patient.prenom} ${patient.nom}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.numeroSecu.includes(searchTerm)
  );

  const calculateAge = (dateNaissance: string) => {
    return new Date().getFullYear() - new Date(dateNaissance).getFullYear();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestion des Patients</h2>
          <p className="text-muted-foreground">
            {patients.length} patients enregistrés
          </p>
        </div>
        <NouveauPatient onPatientAdded={handlePatientAdded} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Patients List */}
        <div className="lg:col-span-1">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Liste des Patients</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par nom ou n° sécu..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredPatients.map((patient) => (
                  <button
                    key={patient.id}
                    onClick={() => setSelectedPatient(patient)}
                    className={`w-full p-3 text-left rounded-lg border transition-colors ${
                      selectedPatient?.id === patient.id 
                        ? "bg-primary/5 border-primary" 
                        : "hover:bg-accent"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{patient.prenom} {patient.nom}</p>
                        <p className="text-sm text-muted-foreground">
                          {calculateAge(patient.dateNaissance)} ans - {patient.sexe === "M" ? "H" : "F"}
                        </p>
                      </div>
                      {patient.allergie && patient.allergie.length > 0 && (
                        <AlertTriangle className="w-4 h-4 text-warning" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Patient Details */}
        <div className="lg:col-span-2">
          {selectedPatient ? (
            <div className="space-y-6">
              {/* Patient Info */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    {selectedPatient.prenom} {selectedPatient.nom}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Date de naissance:</span>
                        <span>{new Date(selectedPatient.dateNaissance).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Âge:</span>
                        <span>{calculateAge(selectedPatient.dateNaissance)} ans</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Sexe:</span>
                        <span>{selectedPatient.sexe === "M" ? "Masculin" : "Féminin"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedPatient.telephone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedPatient.email}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium">Numéro Sécurité Sociale:</span>
                        <p className="font-mono text-sm">{selectedPatient.numeroSecu}</p>
                      </div>
                      <div>
                        <span className="font-medium">Adresse:</span>
                        <p className="text-sm">{selectedPatient.adresse}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Medical Info */}
              <div className="grid gap-6 md:grid-cols-3">
                {/* Allergies */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-warning" />
                      Allergies
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedPatient.allergie && selectedPatient.allergie.length > 0 ? (
                      <div className="space-y-2">
                        {selectedPatient.allergie.map((allergie, index) => (
                          <Badge key={index} variant="destructive" className="block w-fit">
                            {allergie}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Aucune allergie connue</p>
                    )}
                  </CardContent>
                </Card>

                {/* Antécédents */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Antécédents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedPatient.antecedents && selectedPatient.antecedents.length > 0 ? (
                      <div className="space-y-2">
                        {selectedPatient.antecedents.map((antecedent, index) => (
                          <Badge key={index} variant="secondary" className="block w-fit">
                            {antecedent}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Aucun antécédent</p>
                    )}
                  </CardContent>
                </Card>

                {/* Traitements */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Traitements Actuels</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedPatient.traitements && selectedPatient.traitements.length > 0 ? (
                      <div className="space-y-2">
                        {selectedPatient.traitements.map((traitement, index) => (
                          <Badge key={index} variant="outline" className="block w-fit">
                            {traitement}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Aucun traitement en cours</p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Actions */}
              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <div className="flex gap-3">
                    <Button className="gap-2">
                      <Plus className="w-4 h-4" />
                      Nouvelle Consultation
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <User className="w-4 h-4" />
                      Modifier le Profil
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Vérifier Interactions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="shadow-card h-96 flex items-center justify-center">
              <CardContent>
                <div className="text-center">
                  <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium">Sélectionnez un patient</p>
                  <p className="text-muted-foreground">
                    Choisissez un patient dans la liste pour voir ses détails
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};