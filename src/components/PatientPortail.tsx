import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Calendar, 
  User, 
  FileText, 
  Pill, 
  Phone, 
  Mail,
  Clock,
  MapPin,
  Heart
} from "lucide-react";
import { mockPatients, mockConsultations, Patient } from "@/data/mockData";

interface PatientPortailProps {
  patientId: string;
}

export const PatientPortail = ({ patientId }: PatientPortailProps) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Simuler la récupération des données du patient connecté
  const patient = mockPatients.find(p => p.id === patientId) || mockPatients[0];
  const patientConsultations = mockConsultations.filter(c => c.patientId === patient.id);

  const prochainRendezVous = [
    {
      id: "1",
      date: "2025-02-15",
      heure: "14:30",
      medecin: "Dr. Koné",
      specialite: "Cardiologie",
      type: "Consultation de suivi",
      lieu: "Cabinet médical - Salle 3"
    },
    {
      id: "2",
      date: "2025-02-28",
      heure: "09:00",
      medecin: "Dr. Ouattara",
      specialite: "Biologie",
      type: "Prise de sang",
      lieu: "Laboratoire - Étage 1"
    }
  ];

  const prescriptionsActives = [
    {
      id: "1",
      medicament: "Doliprane 1000mg",
      posologie: "1 comprimé matin et soir",
      duree: "7 jours",
      dateDebut: "2025-01-20",
      medecin: "Dr. Koné"
    },
    {
      id: "2",
      medicament: "Ventoline",
      posologie: "2 bouffées si besoin",
      duree: "En continu",
      dateDebut: "2025-01-15",
      medecin: "Dr. Ouattara"
    }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Accueil du patient */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-medical-light rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-medical-blue" />
            </div>
            <div>
              <CardTitle className="text-2xl">
                Bonjour {patient.prenom} {patient.nom}
              </CardTitle>
              <p className="text-muted-foreground">
                Bienvenue sur votre espace patient FER MediDoc AI
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Alertes importantes */}
      {patient.allergie && patient.allergie.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="font-medium text-yellow-800">Allergies connues</p>
                <p className="text-sm text-yellow-700">
                  {patient.allergie.join(", ")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Prochain rendez-vous */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Prochain Rendez-vous
            </CardTitle>
          </CardHeader>
          <CardContent>
            {prochainRendezVous.length > 0 ? (
              <div className="space-y-4">
                {prochainRendezVous.slice(0, 2).map((rdv) => (
                  <div key={rdv.id} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium">{rdv.type}</p>
                      <Badge variant="default" className="text-xs">
                        {new Date(rdv.date).toLocaleDateString('fr-FR')}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        <span>{rdv.heure}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3" />
                        <span>{rdv.medecin} - {rdv.specialite}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        <span>{rdv.lieu}</span>
                      </div>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <Button size="sm" variant="outline">
                        Annuler
                      </Button>
                      <Button size="sm" variant="outline">
                        Reporter
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Aucun rendez-vous programmé</p>
            )}
          </CardContent>
        </Card>

        {/* Prescriptions actives */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pill className="h-5 w-5" />
              Mes Traitements
            </CardTitle>
          </CardHeader>
          <CardContent>
            {prescriptionsActives.length > 0 ? (
              <div className="space-y-3">
                {prescriptionsActives.map((prescription) => (
                  <div key={prescription.id} className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-medium">{prescription.medicament}</p>
                    <p className="text-sm text-muted-foreground">{prescription.posologie}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-muted-foreground">
                        Prescrit par {prescription.medecin}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {prescription.duree}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Aucun traitement en cours</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Actions rapides */}
      <Card>
        <CardHeader>
          <CardTitle>Actions Rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Calendar className="h-6 w-6" />
              <span className="text-xs">Prendre RDV</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <FileText className="h-6 w-6" />
              <span className="text-xs">Mes Résultats</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Mail className="h-6 w-6" />
              <span className="text-xs">Contacter</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Phone className="h-6 w-6" />
              <span className="text-xs">Urgence</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderMesConsultations = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Historique des Consultations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          {patientConsultations.length > 0 ? (
            <div className="space-y-4">
              {patientConsultations.map((consultation) => (
                <div key={consultation.id} className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-medium">{consultation.motif}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(consultation.date).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <Badge variant="outline">
                      Terminée
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Diagnostic: </span>
                      <span className="text-muted-foreground">{consultation.diagnostic}</span>
                    </div>
                    
                    {consultation.symptomes.length > 0 && (
                      <div>
                        <span className="font-medium">Symptômes: </span>
                        <span className="text-muted-foreground">
                          {consultation.symptomes.join(", ")}
                        </span>
                      </div>
                    )}
                    
                    {consultation.prescriptions.length > 0 && (
                      <div>
                        <span className="font-medium">Prescriptions: </span>
                        <div className="mt-1 space-y-1">
                          {consultation.prescriptions.map((prescription, index) => (
                            <div key={index} className="text-xs bg-blue-50 p-2 rounded">
                              {prescription.medicament} - {prescription.dosage} - {prescription.frequence}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {consultation.notes && (
                      <div>
                        <span className="font-medium">Notes: </span>
                        <span className="text-muted-foreground">{consultation.notes}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Aucune consultation enregistrée</p>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );

  const renderMesInformations = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Mes Informations Personnelles
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Nom complet</p>
            <p className="text-sm text-muted-foreground">{patient.prenom} {patient.nom}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Date de naissance</p>
            <p className="text-sm text-muted-foreground">
              {new Date(patient.dateNaissance).toLocaleDateString('fr-FR')}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Sexe</p>
            <p className="text-sm text-muted-foreground">
              {patient.sexe === 'M' ? 'Homme' : 'Femme'}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">N° Sécurité Sociale</p>
            <p className="text-sm text-muted-foreground">{patient.numeroSecu}</p>
          </div>
        </div>
        
        <div>
          <p className="text-sm font-medium">Adresse</p>
          <p className="text-sm text-muted-foreground">{patient.adresse}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Téléphone</p>
            <p className="text-sm text-muted-foreground">{patient.telephone}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Email</p>
            <p className="text-sm text-muted-foreground">{patient.email}</p>
          </div>
        </div>

        {patient.allergie && patient.allergie.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2">Allergies connues</p>
            <div className="flex flex-wrap gap-2">
              {patient.allergie.map((allergie, index) => (
                <Badge key={index} variant="destructive" className="text-xs">
                  {allergie}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {patient.antecedents && patient.antecedents.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2">Antécédents médicaux</p>
            <div className="flex flex-wrap gap-2">
              {patient.antecedents.map((antecedent, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {antecedent}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Mon Espace Patient</h2>
          <p className="text-muted-foreground">
            Gérez vos rendez-vous et consultez vos informations médicales
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="dashboard">Accueil</TabsTrigger>
          <TabsTrigger value="consultations">Mes Consultations</TabsTrigger>
          <TabsTrigger value="informations">Mes Informations</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          {renderDashboard()}
        </TabsContent>

        <TabsContent value="consultations">
          {renderMesConsultations()}
        </TabsContent>

        <TabsContent value="informations">
          {renderMesInformations()}
        </TabsContent>
      </Tabs>
    </div>
  );
};
