## Exercice : Gestion d'une bibliothèque

Créez une application Java pour gérer une petite bibliothèque. L'application doit permettre d'ajouter des livres, d'afficher la liste des livres, et de rechercher des livres par titre ou auteur.

### Objectifs

1. Établir une connexion à une base de données MySQL.
2. Créer une table "livres" avec les colonnes : id, titre, auteur, annee_publication.
3. Implémenter les fonctionnalités CRUD (Create, Read, Update, Delete) pour les livres.

### Étapes

1. **Configuration de la base de données**
   - Créez une base de données MySQL nommée "bibliotheque".
   - Utilisez JDBC pour établir la connexion à la base de données[1][4].

2. **Création de la table**
   - Écrivez une méthode pour créer la table "livres" si elle n'existe pas déjà[4].

3. **Implémentation des fonctionnalités**
   - **Ajouter un livre** : Insérez un nouveau livre dans la base de données[1].
   - **Afficher tous les livres** : Récupérez et affichez tous les livres de la base de données[2].
   - **Rechercher un livre** : Permettez la recherche par titre ou auteur[5].
   - **Mettre à jour un livre** : Modifiez les informations d'un livre existant[2].
   - **Supprimer un livre** : Supprimez un livre de la base de données.

4. **Interface utilisateur**
   - Créez un menu simple en ligne de commande pour interagir avec l'application.

### Exemple de structure du code

```java
import java.sql.*;
import java.util.Scanner;

public class GestionBibliotheque {
    private static final String URL = "jdbc:mysql://localhost:3306/bibliotheque";
    private static final String USER = "votre_utilisateur";
    private static final String PASSWORD = "votre_mot_de_passe";

    public static void main(String[] args) {
        try {
            Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
            // Implémentez ici le menu et les appels aux méthodes CRUD
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void creerTable(Connection conn) throws SQLException {
        // Code pour créer la table
    }

    public static void ajouterLivre(Connection conn, String titre, String auteur, int anneePublication) throws SQLException {
        // Code pour ajouter un livre
    }

    // Ajoutez d'autres méthodes pour les opérations CRUD
}
```

### Bonus

- Ajoutez une gestion des exceptions pour une meilleure robustesse.
- Implémentez une fonctionnalité pour exporter la liste des livres dans un fichier CSV.

