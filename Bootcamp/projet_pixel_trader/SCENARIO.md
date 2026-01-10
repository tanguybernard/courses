

# 📂 DOSSIER DE MISSION : PROJET "PIXEL TRADER"

**Date :** Semaine 01
**Client :** Kenji Yamamoto, CEO de *Pixel Trader Inc.* (Akihabara, Tokyo)
**Objet :** Refonte totale du système de gestion de stock (Supply Chain Management).

---

## 1. LE CONTEXTE CLIENT

*Pixel Trader* est une référence mondiale du retrogaming. Jusqu'à présent, la boutique gérait un stock estimé à 5 millions de yens via des fichiers Excel manuels et des post-its.

Suite à un crash disque la semaine dernière et des erreurs de saisie à répétition (prix en euros mélangés aux yens, doublons de jeux...), M. Yamamoto a décidé de professionnaliser son activité.

**Le problème actuel :**

* Données non fiables (doublons, erreurs de devises).
* Aucune visibilité sur la valorisation réelle du stock.
* Impossible de savoir rapidement si un jeu est en réserve ou en rayon.

## 2. OBJECTIF

Votre équipe a **5 jours** pour livrer le **MVP (Minimum Viable Product)** de la nouvelle solution 
interne.

Il s'agit d'une application web (Back-Office) permettant aux employés de :

1. **Consulter** l'intégralité du catalogue proprement.
2. **Ajouter/Modifier/Supprimer** des produits (Consoles, Jeux).
3. **Visualiser** les KPIs (Key Performance Indicators) en temps réel : Valeur totale du stock, nombre d'articles.

---

## 3. RESSOURCES FOURNIES (LEGACY)

Le client vous fournit les seuls éléments récupérés du crash :

* 📁 `assets/` : Un dossier contenant les visuels des produits (non triés).
* 📄 `stock_export_legacy.csv` : Un fichier de données brut.
* ⚠️ **ATTENTION :** Ce fichier est corrompu. Il contient des erreurs d'encodage, des devises mixtes et des doublons.
* *Première tâche critique :* Nettoyer ces données avant toute intégration.


---

## 4. STACK TECHNIQUE IMPOSÉE

Le client exige une architecture moderne et maintenable ("Future-proof").

* **Versioning :** Git (GitHub ou GitLab).
* *Contrainte :* Interdiction de commiter directement sur la branche `main`. Utilisation de Pull Requests obligatoire.


* **Base de Données :** Relationnelle (MySQL, MariaDB ou SQLite).
* **Backend (API) :** Au choix de l'équipe (Node.js/Express OU PHP Natif/Symfony).
* Architecture REST requise (JSON).


* **Frontend :** HTML5, CSS3, JS Vanilla (ES6+).

* **Design System :** "Neo-Retro". Interface sombre, lisible, inspirée de l'esthétique Cyberpunk/Arcade, mais ergonomique pour le travail.

---

## 5. PLANNING DE LIVRAISON (SPRINT 5 JOURS)

* **LUNDI : Onboarding & Data Cleaning.** Initialisation Git, script de nettoyage du CSV, répartition des rôles.
* **MARDI : Architecture.** Modélisation de la Base de Données (MCD) et migration des données propres.
* **MERCREDI : API First.** Développement des endpoints (Routes GET, POST, DELETE). Tests via Postman.
* **JEUDI : Interface Admin.** Développement du Frontend, connexion à l'API (Fetch), UX Design.
* **VENDREDI : GO LIVE.** Déploiement et Démo technique devant le client.

---

## 6. LES RÈGLES D'OR DE L'AGENCE

1**Commit early, commit often.** Ne perdez pas 3h de travail.
2**Read The F***ing Manual (RTFM).** Lisez bien la doc avant d'appeler à l'aide.
3**No Spaghetti Code.** Le client paie pour du code propre, indenté et commenté.




## 7. Les TICKETS

📅 LUNDI (Data & Git)
[SETUP] Init Git & Branching Strategy (Créer develop, main).

[DATA] Script de parsing CSV (Nettoyer les prix et devises).

[DATA] Export CSV (clean_data.csv)

[DATA] Importer un CSV valide

[DATA] Produire un rapport d'erreurs si le CSV est incorrect


📅 MARDI (BDD)
[DB] Modélisation

Ajouter dans la documentation de votre projet, le schéma (excalidraw, mermaid)

[DB] Script SQL Init (CREATE TABLE)

On doit stocker en base les infos.
- des produits
- le stock
- et permettre de connaître la marge qui va être réalisé sur la vente


[DB] Script Seeding (Remplir la BDD).

📅 MERCREDI (Back)
[API] Setup Server (Node/PHP init).

[API] GET /games (Lister tous les jeux).

[API] GET /games/:id (Détail d'un jeu).

[API] Filtres (Par console ou état).

📅 JEUDI (Front)
[FRONT] HTML Structure (Squelette de la galerie).

[FRONT] CSS Neo-Retro (Intégration du design system).

[FRONT] JS Fetch (Connexion API -> DOM).



Pour les étudiants:

Creation d'un repo
 > Project > Link Project Pixel Trader


## Repo

https://github.com/Bootcamp-PixelTrader-2025-2026