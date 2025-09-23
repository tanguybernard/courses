
# Examen de Programmation Orientée Objet (POO) : Abstraction et Encapsulation

## **Partie Théorique (10 points)**

1. **Questions à choix multiples (QCM)**
    - Quel concept de la POO consiste à cacher les détails d'implémentation et ne montrer que les fonctionnalités essentielles ?
        - A) Polymorphisme
        - B) Encapsulation
        - C) Abstraction
        - D) Héritage
    - Réponse : C

    - Quel concept combine des données et des méthodes dans une classe tout en restreignant l'accès direct à certaines parties ?
        - A) Polymorphisme
        - B) Encapsulation
        - C) Abstraction
        - D) Héritage
    - Réponse : B

2. **Questions ouvertes**
    - Expliquez la différence entre l'abstraction et l'encapsulation en donnant un exemple concret pour chaque concept.
    - Pourquoi l'encapsulation est-elle essentielle pour la sécurité des données dans un programme orienté objet ?

3. **Vrai ou Faux (justifiez vos réponses)**
    - L'abstraction permet de réduire la complexité en cachant les détails inutiles aux utilisateurs. (Vrai/Faux)
    - L'encapsulation empêche totalement l'accès aux données encapsulées. (Vrai/Faux)

    
## Exercice Pratique : Gestion de Livrets Bancaires

Créez un système de gestion de livrets bancaires en utilisant l'abstraction et l'encapsulation. 
Le système doit inclure au moins deux types de livrets spécifiques.

### Consignes :

1. Composition d'un livret :
    - Attributs privés : numéro de compte, solde, taux d'intérêt
    - Méthodes abstraites/ concrètes à vous de réfléchir :`deposer()`, `retirer()`, `calculerInterets()`, `appliquerInterets()`, `afficherSolde()`

2. Implémentez deux classes :
    - `LivretA` : taux d'intérêt fixe de 3%
    - `LivretJeune` : taux d'intérêt fixe de 4%, limité aux moins de 25 ans

3. Utilisez l'encapsulation pour protéger les données et fournir des getters/setters appropriés.

---

## **Barème**
- Partie théorique : 10 points
    - QCM : 4 points
    - Questions ouvertes : 4 points
    - Vrai/Faux : 2 points
- Partie pratique : 20 points
    - Classe abstraite correcte : 5 points
    - Classes concrètes avec calculs corrects : 5 points
    - Encapsulation correcte : 5 points
    - Méthodes fonctionnelles : 5 points



### Notes :

### Consignes (TRop facile) :

1. Créez une classe abstraite `LivretBancaire` avec :
    - Attributs privés : numéro de compte, solde, taux d'intérêt
    - Méthodes abstraites : `calculerInterets()`, `appliquerInterets()`
    - Méthodes concrètes : `deposer()`, `retirer()`, `afficherSolde()`

2. Implémentez deux classes concrètes héritant de `LivretBancaire` :
    - `LivretA` : taux d'intérêt fixe de 3%
    - `LivretJeune` : taux d'intérêt fixe de 4%, limité aux moins de 25 ans

3. Utilisez l'encapsulation pour protéger les données et fournir des getters/setters appropriés.

4. Implémentez une classe `BanqueTest` avec une méthode `main` pour tester vos classes.

### Correction :

```java
abstract class LivretBancaire {
    private String numeroCompte;
    private double solde;
    protected double tauxInteret;

    public LivretBancaire(String numeroCompte, double soldeInitial, double tauxInteret) {
        this.numeroCompte = numeroCompte;
        this.solde = soldeInitial;
        this.tauxInteret = tauxInteret;
    }

    public abstract double calculerInterets();
    public abstract void appliquerInterets();

    public void deposer(double montant) {
        if (montant > 0) {
            solde += montant;
            System.out.println("Dépôt de " + montant + "€ effectué.");
        } else {
            System.out.println("Montant invalide pour le dépôt.");
        }
    }

    public void retirer(double montant) {
        if (montant > 0 && montant = 25) {
            System.out.println("Attention : Le Livret Jeune est réservé aux moins de 25 ans.");
        }
    }

    @Override
    public double calculerInterets() {
        return age < 25 ? getSolde() * tauxInteret : 0;
    }

    @Override
    public void appliquerInterets() {
        if (age < 25) {
            double interets = calculerInterets();
            setSolde(getSolde() + interets);
            System.out.println("Intérêts de " + interets + "€ appliqués au Livret Jeune.");
        } else {
            System.out.println("Pas d'intérêts appliqués. Le titulaire a 25 ans ou plus.");
        }
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}

public class BanqueTest {
    public static void main(String[] args) {
        LivretA livretA = new LivretA("LA001", 1000);
        LivretJeune livretJeune = new LivretJeune("LJ001", 500, 20);

        System.out.println("Test du Livret A :");
        livretA.afficherSolde();
        livretA.deposer(200);
        livretA.retirer(50);
        livretA.afficherSolde();
        livretA.appliquerInterets();
        livretA.afficherSolde();

        System.out.println("\nTest du Livret Jeune :");
        livretJeune.afficherSolde();
        livretJeune.deposer(300);
        livretJeune.retirer(100);
        livretJeune.afficherSolde();
        livretJeune.appliquerInterets();
        livretJeune.afficherSolde();

        // Test avec un âge supérieur à 25 ans
        livretJeune.setAge(26);
        livretJeune.appliquerInterets();
    }
}
```

## Explication de la correction :

1. La classe abstraite `LivretBancaire` fournit la structure de base pour tous les livrets, avec des méthodes abstraites pour le calcul et l'application des intérêts.

2. L'encapsulation est utilisée pour protéger les données (attributs privés) et fournir des méthodes d'accès contrôlées (getters et setters).

3. Les classes concrètes `LivretA` et `LivretJeune` héritent de `LivretBancaire` et implémentent les méthodes abstraites selon leurs règles spécifiques.

4. La classe `LivretJeune` ajoute une vérification de l'âge pour s'assurer que seuls les titulaires de moins de 25 ans bénéficient des intérêts.

5. La classe `BanqueTest` démontre l'utilisation des différents types de livrets et leurs fonctionnalités.

Cette implémentation illustre efficacement l'utilisation de l'abstraction (via la classe abstraite et les méthodes abstraites) et de l'encapsulation (via les attributs privés et les méthodes d'accès contrôlées) dans un contexte de gestion bancaire.


