Library Management System

Description

Le projet Library Management System est une application web permettant de gérer une bibliothèque en ligne. Il est développé avec Spring Boot pour le backend et React.js pour le frontend.

Technologies Utilisées

Backend (Spring Boot)

Spring Boot

Spring Data JPA

Spring Security (si authentification requise)

Hibernate

MySQL (ou autre base de données relationnelle)

Swagger (documentation API)

Frontend (React)

React.js

Redux (si nécessaire)

Axios (pour les appels API)

Bootstrap / Material UI (pour le design)

Fonctionnalités

Gestion des livres

Ajout, modification, suppression et consultation des livres.

Gestion des utilisateurs

Inscription, connexion et gestion des profils.

Prêt de livres

Gestion des emprunts et des retours.

Administration

Interface pour la gestion avancée des utilisateurs et des livres.

Installation & Exécution

1. Cloner le projet

 git clone https://github.com/imane-el-mazouz/Library-Management.git
 cd Library-Management

2. Backend (Spring Boot)

Prérequis

Java 17+

Maven

MySQL (ou autre base de données configurée)

Configuration

Modifiez le fichier application.properties dans src/main/resources/ :

spring.datasource.url=jdbc:mysql://localhost:3306/library_db
spring.datasource.username=root
spring.datasource.password=yourpassword

Exécution

mvn spring-boot:run

3. Frontend (React)

Prérequis

Node.js & npm

Installation des dépendances

cd frontend
npm install

Démarrage de l’application

npm start

L’application sera disponible sur http://localhost:3000
