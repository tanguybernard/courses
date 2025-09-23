

## 📁 **Structure du projet**
```
src/
├── main/
│   ├── java/
│   │   └── app/
│   │       ├── model/                -> Classe Student
│   │       ├── repository/           -> Interface StudentRepository et implémentation StudentJdbcRepository
│   │       ├── service/              -> Classe StudentService
│   │       └── main/                 -> Classe Main (point d'entrée)
└── resources/
    └── application.properties        -> Configuration de la base de données (facultatif)
```

---

## 📄 **pom.xml**
```xml
<dependencies>
    <!-- Driver MySQL -->
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

## 📄 **Classe Student**
```java
package app.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    private int id;
    private String firstName;
    private String lastName;
    private LocalDate birthDate;
}
```

---

## 📄 **Interface StudentRepository**
```java
package app.repository;

import app.model.Student;

import java.util.List;
import java.util.Optional;

public interface StudentRepository {
    void addStudent(Student student);
    List<Student> getAllStudents();
    Optional<Student> findById(int id);
    void deleteStudent(int id);
}
```

---

## 📄 **Classe StudentJdbcRepository**
```java
package app.repository;

import app.model.Student;

import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class StudentJdbcRepository implements StudentRepository {

    private final String url = "jdbc:mysql://localhost:3306/school_db";
    private final String user = "root";
    private final String password = "your_password";

    public StudentJdbcRepository() {
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
    public void addStudent(Student student) {
        String sql = "INSERT INTO students (first_name, last_name, birth_date) VALUES (?, ?, ?)";

        try (Connection conn = getConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, student.getFirstName());
            stmt.setString(2, student.getLastName());
            stmt.setDate(3, Date.valueOf(student.getBirthDate()));
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<Student> getAllStudents() {
        List<Student> students = new ArrayList<>();
        String sql = "SELECT * FROM students";

        try (Connection conn = getConnection(); Statement stmt = conn.createStatement(); ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                students.add(new Student(
                        rs.getInt("id"),
                        rs.getString("first_name"),
                        rs.getString("last_name"),
                        rs.getDate("birth_date").toLocalDate()
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return students;
    }

    @Override
    public Optional<Student> findById(int id) {
        String sql = "SELECT * FROM students WHERE id = ?";
        try (Connection conn = getConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return Optional.of(new Student(
                        rs.getInt("id"),
                        rs.getString("first_name"),
                        rs.getString("last_name"),
                        rs.getDate("birth_date").toLocalDate()
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return Optional.empty();
    }

    @Override
    public void deleteStudent(int id) {
        String sql = "DELETE FROM students WHERE id = ?";

        try (Connection conn = getConnection(); PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
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
package app.main;

import app.model.Student;
import app.repository.StudentJdbcRepository;
import app.repository.StudentRepository;

import java.time.LocalDate;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        StudentRepository repository = new StudentJdbcRepository();
        Scanner scanner = new Scanner(System.in);

        while (true) {
            System.out.println("1. Ajouter un étudiant");
            System.out.println("2. Afficher tous les étudiants");
            System.out.println("3. Rechercher par ID");
            System.out.println("4. Supprimer un étudiant");
            System.out.println("5. Quitter");
            System.out.print("Choix : ");
            int choix = scanner.nextInt();

            switch (choix) {
                case 1 -> {
                    System.out.print("Prénom : ");
                    String firstName = scanner.next();
                    System.out.print("Nom : ");
                    String lastName = scanner.next();
                    System.out.print("Date de naissance (AAAA-MM-JJ) : ");
                    LocalDate birthDate = LocalDate.parse(scanner.next());

                    repository.addStudent(new Student(0, firstName, lastName, birthDate));
                    System.out.println("Étudiant ajouté !");
                }
                case 2 -> repository.getAllStudents().forEach(System.out::println);
                case 3 -> {
                    System.out.print("ID de l'étudiant : ");
                    int id = scanner.nextInt();
                    repository.findById(id).ifPresentOrElse(
                            System.out::println,
                            () -> System.out.println("Étudiant non trouvé")
                    );
                }
                case 4 -> {
                    System.out.print("ID de l'étudiant à supprimer : ");
                    int id = scanner.nextInt();
                    repository.deleteStudent(id);
                    System.out.println("Étudiant supprimé !");
                }
                case 5 -> System.exit(0);
                default -> System.out.println("Choix invalide.");
            }
        }
    }
}
```

---

## 🛠️ **Préparation de la base de données**
Assure-toi d'avoir créé la base et la table MySQL avant de tester :

```sql
CREATE DATABASE school_db;
USE school_db;

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    birth_date DATE
);
```

