

## 🧪 Exercice : Recherche de cocktails avec l’API TheCocktailDB

### 🎯 Objectif

Créer une application Java (en ligne de commande) qui permet de rechercher des cocktails par nom, d’afficher leurs ingrédients et instructions à partir de l’API [TheCocktailDB](https://www.thecocktaildb.com/api.php).

---

### 📚 Compétences visées

* Utiliser une API REST avec Java (`HttpClient`)
* Désérialiser une réponse JSON avec Jackson ou Gson
* Structurer son code proprement (modèle, service, etc.)
* Lire des données entrées par l’utilisateur via la console

---

### 🔧 Prérequis

* Java 11 ou supérieur
* Une librairie de parsing JSON (ex: `com.fasterxml.jackson` ou `com.google.gson`)
* Maven ou Gradle (recommandé pour la gestion des dépendances)

---

### 📝 Consigne

1. **Créer une méthode** qui interroge l’API suivante :
   `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`
   (remplace `margarita` par le nom du cocktail recherché).

2. **Modéliser la réponse JSON** sous forme de classes Java (`Drink`, `CocktailResponse`, etc.).

3. **Afficher les informations suivantes** pour chaque cocktail trouvé :

    * Nom du cocktail
    * Catégorie
    * Type de verre
    * Ingrédients (avec leurs quantités si disponibles)
    * Instructions

4. **Ajouter une interaction utilisateur** pour demander un nom de cocktail depuis la console.

---

### ✅ Exemple attendu (si on tape "mojito") :

```
🔍 Recherche du cocktail : mojito

🍸 Nom : Mojito
📂 Catégorie : Cocktail
🥃 Verre : Highball glass
🧪 Ingrédients :
  - Light rum : 2-3 oz
  - Lime : Juice of 1
  - Sugar : 2 tsp
  - Mint : 2-4
  - Soda water : Top up
📜 Instructions : Muddle mint leaves with sugar and lime juice. Add a splash of soda water and fill the glass with cracked ice. Pour the rum and top with soda water. Garnish and serve with straw.
```

---

### 🧩 Bonus

* Gérer le cas où aucun cocktail n’est trouvé.
* Permettre à l’utilisateur de faire plusieurs recherches sans relancer l’application.
* Ajouter une méthode pour récupérer un cocktail aléatoire via :
  `https://www.thecocktaildb.com/api/json/v1/1/random.php`
