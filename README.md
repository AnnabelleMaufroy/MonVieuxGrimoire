# Mon vieux Grimoire

## Description
Ce projet est le backend de l'application **Mon Vieux Grimoire**, une plateforme permettant aux utilisateurs d'ajouter, noter et consulter des livres. Le front-end de l'application était fourni, et ce projet se concentre sur le développement de l'API backend.

## Technologies utilisées
- Node.js
- Express.js
- MongoDB (avec Mongoose)
- JSON Web Token (JWT) pour l'authentification
- Multer pour la gestion des fichiers
- Bcrypt pour le hachage des mots de passe

## Installation
1. Cloner ce dépôt :
   ```sh
   git clone https://github.com/AnnabelleMaufroy/MonVieuxGrimoire.git
   cd Mon_Vieux_Grimoire
   ```
2. Installer les dépendances :
   ```sh
   npm install
   ```
3. Démarrer le serveur :
   ```sh
   npm start
   nodemon server
   ```

## Routes de l'API

### Authentification
- `POST /api/auth/signup` : Inscription d'un utilisateur
- `POST /api/auth/login` : Connexion d'un utilisateur

### Gestion des livres
- `GET /api/books` : Récupère tous les livres
- `GET /api/books/:id` : Récupère un livre par son ID
- `GET /api/books/bestrating` : Récupère les 3 livres les mieux notés
- `POST /api/books` : Ajoute un nouveau livre
- `PUT /api/books/:id` : Met à jour un livre existant
- `DELETE /api/books/:id` : Supprime un livre
- `POST /api/books/:id/rating` : Ajoute une note à un livre

## Sécurité
- Les mots de passe sont hachés avec Bcrypt avant d'être stockés
- Les routes nécessitant une authentification utilisent JWT
- Vérification des droits d'accès pour modifier ou supprimer un livre
- Protection des adresses e-mail via Mongoose

## Auteur

Projet réalisé par Maufroy Annabelle.

---

Ce projet a été développé dans le cadre d'une formation de développeur web.

