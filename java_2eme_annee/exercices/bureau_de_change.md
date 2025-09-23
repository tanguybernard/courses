

## 🧠 Objectifs pédagogiques

* Appliquer l'encapsulation, l’abstraction et l’héritage
* Travailler avec des interfaces et des classes concrètes
* Implémenter un service réutilisable
* Simuler une logique métier (taux de change variable)
* Encourager la séparation des responsabilités

---

## 📝 Enoncé de l’exercice : *"Bureau de change virtuel"*

### 📍 Contexte

Vous travaillez pour une startup qui développe un simulateur de finance éducatif. Votre mission est de modéliser un **bureau de change** où les utilisateurs peuvent convertir de l'argent entre différentes devises (USD, EUR, BTC, etc.).

---

### 🎯 Objectifs

1. **Créer une interface `ExchangeRateService`**

    * Méthode : `double getRate(String from, String to)`

2. **Refactoriser `SimulateurTauxDeChange`**

    * Pour qu’il implémente `ExchangeRateService`
    * Ajouter la méthode `getRate` comme override

3. **Créer une classe `CurrencyConverter`**

    * Avec une méthode : `double convert(double amount, String from, String to)`
    * Elle utilise un `ExchangeRateService` injecté via le constructeur

4. **Créer une classe `Application`**

    * Contient une méthode `main` avec des exemples d'utilisation :

        * 100 USD → EUR
        * 200 EUR → BTC
        * 0.1 BTC → USD

---

### 🧩 Exercice bonus (pour les plus avancés)

* 💡 Ajouter une **classe abstraite** `AbstractExchangeRateService` avec une méthode de validation commune (`validerDevise`)
* 🌐 Créer une nouvelle implémentation `FixedExchangeRateService` qui retourne des taux **constants** (sans aléatoire)
* 🧪 Écrire un test (Junit ou méthode main) qui vérifie que pour un taux fixe 1.1, `convert(100, "USD", "EUR")` retourne 110.0
* 💱 Ajouter la devise ETH avec un taux simulé

---

### 🧪 Exemple de code attendu dans `main`

```java
ExchangeRateService simulateur = new SimulateurTauxDeChange();
CurrencyConverter converter = new CurrencyConverter(simulateur);

System.out.printf("Conversion : 100 USD en EUR = %.2f%n", converter.convert(100, "USD", "EUR"));
System.out.printf("Conversion : 0.05 BTC en USD = %.2f%n", converter.convert(0.05, "BTC", "USD"));
```

---

## 📦 Format de rendu attendu

* `ExchangeRateService.java`
* `SimulateurTauxDeChange.java`
* `CurrencyConverter.java`
* `Application.java` (ou `Main.java`)
* Bonus : `FixedExchangeRateService.java`, `AbstractExchangeRateService.java`

---

## Annexe


```java
import java.util.Random;

public class SimulateurTauxDeChange {
    // Constantes pour les taux de base
    private static final double TAUX_BASE_USD_EUR = 0.85;
    private static final double TAUX_BASE_BTC_USD = 50000.0;
    
    // Instance unique de Random
    private static final Random random = new Random();
    
    // Méthode privée pour calculer la variation aléatoire
    private static double calculerVariationAleatoire() {
        return 1 + (random.nextDouble() * 0.02 + 0.01); // Variation entre 1.01 et 1.03
    }
    
    // Méthode principale avec deux arguments
    public static double getTaux(String source, String cible) {
        // Validation des devises
        if (!validerDevise(source) || !validerDevise(cible)) {
            throw new IllegalArgumentException("Devises non supportées");
        }
        
        // Calcul du taux de base selon les devises
        double tauxBase;
        switch (source.toUpperCase()) {
            case "USD":
                tauxBase = cible.equalsIgnoreCase("EUR") ? 
                    TAUX_BASE_USD_EUR : 
                    cible.equalsIgnoreCase("BTC") ? 
                        1 / TAUX_BASE_BTC_USD : 1.0;
                break;
            case "EUR":
                tauxBase = cible.equalsIgnoreCase("USD") ? 
                    1 / TAUX_BASE_USD_EUR : 
                    cible.equalsIgnoreCase("BTC") ? 
                        TAUX_BASE_BTC_USD / TAUX_BASE_USD_EUR : 1.0;
                break;
            case "BTC":
                tauxBase = cible.equalsIgnoreCase("USD") ? 
                    TAUX_BASE_BTC_USD : 
                    cible.equalsIgnoreCase("EUR") ? 
                        TAUX_BASE_BTC_USD / TAUX_BASE_USD_EUR : 1.0;
                break;
            default:
                tauxBase = 1.0;
        }
        
        return tauxBase * calculerVariationAleatoire();
    }
    
    // Méthode de validation des devises
    private static boolean validerDevise(String devise) {
        return devise != null && 
               (devise.equalsIgnoreCase("USD") ||
                devise.equalsIgnoreCase("EUR") ||
                devise.equalsIgnoreCase("BTC"));
    }
    
    // Exemple d'utilisation
    public static void main(String[] args) {
        System.out.println("Simulation de taux de change:");
        System.out.printf("USD vers EUR : %.4f%n", getTaux("USD", "EUR"));
        System.out.printf("EUR vers USD : %.4f%n", getTaux("EUR", "USD"));
        System.out.printf("BTC vers USD : %.4f%n", getTaux("BTC", "USD"));
        System.out.printf("USD vers BTC : %.4f%n", getTaux("USD", "BTC"));
        System.out.printf("EUR vers BTC : %.4f%n", getTaux("EUR", "BTC"));
        System.out.printf("BTC vers EUR : %.4f%n", getTaux("BTC", "EUR"));
    }
}
```