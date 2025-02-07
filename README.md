# 🚀 API de Discussion avec des Personnages de Fiction

Ce projet est une API développée avec Node.js et PostgreSQL dans le cadre d'un projet scolaire. Elle permet aux utilisateurs d'interagir avec des personnages de fiction via une interface de discussion.

## 📌 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

Et d'avoir créer un compte clipdrop (https://clipdrop.co/apis/docs/text-to-image)
et Groq (https://console.groq.com/playground)

## 📂 Installation

1. **Clonez le dépôt :**

   ```sh
   git clone https://github.com/Nyttho/Api-Univers.git
   cd vers le repos
   ```

2. **Installez les dépendances :**

   ```sh
   npm install
   ```

3. **Configurez les variables d'environnement :**
   - Dupliquez le fichier `.env.example` et renommez-le en `.env`.
   - Remplissez-le avec vos informations PostgreSQL, clipdrop et groq.

## 🛠️ Création de la base de données

1. **Assurez-vous que PostgreSQL est en cours d'exécution.**
2. **Créez la base de données et les tables avec le fichier SQL :**
   ```sh
   psql -U votre_utilisateur -d votre_base -f lib/schema.sql
   ```

## 🚀 Lancer l'API

Démarrez le serveur avec la commande :

```sh
npm run start
```

L'API sera disponible à l'adresse `http://localhost:3000` (ou le port défini dans votre `.env`).

## Documentation

Une documentation de l'api est disponible à l'adresse `http://localhost:3000/api-docs/` (WIP)
