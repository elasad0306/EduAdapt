# EduAdapt (Projet d'école)

## 🎯 À propos : 

EduAdapt est une application web qui permet aux étudiants de générer des résumés de cours, des flashcards et des quiz à partir de n'importe quel contenu éducatif. 

## 📂 Structure du projet : 
```bash
📂EduAdapt/
|── 📂backend/
|     |─── 📂database/
|     |       |── db.js #Connexion à la base de donnée
|     |─── 📂models/
|     |       |─── User.js #Regroupe 
|     |─── 📂routes/ 
|             |─── authentifications.js #Contient les routes
|─── 📂src/
|     |─── 📂assets/
|     |     |─── 📂picture/ #Contient tous les images
|     |─── 📂Components/ #Contient tous les composants réutilisables
|               |─── Buttons/ #Contient le composant bouton
|               |─── Home/ #Contient les composants de la page Home
|               |─── InputWithLabel/ #Contient le composant input
|               |─── Footer.jsx #Composant footer
|               |─── Navbar.jsx #Composant navbar
|
|     |─── 📂pages/ #Contient toutes les pages 
|              |─── Chat.jsx #Page générer les contenus éducatifs
|              |─── Connexion.jsx #Page de connexion
|              |─── Home.jsx #Page d'accueil
|              |─── Modifprofile.jsx #Page de modification des informations utilisateurs(nom, prénom, email,...) 
|              |─── Profile.jsx #Page de profil utilisateur
|              |─── Registration.jsx #Page d'inscription
```

## Installation du projet : 

### Pré-requis : 
- **[Nodejs](https://nodejs.org/fr)**
- **[MySql](https://www.mysql.com/fr/)**


    #### Installer une base de données : 
    Créer une base données "eduadapt" et une table "users"
```bash
    #Création d'une base de données
    CREATE DATABASE eduadapt CHARACTER SET utf8mb4 COLLATE=utf8mb4_general_ci

    #Création de la table
    CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  address VARCHAR(255) DEFAULT NULL,
  phonenumber VARCHAR(30) DEFAULT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

 - **[Heidi](https://www.heidisql.com/)**

## Etape 1 : 
```bash 
Clonez le projet : 
```bash
git clone https://github.com/elasad0306/EduAdapt.git
````
## Etape 2 : 
Installation des dépendances : 
```bash
#Pour installer les dépendances du frontend : 
#Se déplacer dans le dossier ./backend
cd EduAdapt

#Lancer la commande suivant : 
npm install 

#Pour installer les dépendances du backend : 
#Se déplacer dans le dossier ./backend
cd ./backend

#Lancer la commande suivant : 
npm install
```

