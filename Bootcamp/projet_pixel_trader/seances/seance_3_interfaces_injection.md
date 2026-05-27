# Seance 3 : Interfaces, Injection de Dependances & Architecture en Couches

**Duree :** 3h
**Objectifs :** Interface comme contrat, programmer contre une interface, injection de dependances, architecture Controller/Service/Repository, Spring Data JPA.

**Pre-requis :** Seance 2 terminee (`Produit` abstrait, `Jeu`, `ConsoleRetro`, premier controller fonctionnel).

---

## Partie 1 : Mini-exo — Bureau de Change (~45min)

### Contexte

Vous developpez un simulateur de bureau de change. L'objectif : comprendre pourquoi on programme contre une **interface** plutot qu'une implementation concrete.

### Etape 1 : Creer l'interface `ExchangeRateService`

```java
public interface ExchangeRateService {
    double getRate(String from, String to);
}
```

C'est un **contrat**. Toute classe qui implemente cette interface **promet** de fournir une methode `getRate`.

### Etape 2 : Premiere implementation — Taux simules

```java
import java.util.Random;

public class SimulateurTauxDeChange implements ExchangeRateService {
    private static final double TAUX_BASE_USD_EUR = 0.85;
    private Random random = new Random();

    @Override
    public double getRate(String from, String to) {
        double variation = 1 + (random.nextDouble() * 0.02 + 0.01);

        if (from.equalsIgnoreCase("USD") && to.equalsIgnoreCase("EUR")) {
            return TAUX_BASE_USD_EUR * variation;
        }
        if (from.equalsIgnoreCase("EUR") && to.equalsIgnoreCase("USD")) {
            return (1 / TAUX_BASE_USD_EUR) * variation;
        }
        return 1.0;
    }
}
```

### Etape 3 : Le convertisseur (qui depend de l'interface)

```java
public class CurrencyConverter {
    private ExchangeRateService rateService;

    // INJECTION PAR CONSTRUCTEUR
    // On recoit l'interface, pas l'implementation concrete
    public CurrencyConverter(ExchangeRateService rateService) {
        this.rateService = rateService;
    }

    public double convert(double amount, String from, String to) {
        double rate = rateService.getRate(from, to);
        return amount * rate;
    }
}
```

**Point cle :** `CurrencyConverter` ne connait PAS `SimulateurTauxDeChange`. Il connait uniquement `ExchangeRateService`. C'est l'**inversion de dependance**.

### Etape 4 : Tester

```java
public class Main {
    public static void main(String[] args) {
        ExchangeRateService simulateur = new SimulateurTauxDeChange();
        CurrencyConverter converter = new CurrencyConverter(simulateur);

        System.out.printf("100 USD en EUR = %.2f%n", converter.convert(100, "USD", "EUR"));
        System.out.printf("100 EUR en USD = %.2f%n", converter.convert(100, "EUR", "USD"));
    }
}
```

### Etape 5 : La puissance de l'interface — Deuxieme implementation

Creez une implementation a taux fixes (pour les tests par exemple) :

```java
public class FixedExchangeRateService implements ExchangeRateService {
    @Override
    public double getRate(String from, String to) {
        if (from.equalsIgnoreCase("USD") && to.equalsIgnoreCase("EUR")) {
            return 0.85;
        }
        if (from.equalsIgnoreCase("EUR") && to.equalsIgnoreCase("USD")) {
            return 1.18;
        }
        return 1.0;
    }
}
```

Maintenant, changez **une seule ligne** dans le `Main` :

```java
// Avant :
ExchangeRateService simulateur = new SimulateurTauxDeChange();
// Apres :
ExchangeRateService simulateur = new FixedExchangeRateService();
```

**Tout le reste du code est identique.** `CurrencyConverter` n'a pas change. C'est ca la puissance de l'interface.

### Le pont vers Spring

> Ce que vous venez de faire a la main — injecter une implementation dans le constructeur — c'est exactement ce que Spring fait automatiquement avec `@Autowired`. Au lieu de choisir vous-meme quelle implementation injecter, Spring scanne les classes annotees `@Service` ou `@Repository` et les injecte pour vous.

