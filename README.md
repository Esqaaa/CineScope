# 🎬 CineScope

CineScope est une application web de découverte de films construite avec **React** et **TypeScript**, propulsée par l'API **TMDB** (The Movie Database). Le projet a été pensé pour rester simple et lisible.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Build-646CFF?logo=vite&logoColor=white)

## Fonctionnalités

- **Home** — page d'accueil avec mise en avant de films
- **Movies** — parcourir le catalogue de films
- **MovieDetail** — détails complets d'un film
- **Search** — recherche de films via l'API TMDB
- **Favorites** — gestion d'une liste de favoris
- **Library** — bibliothèque personnelle de films
- **Profile** — page de profil utilisateur
- **404** — page d'erreur 

## Stack technique

| Outil | Rôle |
|---|---|
| [Vite](https://vitejs.dev/) | Build tool |
| [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) | Framework et typage |
| [React Router](https://reactrouter.com/) | Routing côté client |
| [TMDB API](https://www.themoviedb.org/documentation/api) | Source de données films |

## Architecture

- **Hooks personnalisés** pour les appels API
- **Context + useReducer** pour la gestion de l'état global (favoris, bibliothèque)
- **Bibliothèque de composants réutilisables**
- **Couche de service TMDB typée**, avec mise en cache des genres
- **Configuration par variables d'environnement**

## Installation

### Prérequis

- [Node.js](https://nodejs.org/) (v18 ou supérieur recommandé)
- Une clé API [TMDB](https://www.themoviedb.org/settings/api) (gratuite)

### Étapes

```bash
# Cloner le dépôt
git clone https://github.com/Esqaaa/CineScope.git
cd CineScope

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
```

Renseigner votre clé TMDB dans le fichier `.env` :

```env
VITE_TMDB_API_KEY=votre_cle_api
```

```bash
# Lancer le serveur de développement
npm run dev
```

L'application est alors accessible sur `http://localhost:5173`.

### Build de production

```bash
npm run build
```

## Structure du projet

```
CineScope/
├── src/
│   ├── components/    # Composants réutilisables
│   ├── hooks/         # Logique métier et requêtes réseau 
│   ├── context/       # État global de l'application (Favoris, Bibliothèque, Auth)
│   ├── styles/        # Fichiers CSS dédiés à chaque composant et style global
│   ├── utils/         # Fonctions utilitaires, types TypeScript et appels API TMDB
├── .env.example
└── vite.config.ts
```
