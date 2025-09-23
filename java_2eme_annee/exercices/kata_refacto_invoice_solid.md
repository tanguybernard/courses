# Kata Invoice

Voici un kata simple pour pratiquer la refactorisation de code en Java. L'objectif est de transformer un code initial en un code plus lisible, maintenable et extensible, tout en respectant les principes du **Clean Code** et du **SOLID**.

### Kata : Refactorisation d'un calculateur de factures

#### Contexte
Vous avez un programme qui calcule des factures pour des clients. Actuellement, le code est fonctionnel mais difficile à maintenir. Votre tâche est de refactorer ce code en appliquant des bonnes pratiques.

#### Code initial :

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

    public String getType() {
        return type;
    }

    public double getPurchases() {
        return purchases;
    }
}
```

#### Problèmes dans le code :
1. **Violation du principe Open/Closed (OCP)** : Le code n'est pas ouvert à l'extension sans modification (ajout de nouveaux types de clients nécessiterait de changer la méthode).
2. **Manque de séparation des responsabilités** : Le calcul des taxes est mêlé au calcul des montants.
3. **Code peu lisible** : Les opérations de calcul sont répétées.

### Tâches de refactorisation :
1. Appliquer le **pattern Strategy** pour gérer les types de clients.
2. Extraire la logique de calcul des taxes dans une classe séparée.
3. Améliorer la lisibilité et l'organisation du code.

#### Étape 1 : Créer une interface pour les stratégies de calcul de factures

```java
public interface BillingStrategy {
    double calculate(double purchases);
}
```

#### Étape 2 : Créer des implémentations pour chaque type de client

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
        return purchases * 0.9;
    }
}

public class VipBillingStrategy implements BillingStrategy {
    @Override
    public double calculate(double purchases) {
        return purchases * 0.8;
    }
}
```

#### Étape 3 : Créer une classe pour gérer le calcul des taxes

```java
public class TaxCalculator {
    public double applyTax(double amount) {
        return amount * 1.2; // 20% tax
    }
}
```

#### Étape 4 : Refactorer la classe `InvoiceCalculator` pour utiliser ces stratégies

```java
public class InvoiceCalculator {

    private TaxCalculator taxCalculator;

    public InvoiceCalculator() {
        this.taxCalculator = new TaxCalculator();
    }

    public double calculateInvoice(Customer customer) {
        BillingStrategy billingStrategy = getBillingStrategy(customer.getType());
        double total = billingStrategy.calculate(customer.getPurchases());
        return taxCalculator.applyTax(total);
    }

    private BillingStrategy getBillingStrategy(String customerType) {
        switch (customerType) {
            case "MEMBER":
                return new MemberBillingStrategy();
            case "VIP":
                return new VipBillingStrategy();
            case "REGULAR":
            default:
                return new RegularBillingStrategy();
        }
    }
}
```

#### Étape 5 : Tester la refactorisation

```java
public class Main {
    public static void main(String[] args) {
        InvoiceCalculator invoiceCalculator = new InvoiceCalculator();
        
        Customer regularCustomer = new Customer("REGULAR", 100);
        Customer memberCustomer = new Customer("MEMBER", 100);
        Customer vipCustomer = new Customer("VIP", 100);

        System.out.println("Regular Customer Invoice: " + invoiceCalculator.calculateInvoice(regularCustomer));
        System.out.println("Member Customer Invoice: " + invoiceCalculator.calculateInvoice(memberCustomer));
        System.out.println("VIP Customer Invoice: " + invoiceCalculator.calculateInvoice(vipCustomer));
    }
}
```

### Objectifs de la refactorisation :
- Le code respecte désormais le principe OCP (ajout de nouveaux types de clients sans toucher au calculateur de factures).
- Le calcul des taxes est séparé, améliorant ainsi la **séparation des préoccupations**.
- Le code est plus lisible et maintenable, facilitant les futures évolutions.

### Extension possible :
- Ajouter des stratégies de calcul pour de nouveaux types de clients.
- Ajouter des tests unitaires pour valider chaque stratégie indépendamment.
- Appliquer une remise au dela d'un certain montant
