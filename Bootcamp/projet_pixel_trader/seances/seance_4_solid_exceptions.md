# Seance 4 : SOLID en Pratique, Exceptions & API Complete

**Duree :** 3h
**Objectifs :** Principes SOLID (SRP, OCP), exceptions metier, DTO, API REST complete, validation Postman.

**Pre-requis :** Seance 3 terminee (architecture Controller/Service/Repository, BDD H2 fonctionnelle).

---

## Partie 1 : Mini-exo — Kata Invoice Refactoring (~45min)

### Contexte

Vous recevez du code legacy. Il fonctionne, mais il est impossible a maintenir. Votre mission : le refactorer en appliquant les principes SOLID.

### Le code a refactorer

```java
public class InvoiceCalculator {

    public double calculateInvoice(Customer customer) {
        double total = 0;

        if (customer.getType().equals("REGULAR")) {
            total = customer.getPurchases() * 1.0;
        } else if (customer.getType().equals("MEMBER")) {
            total = customer.getPurchases() * 0.9;
        } else if (customer.getType().equals("VIP")) {
            total = customer.getPurchases() * 0.8;
        }

        // Tax calculation
        total += total * 0.2; // 20% tax

        return total;
    }
}

class Customer {
    private String type;
    private double purchases;

    public Customer(String type, double purchases) {
        this.type = type;
        this.purchases = purchases;
    }

    public String getType() { return type; }
    public double getPurchases() { return purchases; }
}
```

### Les problemes

1. **Violation du SRP (Single Responsibility)** : `InvoiceCalculator` fait le calcul des remises ET le calcul des taxes.
2. **Violation du OCP (Open/Closed)** : Pour ajouter un nouveau type de client (ex: "EMPLOYEE"), il faut **modifier** `calculateInvoice`. On veut pouvoir **etendre** sans modifier.

### Etape 1 : Extraire une interface pour les strategies de calcul

```java
public interface BillingStrategy {
    double calculate(double purchases);
}
```

### Etape 2 : Une implementation par type de client

```java
public class RegularBillingStrategy implements BillingStrategy {
    @Override
    public double calculate(double purchases) {
        return purchases;
    }
}

public class MemberBillingStrategy implements BillingStrategy {
    @Override
    public double calculate(double purchases) {
        return purchases * 0.9; // 10% de reduction
    }
}

public class VipBillingStrategy implements BillingStrategy {
    @Override
    public double calculate(double purchases) {
        return purchases * 0.8; // 20% de reduction
    }
}
```

### Etape 3 : Extraire le calcul des taxes (SRP)

```java
public class TaxCalculator {
    public double applyTax(double amount) {
        return amount * 1.2; // 20% TVA
    }
}
```

### Etape 4 : Refactorer `InvoiceCalculator`

```java
public class InvoiceCalculator {
    private TaxCalculator taxCalculator;

    public InvoiceCalculator() {
        this.taxCalculator = new TaxCalculator();
    }

    public double calculateInvoice(Customer customer) {
        BillingStrategy strategy = getBillingStrategy(customer.getType());
        double total = strategy.calculate(customer.getPurchases());
        return taxCalculator.applyTax(total);
    }

    private BillingStrategy getBillingStrategy(String customerType) {
        switch (customerType) {
            case "MEMBER": return new MemberBillingStrategy();
            case "VIP": return new VipBillingStrategy();
            case "REGULAR":
            default: return new RegularBillingStrategy();
        }
    }
}
```

### Etape 5 : Tester

```java
public class Main {
    public static void main(String[] args) {
        InvoiceCalculator calculator = new InvoiceCalculator();

        Customer regular = new Customer("REGULAR", 100);
        Customer member = new Customer("MEMBER", 100);
        Customer vip = new Customer("VIP", 100);

        System.out.println("Regular : " + calculator.calculateInvoice(regular));  // 120.0
        System.out.println("Member  : " + calculator.calculateInvoice(member));   // 108.0
        System.out.println("VIP     : " + calculator.calculateInvoice(vip));      // 96.0
    }
}
```

### Ce qu'il faut retenir

- **Avant :** Ajouter un type "EMPLOYEE" = modifier `InvoiceCalculator` (violation OCP)
- **Apres :** Ajouter un type "EMPLOYEE" = creer `EmployeeBillingStrategy`. On ne touche a rien d'autre.
- C'est le **pattern Strategy** : on encapsule un algorithme derriere une interface.

### Rappel des principes SOLID

