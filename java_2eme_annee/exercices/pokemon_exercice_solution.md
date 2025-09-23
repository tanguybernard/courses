

# 🎓 Exercice Java – Pokémon API & Programmation Orientée Objet



### 🧩 Architecture demandée

#### Interface : `IPokemon`

```java
public interface IPokemon {
    void displayInfo();
}
```

#### Classe abstraite : `AbstractPokemon`

```java
public abstract class AbstractPokemon implements IPokemon {
    protected String name;
    protected int height;
    protected int weight;
    protected List<String> types;

    public AbstractPokemon(String name, int height, int weight, List<String> types) {
        this.name = name;
        this.height = height;
        this.weight = weight;
        this.types = types;
    }

    @Override
    public void displayInfo() {
        System.out.println("Nom : " + name);
        System.out.println("Taille : " + height);
        System.out.println("Poids : " + weight);
        System.out.println("Types : " + String.join(", ", types));
        displaySpecialMessage();
    }

    protected abstract void displaySpecialMessage();
}
```

#### Sous-classes concrètes :

* `FirePokemon`
* `WaterPokemon`
* `GrassPokemon`

Exemple :

```java
public class FirePokemon extends AbstractPokemon {
    public FirePokemon(String name, int height, int weight, List<String> types) {
        super(name, height, weight, types);
    }

    @Override
    protected void displaySpecialMessage() {
        System.out.println("🔥 Attention ! Ce Pokémon de type Feu redoute l’eau !");
    }
}
```

#### Classe de fabrique : `PokemonFactory`

Cette classe retourne la bonne instance selon le **premier type** du Pokémon :

```java
public class PokemonFactory {
    public static AbstractPokemon create(String name, int height, int weight, List<String> types) {
        String mainType = types.get(0);
        return switch (mainType) {
            case "fire" -> new FirePokemon(name, height, weight, types);
            case "water" -> new WaterPokemon(name, height, weight, types);
            case "grass" -> new GrassPokemon(name, height, weight, types);
            default -> null; // à améliorer si temps
        };
    }
}
```

---

## 📦 Données à extraire de l’API

Requête :
👉 `GET https://pokeapi.co/api/v2/pokemon/{name}`

Exemple avec `https://pokeapi.co/api/v2/pokemon/charmander`

Données utiles :

```json
{
  "name": "charmander",
  "height": 6,
  "weight": 85,
  "types": [
    { "type": { "name": "fire" } }
  ]
}
```

---

## 🧪 Exemple d'exécution attendue

```
Entrez le nom d’un Pokémon : bulbasaur

Nom : bulbasaur
Taille : 7
Poids : 69
Types : grass, poison
🌿 Ce Pokémon adore le soleil, il est de type Herbe !
```

---

## 📌 Contraintes

* Seuls les types `fire`, `water` et `grass` doivent être gérés.
* Si le Pokémon ne correspond pas à ces types, on peut afficher un message d’erreur ou `Type non pris en charge`.

---

## ✅ Bonus (si rapide)

* Gérer plusieurs recherches successives dans une boucle.
* Créer une classe `UnknownPokemon` pour les types non gérés.

---

## 🧰 Ressources

* **API Pokémon** : [https://pokeapi.co](https://pokeapi.co)
* **Java HTTP** : [`HttpClient`](https://docs.oracle.com/en/java/javase/11/docs/api/java.net.http/java/net/http/HttpClient.html)
* **JSON parsing** :

    * `Gson` : [https://github.com/google/gson](https://github.com/google/gson)
    * ou `Jackson` selon ton choix