---

## Partie 2 : Projet Pixel Trader (~2h)

### Etape 1 : Ajouter les dependances JPA et H2 (~10min)

Ouvrez `pom.xml` et ajoutez dans `<dependencies>` :

```xml
<!-- Spring Data JPA : pour gerer la base de donnees avec des objets -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<!-- H2 : base de donnees en memoire (pas besoin d'installer MySQL) -->
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>
```

Rechargez Maven (dans IntelliJ : clic droit sur `pom.xml` > Maven > Reload).

### Etape 2 : Configurer la base de donnees (~5min)

Dans `src/main/resources/application.properties` :

```properties
# Base de donnees H2 en memoire
spring.datasource.url=jdbc:h2:mem:pixeltrader
spring.datasource.driver-class-name=org.h2.Driver
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true

# Console H2 (pour visualiser la BDD dans le navigateur)
spring.h2-console.enabled=true
spring.h2-console.path=/h2-console
```

Avec ca, vous pouvez visualiser votre base a `http://localhost:8080/h2-console` (JDBC URL : `jdbc:h2:mem:pixeltrader`).

### Etape 3 : Transformer les classes en entites JPA (~20min)

**`Produit` (classe abstraite) :**

```java
package com.pixeltrader.domain;

import jakarta.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type_produit")
public abstract class Produit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titre;

    @Enumerated(EnumType.STRING)
    private Plateforme plateforme;

    private int anneeSortie;

    @Enumerated(EnumType.STRING)
    private Etat etat;

    private double prixAchat;
    private double prixEstime;

    // Constructeur vide requis par JPA
    protected Produit() {}

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

    public abstract double calculerMarge();

    // Getters
    public Long getId() { return id; }
    public String getTitre() { return titre; }
    public Plateforme getPlateforme() { return plateforme; }
    public int getAnneeSortie() { return anneeSortie; }
    public Etat getEtat() { return etat; }
    public double getPrixAchat() { return prixAchat; }
    public double getPrixEstime() { return prixEstime; }
}
```

**`Jeu` :**

```java
package com.pixeltrader.domain;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("JEU")
public class Jeu extends Produit {
    private String genre;

    protected Jeu() {}

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

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("CONSOLE")
public class ConsoleRetro extends Produit {
    private String region;

    protected ConsoleRetro() {}

    public ConsoleRetro(String titre, Plateforme plateforme, int anneeSortie,
                        Etat etat, double prixAchat, double prixEstime, String region) {
        super(titre, plateforme, anneeSortie, etat, prixAchat, prixEstime);
        this.region = region;
    }

    @Override
    public double calculerMarge() {
        return (getPrixEstime() - getPrixAchat()) * 0.85;
    }

    public String getRegion() { return region; }
}
```

**Explication `@Inheritance(strategy = InheritanceType.SINGLE_TABLE)` :**
JPA stocke `Jeu` et `ConsoleRetro` dans la **meme table** avec une colonne `type_produit` pour les differencier. C'est la strategie la plus simple.

### Etape 4 : Creer le Repository (~5min)

```java
package com.pixeltrader.repository;

import com.pixeltrader.domain.Produit;
import com.pixeltrader.domain.Plateforme;
import com.pixeltrader.domain.Etat;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProduitRepository extends JpaRepository<Produit, Long> {
    List<Produit> findByPlateforme(Plateforme plateforme);
    List<Produit> findByEtat(Etat etat);
}
```

**Observez :** C'est une **interface** ! Comme `ExchangeRateService` dans l'exercice. Spring Data genere automatiquement l'implementation. Vous ne codez aucune requete SQL.

Les methodes `findByPlateforme` et `findByEtat` sont generees automatiquement par Spring a partir du nom de la methode.

### Etape 5 : Creer le Service (~15min)

