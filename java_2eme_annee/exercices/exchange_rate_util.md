
## Exchange rate

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

