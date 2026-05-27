# Seance 2 : Heritage, Abstraction & Polymorphisme

**Duree :** 3h
**Objectifs :** Classe abstraite, methode abstraite, `extends`, `@Override`, polymorphisme via collections, premier controller Spring.

**Pre-requis :** Seance 1 terminee (classes `Produit`, `Etat`, `Plateforme` et `CsvParser` fonctionnels).

---

## Partie 1 : Mini-exo — Course de Vehicules (~45min)

### Contexte

On concoit un jeu de plateau ou differents types de vehicules s'affrontent sur une piste. Chaque vehicule avance differemment.

### Etape 1 : Classe abstraite `Vehicule`

```java
public abstract class Vehicule {
    protected String nom;
    protected int position;

    public Vehicule(String nom) {
        this.nom = nom;
        this.position = 0;
    }

    // Chaque vehicule avance a sa maniere
    public abstract void avancer();

    public void afficherPosition() {
        System.out.println(nom + " est a la position " + position);
    }

    public int getPosition() {
        return position;
    }

    public String getNom() {
        return nom;
    }
}
```

**Question :** Pourquoi `abstract` ? Essayez d'ecrire `new Vehicule("Test")` — que se passe-t-il ?

### Etape 2 : Les sous-classes

**`Voiture` :** Avance de 3 a 6 cases a chaque tour.

```java
import java.util.Random;

public class Voiture extends Vehicule {
    private Random random = new Random();

    public Voiture(String nom) {
        super(nom);
    }

    @Override
    public void avancer() {
        int deplacement = random.nextInt(4) + 3; // 3 a 6
        this.position += deplacement;
        System.out.println(nom + " roule de " + deplacement + " cases.");
    }
}
```

**`Moto` :** Avance de 2 a 8 cases, mais 30% de chance de glisser (reste sur place).

```java
public class Moto extends Vehicule {
    private Random random = new Random();

    public Moto(String nom) {
        super(nom);
    }

    @Override
    public void avancer() {
        if (random.nextInt(100) < 30) {
            System.out.println(nom + " glisse et perd son tour !");
            return;
        }
        int deplacement = random.nextInt(7) + 2; // 2 a 8
        this.position += deplacement;
        System.out.println(nom + " fonce de " + deplacement + " cases !");
    }
}
```

**`Camion` :** Avance de 1 a 4 cases, mais ne glisse jamais.

A vous d'implementer `Camion` sur le meme modele.

### Etape 3 : La classe `Course`

```java
import java.util.List;

public class Course {
    private List<Vehicule> participants;

    public Course(List<Vehicule> participants) {
        this.participants = participants;
    }

    public void lancerTour() {
        for (Vehicule v : participants) {
            v.avancer();        // <-- POLYMORPHISME : on ne sait pas quel type c'est
            v.afficherPosition();
        }
        System.out.println("---");
    }

    public boolean courseTerminee() {
        for (Vehicule v : participants) {
            if (v.getPosition() >= 50) return true;
        }
        return false;
    }

    public void afficherClassement() {
        participants.sort((a, b) -> b.getPosition() - a.getPosition());
        System.out.println("=== CLASSEMENT ===");
        for (int i = 0; i < participants.size(); i++) {
            System.out.println((i + 1) + ". " + participants.get(i).getNom() 
                + " - Position " + participants.get(i).getPosition());
        }
    }
}
```

### Etape 4 : Lancer la course

```java
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        Vehicule v1 = new Voiture("Ferrari");
        Vehicule v2 = new Moto("Yamaha");
        Vehicule v3 = new Camion("Volvo");

        Course course = new Course(Arrays.asList(v1, v2, v3));

        while (!course.courseTerminee()) {
            course.lancerTour();
        }
        course.afficherClassement();
    }
}
```

**Observez :** Dans la boucle `lancerTour()`, la variable `v` est de type `Vehicule`. Pourtant, chaque appel a `avancer()` execute le bon code (celui de la Voiture, de la Moto ou du Camion). **C'est le polymorphisme.**

**Bonus :** Ajoutez un `Velo` qui avance de 1 a 3 cases. Vous n'avez **rien a changer** dans `Course`. Ca marche directement. C'est la puissance du polymorphisme + abstraction.

---

## Partie 2 : Projet Pixel Trader (~2h)

### Etape 1 : Rendre `Produit` abstrait (~30min)

Actuellement, `Produit` est une classe concrete. On va la rendre abstraite car le stock de Pixel Trader contient deux types de produits qui calculent leur marge differemment :

