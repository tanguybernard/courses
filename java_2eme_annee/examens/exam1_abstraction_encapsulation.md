
# Examen de Programmation Orientée Objet (POO) : Abstraction et Encapsulation

---

## **Partie Théorique (10 points)**

1. **Questions à choix multiples (QCM)**
    - Quel concept de la POO consiste à cacher les détails d'implémentation et ne montrer que les fonctionnalités essentielles ?
        - A) Polymorphisme
        - B) Encapsulation
        - C) Abstraction
        - D) Héritage

    - Quel concept combine des données et des méthodes dans une classe tout en restreignant l'accès direct à certaines parties ?
        - A) Polymorphisme
        - B) Encapsulation
        - C) Abstraction
        - D) Héritage

2. **Questions ouvertes**
    - Expliquez la différence entre l'abstraction et l'encapsulation en donnant un exemple concret pour chaque concept.
   
    - Pourquoi l'encapsulation est-elle essentielle pour la sécurité des données dans un programme orienté objet ?

3. **Vrai ou Faux (justifiez vos réponses)**
    - L'abstraction permet de réduire la complexité en cachant les détails inutiles aux utilisateurs. (Vrai/Faux)
    - L'encapsulation empêche totalement l'accès aux données encapsulées. (Vrai/Faux)


## **Partie Pratique (20 points)**

Créez un système de gestion de livrets bancaires en utilisant l'abstraction et l'encapsulation. 
Le système doit inclure au moins deux types de livrets spécifiques.

### Consignes :

1. Composition d'un livret :
    - Attributs privés : numéro de compte, solde, taux d'intérêt
    - Méthodes abstraites / concrètes à vous de réfléchir :`deposer()`, `retirer()`, `calculerInterets()`, `appliquerInterets()`, `afficherSolde()`

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
    - Abstraction correcte : 5 points
    - Classes concrètes avec calculs corrects : 5 points
    - Encapsulation correcte : 5 points
    - Méthodes fonctionnelles : 5 points
