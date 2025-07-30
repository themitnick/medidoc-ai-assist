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
  Heart,
  Plus
} from "lucide-react";
import { mockPatients, mockConsultations, mockRendezVous, Patient, type RendezVous } from "@/data/mockData";
import { PriseRendezVous } from "./PriseRendezVous";

interface PatientPortailProps {
  patientId: string;
}

export const PatientPortail = ({ patientId }: PatientPortailProps) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [rendezVous, setRendezVous] = useState<RendezVous[]>(mockRendezVous);
  
  // Simuler la récupération des données du patient connecté
  const patient = mockPatients.find(p => p.id === patientId) || mockPatients[0];
  const patientConsultations = mockConsultations.filter(c => c.patientId === patient.id);
  const patientRendezVous = rendezVous.filter(rdv => rdv.patientId === patient.id);

  const handleRendezVousCreated = (nouveauRendezVous: RendezVous) => {
    setRendezVous(prev => [...prev, nouveauRendezVous]);
  };

  const prochainRendezVous = patientRendezVous
    .filter(rdv => new Date(rdv.date) >= new Date() && rdv.statut !== "Annulé")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 2);

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

  const resultatsExamens = [
    {
      id: "1",
      type: "Prise de sang",
      date: "2025-01-22",
      statut: "Disponible",
      medecin: "Dr. Koné",
      resultats: {
        glucose: { valeur: "0.92 g/L", normal: true },
        cholesterol: { valeur: "1.95 g/L", normal: true },
        triglycerides: { valeur: "1.2 g/L", normal: false }
      }
    },
    {
      id: "2", 
      type: "ECG",
      date: "2025-01-20",
      statut: "Disponible",
      medecin: "Dr. Ouattara",
      interpretation: "Rythme sinusal normal, pas d'anomalie détectée"
    },
    {
      id: "3",
      type: "Radio thorax",
      date: "2025-01-25",
      statut: "En attente",
      medecin: "Dr. Koné",
      interpretation: null
    }
  ];

  const renderDashboard = () => (
    <div className="space-y-4 sm:space-y-6">
      {/* Accueil du patient */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-medical-light rounded-full flex items-center justify-center">
              <User className="h-6 w-6 sm:h-8 sm:w-8 text-medical-blue" />
            </div>
            <div className="text-center sm:text-left">
              <CardTitle className="text-xl sm:text-2xl">
                Bonjour {patient.prenom} {patient.nom}
              </CardTitle>
              <p className="text-sm sm:text-base text-muted-foreground">
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

      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Prochain rendez-vous */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5" />
              Mes Rendez-vous
            </CardTitle>
          </CardHeader>
          <CardContent>
            {patientRendezVous.length > 0 ? (
              <div className="space-y-3">
                {/* Prochains rendez-vous */}
                {prochainRendezVous.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm text-green-700 mb-2">📅 Prochains rendez-vous</h4>
                    {prochainRendezVous.map((rdv) => (
                      <div key={rdv.id} className="p-3 bg-green-50 rounded-lg border border-green-200 mb-2">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                          <p className="font-medium text-sm">{rdv.type}</p>
                          <Badge variant="default" className="text-xs mt-1 sm:mt-0 w-fit">
                            {new Date(rdv.date).toLocaleDateString('fr-FR')}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            <span>{rdv.heure}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="h-3 w-3" />
                            <span>{rdv.medecinNom} {rdv.medecinPrenom}</span>
                          </div>
                        </div>
                        <div className="mt-2 flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                          <Button size="sm" variant="outline" className="text-xs h-7">
                            Annuler
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs h-7">
                            Reporter
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Rendez-vous passés récents */}
                {patientRendezVous.filter(rdv => new Date(rdv.date) < new Date()).length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm text-blue-700 mb-2">📋 Derniers rendez-vous</h4>
                    {patientRendezVous
                      .filter(rdv => new Date(rdv.date) < new Date())
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .slice(0, 2)
                      .map((rdv) => (
                        <div key={rdv.id} className="p-3 bg-blue-50 rounded-lg border border-blue-200 mb-2">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                            <p className="font-medium text-sm">{rdv.type}</p>
                            <Badge variant="secondary" className="text-xs mt-1 sm:mt-0 w-fit">
                              {new Date(rdv.date).toLocaleDateString('fr-FR')}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            <span>{rdv.medecinNom} {rdv.medecinPrenom} - {rdv.heure}</span>
                          </div>
                          <Badge variant="outline" className="text-xs mt-1 bg-green-100 text-green-800">
                            Terminé
                          </Badge>
                        </div>
                      ))
                    }
                  </div>
                )}

                <Button 
                  size="sm" 
                  className="w-full mt-3" 
                  onClick={() => setActiveTab("rendezvous")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Prendre un nouveau rendez-vous
                </Button>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground mb-3">Aucun rendez-vous programmé</p>
                <Button 
                  size="sm" 
                  onClick={() => setActiveTab("rendezvous")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Prendre mon premier rendez-vous
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Prescriptions actives */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Pill className="h-5 w-5" />
              Mes Traitements
            </CardTitle>
          </CardHeader>
          <CardContent>
            {prescriptionsActives.length > 0 ? (
              <div className="space-y-3">
                {prescriptionsActives.map((prescription) => (
                  <div key={prescription.id} className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-medium text-sm">{prescription.medicament}</p>
                    <p className="text-xs text-muted-foreground">{prescription.posologie}</p>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-2 space-y-1 sm:space-y-0">
                      <span className="text-xs text-muted-foreground">
                        Prescrit par {prescription.medecin}
                      </span>
                      <Badge variant="secondary" className="text-xs w-fit">
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

      {/* Mes derniers résultats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Mes Derniers Résultats
          </CardTitle>
        </CardHeader>
        <CardContent>
          {resultatsExamens.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-1 lg:grid-cols-2">
              {resultatsExamens.slice(0, 4).map((resultat) => (
                <div key={resultat.id} className="p-3 bg-muted/50 rounded-lg border">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <div>
                      <p className="font-medium text-sm">{resultat.type}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(resultat.date).toLocaleDateString('fr-FR')} - {resultat.medecin}
                      </p>
                    </div>
                    <Badge 
                      variant={resultat.statut === "Disponible" ? "default" : "secondary"} 
                      className="text-xs mt-1 sm:mt-0 w-fit"
                    >
                      {resultat.statut}
                    </Badge>
                  </div>
                  
                  {resultat.statut === "Disponible" && (
                    <div className="mt-2">
                      {resultat.resultats && (
                        <div className="space-y-1">
                          {Object.entries(resultat.resultats).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center text-xs">
                              <span className="capitalize">{key}:</span>
                              <span className={value.normal ? "text-green-600" : "text-orange-600"}>
                                {value.valeur} {value.normal ? "✓" : "⚠"}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {resultat.interpretation && (
                        <p className="text-xs text-green-600 mt-1">
                          ✓ {resultat.interpretation}
                        </p>
                      )}
                      
                      <Button size="sm" variant="outline" className="mt-2 text-xs h-7">
                        Voir détail
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Aucun résultat disponible</p>
          )}
        </CardContent>
      </Card>

      {/* Actions rapides */}
      <Card>
        <CardHeader>
          <CardTitle>Actions Rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <Button 
              variant="outline" 
              className="h-16 sm:h-20 flex-col gap-1 sm:gap-2 p-2"
              onClick={() => setActiveTab("rendezvous")}
            >
              <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-xs">Prendre RDV</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-16 sm:h-20 flex-col gap-1 sm:gap-2 p-2"
              onClick={() => setActiveTab("consultations")}
            >
              <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-xs">Mes Résultats</span>
            </Button>
            <Button variant="outline" className="h-16 sm:h-20 flex-col gap-1 sm:gap-2 p-2">
              <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-xs">Contacter</span>
            </Button>
            <Button variant="outline" className="h-16 sm:h-20 flex-col gap-1 sm:gap-2 p-2">
              <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
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
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Mon Espace Patient</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Gérez vos rendez-vous et consultez vos informations médicales
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto">
          <TabsTrigger value="dashboard" className="text-xs sm:text-sm p-2 sm:p-3">Accueil</TabsTrigger>
          <TabsTrigger value="rendezvous" className="text-xs sm:text-sm p-2 sm:p-3">Rendez-vous</TabsTrigger>
          <TabsTrigger value="consultations" className="text-xs sm:text-sm p-2 sm:p-3">Consultations</TabsTrigger>
          <TabsTrigger value="informations" className="text-xs sm:text-sm p-2 sm:p-3">Informations</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          {renderDashboard()}
        </TabsContent>

        <TabsContent value="rendezvous">
          <PriseRendezVous 
            patientId={patient.id} 
            onRendezVousCreated={handleRendezVousCreated}
          />
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