- **Un jeu video** : la marge est simple (prix estime - prix d'achat)
- **Une console retro** : la marge est reduite de 15% (frais de reconditionnement)

**Modifiez `Produit` :**

```java
package com.pixeltrader.domain;

public abstract class Produit {
    private String titre;
    private Plateforme plateforme;
    private int anneeSortie;
    private Etat etat;
    private double prixAchat;
    private double prixEstime;

    public Produit(String titre, Plateforme plateforme, int anneeSortie,
                   Etat etat, double prixAchat, double prixEstime) {
        if (titre == null || titre.trim().isEmpty()) {
            throw new IllegalArgumentException("Le titre ne peut pas etre vide.");
        }
        if (prixAchat < 0 || prixEstime < 0) {
            throw new IllegalArgumentException("Les prix ne peuvent pas etre negatifs.");
        }
        this.titre = titre;
        this.plateforme = plateforme;
        this.anneeSortie = anneeSortie;
        this.etat = etat;
        this.prixAchat = prixAchat;
        this.prixEstime = prixEstime;
    }

    // Methode abstraite : chaque type de produit calcule sa marge differemment
    public abstract double calculerMarge();

    // Getters
    public String getTitre() { return titre; }
    public Plateforme getPlateforme() { return plateforme; }
    public int getAnneeSortie() { return anneeSortie; }
    public Etat getEtat() { return etat; }
    public double getPrixAchat() { return prixAchat; }
    public double getPrixEstime() { return prixEstime; }
}
```

### Etape 2 : Creer les sous-classes (~20min)

**`Jeu` :**

```java
package com.pixeltrader.domain;

public class Jeu extends Produit {
    private String genre; // RPG, Plateforme, Action, Sport...

    public Jeu(String titre, Plateforme plateforme, int anneeSortie,
               Etat etat, double prixAchat, double prixEstime, String genre) {
        super(titre, plateforme, anneeSortie, etat, prixAchat, prixEstime);
        this.genre = genre;
    }

    @Override
    public double calculerMarge() {
        return getPrixEstime() - getPrixAchat();
    }

    public String getGenre() { return genre; }
}
```

**`ConsoleRetro` :**

```java
package com.pixeltrader.domain;

public class ConsoleRetro extends Produit {
    private String region; // JAP, PAL, NTSC

    public ConsoleRetro(String titre, Plateforme plateforme, int anneeSortie,
                        Etat etat, double prixAchat, double prixEstime, String region) {
        super(titre, plateforme, anneeSortie, etat, prixAchat, prixEstime);
        this.region = region;
    }

    @Override
    public double calculerMarge() {
        // 15% de frais de reconditionnement
        return (getPrixEstime() - getPrixAchat()) * 0.85;
    }

    public String getRegion() { return region; }
}
```

### Etape 3 : Polymorphisme dans le stock (~20min)

Adaptez votre `CsvParser` pour creer des `Jeu` au lieu de `Produit` (pour l'instant, tout est un jeu — on ajoutera les consoles dans le CSV plus tard).

Puis testez le polymorphisme :

```java
List<Produit> stock = parser.parse("stock_legacy_full.csv");

// Calcul de la valeur totale du stock
double valeurTotale = 0;
double margeTotale = 0;

for (Produit p : stock) {
    valeurTotale += p.getPrixEstime();     // Marche pour tout Produit
    margeTotale += p.calculerMarge();       // Appelle la bonne version !
}

System.out.println("Valeur totale du stock : " + valeurTotale + " EUR");
System.out.println("Marge totale estimee : " + margeTotale + " EUR");
System.out.println("Nombre de produits : " + stock.size());
```

**Observez :** `p.calculerMarge()` appelle `Jeu.calculerMarge()` ou `ConsoleRetro.calculerMarge()` selon le type reel de l'objet. Exactement comme `v.avancer()` dans la course de vehicules.

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

**C'est votre premiere API REST.** Spring Boot convertit automatiquement vos objets Java en JSON. C'est la magie de `@RestController`.

---

## Debrief (~15min)

1. **"Pourquoi ne pas mettre `calculerMarge()` dans `Produit` avec un `if (type == JEU)` ?"**
   - Parce qu'a chaque nouveau type de produit, il faudrait modifier `Produit`. C'est une violation du principe **Open/Closed** (on en reparlera en seance 4).

2. **Le polymorphisme en une phrase :**
   - "Le code qui utilise la liste (`for Produit p : stock`) n'a pas besoin de savoir si c'est un `Jeu` ou une `ConsoleRetro`. Il appelle `calculerMarge()` et ca marche."
   - C'est exactement la meme chose que la `Course` qui appelle `avancer()` sur des `Vehicule`.

3. **Analogie :**
   - Heritage = le Gateau d'Anniversaire herite du Gateau. Il sait `cuire()` (herite) et en plus il sait `soufflerBougies()` (specifique).
   - Abstraction = la recette a trous. `Produit` dit "tu DOIS savoir calculer ta marge" mais ne dit pas comment.
