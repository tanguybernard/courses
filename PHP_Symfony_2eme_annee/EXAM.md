

# Projet de Groupe : Symfony

**Contexte :** Vous êtes une petite agence web. Un client vous contacte pour réaliser un MVP (Minimum Viable Product) d'une application de gestion. Le client vous laisse le choix du domaine d'activité, mais exige une architecture robuste basée sur le framework Symfony.

**Objectif :** Créer une application web fonctionnelle permettant la gestion de données liées (CRUD) avec une interface utilisateur soignée.

**Taille du groupe :** 4 à 5 personnes.

---

## 1. Le Thème (Au choix)
Vous devez choisir un thème pour votre application. Voici quelques exemples pour vous guider, mais vous êtes libres d'innover :

* **Gestion de bibliothèque :** Livres, Auteurs, Genres, Adhérents.
* **Gestion d'événements :** Concerts, Salles, Artistes, Billetterie.
* **E-commerce (Back-office) :** Produits, Catégories, Stocks, Fournisseurs.
* **Gestion de scolarité :** Élèves, Classes, Matières, Notes.
* **Suivi de bugs (Bug Tracker) :** Tickets, Développeurs, Statuts, Projets.

---

## 2. Cahier des Charges Technique (Obligatoire)

Pour valider le module, votre application doit impérativement contenir les éléments suivants :

### A. Base de données et Doctrine (ORM)
* **Minimum 2 Entités :** Vous devez créer au moins 2 entités distinctes.

### B. Contrôleurs et Routes
* Respect de l'architecture MVC.
* Utilisation des annotations (ou attributs PHP 8) pour les routes.

### C. Formulaires et Twig
* Utilisation du `FormBuilder` de Symfony (pas de HTML pur pour les `<form>`).
* Utilisation de l'héritage de templates Twig (`base.html.twig`).



---

## 3. Livrables Attendus

1.  **Dépôt Git :** L'historique des commits doit montrer une répartition du travail entre les membres du groupe.
2.  **Fichier README.md :**
    * Titre du projet et noms des étudiants.
    * Description succincte du thème.
    * Instruction d'installation (commandes pour cloner, installer les dépendances, créer la BDD et charger les fixtures).
3.  **Démonstration orale :** 5 minutes pour présenter le fonctionnement.
4.  **Questions :** 5 minutes pour les questions.

---

## 4. Barème de Notation (Total / 20)

Pour assurer la transparence, voici comment vous serez évalués :

| Critère                    | Détails                                                      | Points    |
|:---------------------------|:-------------------------------------------------------------|:----------|
| **Architecture & BDD**     | Entités correctes.                                           | **4 pts** |
| **Fonctionnalités (CRUD)** | Création, Lecture, (Modification), Suppression               | **4 pts** |
| **Formulaires**            | Création formulaire et traitement en Controller.             | **3 pts** |
| **Qualité du Code**        | Code propre, nommage des variables, structure MVC respectée. | **3 pts** |
| **Interface (Twig)**       | Utilisation correcte des blocks, boucles, filtres.           | **2 pts** |
| **Git / Travail d'équipe** | Commits, `README.md` clair.                                  | **2 pt**  |
| **Presentation**           | Presentation                                                 | **2 pt**  |

---

## 5. Bonus

* **Sécurité :** Mise en place d'un système d'authentification (`User`, `Login`, `Registration`).
* **Filtres de recherche :** Barre de recherche pour filtrer les résultats.

---