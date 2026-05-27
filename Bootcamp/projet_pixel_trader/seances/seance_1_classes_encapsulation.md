# Seance 1 : Classes, Encapsulation & Enums

**Duree :** 3h
**Objectifs :** Creer des classes avec attributs prives, ecrire des constructeurs avec validation, utiliser des enums.

---

## Partie 1 : Exercice — Modeliser un produit retrogaming (~1h)

### Contexte

Vous travaillez pour **Pixel Trader Inc.**, une boutique de retrogaming a Akihabara (Tokyo). Le patron, Kenji Yamamoto, vous fournit un fichier CSV exporte de son ancien systeme. Ce fichier est **corrompu** : devises melangees, plateformes ecrites differemment, etats inconsistants.

Votre premiere mission : modeliser proprement un produit en Java.

### Etape 1 : Creer l'enum `Etat`

Un produit peut etre dans l'un de ces 4 etats :

```java
public enum Etat {
    NEUF,
    BON,
    MOYEN,
    ABIME
}
```

**Question pour vous :** Pourquoi un `enum` plutot qu'un simple `String` ? Que se passe-t-il si quelqu'un ecrit `"Bpn"` au lieu de `"BON"` ?

### Etape 2 : Creer l'enum `Plateforme`

Normalisez les plateformes. Dans le CSV, on trouve "N64", "Nintendo 64", "PS1", "PlayStation 1", "PSX"... tout ca c'est la meme chose.

```java
public enum Plateforme {
    NES,
    SNES,
    N64,
    GAMEBOY,
    GAMEBOY_COLOR,
    GAMEBOY_ADVANCE,
    GAMECUBE,
    PS1,
    PS2,
    PS3,
    MEGADRIVE,
    MASTER_SYSTEM,
    SATURN,
    DREAMCAST,
    XBOX,
    PC,
    SWITCH,
    ARCADE,
    ATARI_2600
}
```

### Etape 3 : Creer la classe `Produit`

Creez une classe `Produit` avec les regles suivantes :

**Attributs (tous `private`) :**
- `String titre`
- `Plateforme plateforme`
- `int anneeSortie`
- `Etat etat`
- `double prixAchat`
- `double prixEstime`

**Constructeur :**
Le constructeur doit **valider** les donnees :
- Le titre ne peut pas etre `null` ou vide
- Le prix d'achat doit etre >= 0
- Le prix estime doit etre >= 0

Si une valeur est invalide, levez une `IllegalArgumentException` avec un message clair.

```java
public Produit(String titre, Plateforme plateforme, int anneeSortie, 
               Etat etat, double prixAchat, double prixEstime) {
    if (titre == null || titre.trim().isEmpty()) {
        throw new IllegalArgumentException("Le titre ne peut pas etre vide.");
    }
    if (prixAchat < 0) {
        throw new IllegalArgumentException("Le prix d'achat ne peut pas etre negatif.");
    }
    if (prixEstime < 0) {
        throw new IllegalArgumentException("Le prix estime ne peut pas etre negatif.");
    }
    this.titre = titre;
    this.plateforme = plateforme;
    this.anneeSortie = anneeSortie;
    this.etat = etat;
    this.prixAchat = prixAchat;
    this.prixEstime = prixEstime;
}
```

**Accesseurs :**
- Getters pour tous les attributs
- **Pas de setter** pour `titre` et `plateforme` (un produit ne change pas de nom ni de console)
- Setter pour `prixEstime` (la valeur peut evoluer) avec validation (>= 0)

**Methode `afficher()` :**
Affichez les infos du produit dans la console.

```java
public void afficher() {
    System.out.println(titre + " (" + plateforme + ", " + anneeSortie + ")");
    System.out.println("  Etat: " + etat + " | Achat: " + prixAchat + "E | Estime: " + prixEstime + "E");
}
```

### Etape 4 : Tester dans un `Main`

```java
public class Main {
    public static void main(String[] args) {
        Produit p1 = new Produit("Super Mario 64", Plateforme.N64, 1996, 
                                  Etat.NEUF, 15, 50);
        p1.afficher();

        Produit p2 = new Produit("Final Fantasy VII", Plateforme.PS1, 1997, 
                                  Etat.NEUF, 45, 120);
        p2.afficher();

        // Testez la validation : cette ligne doit lancer une exception
        // Produit p3 = new Produit("", Plateforme.NES, 1985, Etat.ABIME, -10, 5);
    }
}
```

**A vous :** Decommentez la ligne du `p3` et observez l'exception. C'est ca l'encapsulation : la classe se protege elle-meme.

---

## Partie 2 : Projet Pixel Trader (~1h45)

### Etape 1 : Initialiser le projet Spring Boot (~20min)

