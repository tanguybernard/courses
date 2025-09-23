Voici un sujet d'examen avec un exercice de Java sur les notions de programmation orientée objet, accompagné des critères d'évaluation :

## Exercice : Gestion d'une bibliothèque (60 points)

Vous devez implémenter un système simplifié de gestion de bibliothèque en Java en utilisant les concepts de la programmation orientée objet.

### Partie 1 : Création des classes de base (20 points)

1. Créez une classe abstraite `Document` avec les attributs suivants :
   - `titre` (String)
   - `auteur` (String)
   - `anneePublication` (int)
   - `cote` (String)

   Ajoutez un constructeur, les getters/setters nécessaires, et une méthode abstraite `afficherDetails()`.

2. Créez deux classes concrètes `Livre` et `Revue` qui héritent de `Document` :
   - `Livre` ajoute un attribut `nombrePages` (int)
   - `Revue` ajoute un attribut `numero` (int)

   Implémentez la méthode `afficherDetails()` pour chaque classe.

### Partie 2 : Gestion des emprunts (25 points)

3. Créez une interface `Empruntable` avec les méthodes :
   - `emprunter()`
   - `retourner()`
   - `estDisponible()`

4. Implémentez l'interface `Empruntable` dans la classe `Livre`.

5. Créez une classe `Emprunt` qui gère les emprunts avec les attributs :
   - `document` (Document)
   - `dateEmprunt` (java.time.LocalDate)
   - `dateRetourPrevue` (java.time.LocalDate)

### Partie 3 : Gestion de la bibliothèque (15 points)

6. Créez une classe `Bibliotheque` qui contient une liste de `Document` et des méthodes pour :
   - Ajouter un document
   - Rechercher un document par titre
   - Afficher tous les documents
   - Emprunter un document
   - Retourner un document

## Critères d'évaluation

1. Conception des classes et utilisation de l'héritage (15 points)
   - Utilisation correcte de la classe abstraite et des classes concrètes
   - Implémentation appropriée des méthodes abstraites

2. Implémentation de l'interface (10 points)
   - Utilisation correcte de l'interface `Empruntable`
   - Implémentation cohérente des méthodes de l'interface

3. Encapsulation et gestion des attributs (10 points)
   - Utilisation appropriée des modificateurs d'accès
   - Implémentation correcte des getters et setters

4. Polymorphisme (10 points)
   - Utilisation du polymorphisme dans la gestion des documents

5. Gestion des collections (8 points)
   - Utilisation appropriée des collections Java pour stocker les documents

6. Qualité du code et bonnes pratiques (7 points)
   - Nommage clair des variables, méthodes et classes
   - Organisation logique du code
   - Commentaires pertinents

Temps alloué : 2 heures

Bon courage !

Citations:
[1] https://www.pandacodeur.com/pages/examen-pandacodeur/examen-java/examen-java-01-.html
[2] https://devskiller.com/fr/tests-de-codage-competences/java/
[3] https://waytolearnx.com/2018/09/qcm-java-programmation-orientee-objet.html
[4] https://waytolearnx.com/2024/09/exercices-corriges-java-programmation-orientee-objet-partie-6.html
[5] https://zestedesavoir.com/tutoriels/pdf/274/les-tests-unitaires-en-java.pdf
[6] https://www.youtube.com/watch?v=jlgeeRK6hPg
[7] https://home.mis.u-picardie.fr/~furst/docs/exercicesPOO.pdf
[8] http://jl.baril.u-bourgogne.fr/java-1-20.pdf
[9] https://esling.github.io/documents/exam_12112019.pdf
[10] https://www.math.univ-paris13.fr/~chaussar/Teaching/2010-2011/IN120/corrige_test_final.pdf




################


Bien sûr, je vais vous fournir un exemple de code pour le sujet d'examen proposé. Notez que ce code est une implémentation possible et qu'il peut y avoir d'autres façons de résoudre l'exercice.

