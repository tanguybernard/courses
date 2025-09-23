Voici une **solution complète en Java** de l’exercice proposé, utilisant `HttpClient` et `Jackson` pour interagir avec l’API TheCocktailDB :

---

## ✅ Structure du projet

**Dépendances Maven à ajouter (`pom.xml`)** :

```xml
<dependencies>
  <dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.15.2</version>
  </dependency>
</dependencies>
```

---

## 📁 Code Java

### `CocktailApp.java` – classe principale

```java
import java.io.IOException;
import java.net.URI;
import java.net.http.*;
import java.util.Scanner;

import com.fasterxml.jackson.databind.ObjectMapper;

public class CocktailApp {

    private static final String API_URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static void main(String[] args) throws IOException, InterruptedException {
        Scanner scanner = new Scanner(System.in);

        while (true) {
            System.out.print("🔍 Entrez le nom d’un cocktail (ou 'exit' pour quitter) : ");
            String search = scanner.nextLine();

            if ("exit".equalsIgnoreCase(search)) break;

            String json = fetchCocktails(search);

            CocktailResponse response = objectMapper.readValue(json, CocktailResponse.class);

            if (response.getDrinks() == null) {
                System.out.println("❌ Aucun cocktail trouvé.\n");
                continue;
            }

            for (Drink drink : response.getDrinks()) {
                System.out.println("\n🍸 Nom : " + drink.getStrDrink());
                System.out.println("📂 Catégorie : " + drink.getStrCategory());
                System.out.println("🥃 Verre : " + drink.getStrGlass());
                System.out.println("🧪 Ingrédients :");
                for (int i = 1; i <= 15; i++) {
                    String ingredient = drink.getIngredient(i);
                    String measure = drink.getMeasure(i);
                    if (ingredient != null && !ingredient.isEmpty()) {
                        System.out.println("  - " + ingredient + (measure != null ? " : " + measure : ""));
                    }
                }
                System.out.println("📜 Instructions : " + drink.getStrInstructions() + "\n");
            }
        }

        scanner.close();
    }

    private static String fetchCocktails(String search) throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(API_URL + search))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        return response.body();
    }
}
```

---

### `CocktailResponse.java`

```java
import java.util.List;

public class CocktailResponse {
    private List<Drink> drinks;

    public List<Drink> getDrinks() {
        return drinks;
    }

    public void setDrinks(List<Drink> drinks) {
        this.drinks = drinks;
    }
}
```

---

### `Drink.java`

```java
import com.fasterxml.jackson.annotation.JsonProperty;

public class Drink {

    private String strDrink;
    private String strCategory;
    private String strGlass;
    private String strInstructions;

    // Les champs strIngredient1 à strIngredient15 et strMeasure1 à strMeasure15
    @JsonProperty("strIngredient1") private String strIngredient1;
    @JsonProperty("strIngredient2") private String strIngredient2;
    @JsonProperty("strIngredient3") private String strIngredient3;
    @JsonProperty("strIngredient4") private String strIngredient4;
    @JsonProperty("strIngredient5") private String strIngredient5;
    @JsonProperty("strIngredient6") private String strIngredient6;
    @JsonProperty("strIngredient7") private String strIngredient7;
    @JsonProperty("strIngredient8") private String strIngredient8;
    @JsonProperty("strIngredient9") private String strIngredient9;
    @JsonProperty("strIngredient10") private String strIngredient10;
    @JsonProperty("strIngredient11") private String strIngredient11;
    @JsonProperty("strIngredient12") private String strIngredient12;
    @JsonProperty("strIngredient13") private String strIngredient13;
    @JsonProperty("strIngredient14") private String strIngredient14;
    @JsonProperty("strIngredient15") private String strIngredient15;

    @JsonProperty("strMeasure1") private String strMeasure1;
    @JsonProperty("strMeasure2") private String strMeasure2;
    @JsonProperty("strMeasure3") private String strMeasure3;
    @JsonProperty("strMeasure4") private String strMeasure4;
    @JsonProperty("strMeasure5") private String strMeasure5;
    @JsonProperty("strMeasure6") private String strMeasure6;
    @JsonProperty("strMeasure7") private String strMeasure7;
    @JsonProperty("strMeasure8") private String strMeasure8;
    @JsonProperty("strMeasure9") private String strMeasure9;
    @JsonProperty("strMeasure10") private String strMeasure10;
    @JsonProperty("strMeasure11") private String strMeasure11;
    @JsonProperty("strMeasure12") private String strMeasure12;
    @JsonProperty("strMeasure13") private String strMeasure13;
    @JsonProperty("strMeasure14") private String strMeasure14;
    @JsonProperty("strMeasure15") private String strMeasure15;

    // Getters (omission des setters pour la concision)
    public String getStrDrink() { return strDrink; }
    public String getStrCategory() { return strCategory; }
    public String getStrGlass() { return strGlass; }
    public String getStrInstructions() { return strInstructions; }

    public String getIngredient(int index) {
        try {
            return (String) Drink.class.getDeclaredField("strIngredient" + index).get(this);
        } catch (Exception e) {
            return null;
        }
    }

    public String getMeasure(int index) {
        try {
            return (String) Drink.class.getDeclaredField("strMeasure" + index).get(this);
        } catch (Exception e) {
            return null;
        }
    }
}
```

---

✅ **Résultat :** L'application interroge l'API, affiche proprement les cocktails et leurs ingrédients, et continue tant que l'utilisateur n’écrit pas `exit`.
