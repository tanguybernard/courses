# Abstraction

Voici un exercice qui te permettra de bien comprendre les classes abstraites en Java tout en appliquant les principes de l'héritage et du polymorphisme.

### Exercice : Système de Paiement

#### Contexte :
Tu dois modéliser un système de paiement qui gère plusieurs types de méthodes de paiement comme les cartes de crédit et PayPal. Chaque méthode de paiement aura une implémentation spécifique de certaines étapes de traitement tout en respectant une structure commune.

#### Objectifs :
1. Crée une **classe abstraite** `Payment` qui définira la structure générale d'une méthode de paiement.
2. Implémente des sous-classes spécifiques : `CreditCardPayment` et `PayPalPayment`, qui hériteront de la classe abstraite et personnaliseront certaines étapes.

#### Étapes de l'exercice :

1. **Classe abstraite `Payment` :**
    - Cette classe aura :
      - Un attribut `double amount` (le montant à payer).
      - Un constructeur pour initialiser l'attribut `amount`.
      - Une méthode abstraite `processPayment()`.
      - Une méthode non abstraite `displayReceipt()` qui affichera un reçu après le paiement, avec un message général comme "Payment processed for amount: ...".

2. **Sous-classes `CreditCardPayment` et `PayPalPayment` :**
    - La classe `CreditCardPayment` aura :
      - Un attribut `String cardNumber` pour stocker le numéro de carte.
      - Une implémentation de la méthode `processPayment()` qui simule la validation du numéro de carte et effectue le paiement.
    - La classe `PayPalPayment` aura :
      - Un attribut `String email` pour l'email associé au compte PayPal.
      - Une implémentation de la méthode `processPayment()` qui simule une connexion PayPal et effectue le paiement.

3. **Tester ton code :**
   - Crée une classe `Main` avec un `main` method.
   - Instancie un objet `CreditCardPayment` et un objet `PayPalPayment`.
   - Appelle la méthode `processPayment()` sur chaque objet et affiche les reçus.

#### Exemple de solution :

```java
// Classe abstraite Payment
abstract class Payment {
    protected double amount;

    public Payment(double amount) {
        this.amount = amount;
    }

    // Méthode abstraite
    public abstract void processPayment();

    // Méthode non abstraite
    public void displayReceipt() {
        System.out.println("Payment processed for amount: " + amount);
    }
}

// Sous-classe CreditCardPayment
class CreditCardPayment extends Payment {
    private String cardNumber;

    public CreditCardPayment(double amount, String cardNumber) {
        super(amount);
        this.cardNumber = cardNumber;
    }

    @Override
    public void processPayment() {
        // Simule la validation de la carte et le paiement
        System.out.println("Processing credit card payment with card number: " + cardNumber);
        displayReceipt();
    }
}

// Sous-classe PayPalPayment
class PayPalPayment extends Payment {
    private String email;

    public PayPalPayment(double amount, String email) {
        super(amount);
        this.email = email;
    }

    @Override
    public void processPayment() {
        // Simule la connexion PayPal et le paiement
        System.out.println("Processing PayPal payment for account: " + email);
        displayReceipt();
    }
}

// Classe Main pour tester
public class Main {
    public static void main(String[] args) {
        Payment creditPayment = new CreditCardPayment(100.0, "1234-5678-9012-3456");
        Payment paypalPayment = new PayPalPayment(200.0, "user@example.com");

        creditPayment.processPayment();
        paypalPayment.processPayment();
    }
}
```

#### Résultat attendu :
```
Processing credit card payment with card number: 1234-5678-9012-3456
Payment processed for amount: 100.0
Processing PayPal payment for account: user@example.com
Payment processed for amount: 200.0
```

Cet exercice te permettra de comprendre comment utiliser les classes abstraites pour définir un comportement commun tout en laissant les sous-classes personnaliser les parties spécifiques.
