Voici un exercice qui intègre les trois types de polymorphisme que tu souhaites travailler : **polymorphisme ad hoc (surcharge)**, **polymorphisme paramétrique (généricité)**, et **polymorphisme d'héritage (redéfinition)**.

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

### Exemple de code attendu :

```java
// Classe de base Article
class Article {
    String titre;
    String auteur;

    public Article(String titre, String auteur) {
        this.titre = titre;
        this.auteur = auteur;
    }

    // Méthode emprunter
    public void emprunter() {
        System.out.println("L'article \"" + titre + "\" de " + auteur + " a été emprunté.");
    }

    // Surcharge de la méthode emprunter avec la date
    public void emprunter(String dateEmprunt) {
        System.out.println("L'article \"" + titre + "\" de " + auteur + " a été emprunté le " + dateEmprunt + ".");
    }

    public void retourner() {
        System.out.println("L'article \"" + titre + "\" de " + auteur + " a été retourné.");
    }
}

// Sous-classe Livre
class Livre extends Article {
    int nombrePages;

    public Livre(String titre, String auteur, int nombrePages) {
        super(titre, auteur);
        this.nombrePages = nombrePages;
    }

    // Redéfinition de la méthode emprunter pour Livre
    @Override
    public void emprunter() {
        System.out.println("Le livre \"" + titre + "\" de " + auteur + " a été emprunté. Nombre de pages: " + nombrePages);
    }

    @Override
    public void emprunter(String dateEmprunt) {
        System.out.println("Le livre \"" + titre + "\" de " + auteur + " a été emprunté le " + dateEmprunt + ". Nombre de pages: " + nombrePages);
    }
}

// Sous-classe Revue
class Revue extends Article {
    int numeroEdition;

    public Revue(String titre, String auteur, int numeroEdition) {
        super(titre, auteur);
        this.numeroEdition = numeroEdition;
    }

    // Redéfinition de la méthode emprunter pour Revue
    @Override
    public void emprunter() {
        System.out.println("La revue \"" + titre + "\" de " + auteur + " a été empruntée. Numéro d'édition: " + numeroEdition);
    }

    @Override
    public void emprunter(String dateEmprunt) {
        System.out.println("La revue \"" + titre + "\" de " + auteur + " a été empruntée le " + dateEmprunt + ". Numéro d'édition: " + numeroEdition);
    }
}

// Classe générique Bibliotheque
class Bibliotheque<T extends Article> {
    private List<T> articles = new ArrayList<>();

    public void ajouterArticle(T article) {
        articles.add(article);
    }

    public void afficherArticlesEmpruntes() {
        for (T article : articles) {
            article.emprunter();
        }
    }
}

public class Main {
    public static void main(String[] args) {
        // Création d'articles
        Livre livre1 = new Livre("Les Misérables", "Victor Hugo", 1500);
        Revue revue1 = new Revue("Science et Vie", "Éditions du Monde", 101);

        // Création d'une bibliothèque générique
        Bibliotheque<Article> bibliotheque = new Bibliotheque<>();

        // Ajout des articles à la bibliothèque
        bibliotheque.ajouterArticle(livre1);
        bibliotheque.ajouterArticle(revue1);

        // Emprunter les articles
        livre1.emprunter();
        revue1.emprunter("2025-04-07");

        // Afficher tous les articles empruntés
        System.out.println("\nAffichage des articles empruntés :");
        bibliotheque.afficherArticlesEmpruntes();
    }
}
```

### Explication des éléments du code :

1. **Polymorphisme d'héritage** :
   - La classe `Livre` et la classe `Revue` héritent de la classe `Article` et redéfinissent la méthode `emprunter()`. 
   - Chaque sous-classe affiche des informations spécifiques : `Livre` affiche le nombre de pages, et `Revue` affiche le numéro de l'édition.

2. **Polymorphisme ad hoc (Surcharge)** :
   - La méthode `emprunter()` est surchargée dans la classe `Article` pour accepter un paramètre supplémentaire : une date sous forme de chaîne de caractères.
   - Les sous-classes `Livre` et `Revue` utilisent également cette surcharge, affichant la date d'emprunt respective.

3. **Polymorphisme paramétrique (Généricité)** :
   - La classe `Bibliotheque<T>` est générique et peut contenir des objets de type `Article` ou de ses sous-classes (`Livre`, `Revue`, etc.).
   - Cette classe générique permet de gérer des collections d'articles sans se soucier de leur type exact.

4. **Bonus : Polymorphisme avec des collections** :
   - Dans la méthode `afficherArticlesEmpruntes()`, la bibliothèque peut gérer un mélange d'articles de différents types, et grâce au polymorphisme, chaque article appelle la méthode `emprunter()` qui lui est propre.

### Objectifs de l'exercice :
- **Polymorphisme d'héritage** : Voir comment une méthode peut être redéfinie dans une sous-classe pour ajouter un comportement spécifique.
- **Polymorphisme ad hoc (surcharge)** : Illustrer comment une méthode peut être surchargée pour accepter différents types de paramètres.
- **Polymorphisme paramétrique (généricité)** : Utiliser les génériques pour permettre la gestion d'articles de différents types dans une même collection.

Cet exercice permet de couvrir tous les types de polymorphisme tout en créant un programme fonctionnel et structuré.
