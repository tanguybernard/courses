Nous allons créer un jeu de combat basique avec des personnages.

## Instructions métier pour un jeu de combat simple

1. Créez une classe abstraite `Personnage` qui servira de base pour tous les types de personnages dans le jeu.

2. Dans la classe `Personnage`, définissez les attributs communs :
   - `nom` (String)
   - `pointsDeVie` (int)
   - `forceDAttaque` (int)

3. Ajoutez des méthodes dans la classe `Personnage` :
   - Un constructeur pour initialiser les attributs
   - Une méthode abstraite `attaquer(Personnage cible)`
   - Une méthode concrète `recevoirDegats(int degats)`
   - Une méthode `estVivant()` qui retourne un booléen

4. Créez deux classes concrètes qui héritent de `Personnage` :
   - `Guerrier`
   - `Archer`

5. Implémentez la méthode `attaquer` dans chaque classe concrète avec un comportement spécifique.

6. Créez une classe `Jeu` qui contiendra la logique principale du jeu.

7. Dans la classe `Jeu`, ajoutez une méthode pour simuler un combat entre deux personnages.

Voici l'implémentation en Java basée sur ces instructions :

```java
// Classe abstraite Personnage
abstract class Personnage {
    protected String nom;
    protected int pointsDeVie;
    protected int forceDAttaque;

    public Personnage(String nom, int pointsDeVie, int forceDAttaque) {
        this.nom = nom;
        this.pointsDeVie = pointsDeVie;
        this.forceDAttaque = forceDAttaque;
    }

    public abstract void attaquer(Personnage cible);

    public void recevoirDegats(int degats) {
        pointsDeVie -= degats;
        
    }
    
    public boolean estVivant(){
       return pointsDeVie  > 0;
    }
}

// Classe Guerrier
class Guerrier extends Personnage {
    public Guerrier(String nom) {
        super(nom, 100, 10);
    }

    @Override
    public void attaquer(Personnage cible) {
        System.out.println(nom + " attaque avec son épée!");
        cible.recevoirDegats(forceDAttaque);
    }
}

// Classe Archer
class Archer extends Personnage {
    public Archer(String nom) {
        super(nom, 80, 15);
    }

    @Override
    public void attaquer(Personnage cible) {
        System.out.println(nom + " tire une flèche!");
        cible.recevoirDegats(forceDAttaque);
    }
}

// Classe Jeu
class Jeu {
    public void simulerCombat(Personnage p1, Personnage p2) {
        System.out.println("Début du combat entre " + p1.nom + " et " + p2.nom);
        while (p1.estVivant() && p2.estVivant()) {
            p1.attaquer(p2);
            if (p2.estVivant()) {
                p2.attaquer(p1);
            }
        }
        System.out.println("Fin du combat!");
        System.out.println(p1.estVivant() ? p1.nom + " a gagné!" : p2.nom + " a gagné!");
    }

    public static void main(String[] args) {
        Jeu jeu = new Jeu();
        Personnage guerrier = new Guerrier("Conan");
        Personnage archer = new Archer("Legolas");
        jeu.simulerCombat(guerrier, archer);
    }
}
```

Cette implémentation illustre les concepts de base de la POO :
- Abstraction avec la classe abstraite `Personnage`
- Encapsulation avec les attributs protégés
- Héritage avec les classes `Guerrier` et `Archer`
- Polymorphisme dans la méthode `simulerCombat`

