export interface Patient {
  id: string;
  nom: string;
  prenom: string;
  dateNaissance: string;
  sexe: "M" | "F";
  telephone: string;
  email: string;
  adresse: string;
  numeroSecu: string;
  allergie?: string[];
  antecedents?: string[];
  traitements?: string[];
}

export interface Consultation {
  id: string;
  patientId: string;
  date: string;
  motif: string;
  symptomes: string[];
  diagnostic: string;
  prescriptions: Prescription[];
  examens?: string[];
  notes: string;
}

export interface Prescription {
  id: string;
  medicament: string;
  dosage: string;
  frequence: string;
  duree: string;
  interactions?: string[];
}

export interface DrugInteraction {
  medicamentA: string;
  medicamentB: string;
  severite: "Faible" | "Modérée" | "Élevée";
  description: string;
  recommandation: string;
}

export const mockPatients: Patient[] = [
  {
    id: "1",
    nom: "Dubois",
    prenom: "Marie",
    dateNaissance: "1985-03-15",
    sexe: "F",
    telephone: "0123456789",
    email: "marie.dubois@email.com",
    adresse: "123 Rue de la Santé, 75014 Paris",
    numeroSecu: "2850315123456",
    allergie: ["Pénicilline", "Aspirine"],
    antecedents: ["Hypertension", "Diabète type 2"],
    traitements: ["Metformine 850mg", "Lisinopril 10mg"]
  },
  {
    id: "2",
    nom: "Martin",
    prenom: "Jean",
    dateNaissance: "1978-07-22",
    sexe: "M",
    telephone: "0987654321",
    email: "jean.martin@email.com",
    adresse: "456 Avenue des Roses, 69001 Lyon",
    numeroSecu: "1780722234567",
    allergie: ["Latex"],
    antecedents: ["Asthme"],
    traitements: ["Ventoline", "Symbicort"]
  },
  {
    id: "3",
    nom: "Leroy",
    prenom: "Sophie",
    dateNaissance: "1992-12-03",
    sexe: "F",
    telephone: "0456789123",
    email: "sophie.leroy@email.com",
    adresse: "789 Boulevard de l'Espoir, 13001 Marseille",
    numeroSecu: "2921203345678",
    allergie: [],
    antecedents: ["Migraine chronique"],
    traitements: ["Sumatriptan"]
  }
];

export const mockConsultations: Consultation[] = [
  {
    id: "1",
    patientId: "1",
    date: "2024-01-15",
    motif: "Contrôle diabète",
    symptomes: ["Fatigue", "Soif excessive"],
    diagnostic: "Diabète type 2 déséquilibré",
    prescriptions: [
      {
        id: "1",
        medicament: "Metformine",
        dosage: "1000mg",
        frequence: "2 fois par jour",
        duree: "3 mois"
      }
    ],
    examens: ["Glycémie à jeun", "HbA1c"],
    notes: "Amélioration du régime alimentaire recommandée"
  },
  {
    id: "2",
    patientId: "2",
    date: "2024-01-10",
    motif: "Crise d'asthme",
    symptomes: ["Dyspnée", "Sifflement", "Toux"],
    diagnostic: "Exacerbation asthmatique",
    prescriptions: [
      {
        id: "2",
        medicament: "Prednisolone",
        dosage: "20mg",
        frequence: "1 fois par jour",
        duree: "5 jours"
      }
    ],
    examens: ["Spirométrie"],
    notes: "Revoir technique d'inhalation"
  }
];

export const mockDrugInteractions: DrugInteraction[] = [
  {
    medicamentA: "Warfarine",
    medicamentB: "Aspirine",
    severite: "Élevée",
    description: "Risque d'hémorragie majeure",
    recommandation: "Surveillance étroite de l'INR, envisager une alternative"
  },
  {
    medicamentA: "Metformine",
    medicamentB: "Contraste iodé",
    severite: "Modérée",
    description: "Risque d'acidose lactique",
    recommandation: "Arrêter la metformine 48h avant l'examen"
  },
  {
    medicamentA: "Simvastatine",
    medicamentB: "Clarithromycine",
    severite: "Élevée",
    description: "Risque de rhabdomyolyse",
    recommandation: "Arrêter temporairement la simvastatine"
  }
];

export const mockDiagnosticSuggestions = [
  {
    symptomes: ["Fièvre", "Toux", "Fatigue"],
    diagnostics: [
      { nom: "Grippe saisonnière", probabilite: 85, examens: ["Test rapide grippe", "NFS"] },
      { nom: "Pneumonie", probabilite: 35, examens: ["Radiographie thoracique", "CRP"] },
      { nom: "COVID-19", probabilite: 40, examens: ["Test PCR COVID-19"] }
    ]
  },
  {
    symptomes: ["Douleur thoracique", "Dyspnée", "Palpitations"],
    diagnostics: [
      { nom: "Infarctus du myocarde", probabilite: 60, examens: ["ECG", "Troponines", "Échocardiographie"] },
      { nom: "Embolie pulmonaire", probabilite: 45, examens: ["D-dimères", "Angioscanner pulmonaire"] },
      { nom: "Péricardite", probabilite: 25, examens: ["ECG", "Échocardiographie"] }
    ]
  }
];

export const mockStats = {
  totalPatients: 1247,
  consultationsAujourdhui: 23,
  prescriptionsActives: 189,
  alertesInteractions: 5
};