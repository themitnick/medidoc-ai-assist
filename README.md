# MediDoc AI Assist 🏥

## Description du Projet

**MediDoc AI Assist** est une application médicale complète développée pour optimiser la gestion des soins de santé en Côte d'Ivoire. Cette plateforme offre des outils avancés pour la gestion des patients, la vérification des interactions médicamenteuses, et l'assistance au diagnostic médical.

## 🚀 Fonctionnalités Principales

### 🔐 Authentification Role-Based
- **Médecins** : Accès complet aux dossiers, prescriptions et diagnostics
- **Infirmiers** : Gestion des soins et planification des interventions
- **Administrateurs** : Gestion des utilisateurs et statistiques système
- **Patients** : Portail personnel pour consultations et historique médical

### 📋 Gestion des Dossiers Médicaux
- Consultation et création de dossiers patients
- Historique médical complet avec consultations, prescriptions et examens
- Recherche avancée et filtrage des patients
- Export PDF des dossiers médicaux

### 💊 Système d'Interactions Médicamenteuses Avancé
- **Base de données étendue** avec 8+ interactions critiques documentées
- **Vérification en temps réel** des prescriptions
- **Détection automatique des allergies** patient
- **Mécanismes d'action détaillés** avec références scientifiques
- **Alternatives thérapeutiques** suggérées
- **Protocoles de surveillance** clinique spécialisés

### 🏥 Tableaux de Bord Spécialisés
- **Dashboard Médecin** : Statistiques consultations, patients, prescriptions
- **Dashboard Infirmier** : Planning soins, patients en charge, urgences
- **Dashboard Admin** : Gestion utilisateurs, revenus, métriques système
- **Portail Patient** : Rendez-vous, prescriptions, historique personnel

### 👥 Gestion des Patients
- Ajout de nouveaux patients avec formulaire complet
- Gestion des allergies et antécédents médicaux
- Création de nouveaux dossiers médicaux
- Suivi longitudinal des soins

### 🩺 Planification des Soins Infirmiers
- Scheduling intelligent des interventions
- Gestion des priorités et statuts des soins
- Suivi en temps réel des tâches infirmières

## 🛠️ Installation et Développement

### Prérequis
- Node.js (version 16+)
- npm ou yarn
- Git

### Installation

```bash
# Cloner le repository
git clone https://github.com/themitnick/medidoc-ai-assist.git

# Naviguer dans le dossier du projet
cd medidoc-ai-assist

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

### Scripts Disponibles

```bash
# Développement avec hot-reload
npm run dev

# Build de production
npm run build

# Prévisualisation du build
npm run preview

# Linting du code
npm run lint
```

## 🏗️ Architecture Technique

### Technologies Utilisées

- **Frontend Framework** : React 18 avec TypeScript
- **Build Tool** : Vite pour un développement rapide
- **UI Components** : shadcn/ui avec Tailwind CSS
- **State Management** : React Hooks (useState, useEffect)
- **Routing** : Navigation conditionnelle basée sur les rôles
- **Icons** : Lucide React pour une iconographie cohérente

### Structure du Projet

```
src/
├── components/           # Composants React réutilisables
│   ├── ui/              # Composants UI de base (shadcn/ui)
│   ├── AIAssistant.tsx  # Assistant IA pour diagnostics
│   ├── Dashboard.tsx    # Tableaux de bord par rôle
│   ├── DossiersMedicaux.tsx  # Gestion dossiers médicaux
│   ├── InteractionsManager.tsx  # Système interactions médicamenteuses
│   ├── LoginForm.tsx    # Authentification utilisateurs
│   ├── NouveauPatient.tsx     # Formulaire nouveau patient
│   ├── PatientPortail.tsx     # Interface patients
│   ├── Parametres.tsx   # Configuration système
│   └── PlanificationSoins.tsx # Planning infirmier
├── data/                # Données mockées et types
│   └── mockData.ts      # Base de données de test
├── hooks/               # Hooks React personnalisés
├── lib/                 # Utilitaires et helpers
├── pages/              # Pages principales
├── types/              # Définitions TypeScript
└── main.tsx            # Point d'entrée application
```

## 🔒 Sécurité et Conformité

### Gestion des Rôles
- **Contrôle d'accès basé sur les rôles** (RBAC)
- **Permissions granulaires** par fonctionnalité
- **Sessions sécurisées** avec validation côté client

### Protection des Données Médicales
- **Chiffrement des données sensibles** (à implémenter en production)
- **Logs d'audit** pour traçabilité des actions
- **Respect du secret médical** avec accès restreint

### Conformité Réglementaire
- **Localisation Côte d'Ivoire** : Noms, adresses, numéros
- **Fuseau horaire** : Africa/Abidjan
- **Standards médicaux** : Références ANSM, EMA, OMS

## 🚀 Déploiement

### Build de Production

```bash
# Créer un build optimisé
npm run build

# Tester le build localement
npm run preview
```

### Variables d'Environnement

```env
# Exemple de configuration
VITE_API_URL=https://api.medidoc.ci
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=production
```

### Déploiement Recommandé
- **Hosting** : Vercel, Netlify ou serveur privé
- **CDN** : Cloudflare pour performances optimales
- **SSL** : Certificat obligatoire pour données médicales
- **Backup** : Sauvegarde quotidienne des données

## 🤝 Contribution

### Guidelines de Développement
1. **Fork** le repository
2. **Créer une branche** pour la feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. **Commiter** les changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. **Push** vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. **Créer une Pull Request**

### Standards de Code
- **TypeScript strict** pour la sécurité des types
- **ESLint** pour la qualité du code
- **Prettier** pour le formatage uniforme
- **Commentaires JSDoc** pour la documentation

## 📞 Support et Contact

### Équipe de Développement
- **Développeur Principal** : [@themitnick](https://github.com/themitnick)
- **Repository** : [medidoc-ai-assist](https://github.com/themitnick/medidoc-ai-assist)

### Rapport de Bugs
Créer une issue sur GitHub avec :
- Description détaillée du problème
- Étapes de reproduction
- Environnement (OS, navigateur, version)
- Screenshots si pertinent

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🔮 Roadmap

### Prochaines Fonctionnalités
- [ ] **API Backend** : Intégration base de données réelle
- [ ] **Télémédecine** : Consultations vidéo intégrées
- [ ] **IA Diagnostique** : Assistant IA plus avancé
- [ ] **Mobile App** : Application React Native
- [ ] **Laboratoire** : Gestion résultats analyses
- [ ] **Pharmacie** : Interface officines partenaires
- [ ] **Statistiques Avancées** : Analytics médicales
- [ ] **Multi-langues** : Support français/anglais/langues locales

---

**MediDoc AI Assist** - Révolutionner les soins de santé en Côte d'Ivoire 🇨🇮