```java
package com.pixeltrader.service;

import com.pixeltrader.domain.*;
import com.pixeltrader.repository.ProduitRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProduitService {

    private final ProduitRepository produitRepository;

    // INJECTION PAR CONSTRUCTEUR
    // Exactement comme le CurrencyConverter recevait ExchangeRateService !
    public ProduitService(ProduitRepository produitRepository) {
        this.produitRepository = produitRepository;
    }

    public List<Produit> listerTous() {
        return produitRepository.findAll();
    }

    public Produit trouverParId(Long id) {
        return produitRepository.findById(id).orElse(null);
    }

    public List<Produit> filtrerParPlateforme(Plateforme plateforme) {
        return produitRepository.findByPlateforme(plateforme);
    }

    public List<Produit> filtrerParEtat(Etat etat) {
        return produitRepository.findByEtat(etat);
    }

    public double calculerValeurTotale() {
        return produitRepository.findAll().stream()
                .mapToDouble(Produit::getPrixEstime)
                .sum();
    }

    public double calculerMargeTotale() {
        return produitRepository.findAll().stream()
                .mapToDouble(Produit::calculerMarge)
                .sum();
    }
}
```

### Etape 6 : Refactorer le Controller (~15min)

Remplacez le controller de la seance 2 :

```java
package com.pixeltrader.controller;

import com.pixeltrader.domain.*;
import com.pixeltrader.service.ProduitService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ProduitController {

    private final ProduitService produitService;

    // Le controller depend du SERVICE, pas du repository !
    public ProduitController(ProduitService produitService) {
        this.produitService = produitService;
    }

    @GetMapping("/produits")
    public List<Produit> listerProduits() {
        return produitService.listerTous();
    }

    @GetMapping("/produits/{id}")
    public Produit getProduit(@PathVariable Long id) {
        return produitService.trouverParId(id);
    }
}
```

**Remarquez l'architecture en 3 couches :**

```
Navigateur  -->  Controller  -->  Service  -->  Repository  -->  BDD
              (route HTTP)     (logique)     (interface)      (H2)
```

Le Controller ne connait pas la BDD. Le Service ne connait pas les routes HTTP. Chacun a **une seule responsabilite**.

### Etape 7 : Remplir la base au demarrage (~20min)

Creez un `DataLoader` qui insere les donnees du CSV au demarrage :

```java
package com.pixeltrader.utils;

import com.pixeltrader.domain.*;
import com.pixeltrader.repository.ProduitRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private final ProduitRepository produitRepository;

    public DataLoader(ProduitRepository produitRepository) {
        this.produitRepository = produitRepository;
    }

    @Override
    public void run(String... args) {
        CsvParser parser = new CsvParser();
        List<Produit> produits = parser.parse("stock_legacy_full.csv");
        produitRepository.saveAll(produits);
        System.out.println(produits.size() + " produits charges en base.");
    }
}
```

### Etape 8 : Tester (~10min)

Lancez l'application et testez :
- `http://localhost:8080/api/produits` — la liste complete depuis la BDD
- `http://localhost:8080/api/produits/1` — un produit par son ID
- `http://localhost:8080/h2-console` — visualisez la table dans le navigateur

---

## Debrief (~15min)

Dessinez au tableau l'architecture :

```
Controller  -->  Service  -->  Repository  -->  BDD
@RestController    @Service    interface        H2/MySQL
                               JpaRepository
```

Questions :
1. **"Pourquoi le Controller ne parle pas directement a la BDD ?"**
   - Separation des responsabilites. Si demain on change de BDD (H2 -> MySQL -> MongoDB), seul le Repository change.

2. **"C'est quoi le lien avec le bureau de change ?"**
   - `ProduitRepository` est une **interface**, comme `ExchangeRateService`. Spring fournit l'implementation automatiquement, comme vous aviez fourni `SimulateurTauxDeChange` a la main.

3. **Refs utiles :**
   - Service Layer : https://docs.oracle.com/cd/F13791_01/service_layer/
   - Architecture : https://medium.com/code-divoire/larchitecture-logicielle-eb663afe63f
