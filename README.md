# Carnet d’Entraînement – Backend

Ce projet est une API GraphQL pour gérer un carnet d’entraînement : chaque utilisateur peut s’inscrire, créer ses exercices, organiser ses programmes et partager certains éléments avec d’autres utilisateurs.

---

## 🛠️ Stack technique

- **Node.js** (Express)
- **MongoDB** (avec Mongoose)
- **GraphQL** (express-graphql)
- Authentification JWT simple
- Linting avec ESLint

---

## 📁 Structure du projet

```
src/
  graphql/
    type/         # Types GraphQL (User, Exercise, Program)
    resolvers/    # Logique métier (user, exercise, program)
    schema.js     # Définition du schéma principal GraphQL
  models/         # Modèles de données Mongoose
  index.js        # Point d’entrée du serveur + connexion DB
.eslint.config.mjs # Config ESLint
.env               # Variables d'environnement (MongoDB URI, JWT secret)
```

## ✨ Fonctionnalités

- Inscription et connexion (register/login)
- Création, modification, suppression, affichage d’exercices
- Création, modification, suppression, affichage de programmes
- Possibilité d’indiquer pour chaque exercice d’un programme :
  - Nombre de répétitions (`reps`)
  - Nombre de séries (`sets`)
  - Poids (`weight`)
- Partage de programmes et d’exercices avec d’autres utilisateurs (`sharedWith`)

---

## 📐 Exemple de schéma GraphQL

```graphql
type Program {
  id: ID
  userId: ID
  name: String
  description: String
  exercises: [ProgramExercise]
  createdAt: String
  updatedAt: String
  sharedWith: [ID]
}

type ProgramExercise {
  exerciseId: ID
  reps: Int
  sets: Int
  weight: Float
}
```

---

## 🔎 Exemples de mutations

### Inscription

```graphql
mutation {
  register(username: "emma", email: "emma@test.com", password: "azerty") {
    id
    username
    email
  }
}
```

### Ajouter un exercice

```graphql
mutation {
  addExercise(
    userId: "ID_USER"
    name: "Développé couché"
    description: "Exercice pour les pectoraux"
    muscles: ["pectoraux"]
    type: "force"
  ) {
    id
    name
    muscles
  }
}
```

### Ajouter un programme

```graphql
mutation {
  addProgram(
    userId: "ID_USER"
    name: "Fullbody"
    description: "Programme complet"
    exercises: [
      { exerciseId: "ID_EXO1", reps: 12, sets: 4, weight: 50 }
      { exerciseId: "ID_EXO2", reps: 15, sets: 3, weight: 0 }
    ]
  ) {
    id
    name
    exercises {
      exerciseId
      reps
      sets
      weight
    }
  }
}
```

### Partager un programme

```graphql
mutation {
  shareProgram(programId: "ID_DU_PROGRAMME", userIdToShare: "ID_DU_USER") {
    id
    name
    sharedWith
  }
}
```
