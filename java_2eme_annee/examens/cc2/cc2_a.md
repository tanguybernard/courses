
## **CC Java : Programmation Orientée Objet (POO)**


### Objectifs pedagogiques

#### 1. Création des classes de base

- Comprendre et appliquer les fondamentaux de la POO en Java : encapsulation, attributs privés, constructeurs, getters/setters.
- Mettre en œuvre la logique métier simple via des méthodes (dépôt, retrait).
- Introduire la gestion des erreurs métier (par exemple : solde insuffisant).

#### 2. Héritage et classes dérivées

- Appliquer le principe d'héritage pour spécialiser des classes.
- Comprendre la réutilisation du code à travers l’héritage.

####  3. Interface et gestion des comptes

- Introduire la notion de contrat avec les interfaces (via Affichable).
- Encourager une approche orientée abstraction.
- Mettre en œuvre la composition (classe Banque contenant une liste de comptes).
- Aborder les collections en Java (ex : List<CompteBancaire>).

#### 4. Tests et exécution

- Renforcer la capacité à tester manuellement un programme Java en construisant des cas d’utilisation.
- Préparer à structurer une application complète avec des cas concrets.


### **Exercice : Gestion d'une banque (15 points)**

#### 1. Création des classes de base (4 points)

- Créez une classe `CompteBancaire` avec les attributs suivants :
  - `titulaire` (String)
  - `solde` (double)
  - `numeroCompte` (String)
  
  La classe doit également contenir :
  - Un constructeur pour initialiser les valeurs des attributs.
  - Des méthodes `getters` et `setters` pour chaque attribut.

- Ajoutez une méthode `deposer(double montant)` qui ajoute le montant au solde, et une méthode `retirer(double montant)` qui retire le montant du solde, en vérifiant si le solde est suffisant. Si le solde est insuffisant, affichez un message d'erreur.

#### 2. Héritage et classes dérivées (4 points)

- Créez une classe `CompteEpargne` qui hérite de `CompteBancaire` et ajoute un attribut `tauxInteret` (double). Ajoutez une méthode `calculerInteret()` qui retourne le montant d'intérêt gagné sur le solde actuel en fonction du taux d'intérêt.
  
- Créez une classe `CompteCourant` qui hérite de `CompteBancaire` et ajoute un attribut `decouvertAutorise` (double). Ajoutez une méthode `verifierDecouvert(double montant)` qui vérifie si un retrait ne dépasse pas le découvert autorisé.

#### 3. Interface et gestion des comptes (5 points)

- Créez une interface `Affichable` avec une méthode `afficherDetails()` qui affiche les détails du compte (titulaire, solde, numéro de compte).
  
- Implémentez cette interface dans les classes `CompteBancaire`, `CompteEpargne`, et `CompteCourant`. Créez une classe `Banque` contenant une liste de comptes et une méthode `afficherTousLesComptes()` qui affiche les détails de tous les comptes. Testez la classe en ajoutant des comptes et en affichant les informations.

#### 4. Test de votre application (2 points)

Écrivez une classe `TestBanque` avec une méthode `main` où vous :
- Créez plusieurs comptes (bancaires, épargne, courant).
- Déposez et retirez de l'argent sur différents comptes.
- Affichez les détails de tous les comptes dans la banque pour vérifier que tout fonctionne correctement.


---

Ces exercices permettent de tester à la fois la compréhension des concepts de la POO, comme l'encapsulation, l'héritage, le polymorphisme, et l'interface, tout en impliquant des scénarios pratiques.