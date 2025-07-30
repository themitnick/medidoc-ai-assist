export interface Patient {
  id: string;
  nom: string;
  prenom: string;
  dateNaissance: string;
  age?: number;
  poids?: number;
  taille?: number;
  sexe: "M" | "F";
  telephone: string;
  email: string;
  adresse: string;
  numeroSecu: string;
  allergie?: string[];
  antecedents?: string[];
  conditions?: string[];
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
  id: string;
  medicamentA: string;
  medicamentB: string;
  dciA?: string; // Dénomination Commune Internationale
  dciB?: string;
  severite: "Faible" | "Modérée" | "Élevée" | "Critique";
  description: string;
  mecanisme: string;
  recommandation: string;
  alternative?: string;
  surveillance?: string[];
  references?: string;
  dateModification: string;
}

export interface MedicamentInfo {
  nom: string;
  dci: string;
  classe: string;
  categorie?: string;
  posologie: string;
  dosage?: string;
  forme?: string;
  voieAdministration?: string;
  contrindications: string[];
  effetsSecondaires: string[];
  interactions: string[];
  grossesse: "Autorisé" | "Avec précaution" | "Contre-indiqué" | "Inconnu";
  allaitement: "Autorisé" | "Avec précaution" | "Contre-indiqué" | "Inconnu";
}

export const mockPatients: Patient[] = [
  {
    id: "1",
    nom: "Kouamé",
    prenom: "Adjoua",
    dateNaissance: "1985-03-15",
    age: 39,
    poids: 65,
    taille: 165,
    sexe: "F",
    telephone: "0123456789",
    email: "adjoua.kouame@email.ci",
    adresse: "Cocody, Abidjan, Côte d'Ivoire",
    numeroSecu: "2850315123456",
    allergie: ["Pénicilline", "Aspirine"],
    antecedents: ["Hypertension", "Diabète type 2"],
    conditions: ["Hypertension artérielle", "Diabète type 2"],
    traitements: ["Metformine 850mg", "Lisinopril 10mg"]
  },
  {
    id: "2",
    nom: "Traoré",
    prenom: "Mamadou",
    dateNaissance: "1978-07-22",
    age: 46,
    poids: 78,
    taille: 175,
    sexe: "M",
    telephone: "0987654321",
    email: "mamadou.traore@email.ci",
    adresse: "Plateau, Abidjan, Côte d'Ivoire",
    numeroSecu: "1780722234567",
    allergie: ["Latex"],
    antecedents: ["Asthme"],
    conditions: ["Asthme bronchique"],
    traitements: ["Ventoline", "Symbicort"]
  },
  {
    id: "3",
    nom: "Ouattara",
    prenom: "Fatou",
    dateNaissance: "1992-12-03",
    age: 32,
    poids: 58,
    taille: 160,
    sexe: "F",
    telephone: "0456789123",
    email: "fatou.ouattara@email.ci",
    adresse: "Marcory, Abidjan, Côte d'Ivoire",
    numeroSecu: "2921203345678",
    allergie: [],
    antecedents: ["Migraine chronique"],
    conditions: ["Migraine avec aura"],
    traitements: ["Sumatriptan"]
  }
];

