

# 🎓 Exercice Java – Pokémon API & Programmation Orientée Objet

---

## 🎯 Objectifs pédagogiques

* Manipuler les concepts de la **Programmation Orientée Objet (POO)** :

    * Interfaces
    * Classes abstraites
    * Héritage
    * Polymorphisme
* Consommer une **API REST externe** avec Java (`HttpClient`)
* Manipuler des données **JSON** avec `Gson` ou `Jackson`

---

## 📝 Exercice

Tu travailles pour le **PokéCenter**, un centre d'analyse de Pokémon. On te demande de développer un petit programme Java qui va :

1. **Demander à l’utilisateur le nom d’un Pokémon**.
2. **Récupérer ses informations** depuis l’API PokéAPI : [https://pokeapi.co/api/v2/pokemon/{name}](https://pokeapi.co/api/v2/pokemon/{name})
3. **Créer dynamiquement une instance** d’un objet représentant ce Pokémon selon son **type principal** (eau, feu ou plante).
4. **Afficher ses informations**, ainsi qu’un **message personnalisé** en fonction de son type.


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


## 🧰 Ressources

* **API Pokémon** : [https://pokeapi.co](https://pokeapi.co)
* **Java HTTP** : [`HttpClient`](https://docs.oracle.com/en/java/javase/11/docs/api/java.net.http/java/net/http/HttpClient.html)
* **JSON parsing** :

    * `Gson` : [https://github.com/google/gson](https://github.com/google/gson)
    * ou `Jackson` selon ton choix

---

## ✍️ À toi de jouer !

Tu peux travailler en binôme ou en solo.
Concentre-toi d’abord sur une architecture propre avant de tout coder.
