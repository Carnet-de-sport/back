# Carnet d’Entraînement – Backend

Ce projet est l’API backend d’un carnet de sport permettant à chaque utilisateur de gérer ses exercices et ses programmes personnalisés.  
L’objectif est de proposer une base saine pour gérer ses séances, avec la possibilité d’indiquer le nombre de répétitions, de séries et le poids pour chaque exercice.

---

## 🛠️ Stack utilisée

- Node.js (Express)
- MongoDB (avec Mongoose)
- GraphQL (express-graphql)
- Authentification JWT simple

---

## 📁 Structure du projet

src/
graphql/
type/ # Types GraphQL (User, Exercise, Program)
resolvers/ # Logique métier (user, exercise, program)
schema.js # Définition du schéma principal GraphQL
models/ # Modèles de données Mongoose
index.js # Point d’entrée du serveur + connexion DB

À la racine du projet, créer un fichier .env :

MONGODB_URI=mongodb://localhost:27017/carnet_sport
JWT_SECRET=supersecret
