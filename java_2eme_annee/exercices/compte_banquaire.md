
## 🧾 Exercice final : Paiements avec gestion de solde

### ⚙️ Contexte métier :
Chaque moyen de paiement a un **solde associé**. Un paiement ne peut être effectué que si le solde est suffisant.  
**CryptoPayment** continue d'ajouter 2% de frais. Si le solde est insuffisant, une **exception personnalisée** est levée.

---

### 🎯 Spécifications mises à jour :

#### 1. Crée une exception personnalisée :
```java
public class InsufficientFundsException extends RuntimeException {
    public InsufficientFundsException(String message) {
        super(message);
    }
}
```

#### 2. Mets à jour l’interface `PaymentMethod` :
```java
public interface PaymentMethod {
    void pay(double amount);
    String getPaymentType();
    double getBalance();
}
```

#### 3. Implémentations avec solde :

##### `CreditCardPayment` :
```java
public class CreditCardPayment implements PaymentMethod {
    private double balance;

    public CreditCardPayment(double balance) {
        this.balance = balance;
    }

    @Override
    public void pay(double amount) {
        if (balance < amount) {
            throw new InsufficientFundsException("Solde insuffisant sur la carte bancaire.");
        }
        balance -= amount;
        System.out.println("Paiement de " + amount + "€ effectué par carte bancaire. Nouveau solde : " + balance + "€");
    }

    @Override
    public String getPaymentType() {
        return "Carte Bancaire";
    }

    @Override
    public double getBalance() {
        return balance;
    }
}
```

##### `PaypalPayment` :
```java
public class PaypalPayment implements PaymentMethod {
    private double balance;

    public PaypalPayment(double balance) {
        this.balance = balance;
    }

    @Override
    public void pay(double amount) {
        if (balance < amount) {
            throw new InsufficientFundsException("Solde insuffisant sur le compte PayPal.");
        }
        balance -= amount;
        System.out.println("Vérification de sécurité PayPal...");
        System.out.println("Paiement de " + amount + "€ effectué via PayPal. Nouveau solde : " + balance + "€");
    }

    @Override
    public String getPaymentType() {
        return "PayPal";
    }

    @Override
    public double getBalance() {
        return balance;
    }
}
```

##### `CryptoPayment` (avec frais) :
```java
public class CryptoPayment implements PaymentMethod {
    private double balance;

    public CryptoPayment(double balance) {
        this.balance = balance;
    }

    @Override
    public void pay(double amount) {
        double fees = amount * 0.02;
        double total = amount + fees;

        if (balance < total) {
            throw new InsufficientFundsException("Solde insuffisant en cryptomonnaie (montant + frais = " + total + "€)");
        }

        balance -= total;
        System.out.println("Frais de transaction crypto : " + fees + "€.");
        System.out.println("Paiement total de " + total + "€ effectué en cryptomonnaie. Nouveau solde : " + balance + "€");
    }

    @Override
    public String getPaymentType() {
        return "Cryptomonnaie";
    }

    @Override
    public double getBalance() {
        return balance;
    }
}
```

#### 4. `PaymentProcessor` avec gestion d'erreur :
```java
public class PaymentProcessor {
    public void processPayment(PaymentMethod method, double amount) {
        System.out.println("=== Traitement du paiement (" + method.getPaymentType() + ") ===");
        try {
            method.pay(amount);
        } catch (InsufficientFundsException e) {
            System.out.println("❌ Échec du paiement : " + e.getMessage());
        }
        System.out.println();
    }
}
```

#### 5. `Main` pour tester :
```java
public class Main {
    public static void main(String[] args) {
        PaymentProcessor processor = new PaymentProcessor();

        PaymentMethod card = new CreditCardPayment(150);
        PaymentMethod paypal = new PaypalPayment(100);
        PaymentMethod crypto = new CryptoPayment(200);

        processor.processPayment(card, 100);     // OK
        processor.processPayment(paypal, 120);   // Solde insuffisant
        processor.processPayment(crypto, 195);   // Solde insuffisant à cause des frais
        processor.processPayment(crypto, 100);   // OK
    }
}
```

---

### ✅ Ce que tu pratiques avec cet exo :
- **Polymorphisme**
- **Encapsulation** du solde
- **Exceptions personnalisées**
- **Logique métier spécifique** par implémentation
- **Responsabilité unique** pour chaque classe

---

Tu veux une version testable en ligne (Repl.it ou autre) ? Ou une version orientée Spring si tu veux pousser vers le back-end réel ?
