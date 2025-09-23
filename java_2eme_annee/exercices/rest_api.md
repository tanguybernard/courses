## Main

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.util.ArrayList;
import java.util.List;

// Classe principale
public class SimpleRestApiWithObjects {
    public static void main(String[] args) throws IOException {
        // Crée un serveur HTTP sur le port 8080
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);

        // Ajoute un endpoint pour "/api/users"
        server.createContext("/hello", new HelloHandler());
        server.createContext("/api/users", new UserHandler());

        // Démarre le serveur
        server.setExecutor(null); // Utilise le thread par défaut
        server.start();
        System.out.println("Server started on port 8080");
    }
}
```

## Hello Handler

```java
// Endpoint pour "/hello"
class HelloHandler implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if ("GET".equals(exchange.getRequestMethod())) {
            String response = "Hello, World!";
            exchange.sendResponseHeaders(200, response.getBytes().length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(response.getBytes());
            }
        } else {
            exchange.sendResponseHeaders(405, -1); // 405 Method Not Allowed
        }
    }
}
```

## User Handler

```java
class UserHandler implements HttpHandler {
    private static final ObjectMapper objectMapper = new ObjectMapper(); // Mapper JSON

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if ("GET".equals(exchange.getRequestMethod())) {
            // Création d'une liste d'objets User
            List<User> users = new ArrayList<>();
            users.add(new User(1, "John Doe"));
            users.add(new User(2, "Jane Doe"));

            // Conversion de la liste en JSON
            String jsonResponse = objectMapper.writeValueAsString(users);

            // Envoi de la réponse
            exchange.getResponseHeaders().set("Content-Type", "application/json");
            exchange.sendResponseHeaders(200, jsonResponse.getBytes().length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(jsonResponse.getBytes());
            }
        } else {
            exchange.sendResponseHeaders(405, -1); // 405 Method Not Allowed
        }
    }
}
```

## User

```java
// Classe représentant un utilisateur
class User {
    private int id;
    private String name;

    // Constructeur
    public User(int id, String name) {
        this.id = id;
        this.name = name;
    }

    // Getters et setters (nécessaires pour Jackson)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```