export const mockConsultations: Consultation[] = [
  {
    id: "1",
    patientId: "1",
    date: "2025-01-15",
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
    date: "2025-01-10",
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
    id: "int-001",
    medicamentA: "Warfarine",
    medicamentB: "Aspirine",
    dciA: "Warfarine sodique",
    dciB: "Acide acétylsalicylique",
    severite: "Critique",
    description: "Risque d'hémorragie majeure par potentialisation des effets anticoagulants",
    mecanisme: "Synergie d'action anticoagulante et antiagrégante plaquettaire",
    recommandation: "Contre-indication absolue. Surveillance étroite de l'INR si association inévitable",
    alternative: "Remplacer l'aspirine par du paracétamol pour l'antalgie",
    surveillance: ["INR quotidien", "Surveillance clinique des signes hémorragiques"],
    references: "ANSM - Thésaurus 2024",
    dateModification: "2024-12-15"
  },
  {
    id: "int-002",
    medicamentA: "Metformine",
    medicamentB: "Contraste iodé",
    dciA: "Metformine HCl",
    dciB: "Produit de contraste iodé",
    severite: "Élevée",
    description: "Risque d'acidose lactique par accumulation de metformine en cas d'insuffisance rénale aiguë",
    mecanisme: "Insuffisance rénale aiguë induite par le contraste → accumulation de metformine",
    recommandation: "Arrêter la metformine 48h avant l'examen, reprendre 48h après si fonction rénale normale",
    surveillance: ["Créatininémie avant et après", "Clairance de la créatinine"],
    references: "SFR - Recommandations 2024",
    dateModification: "2024-11-20"
  },
  {
    id: "int-003",
    medicamentA: "Simvastatine",
    medicamentB: "Clarithromycine",
    dciA: "Simvastatine",
    dciB: "Clarithromycine",
    severite: "Critique",
    description: "Risque de rhabdomyolyse par inhibition du métabolisme de la simvastatine",
    mecanisme: "Inhibition du CYP3A4 par la clarithromycine → accumulation de simvastatine",
    recommandation: "Arrêter temporairement la simvastatine pendant le traitement antibiotique",
    alternative: "Utiliser l'azithromycine ou adapter la posologie",
    surveillance: ["CPK", "Myoglobine", "Fonction rénale"],
    references: "EMA - Drug Safety Update 2024",
    dateModification: "2024-10-30"
  },
  {
    id: "int-004",
    medicamentA: "Digoxine",
    medicamentB: "Amiodarone",
    dciA: "Digoxine",
    dciB: "Amiodarone HCl",
    severite: "Élevée",
    description: "Risque d'intoxication digitalique par augmentation des concentrations de digoxine",
    mecanisme: "Inhibition de la P-glycoprotéine et réduction de la clairance rénale",
    recommandation: "Réduire la dose de digoxine de 50% et surveiller la digoxinémie",
    surveillance: ["Digoxinémie", "ECG", "Ionogramme"],
    references: "Cardio-Med Guidelines 2024",
    dateModification: "2024-09-15"
  },
  {
    id: "int-005",
    medicamentA: "AINS",
    medicamentB: "IEC",
    dciA: "Anti-inflammatoires non stéroïdiens",
    dciB: "Inhibiteurs de l'enzyme de conversion",
    severite: "Modérée",
    description: "Risque d'insuffisance rénale aiguë et diminution de l'efficacité antihypertensive",
    mecanisme: "Inhibition des prostaglandines rénales → vasoconstriction",
    recommandation: "Surveiller la fonction rénale, utiliser la plus faible dose et durée minimale",
    surveillance: ["Créatininémie", "Tension artérielle", "Diurèse"],
    references: "ESC Guidelines 2024",
    dateModification: "2024-08-22"
  },
  {
    id: "int-006",
    medicamentA: "Lithium",
    medicamentB: "Diurétiques thiazidiques",
    dciA: "Carbonate de lithium",
    dciB: "Hydrochlorothiazide",
    severite: "Élevée",
    description: "Risque d'intoxication au lithium par diminution de son élimination rénale",
    mecanisme: "Dépletion sodique → réabsorption accrue du lithium",
    recommandation: "Surveillance rapprochée de la lithiémie, adaptation posologique",
    surveillance: ["Lithiémie hebdomadaire", "Fonction rénale", "Ionogramme"],
    references: "Psychiatric Med Guidelines 2024",
    dateModification: "2024-07-10"
  },
  {
    id: "int-007",
    medicamentA: "Fluconazole",
    medicamentB: "Warfarine",
    dciA: "Fluconazole",
    dciB: "Warfarine sodique",
    severite: "Élevée",
    description: "Potentialisation de l'effet anticoagulant avec risque hémorragique",
    mecanisme: "Inhibition du CYP2C9 → diminution du métabolisme de la warfarine",
    recommandation: "Surveillance renforcée de l'INR, adaptation posologique",
    surveillance: ["INR à J3, J7 puis hebdomadaire", "Signes hémorragiques"],
    references: "Hemostasis Society 2024",
    dateModification: "2024-06-05"
  },
  {
    id: "int-008",
    medicamentA: "Théophylline",
    medicamentB: "Ciprofloxacine",
    dciA: "Théophylline",
    dciB: "Ciprofloxacine HCl",
    severite: "Modérée",
    description: "Risque de surdosage en théophylline par inhibition métabolique",
    mecanisme: "Inhibition du CYP1A2 → accumulation de théophylline",
    recommandation: "Réduire la dose de théophylline de 50% et surveiller la théophyllinémie",
    surveillance: ["Théophyllinémie", "ECG", "Signes neurologiques"],
    references: "Pneumology Guidelines 2024",
    dateModification: "2024-05-18"
  }
];

