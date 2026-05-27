# Seance 2 : Heritage, Abstraction & Polymorphisme

**Duree :** 3h
**Objectifs :** Classe abstraite, methode abstraite, `extends`, `@Override`, polymorphisme via collections, premier controller Spring.

**Pre-requis :** Seance 1 terminee (classes `Produit`, `Etat`, `Plateforme` et `CsvParser` fonctionnels).

---

## Partie 1 : Mini-exo — Course de Vehicules (~45min)

### Contexte

On concoit un jeu de plateau ou differents types de vehicules s'affrontent sur une piste. Chaque vehicule avance differemment.


## Partie 2 : Projet Pixel Trader (~2h)

### Etape 1 : Rendre `Produit` abstrait

Actuellement, `Produit` est une classe concrete. On va la rendre abstraite car le stock de Pixel Trader contient deux types de produits qui calculent leur marge differemment :

- **Un jeu video** : la marge est simple (prix estime - prix d'achat)
- **Une console retro** : la marge est reduite de 15% (frais de reconditionnement)



### Etape 2 : Creer les sous-classes

**`Jeu` :**

**`ConsoleRetro` :**

### Etape 3 : Polymorphisme dans le stock

Adaptez votre `CsvParser` pour gerer des produits

**Observez :** `produit.calculerMarge()` appelle `Jeu.calculerMarge()` ou `ConsoleRetro.calculerMarge()` selon le type reel de l'objet. Exactement comme `v.avancer()` dans la course de vehicules.

### Etape 4 : Premier Controller Spring (~30min)

C'est le moment de connecter votre domaine a une API REST.

**Creez le package `controller` et la classe `ProduitController` :**

```java
package com.pixeltrader.controller;

import com.pixeltrader.domain.*;
import com.pixeltrader.utils.CsvParser;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ProduitController {

    private List<Produit> stock;

    public ProduitController() {
        // Pour l'instant, on charge les donnees depuis le CSV au demarrage
        CsvParser parser = new CsvParser();
        this.stock = parser.parse("stock_legacy_full.csv");
    }

    @GetMapping("/produits")
    public List<Produit> listerProduits() {
        return stock;
    }

    @GetMapping("/produits/{index}")
    public Produit getProduit(@PathVariable int index) {
        return stock.get(index);
    }

    @GetMapping("/stats")
    public String getStats() {
        double valeur = 0;
        double marge = 0;
        for (Produit p : stock) {
            valeur += p.getPrixEstime();
            marge += p.calculerMarge();
        }
        return "Stock: " + stock.size() + " produits | Valeur: " 
               + valeur + " EUR | Marge estimee: " + marge + " EUR";
    }
}
```

**Lancez l'application** et testez dans votre navigateur :
- `http://localhost:8080/api/produits` — vous devez voir la liste en JSON
- `http://localhost:8080/api/produits/0` — le premier produit
- `http://localhost:8080/api/stats` — les KPIs


