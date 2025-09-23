Un exercice basé sur une base de données de **séries TV et films**. L'idée est de gérer une médiathèque personnelle avec des séries et des films, en utilisant les principes **SOLID** et une séparation claire entre la partie métier et la base de données.

---

## 📁 **Structure du projet**
```
src/
├── main/
│   ├── java/
│   │   └── media/
│   │       ├── model/                -> Classes Movie et Series
│   │       ├── repository/           -> Interface MediaRepository + implémentation
│   │       ├── service/              -> Classe MediaService
│   │       └── main/                 -> Classe Main (point d'entrée)
└── resources/
```

---

## 💡 **Contexte de l'exercice**
Tu veux gérer ta propre médiathèque pour suivre les séries et films que tu regardes, marquer les saisons terminées ou non, ajouter des films à ta collection et les noter.

---

## 🏗️ **Objectifs pédagogiques**
- Gérer les données avec **JDBC** pur.
- Appliquer les principes **SOLID** pour organiser le code proprement.
- Travailler avec les concepts de **polymorphisme** et d'**héritage** (via une interface `Media`).
- Approfondir les **requêtes SQL** basiques.

---

## 🔧 **Configuration du pom.xml**
```xml
<dependencies>
    <!-- MySQL Driver -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <scope>runtime</scope>
    </dependency>

    <!-- Lombok pour les getters/setters simplifiés -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <scope>provided</scope>
    </dependency>
</dependencies>
```

---

## 🗄️ **Modélisation des classes**
### 📄 **Interface Media**
```java
package media.model;

public interface Media {
    String getTitle();
    void setTitle(String title);
    int getYear();
    void setYear(int year);
}
```

### 📄 **Classe Movie**
```java
package media.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Movie implements Media {
    private int id;
    private String title;
    private int year;
    private String genre;
    private double rating;
}
```

### 📄 **Classe Series**
```java
package media.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Series implements Media {
    private int id;
    private String title;
    private int year;
    private int seasons;
    private boolean completed;
}
```

---

## 🗄️ **Gestion de la base de données**
### 📄 **Interface MediaRepository**
```java
package media.repository;

import media.model.Media;

import java.util.List;
import java.util.Optional;

public interface MediaRepository {
    void addMedia(Media media);
    List<Media> getAllMedia();
    Optional<Media> findById(int id);
    void deleteMedia(int id);
}
```

### 📄 **Implémentation JDBC**
```java
package media.repository;

import media.model.Media;
import media.model.Movie;
import media.model.Series;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class MediaJdbcRepository implements MediaRepository {

    private final String url = "jdbc:mysql://localhost:3306/media_db";
    private final String user = "root";
    private final String password = "your_password";

    public MediaJdbcRepository() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            System.err.println("Erreur de chargement du driver JDBC : " + e.getMessage());
        }
    }

    private Connection getConnection() throws SQLException {
        return DriverManager.getConnection(url, user, password);
    }

    @Override
    public void addMedia(Media media) {
        String sql = media instanceof Movie ?
                "INSERT INTO movies (title, year, genre, rating) VALUES (?, ?, ?, ?)" :
                "INSERT INTO series (title, year, seasons, completed) VALUES (?, ?, ?, ?)";

        try (Connection conn = getConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, media.getTitle());
            stmt.setInt(2, media.getYear());

            if (media instanceof Movie movie) {
                stmt.setString(3, movie.getGenre());
                stmt.setDouble(4, movie.getRating());
            } else if (media instanceof Series series) {
                stmt.setInt(3, series.getSeasons());
                stmt.setBoolean(4, series.isCompleted());
            }
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<Media> getAllMedia() {
        List<Media> mediaList = new ArrayList<>();
        String sqlMovies = "SELECT * FROM movies";
        String sqlSeries = "SELECT * FROM series";

        try (Connection conn = getConnection();
             Statement stmt = conn.createStatement()) {
            ResultSet rs = stmt.executeQuery(sqlMovies);
            while (rs.next()) {
                mediaList.add(new Movie(
                        rs.getInt("id"),
                        rs.getString("title"),
                        rs.getInt("year"),
                        rs.getString("genre"),
                        rs.getDouble("rating")
                ));
            }

            rs = stmt.executeQuery(sqlSeries);
            while (rs.next()) {
                mediaList.add(new Series(
                        rs.getInt("id"),
                        rs.getString("title"),
                        rs.getInt("year"),
                        rs.getInt("seasons"),
                        rs.getBoolean("completed")
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return mediaList;
    }

    @Override
    public Optional<Media> findById(int id) {
        return getAllMedia().stream().filter(m -> m instanceof Movie && ((Movie) m).getId() == id).findFirst();
    }

    @Override
    public void deleteMedia(int id) {
        String sql = "DELETE FROM movies WHERE id = ?; DELETE FROM series WHERE id = ?";
        try (Connection conn = getConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            stmt.setInt(2, id);
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
```

---

## 🔥 **Point d'entrée - Main**
```java
package media.main;

import media.model.Movie;
import media.model.Series;
import media.repository.MediaJdbcRepository;
import media.repository.MediaRepository;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        MediaRepository repository = new MediaJdbcRepository();
        Scanner scanner = new Scanner(System.in);

        System.out.println("Ajouter un film ou une série (f/s) : ");
        String choice = scanner.nextLine();

        System.out.print("Titre : ");
        String title = scanner.nextLine();

        System.out.print("Année : ");
        int year = scanner.nextInt();

        if (choice.equalsIgnoreCase("f")) {
            System.out.print("Genre : ");
            String genre = scanner.next();
            System.out.print("Note : ");
            double rating = scanner.nextDouble();

            repository.addMedia(new Movie(0, title, year, genre, rating));
        } else {
            System.out.print("Nombre de saisons : ");
            int seasons = scanner.nextInt();
            System.out.print("Terminée (true/false) : ");
            boolean completed = scanner.nextBoolean();

            repository.addMedia(new Series(0, title, year, seasons, completed));
        }

        System.out.println("Votre médiathèque : " + repository.getAllMedia());
    }
}
```

---

## 💾 **Préparation de la base de données**
```sql
CREATE DATABASE media_db;
USE media_db;

CREATE TABLE movies (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(100), year INT, genre VARCHAR(50), rating DOUBLE);
CREATE TABLE series (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(100), year INT, seasons INT, completed BOOLEAN);
```