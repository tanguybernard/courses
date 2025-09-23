## **CC Java : Programmation Orientée Objet (POO)**

### Objectifs pédagogiques :

#### 1. Création des classes de base
- Maîtriser la création de classes orientées objet et l'utilisation de types primitifs.
- Appliquer l’encapsulation et la manipulation d’attributs via getters/setters.
- Développer une méthode métier (augmentation de salaire) avec des calculs simples.

#### 2. Héritage et classes dérivées
- Comprendre et mettre en œuvre l’héritage hiérarchique (spécialisation des rôles dans l’entreprise).
- Illustrer l’ajout d’attributs spécifiques dans les sous-classes.


#### 3. Polymorphisme et gestion
- Introduire le polymorphisme d’exécution via la redéfinition de la méthode afficherDetails().
- Démontrer la liaison dynamique : appel de la bonne méthode selon le type réel de l’objet.
- Utiliser les collections polymorphes (ex : List<Employe> contenant des sous-types).
- Structurer une classe gestionnaire (Entreprise) pour modéliser un ensemble d’objets.

#### 4. Tests et exécution
- Valider la logique métier (augmentation, affichage différencié).
- Maîtriser une approche orientée test en console pour valider le bon comportement des objets.



### **Exercice  : Gestion des employés dans une entreprise (15 points)**

#### 1. Création des classes de base (4 points)

- Créez une classe `Employe` avec les attributs suivants :
  - `nom` (String)
  - `prenom` (String)
  - `id` (int)
  - `salaire` (double)
  
  La classe doit contenir un constructeur pour initialiser ces attributs et des méthodes `getters` et `setters`.

- Ajoutez une méthode `augmenterSalaire(double pourcentage)` qui augmente le salaire de l'employé en fonction du pourcentage passé en paramètre.

#### 2. Héritage et classes dérivées (4 points)

- Créez une classe `Manager` qui hérite de `Employe` et ajoute un attribut `budget` (double) pour gérer le budget de l'équipe.
  
- Créez une classe `Technicien` qui hérite de `Employe` et ajoute un attribut `competences` (String) pour décrire les compétences techniques du technicien.

#### 3. Polymorphisme et gestion des employés (5 points)

- Créez une méthode `afficherDetails()` dans la classe `Employe` qui affiche les informations personnelles de l'employé. Redéfinissez cette méthode dans les classes `Manager` et `Technicien` pour afficher des informations supplémentaires spécifiques à chaque type d'employé (par exemple, afficher le budget pour les managers et les compétences pour les techniciens).
  
- Créez une classe `Entreprise` qui contient une liste d'employés et une méthode `afficherTousLesEmployes()` qui affiche les détails de tous les employés de l'entreprise. Testez votre classe en ajoutant des employés et en affichant les informations.

#### 4. Test de votre application (2 points)

Écrivez une classe `TestEntreprise` avec une méthode `main` où vous :
- Créez plusieurs employés (managers, techniciens).
- Appliquez une augmentation de salaire et affichez les nouveaux salaires.
- Affichez les détails de tous les employés dans l'entreprise pour vérifier que tout fonctionne correctement.

---

Ces exercices permettent de tester à la fois la compréhension des concepts de la POO, comme l'encapsulation, l'héritage, le polymorphisme, et l'interface, tout en impliquant des scénarios pratiques.