| Lettre | Principe | En une phrase |
|--------|----------|---------------|
| **S** | Single Responsibility | Une classe = une seule raison de changer |
| **O** | Open/Closed | Ouvert a l'extension, ferme a la modification |
| **L** | Liskov Substitution | Un enfant doit pouvoir remplacer son parent sans casser le code |
| **I** | Interface Segregation | Plusieurs petites interfaces plutot qu'une grosse |
| **D** | Dependency Inversion | Dependre des abstractions (interfaces), pas des implementations |

Ref : https://crazy-crafters.gitlab.io/red-maple/development/solid/overview/#/

---

## Partie 2 : Projet Pixel Trader (~2h)

### Etape 1 : Exceptions metier (~20min)

Actuellement, si on demande un produit qui n'existe pas, le controller retourne `null`. C'est nul (sans jeu de mots). On veut des erreurs claires.

**Creez les exceptions dans un package `exception` :**

```java
package com.pixeltrader.exception;

public class ProduitNotFoundException extends RuntimeException {
    public ProduitNotFoundException(Long id) {
        super("Produit introuvable avec l'id : " + id);
    }
}
```

```java
package com.pixeltrader.exception;

public class DonneesInvalidesException extends RuntimeException {
    public DonneesInvalidesException(String message) {
        super(message);
    }
}
```

**Modifiez le Service :**

```java
public Produit trouverParId(Long id) {
    return produitRepository.findById(id)
            .orElseThrow(() -> new ProduitNotFoundException(id));
}
```

**Creez un gestionnaire global d'exceptions :**

```java
package com.pixeltrader.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ProduitNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleNotFound(ProduitNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("erreur", ex.getMessage()));
    }

    @ExceptionHandler(DonneesInvalidesException.class)
    public ResponseEntity<Map<String, String>> handleInvalid(DonneesInvalidesException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("erreur", ex.getMessage()));
    }
}
```

**Testez :** `GET /api/produits/9999` doit retourner un JSON `{"erreur": "Produit introuvable avec l'id : 9999"}` avec un code 404.

### Etape 2 : DTO (~20min)

On ne veut pas exposer l'entite JPA directement dans l'API. Pourquoi ?
- L'entite a des annotations JPA (`@Id`, `@Entity`) qui n'ont rien a faire dans la reponse
- On pourrait avoir des relations JPA qui declenchent des requetes en cascade
- On veut controler exactement ce que le client recoit

**Creez un DTO :**

```java
package com.pixeltrader.dto;

public class ProduitDTO {
    private Long id;
    private String titre;
    private String plateforme;
    private int anneeSortie;
    private String etat;
    private double prixEstime;
    private double marge;
    private String type; // "JEU" ou "CONSOLE"

    public ProduitDTO(Long id, String titre, String plateforme, int anneeSortie,
                      String etat, double prixEstime, double marge, String type) {
        this.id = id;
        this.titre = titre;
        this.plateforme = plateforme;
        this.anneeSortie = anneeSortie;
        this.etat = etat;
        this.prixEstime = prixEstime;
        this.marge = marge;
        this.type = type;
    }

    // Getters pour la serialisation JSON
    public Long getId() { return id; }
    public String getTitre() { return titre; }
    public String getPlateforme() { return plateforme; }
    public int getAnneeSortie() { return anneeSortie; }
    public String getEtat() { return etat; }
    public double getPrixEstime() { return prixEstime; }
    public double getMarge() { return marge; }
    public String getType() { return type; }
}
```

**Ajoutez une methode de conversion dans le Service :**

```java
public ProduitDTO toDTO(Produit p) {
    String type = (p instanceof Jeu) ? "JEU" : "CONSOLE";
    return new ProduitDTO(
        p.getId(),
        p.getTitre(),
        p.getPlateforme().name(),
        p.getAnneeSortie(),
        p.getEtat().name(),
        p.getPrixEstime(),
        p.calculerMarge(),
        type
    );
}

public List<ProduitDTO> listerTousDTO() {
    return produitRepository.findAll().stream()
            .map(this::toDTO)
            .toList();
}
```

**Mettez a jour le Controller pour retourner des DTO :**

```java
@GetMapping("/produits")
public List<ProduitDTO> listerProduits() {
    return produitService.listerTousDTO();
}
```

### Etape 3 : Completer l'API REST (~40min)

**Ajouter un produit :**

