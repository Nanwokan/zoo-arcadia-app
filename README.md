# 🦁 Zoo Arcadia – Application Web

Bienvenue sur le dépôt officiel du projet **Zoo Arcadia**, une application web dédiée à la présentation du zoo de Brocéliande.

## 📚 Présentation du projet

L'application permet aux visiteurs de :
- Visualiser les habitats et animaux du zoo,
- Découvrir les services proposés,
- Consulter les avis visiteurs,
- Laisser un avis après visite,
- Contacter l'équipe du zoo.

Des espaces dédiés sont également prévus pour :
- Les vétérinaires (saisie des états de santé des animaux),
- Les employés (validation des avis, saisie de la nourriture),
- L'administrateur (gestion complète du contenu et des utilisateurs).

## 🚀 Technologies utilisées

- **Front-end** : HTML5, CSS3 (mobile-first, responsive), JavaScript
- **Back-end** : Node.js, Express.js
- **Base de données relationnelle** : MySQL (Railway)
- **Base de données NoSQL** : MongoDB Atlas
- **Stockage d’images** : Cloudinary
- **Déploiement** :
  - Front-end : Vercel
  - Back-end : Railway

## ⚙️ Installation en local

1. **Cloner le dépôt :**

git clone https://github.com/Nanwokan/zoo-arcadia-app.git

2. **Accéder au dossier du projet :**

cd zoo-arcadia-app

4. **Installer les dépendances du back-end :**

cd backend
npm install

4. **Configurer les variables d'environnement :**

Créer un fichier `.env` dans le dossier `backend` et y ajouter :

DB_HOST=switchyard.proxy.rlwy.net
DB_USER=root
DB_PASSWORD=LMBXmwJjGsEKzjRqFFHceWouwaPgnJlr
DB_NAME=railway
DB_PORT=43484
JWT_SECRET=arcadia_secret
PORT=2024
MONGO_URI=mongodb+srv://nanwokan:Ouattara2003.@arcadia.wnejg9q.mongodb.net/?retryWrites=true&w=majority&appName=arcadia
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=clairelydieouattara@gmail.com
EMAIL_PASS=qdhq yakk zmnm sihh 
CLOUD_NAME=dxuxu6oig
CLOUD_API_KEY=819692665246297
CLOUD_API_SECRET=maaARTpcJWu6i01ocUE5zbSHgAY
JWT_SECRET=voici_le_json_web_token_de_l_app_zoo_arcadia
JWT_EXPIRES_IN=1d

5. **Lancer le serveur back-end :**

node server.js

6. **Accéder au front-end :**

Le front-end est dans le dossier `frontend`. Ouvrez simplement `index.html` dans votre navigateur ou utilisez un serveur local.

## 📦 Déploiement

- **Front-end** : [Lien Vercel](https://zoo-arcadia-app.vercel.app/)
- **Back-end** : [Lien Railway](https://zoo-arcadia-app-production.up.railway.app/)
Gestion de Projet : [ClickUp](https://app.clickup.com/9015082414/v/s/90152702178)

## 🗂️ Structure du projet

/frontend
  └── assets/
  └── pages/

/backend
  └── controllers/
  └── routes/
  └── models/
  └── config/
  └── app.js
  └── db.js
  └── .env

## 🔐 Sécurité

- Utilisation de `.env` pour stocker les informations sensibles
- Hashage des mots de passe avec bcrypt
- Vérification des rôles pour sécuriser les accès selon le profil utilisateur

## 📖 Manuel d’utilisation

Un manuel PDF est fourni expliquant :
- Les parcours visiteurs, employés, vétérinaires, administrateurs,
- Les identifiants de test,
- L’utilisation du tableau de bord.

## 📋 Licence

Projet réalisé dans le cadre du **Titre Professionnel Développeur Web et Web Mobile**.
