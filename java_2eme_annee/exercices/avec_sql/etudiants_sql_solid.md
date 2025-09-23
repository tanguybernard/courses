Voici un exercice qui allie la programmation orientée objet (POO) en Java, l'accès à une base de données et l'application des principes SOLID :

---

## 📚 **Exercice : Gestion des Étudiants**

### 🎯 **Objectif**
- Travailler les concepts de POO : classes, héritage, encapsulation, polymorphisme.
- Appliquer les principes SOLID : responsabilité unique, ouverture/fermeture, substitution de Liskov, ségrégation des interfaces et inversion des dépendances.
- Séparer les couches métier et persistance des données.

---

## 🔥 **Contexte**
Une école souhaite gérer les informations de ses étudiants. Chaque étudiant a un nom, un prénom, une date de naissance et un identifiant unique.

L'école souhaite pouvoir :
- Ajouter un nouvel étudiant dans la base de données.
- Consulter tous les étudiants.
- Rechercher un étudiant par son identifiant.
- Supprimer un étudiant.

---

## 🏗️ **Consignes**
1. **Modèle métier** : Créer une classe `Student` pour représenter un étudiant.
2. **Interface de repository** (ISP, DIP) : Créer une interface `StudentRepository` définissant les méthodes pour interagir avec les données.
3. **Implémentation de la persistance** : Créer une classe `StudentJdbcRepository` qui implémente `StudentRepository` pour gérer les données via JDBC.
4. **Service métier** : Créer une classe `StudentService` qui utilise l'interface `StudentRepository` pour la logique métier (ajout, recherche, suppression).
5. **Application principale** : Créer une classe `Main` avec un menu pour tester les fonctionnalités.

---

## 🔧 **Contraintes techniques**
- Utilisation de JDBC pour la connexion à la base de données (sans framework comme JPA/Hibernate).
- Base de données relationnelle (MySQL ou PostgreSQL).
- Gestion des exceptions.
- Respect strict des principes SOLID.

---

## 🔎 **Structure du projet**
```
src/
├── app/
│   ├── model/         -> Classe Student
│   ├── repository/    -> Interface StudentRepository et implémentation StudentJdbcRepository
│   ├── service/       -> Classe StudentService
│   └── main/          -> Classe Main pour le menu principal
```

---

## 💡 **Exemple d'interface StudentRepository**
```java
public interface StudentRepository {
    void addStudent(Student student);
    List<Student> getAllStudents();
    Optional<Student> findById(int id);
    void deleteStudent(int id);
}
```

---

## 💡 **Exemple de classe Student**
```java
public class Student {
    private int id;
    private String firstName;
    private String lastName;
    private LocalDate birthDate;

    // Constructeur, getters et setters
}
```

---

## 🔥 **À toi de jouer !**
1. Crée la base de données et la table `students` correspondante.
2. Implémente les classes en respectant les principes SOLID.
3. Teste les fonctionnalités dans la classe `Main`.

Si tu as besoin d'aide pour une partie spécifique ou pour configurer la base de données, n'hésite pas ! 🚀