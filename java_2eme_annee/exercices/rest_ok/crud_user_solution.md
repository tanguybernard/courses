API REST simple en **Spring Boot** sans base de données, stockant les utilisateurs en mémoire avec une **List**.  

---

### **1. Création du projet**
Ajoute ces dépendances dans ton `pom.xml` si tu utilises **Maven** :  
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
</dependency>
```

---

### **2. Modèle de données (`User.java`)**
```java
import java.util.UUID;

public class User {
    private UUID id;
    private String firstName;
    private String lastName;
    private String email;

    public User() {
        this.id = UUID.randomUUID(); // Génère un ID unique
    }

    public UUID getId() { return id; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
```

---

### **3. Service métier (`UserService.java`)**
```java
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class UserService {
    private final List<User> users = new ArrayList<>();

    public List<User> getAllUsers() {
        return users;
    }

    public Optional<User> getUserById(UUID id) {
        return users.stream().filter(user -> user.getId().equals(id)).findFirst();
    }

    public User createUser(User user) {
        user = new User();
        user.setFirstName(user.getFirstName());
        user.setLastName(user.getLastName());
        user.setEmail(user.getEmail());
        users.add(user);
        return user;
    }

    public Optional<User> updateUser(UUID id, User newUser) {
        return getUserById(id).map(user -> {
            user.setFirstName(newUser.getFirstName());
            user.setLastName(newUser.getLastName());
            user.setEmail(newUser.getEmail());
            return user;
        });
    }

    public boolean deleteUser(UUID id) {
        return users.removeIf(user -> user.getId().equals(id));
    }
}
```

---

### **4. Contrôleur REST (`UserController.java`)**
```java
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable UUID id) {
        return userService.getUserById(id);
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PutMapping("/{id}")
    public Optional<User> updateUser(@PathVariable UUID id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable UUID id) {
        return userService.deleteUser(id) ? "Utilisateur supprimé" : "Utilisateur non trouvé";
    }
}
```

---

### **5. Lancer l’application**
Dans ta classe `Application.java` :
```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

---

### **6. Tester l’API**  
- **Créer un utilisateur** (POST)  
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com"
  }
  ```
- **Récupérer tous les utilisateurs** (GET) → `/users`  
- **Récupérer un utilisateur** (GET) → `/users/{id}`  
- **Modifier un utilisateur** (PUT) → `/users/{id}`  
- **Supprimer un utilisateur** (DELETE) → `/users/{id}`  

---

C’est une API minimaliste sans base de données, idéale pour des tests rapides. 🚀  
Si tu veux ajouter de la persistance en mémoire (H2), dis-moi ! 😊
