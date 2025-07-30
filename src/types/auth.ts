export type UserRole = "medecin" | "infirmier" | "admin" | "patient";

export interface User {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  role: UserRole;
  specialite?: string; // Pour les médecins
  service?: string; // Pour les infirmiers
  permissions?: string[]; // Pour les admins
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export const mockUsers: Record<string, User> = {
  "dr.kone@medidoc.ci": {
    id: "1",
    email: "dr.kone@medidoc.ci",
    nom: "Koné",
    prenom: "Amadou",
    role: "medecin",
    specialite: "Cardiologie"
  },
  "infirmier@medidoc.ci": {
    id: "2",
    email: "infirmier@medidoc.ci",
    nom: "Touré",
    prenom: "Aïssatou",
    role: "infirmier",
    service: "Urgences"
  },
  "admin@medidoc.ci": {
    id: "3",
    email: "admin@medidoc.ci",
    nom: "Bamba",
    prenom: "Kouassi",
    role: "admin",
    permissions: ["user_management", "system_config", "reports"]
  },
  "patient@medidoc.ci": {
    id: "4",
    email: "patient@medidoc.ci",
    nom: "Yao",
    prenom: "Adjoua",
    role: "patient"
  }
};
