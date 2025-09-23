### Contexte : Gestion d'une bibliothèque

Tu vas implémenter un système simple de gestion de bibliothèque où plusieurs types d'articles sont gérés. Chaque type d'article peut être emprunté et retourné, mais ils auront des comportements légèrement différents.

### Étapes de l'exercice :

1. **Création d'une classe `Article` (classe de base)** :
   - L'`Article` a un attribut `titre` (String) et un attribut `auteur` (String).
   - Crée une méthode `emprunter()` pour marquer l'emprunt de l'article et une méthode `retourner()` pour marquer le retour de l'article.
   
2. **Création de sous-classes `Livre` et `Revue` (polymorphisme d'héritage)** :
   - La classe `Livre` possède un attribut supplémentaire `nombrePages` (int).
   - La classe `Revue` possède un attribut supplémentaire `numeroEdition` (int).
   - Redéfinis la méthode `emprunter()` dans les sous-classes pour afficher des messages spécifiques lorsque l'article est emprunté.
   
3. **Surcharge de la méthode `emprunter()`** :
   - Ajoute une méthode `emprunter(String dateEmprunt)` dans la classe `Article` pour accepter une date d'emprunt sous forme de chaîne. La méthode doit être surchargée pour accepter un paramètre supplémentaire (la date).
   - Implémente cette méthode dans `Livre` et `Revue` pour afficher un message indiquant l'emprunt avec la date.

4. **Utilisation de la généricité pour gérer une collection d'articles** :
   - Crée une classe générique `Bibliotheque<T>` qui peut contenir n'importe quel type d'`Article` (Livre, Revue, etc.).
   - Ajoute des méthodes pour ajouter un article à la bibliothèque et pour afficher la liste des articles empruntés.
   
5. **Bonus (polymorphisme avec des collections)** :
   - Crée une méthode pour afficher tous les articles empruntés dans une bibliothèque, peu importe leur type (Livre, Revue).