```java
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

// Classe abstraite Document
public abstract class Document {
    protected String titre;
    protected String auteur;
    protected int anneePublication;
    protected String cote;

    public Document(String titre, String auteur, int anneePublication, String cote) {
        this.titre = titre;
        this.auteur = auteur;
        this.anneePublication = anneePublication;
        this.cote = cote;
    }

    // Getters et setters
    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }
    public String getAuteur() { return auteur; }
    public void setAuteur(String auteur) { this.auteur = auteur; }
    public int getAnneePublication() { return anneePublication; }
    public void setAnneePublication(int anneePublication) { this.anneePublication = anneePublication; }
    public String getCote() { return cote; }
    public void setCote(String cote) { this.cote = cote; }

    public abstract void afficherDetails();
}

// Classe Livre
public class Livre extends Document implements Empruntable {
    private int nombrePages;
    private boolean disponible = true;

    public Livre(String titre, String auteur, int anneePublication, String cote, int nombrePages) {
        super(titre, auteur, anneePublication, cote);
        this.nombrePages = nombrePages;
    }

    @Override
    public void afficherDetails() {
        System.out.println("Livre: " + titre + " par " + auteur + ", " + anneePublication + ", " + nombrePages + " pages, Cote: " + cote);
    }

    @Override
    public void emprunter() {
        if (disponible) {
            disponible = false;
            System.out.println("Le livre " + titre + " a été emprunté.");
        } else {
            System.out.println("Le livre " + titre + " n'est pas disponible.");
        }
    }

    @Override
    public void retourner() {
        disponible = true;
        System.out.println("Le livre " + titre + " a été retourné.");
    }

    @Override
    public boolean estDisponible() {
        return disponible;
    }
}

// Classe Revue
public class Revue extends Document {
    private int numero;

    public Revue(String titre, String auteur, int anneePublication, String cote, int numero) {
        super(titre, auteur, anneePublication, cote);
        this.numero = numero;
    }

    @Override
    public void afficherDetails() {
        System.out.println("Revue: " + titre + " par " + auteur + ", " + anneePublication + ", Numéro " + numero + ", Cote: " + cote);
    }
}

// Interface Empruntable
public interface Empruntable {
    void emprunter();
    void retourner();
    boolean estDisponible();
}

// Classe Emprunt
public class Emprunt {
    private Document document;
    private LocalDate dateEmprunt;
    private LocalDate dateRetourPrevue;

    public Emprunt(Document document, LocalDate dateEmprunt, LocalDate dateRetourPrevue) {
        this.document = document;
        this.dateEmprunt = dateEmprunt;
        this.dateRetourPrevue = dateRetourPrevue;
    }

    // Getters et setters
    public Document getDocument() { return document; }
    public LocalDate getDateEmprunt() { return dateEmprunt; }
    public LocalDate getDateRetourPrevue() { return dateRetourPrevue; }
}

// Classe Bibliotheque
public class Bibliotheque {
    private List documents = new ArrayList<>();

    public void ajouterDocument(Document doc) {
        documents.add(doc);
    }

    public Document rechercherParTitre(String titre) {
        for (Document doc : documents) {
            if (doc.getTitre().equalsIgnoreCase(titre)) {
                return doc;
            }
        }
        return null;
    }

    public void afficherTousLesDocuments() {
        for (Document doc : documents) {
            doc.afficherDetails();
        }
    }

    public void emprunterDocument(String titre) {
        Document doc = rechercherParTitre(titre);
        if (doc != null && doc instanceof Empruntable) {
            ((Empruntable) doc).emprunter();
        } else {
            System.out.println("Document non trouvé ou non empruntable.");
        }
    }

    public void retournerDocument(String titre) {
        Document doc = rechercherParTitre(titre);
        if (doc != null && doc instanceof Empruntable) {
            ((Empruntable) doc).retourner();
        } else {
            System.out.println("Document non trouvé ou non empruntable.");
        }
    }
}

// Classe principale pour tester
public class Main {
    public static void main(String[] args) {
        Bibliotheque biblio = new Bibliotheque();

        Livre livre1 = new Livre("1984", "George Orwell", 1949, "L001", 328);
        Livre livre2 = new Livre("Le Petit Prince", "Antoine de Saint-Exupéry", 1943, "L002", 96);
        Revue revue1 = new Revue("Science et Vie", "Collectif", 2023, "R001", 1256);

        biblio.ajouterDocument(livre1);
        biblio.ajouterDocument(livre2);
        biblio.ajouterDocument(revue1);

        System.out.println("Tous les documents :");
        biblio.afficherTousLesDocuments();

        System.out.println("\nEmprunter un livre :");
        biblio.emprunterDocument("1984");

        System.out.println("\nTenter d'emprunter le même livre :");
        biblio.emprunterDocument("1984");

        System.out.println("\nRetourner le livre :");
        biblio.retournerDocument("1984");

        System.out.println("\nTenter d'emprunter une revue :");
        biblio.emprunterDocument("Science et Vie");
    }
}
```

Ce code implémente toutes les classes et fonctionnalités demandées dans l'exercice. Il inclut :

1. La classe abstraite `Document` et ses classes filles `Livre` et `Revue`.
2. L'interface `Empruntable` implémentée par `Livre`.
3. La classe `Emprunt` pour gérer les emprunts.
4. La classe `Bibliotheque` qui gère une collection de documents et les opérations associées.
5. Une classe `Main` pour tester le fonctionnement du système.

Ce code respecte les principes de la programmation orientée objet tels que l'héritage, le polymorphisme, l'encapsulation et l'utilisation d'interfaces.




#######

LE POLYMORPHISME

Dans le code que j'ai généré pour l'exercice de la bibliothèque, le polymorphisme est effectivement présent, mais peut-être pas de manière aussi évidente. Voici les principaux endroits où le polymorphisme est utilisé :

1. Dans la classe `Bibliotheque` :
   ```java
   private List documents = new ArrayList<>();
   ```
   Cette liste peut contenir des objets de type `Livre` ou `Revue`, qui sont tous deux des sous-classes de `Document`. C'est un exemple de polymorphisme d'inclusion.

2. Dans la méthode `afficherTousLesDocuments()` de la classe `Bibliotheque` :
   ```java
   public void afficherTousLesDocuments() {
       for (Document doc : documents) {
           doc.afficherDetails();
       }
   }
   ```
   Ici, `afficherDetails()` est appelée sur chaque `Document`, mais la méthode exécutée sera celle de la sous-classe spécifique (`Livre` ou `Revue`). C'est un exemple de polymorphisme de méthodes.

3. Dans les méthodes `emprunterDocument()` et `retournerDocument()` de la classe `Bibliotheque` :
   ```java
   if (doc != null && doc instanceof Empruntable) {
       ((Empruntable) doc).emprunter();
   }
   ```
   Ici, nous utilisons le polymorphisme d'interface. Le document est traité comme un `Empruntable` s'il implémente cette interface.

Ces exemples montrent comment le polymorphisme permet de traiter des objets de différentes classes de manière uniforme, en utilisant leur superclasse commune ou une interface.
