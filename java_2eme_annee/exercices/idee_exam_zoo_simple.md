Bien sûr, voici un nouvel exercice sur la programmation orientée objet en Java, avec ses critères d'évaluation :

## Exercice : Système de gestion d'un zoo (70 points)

Vous devez concevoir et implémenter un système de gestion pour un zoo en utilisant les principes de la programmation orientée objet en Java.

### Partie 1 : Hiérarchie des animaux (25 points)

1. Créez une classe abstraite `Animal` avec les attributs suivants :
   - `nom` (String)
   - `age` (int)
   - `poids` (double)
   - `regime` (enum : CARNIVORE, HERBIVORE, OMNIVORE)

   Ajoutez un constructeur, les getters/setters nécessaires, et les méthodes abstraites :
   - `faireBruit()`
   - `seDeplacer()`

2. Créez trois interfaces : `Volant`, `Nageur`, et `Terrestre` avec des méthodes appropriées.

3. Implémentez au moins 5 classes concrètes d'animaux (par exemple : Lion, Pingouin, Aigle, Éléphant, Dauphin) qui héritent de `Animal` et implémentent les interfaces appropriées.

### Partie 2 : Gestion des enclos (20 points)

4. Créez une classe `Enclos` avec les attributs :
   - `nom` (String)
   - `capacite` (int)
   - `listeAnimaux` (List)

   Ajoutez des méthodes pour :
   - Ajouter un animal
   - Retirer un animal
   - Afficher les informations de l'enclos et de ses animaux

5. Implémentez des classes spécifiques d'enclos (par exemple : Volière, Aquarium, Savane) qui héritent d'`Enclos` et ont des comportements spécifiques.

### Partie 3 : Gestion du zoo (25 points)

6. Créez une classe `Zoo` qui contient :
   - Une liste d'enclos
   - Le nom du zoo
   - Le nombre maximum d'enclos

   Implémentez des méthodes pour :
   - Ajouter un enclos
   - Trouver un animal par son nom
   - Nourrir tous les animaux (en appelant une méthode `nourrir()` pour chaque animal)
   - Afficher un rapport sur l'état du zoo

## Critères d'évaluation

1. Conception de la hiérarchie des classes (15 points)
   - Utilisation appropriée de l'héritage et des classes abstraites
   - Implémentation correcte des interfaces

2. Encapsulation et gestion des attributs (10 points)
   - Utilisation appropriée des modificateurs d'accès
   - Implémentation correcte des getters et setters

3. Polymorphisme (15 points)
   - Utilisation du polymorphisme dans la gestion des animaux et des enclos

4. Gestion des collections (10 points)
   - Utilisation appropriée des collections Java

5. Qualité et organisation du code (10 points)
   - Nommage clair des variables, méthodes et classes
   - Organisation logique du code
   - Commentaires pertinents

6. Fonctionnalités et cohérence du système (10 points)
   - Implémentation correcte des méthodes demandées
   - Cohérence globale du système de gestion du zoo

Temps alloué : 2 heures 30 minutes

Bon courage !