```java
// Dans le Controller
@PostMapping("/produits")
public ProduitDTO ajouterProduit(@RequestBody Map<String, Object> body) {
    String titre = (String) body.get("titre");
    String plateformeStr = (String) body.get("plateforme");
    int annee = (int) body.get("anneeSortie");
    String etatStr = (String) body.get("etat");
    double prixAchat = ((Number) body.get("prixAchat")).doubleValue();
    double prixEstime = ((Number) body.get("prixEstime")).doubleValue();

    if (titre == null || titre.trim().isEmpty()) {
        throw new DonneesInvalidesException("Le titre est obligatoire.");
    }

    Plateforme plateforme;
    Etat etat;
    try {
        plateforme = Plateforme.valueOf(plateformeStr);
        etat = Etat.valueOf(etatStr);
    } catch (IllegalArgumentException e) {
        throw new DonneesInvalidesException("Plateforme ou etat invalide.");
    }

    Jeu jeu = new Jeu(titre, plateforme, annee, etat, prixAchat, prixEstime, "Inconnu");
    Produit saved = produitService.sauvegarder(jeu);
    return produitService.toDTO(saved);
}
```

**Supprimer un produit :**

```java
// Dans le Controller
@DeleteMapping("/produits/{id}")
public Map<String, String> supprimerProduit(@PathVariable Long id) {
    produitService.supprimer(id);
    return Map.of("message", "Produit " + id + " supprime.");
}
```

**Filtrer :**

```java
// Dans le Controller
@GetMapping("/produits/filtre")
public List<ProduitDTO> filtrer(
        @RequestParam(required = false) String plateforme,
        @RequestParam(required = false) String etat) {
    
    if (plateforme != null) {
        return produitService.filtrerParPlateforme(Plateforme.valueOf(plateforme))
                .stream().map(produitService::toDTO).toList();
    }
    if (etat != null) {
        return produitService.filtrerParEtat(Etat.valueOf(etat))
                .stream().map(produitService::toDTO).toList();
    }
    return produitService.listerTousDTO();
}
```

**Ajoutez les methodes manquantes dans le Service :**

```java
public Produit sauvegarder(Produit produit) {
    return produitRepository.save(produit);
}

public void supprimer(Long id) {
    if (!produitRepository.existsById(id)) {
        throw new ProduitNotFoundException(id);
    }
    produitRepository.deleteById(id);
}
```

### Etape 4 : Tester avec Postman (~30min)

Ouvrez Postman et testez chaque endpoint :

**1. Lister les produits :**
```
GET http://localhost:8080/api/produits
```
Reponse attendue : un tableau JSON de ProduitDTO.

**2. Obtenir un produit :**
```
GET http://localhost:8080/api/produits/1
```

**3. Produit inexistant :**
```
GET http://localhost:8080/api/produits/9999
```
Reponse attendue : `404` avec `{"erreur": "Produit introuvable..."}`

**4. Creer un produit :**
```
POST http://localhost:8080/api/produits
Content-Type: application/json

{
    "titre": "Zelda Tears of the Kingdom",
    "plateforme": "SWITCH",
    "anneeSortie": 2023,
    "etat": "NEUF",
    "prixAchat": 40,
    "prixEstime": 55
}
```
Reponse attendue : `200` avec le produit cree.

**5. Creer un produit invalide :**
```
POST http://localhost:8080/api/produits
Content-Type: application/json

{
    "titre": "",
    "plateforme": "SWITCH",
    "anneeSortie": 2023,
    "etat": "NEUF",
    "prixAchat": -10,
    "prixEstime": 55
}
```
Reponse attendue : `400` avec un message d'erreur.

**6. Supprimer un produit :**
```
DELETE http://localhost:8080/api/produits/1
```

**7. Filtrer :**
```
GET http://localhost:8080/api/produits/filtre?plateforme=N64
GET http://localhost:8080/api/produits/filtre?etat=NEUF
```

**Regle :** Si un endpoint retourne une erreur 500 ou un JSON mal forme, corrigez avant de passer a la suite.

---

## Debrief (~15min)

1. **"Dans votre projet, ou est le SRP ?"**
   - Controller = gere les routes HTTP
   - Service = logique metier
   - Repository = acces aux donnees
   - Exception = gestion des erreurs

2. **"Ou est le polymorphisme ?"**
   - `calculerMarge()` dans le DTO : le service appelle `p.calculerMarge()` sans savoir si c'est un Jeu ou une Console.

3. **"Ou est l'interface ?"**
   - `ProduitRepository extends JpaRepository` — on ne code pas l'implementation SQL.

4. **Preview seance 5 :** "La prochaine fois, on branche un front HTML/JS qui appelle cette API. Votre API doit etre solide."