export const mockMedicaments: MedicamentInfo[] = [
  {
    nom: "Aspirine 500mg",
    dci: "Acide acétylsalicylique",
    classe: "AINS - Antiagrégant plaquettaire",
    categorie: "Cardiovasculaire",
    dosage: "500mg",
    forme: "Comprimé",
    voieAdministration: "Orale",
    posologie: "500mg à 1g, 1 à 3 fois par jour",
    contrindications: ["Allergie aux salicylés", "Ulcère gastroduodénal", "Insuffisance rénale sévère"],
    effetsSecondaires: ["Troubles digestifs", "Hémorragies", "Acouphènes"],
    interactions: ["Anticoagulants", "Corticoïdes", "Méthotrexate"],
    grossesse: "Contre-indiqué",
    allaitement: "Avec précaution"
  },
  {
    nom: "Paracétamol 1g",
    dci: "Paracétamol",
    classe: "Antalgique - Antipyrétique",
    categorie: "Antalgiques",
    dosage: "1g",
    forme: "Comprimé effervescent",
    voieAdministration: "Orale",
    posologie: "1g, 1 à 4 fois par jour (max 4g/j)",
    contrindications: ["Insuffisance hépatocellulaire", "Allergie au paracétamol"],
    effetsSecondaires: ["Hépatotoxicité (surdosage)", "Rares réactions allergiques"],
    interactions: ["Anticoagulants (doses élevées)", "Inducteurs enzymatiques"],
    grossesse: "Autorisé",
    allaitement: "Autorisé"
  },
  {
    nom: "Metformine 850mg",
    dci: "Metformine HCl",
    classe: "Antidiabétique - Biguanide",
    categorie: "Cardiovasculaire",
    dosage: "850mg",
    forme: "Comprimé pelliculé",
    voieAdministration: "Orale",
    posologie: "850mg, 2 à 3 fois par jour aux repas",
    contrindications: ["Insuffisance rénale", "Acidose métabolique", "Insuffisance cardiaque"],
    effetsSecondaires: ["Troubles digestifs", "Acidose lactique (rare)", "Carence en B12"],
    interactions: ["Contraste iodé", "Alcool", "Diurétiques"],
    grossesse: "Avec précaution",
    allaitement: "Avec précaution"
  },
  {
    nom: "Amoxicilline 1g",
    dci: "Amoxicilline",
    classe: "Antibiotique - Pénicilline",
    categorie: "Antibiotiques",
    dosage: "1g",
    forme: "Gélule",
    voieAdministration: "Orale",
    posologie: "1g, 2 à 3 fois par jour",
    contrindications: ["Allergie aux pénicillines", "Mononucléose infectieuse"],
    effetsSecondaires: ["Troubles digestifs", "Réactions allergiques", "Candidoses"],
    interactions: ["Allopurinol", "Contraceptifs oraux"],
    grossesse: "Autorisé",
    allaitement: "Autorisé"
  },
  {
    nom: "Fluoxétine 20mg",
    dci: "Fluoxétine",
    classe: "Antidépresseur - ISRS",
    categorie: "Psychiatrie",
    dosage: "20mg",
    forme: "Gélule",
    voieAdministration: "Orale",
    posologie: "20mg, 1 fois par jour le matin",
    contrindications: ["IMAO", "Allergie à la fluoxétine", "Manie"],
    effetsSecondaires: ["Nausées", "Insomnie", "Céphalées", "Dysfonction sexuelle"],
    interactions: ["IMAO", "Tramadol", "Warfarine"],
    grossesse: "Avec précaution",
    allaitement: "Avec précaution"
  },
  {
    nom: "Simvastatine 40mg",
    dci: "Simvastatine",
    classe: "Hypolipémiant - Statine",
    categorie: "Cardiovasculaire",
    dosage: "40mg",
    forme: "Comprimé",
    voieAdministration: "Orale",
    posologie: "40mg, 1 fois par jour le soir",
    contrindications: ["Maladie hépatique active", "Grossesse", "Allaitement"],
    effetsSecondaires: ["Myalgies", "Élévation des transaminases", "Troubles digestifs"],
    interactions: ["Clarithromycine", "Ciclosporine", "Warfarine"],
    grossesse: "Contre-indiqué",
    allaitement: "Contre-indiqué"
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