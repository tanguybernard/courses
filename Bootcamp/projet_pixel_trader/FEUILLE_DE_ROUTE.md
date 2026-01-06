

# 📄 CAHIER DES CHARGES : PROJET PIXEL TRADER

**CLIENT :** Pixel Trader Inc. (Tokyo)
**RESPONSABLE PROJET :** Kenji Yamamoto
**DÉLAI DE RÉALISATION :** 5 Jours (Sprint technique)

---

## 1. CONTEXTE ET ENJEUX

La société **Pixel Trader**, leader dans l'import-export de jeux vidéo de collection, rencontre une dette technique critique. La gestion du stock (valorisé à plusieurs milliers d'euros) repose actuellement sur des fichiers plats (`.csv`) instables et corrompus.

**La demande du client :**
Développer une solution web pérenne, le **Pixel Dashboard**, permettant de centraliser l'inventaire et d'offrir une interface de consultation et de gestion fiable aux administrateurs de la boutique.

**Les objectifs du projet :**

1. **Fiabiliser la donnée :** Récupérer et nettoyer l'historique corrompu.
2. **Structurer l'architecture :** Mettre en place une base de données relationnelle.
3. **Digitaliser l'accès :** Fournir une interface web moderne et ergonomique.

---

## 2. PLANIFICATION DU PROJET (ROADMAP)

Le projet est découpé en 5 phases techniques distinctes. 
Chaque phase doit aboutir à un livrable opérationnel validé par le Lead Tech.

### 🔹 PHASE 1 : TRAITEMENT DE DONNÉES & GIT FLOW

**Objectif :** Assainissement des données brutes.

* **Problématique :** Le fichier source `stock_legacy.csv` contient des erreurs d'encodage, des doublons et des incohérences de devises.
* **Tâches à réaliser :**
* Mise en place de l'environnement GitHub et des conventions de branches (`main`, `develop`).
* Développement d'un algorithme de parsing (JS ou PHP) pour nettoyer le fichier.
* Normalisation des entrées (ex: harmonisation des noms de consoles).


* **✅ Livrable attendu :** Un dépôt Git propre et un fichier `clean_data.json` structuré.

### 🔹 PHASE 2 : ARCHITECTURE BASE DE DONNÉES

**Objectif :** Conception et persistance des données.

* **Problématique :** Passer d'un format fichier à un format relationnel robuste.
* **Tâches à réaliser :**
* Modélisation du schéma de données
* Écriture des scripts SQL d'initialisation (`CREATE`).
* Développement d'un script de migration (Seed) pour importer le JSON vers la BDD.


* **✅ Livrable attendu :** Une base de données opérationnelle contenant l'intégralité du catalogue nettoyé.

### 🔹 PHASE 3 : DÉVELOPPEMENT BACKEND (API)

**Objectif :** Exposition des données via une API REST.

* **Problématique :** Séparer la logique métier de l'affichage (Architecture découplée).
* **Tâches à réaliser :**
* Configuration du serveur (Node.js ou PHP).
* Implémentation des routes API (Endpoints) :
* `GET` : Consultation de la liste et fiche détail.
* `DELETE` : Suppression d'une référence.


* Tests d'intégration manuels des endpoints.


* **✅ Livrable attendu :** Une démonstration avec un client HTTP comme **Postman** pour valider le fonctionnement.

### 🔹 PHASE 4 : INTÉGRATION FRONTEND

**Objectif :** Développement de l'interface utilisateur (UI).

* **Problématique :** Offrir une expérience visuelle conforme à l'identité "Neo-Retro" de la marque.
* **Tâches à réaliser :**
* Construction de la structure HTML sémantique.
* Consommation de l'API via Javascript Asynchrone (`fetch`).
* Intégration CSS (Grid/Flexbox) respectant la charte graphique sombre/néon.


* **✅ Livrable attendu :** Le Dashboard affiché dans le navigateur avec chargement dynamique des produits.

### 🔹 PHASE 5 : RECETTE ET DÉPLOIEMENT

**Objectif :** Finalisation et livraison.

* **Problématique :** Livrer un produit fini, testé et prêt à l'emploi.
* **Tâches à réaliser :**
* Implémentation des fonctionnalités avancées (Calcul des KPIs, Filtres dynamiques).
* Phase de "QA" (Assurance Qualité) : Tests croisés et correction de bugs.
* Présentation technique du produit.


* **✅ Livrable attendu :** Démonstration fonctionnelle du MVP (Minimum Viable Product).

---

## 3. CONTRAINTES TECHNIQUES

Pour garantir la qualité et la maintenabilité du code, les technologies suivantes sont imposées :

* **Suivi de projet :** GitHub Projects (Méthode Kanban).
* **Versionning :** Git (Flux de travail avec Pull Requests obligatoire).
* **Backend :** Node.js (Express) OU PHP (Natif/Symfony).
* **Frontend :** HTML5, CSS3, JS.
* **Database :** MySQL, MariaDB, PostgreSQL ou SQLite.

---

## 4. CRITÈRES D'ÉVALUATION

La validation du projet reposera sur les indicateurs suivants :

1. **Qualité du code :** Respect des standards, indentation, nommage explicite.
2. **Maîtrise de Git :** Historique cohérent, messages de commit clairs, gestion des conflits.
3. **Fonctionnalité :** L'application respecte-t-elle le cahier des charges ? Les données sont-elles fiables ?
4. **Interface :** Respect du Design System, ergonomie et adaptabilité (Responsive).
5. **Travail d'équipe :** Utilisation des tickets, répartition de la charge, code review.

---

**Début du Sprint : Lundi 09h00.**