1. Allez sur [https://start.spring.io](https://start.spring.io)
2. Configuration :
   - **Project :** Maven
   - **Language :** Java
   - **Spring Boot :** derniere version stable
   - **Group :** `com.pixeltrader`
   - **Artifact :** `pixel-trader`
   - **Packaging :** Jar
   - **Java :** 17 (ou 21)
3. **Dependencies :** Spring Web (uniquement pour l'instant)
4. Cliquez sur **Generate**, dezippez, ouvrez dans votre IDE

5. Lancez l'application pour verifier que ca demarre :
```bash
./mvnw spring-boot:run
```
Vous devez voir `Started PixelTraderApplication` dans la console.

### Etape 2 : Organiser les packages (~10min)

Creez la structure suivante dans `src/main/java/com/pixeltrader/` :

```
com.pixeltrader
├── PixelTraderApplication.java  (deja la)
├── domain/
│   ├── Produit.java
│   ├── Etat.java
│   └── Plateforme.java
└── utils/
    └── CsvParser.java
```

Deplacez vos classes `Produit`, `Etat`, `Plateforme` de l'exercice dans le package `domain`.

### Etape 3 : Ecrire le parser CSV (~1h)

Copiez le fichier `stock_legacy_full.csv` dans `src/main/resources/`.

Creez une classe `CsvParser` qui :
1. Lit le fichier ligne par ligne
2. Normalise chaque champ :
   - **Plateformes :** "Nintendo 64", "N64" -> `Plateforme.N64` / "PS1", "PlayStation 1", "PSX", "Ps1" -> `Plateforme.PS1` / etc.
   - **Devises :** Convertir les yen (taux : 1 EUR = 160 JPY) et les dollars (taux : 1 EUR = 1.08 USD). Nettoyer les formats ("50 EUR", "50EUR", "50 euros", "50 E" -> 50.0)
   - **Etats :** "Mint", "Neuf", "Comme neuf", "Blister" -> `NEUF` / "Good", "Bon", "Bon etat", "Excellent" -> `BON` / "Moyen" -> `MOYEN` / "Abime", "Abimé", "Rayé", "Pourri", "Boite cassee" -> `ABIME`
3. Ignore les doublons (meme titre + meme plateforme)
4. Retourne une `List<Produit>`

**Squelette :**

```java
package com.pixeltrader.utils;

import com.pixeltrader.domain.*;
import java.io.*;
import java.util.*;

public class CsvParser {

    public List<Produit> parse(String cheminFichier) {
        List<Produit> produits = new ArrayList<>();
        Set<String> dejaVus = new HashSet<>();

        try (BufferedReader br = new BufferedReader(
                new InputStreamReader(
                    getClass().getClassLoader().getResourceAsStream(cheminFichier)))) {
            
            String ligne;
            br.readLine(); // Sauter l'en-tete
            
            while ((ligne = br.readLine()) != null) {
                String[] champs = ligne.split(";");
                
                String titre = champs[1].trim();
                Plateforme plateforme = normaliserPlateforme(champs[2].trim());
                int annee = parseAnnee(champs[3].trim());
                Etat etat = normaliserEtat(champs[4].trim());
                double prixEstime = normaliserPrix(champs[6].trim());
                double prixAchat = normaliserPrix(champs[7].trim());

                // Anti-doublon
                String cle = titre.toLowerCase() + "|" + plateforme;
                if (dejaVus.contains(cle)) continue;
                dejaVus.add(cle);

                produits.add(new Produit(titre, plateforme, annee, etat, prixAchat, prixEstime));
            }
        } catch (Exception e) {
            System.err.println("Erreur de parsing : " + e.getMessage());
        }

        return produits;
    }

    private Plateforme normaliserPlateforme(String raw) {
        // A VOUS DE COMPLETER
        // Indice : utilisez un switch ou des if/else sur raw.toLowerCase()
        return null;
    }

    private Etat normaliserEtat(String raw) {
        // A VOUS DE COMPLETER
        return null;
    }

    private double normaliserPrix(String raw) {
        // A VOUS DE COMPLETER
        // Indice : retirez les symboles (E, EUR, euros, $, yen...)
        // puis convertissez si necessaire
        return 0;
    }

    private int parseAnnee(String raw) {
        if (raw == null || raw.isEmpty()) return 0;
        return Integer.parseInt(raw);
    }
}
```

**A vous de completer** les methodes `normaliserPlateforme()`, `normaliserEtat()` et `normaliserPrix()`.

### Etape 4 : Tester le parsing (~15min)

Creez un `Main` temporaire (ou utilisez un `CommandLineRunner`) :

```java
CsvParser parser = new CsvParser();
List<Produit> stock = parser.parse("stock_legacy_full.csv");

System.out.println("Nombre de produits importes : " + stock.size());
for (Produit p : stock) {
    p.afficher();
}
```

Verifiez que :
- Les doublons sont elimines (Super Mario 64 n'apparait qu'une fois, Sonic aussi, etc.)
- Les prix sont tous en euros
- Les plateformes sont normalisees
- Les etats sont dans l'enum

---

## Debrief (~15min)

Questions a se poser :
1. **Pourquoi `private` ?** Que se passerait-il si `prixAchat` etait public et qu'on faisait `p.prixAchat = -500` ?
2. **Pourquoi un enum ?** Combien de bugs on aurait si `etat` etait un String libre ?
3. **Pourquoi valider dans le constructeur ?** C'est le principe du **Fail Fast** : mieux vaut planter tot avec un message clair que decouvrir le probleme 3 couches plus loin.
