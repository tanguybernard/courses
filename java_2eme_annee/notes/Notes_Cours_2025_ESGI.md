
Course :

https://crazy-crafters.gitlab.io/red-maple/

https://gitlab.com/crazy-crafters/red-maple

Chapitre à introduire:

https://www.codecademy.com/learn/learn-intermediate-java



## 1. Intro 



### Notes

 - int: 4 octets (32 bits)

////////////////////////////

      Byte (1 octet)
      Taille : 1 octet (8 bits)1
      
      Plage de valeurs :
      
      Signé : -128 à 127
      
      Non signé : 0 à 2555
      
      Utilisé pour : caractères ASCII, petites valeurs numériques

////////////////

      Short (2 octets)
      Taille : 2 octets (16 bits)5
      
      Plage de valeurs :
      
      Signé : -32 768 à 32 767
      
      Non signé : 0 à 65 5355
      
      Utilisé pour : petits entiers, économie de mémoire


////////////////


    int	Entier	
        - 2 octets (sur processeur 16 bits) : -32 768 à 32 767
        - 4 octets (sur processeur 32 bits) : -2 147 483 648 à 2 147 483 647
    
    unsigned int	Entier non signé	
        - 2 octets (sur processeur 16 bits) : 0 à 65 535
        - 4 octets (sur processeur 32 bits) : 0 à 4 294 967 295

#### Class

En Java, une classe est une structure conceptuelle utilisée pour créer des objets, mais elle n'est pas elle-même un objet.

#### Integer vs int

    Integer nombre = 10; // Classe wrapper
    System.out.println(nombre.toString()); // Accès à des méthodes d'objet

Integer c'est un wrapper, on accède à des méthode comme parseInt(), plus couteux en mémoire.

#### Passage par valeur

Explication détaillée avec analogies
1. Le passage par valeur (Types Primitifs)
   Concerne : int, double, boolean, char, etc.

Quand vous passez un type primitif à une méthode, Java fait une photocopie de la valeur.

L'analogie : Imaginez que vous avez un dessin (votre variable int x = 10). Vous donnez une photocopie de ce dessin à votre ami (la méthode). Si votre ami gribouille sur la photocopie, votre dessin original reste intact.

En Java : Si la méthode modifie la variable, cela n'a aucun impact sur la variable d'origine en dehors de la méthode.

2. Le passage par "référence" (Objets / Non-Primitifs)
   Concerne : String, Integer, Tableaux [], et toutes vos classes (User, Product...)

Quand vous passez un objet à une méthode, vous ne passez pas l'objet entier (trop lourd), mais son adresse mémoire (sa référence).

L'analogie : Imaginez que vous avez une maison (l'Objet). Vous ne donnez pas la maison à la méthode, vous lui donnez une copie des clés (la référence).

Si la méthode utilise les clés pour entrer et repeindre les murs en rouge (modifier un attribut de l'objet), alors quand vous rentrez chez vous, les murs sont rouges. L'objet est modifié pour tout le monde.

Attention (Nuance importante) : Si la méthode jette ses clés et achète une nouvelle maison (réassigne la variable param = new Objet()), cela ne change pas votre maison à vous. Elle a juste changé de maison de son côté.


```java
public class TestPassage {

    public static void main(String[] args) {
        int monNombre = 5;
        StringBuilder monTexte = new StringBuilder("Bonjour");

        modifier(monNombre, monTexte);

        // 1. L'int n'a pas changé (Passage par valeur / Photocopie)
        System.out.println(monNombre); // Affiche : 5 

        // 2. L'objet a été modifié (Passage par référence / Clés de la maison)
        System.out.println(monTexte);  // Affiche : Bonjour Monde
    }

    public static void modifier(int n, StringBuilder t) {
        n = n + 10;      // Modifie seulement la copie locale
        t.append(" Monde"); // Modifie l'objet réel en mémoire via la référence
    }
}
```


## 2. Introduction OOP

https://crazy-crafters.gitlab.io/red-maple/development/oop/basics/#/


### Example du Gateau

La programmation orientée objet (POO) peut être expliquée en utilisant l'exemple d'un gâteau. Voici comment les concepts clés de la POO s'appliquent :

### Classe et Objet

Une classe "Gateau" serait comme une recette, définissant les attributs (ingrédients) et les méthodes (étapes de préparation) pour créer un gâteau. Chaque gâteau que vous faites en suivant cette recette est un objet, ou une instance, de la classe Gateau.

### Attributs et Méthodes

Les attributs d'un gâteau pourraient être son poids, son diamètre, sa saveur, etc. Les méthodes seraient des actions comme "cuire()", "glacer()", ou "getPoids()".

### Encapsulation

L'encapsulation permet de cacher certains détails internes du gâteau. Par exemple, la recette exacte (attributs privés) pourrait être cachée, mais le goût ou l'apparence (attributs publics) seraient accessibles à tous.

### Héritage

On pourrait avoir une classe de base "Gateau" et des sous-classes comme "GateauChocolat" ou "GateauFruits" qui hériteraient des propriétés de base mais ajouteraient leurs propres spécificités[2].

### Polymorphisme

Le polymorphisme permettrait à différents types de gâteaux d'avoir une méthode "preparer()" qui s'exécuterait différemment selon le type de gâteau.

Voici un exemple simplifié en Python :

```python
class Gateau:
    def __init__(self, poids, diametre):
        self.poids = poids
        self.diametre = diametre

    def getPoids(self):
        return self.poids

monGateau = Gateau(500, 20)
poids = monGateau.getPoids()
```

Dans cet exemple, nous avons créé une classe Gateau, instancié un objet monGateau, et utilisé une méthode pour obtenir son poids.


### Copy constructor

```java
public class Rectangle {
private double hauteur;
private double largeur;

    // Constructeur de copie
    public Rectangle(Rectangle autreRectangle) {
        this.hauteur = autreRectangle.hauteur;
        this.largeur = autreRectangle.largeur;
    }
}
```



### Exercice

Kata Video Store à la toute fin ?

https://github.com/cleancode-katas/cleancode-kata-videostore

## Abstraction

https://crazy-crafters.gitlab.io/red-maple/development/oop/abstraction/#/

Se concentrer sur ce que fait un objet plutôt que sur comment il le fait.

Par exemple, une méthode ajouter() peut être définie pour une liste, mais l’utilisateur n’a pas besoin de savoir si cette liste est implémentée comme un tableau ou une structure chaînée.


Derniere slide : Ma pizza pourrait etre un gateau (juste parce que j'ai rajouté de l'ananas dessus) -> NON


### Composition vs Héritage

```java
class Engine {
    public void start() {
        System.out.println("Engine starting...");
    }
}

class Car extends Engine {
    public void drive() {
        System.out.println("Car is driving...");
    }
}

public class Main {
    public static void main(String[] args) {
        Car car = new Car();
        car.start();  // Inherited method
        car.drive();  // Car-specific method
    }
}
```

```java
class Engine {
    public void start() {
        System.out.println("Engine starting...");
    }
}

class Car {
    private Engine engine; // Composition: Car has an Engine

    public Car(Engine engine) {
        this.engine = engine;
    }

    public void drive() {
        System.out.println("Car is driving...");
    }

    public void startEngine() {
        engine.start(); // Delegates the starting to Engine class
    }
}

public class Main {
    public static void main(String[] args) {
        Engine engine = new Engine();
        Car car = new Car(engine);

        car.startEngine();  // Starts the engine through composition
        car.drive();        // Car-specific method
    }
}

```

Don’t use inheritance for particular state / Use property instead

-> Exemple contrat en cours de signature, ensuite signé. Ne pas hérité pour juste un état, mettre la propriété état à la place

## Encapsulation

Cache les données pour protéger leur intégrité.

https://crazy-crafters.gitlab.io/red-maple/development/oop/encapsulation/#/


## Composition

https://crazy-crafters.gitlab.io/red-maple/development/oop/inheritance_vs_composition/#/

## Polymorphisme

Le nom de polymorphisme vient du grec et signifie qui peut prendre plusieurs formes. Cette caractéristique est un des concepts essentiels de la programmation orientée objet. Alors que l'héritage concerne les classes (et leur hiérarchie), le polymorphisme est relatif aux méthodes des objets.

https://crazy-crafters.gitlab.io/red-maple/development/oop/polymorphism/#/

_Le switch est considérés en POO comme « une occasion manquée d’utiliser du polymorphisme. »_


### Ad hoc

Le polymorphisme ad hoc permet d'avoir des fonctions de même nom, avec des __fonctionnalités similaires__, dans des __classes__ sans __aucun rapport entre elles__.

Exemple : La classe image et la classe lien peuvent avoir chacune une fonction "afficher".

https://web.maths.unsw.edu.au/~lafaye/CCM/poo/polymorp.htm

### Paramétrique

Le polymorphisme paramétrique, appelé généricité, représente la possibilité de définir __plusieurs fonctions de même nom__ mais possédant des __paramètres différents__.

- La méthode int addition(int, int) pourra retourner la somme de deux entiers
- La méthode float addition(float, float) pourra retourner la somme de deux flottants
- La méthode char addition(char, char) pourra définir au gré de l'auteur la somme de deux caractères

### Polymorphisme d'héritage

La possibilité de redéfinir une méthode dans des classes héritant d'une classe de base s'appelle la spécialisation. Il est alors possible d'appeler la méthode d'un objet sans se soucier de son type intrinsèque : il s'agit du polymorphisme d'héritage. Ceci permet de faire abstraction des détails des classes spécialisées d'une famille d'objet, en les masquant par une interface commune (qui est la classe de base).


Imaginons un __jeu d'échec__ comportant des objets __roi, reine, fou, cavalier, tour et pion__, héritant chacun de l'objet __piece__.
La méthode __mouvement()__ pourra, grâce au polymorphisme d'héritage, effectuer le mouvement approprié en fonction de la classe de l'objet référencé au moment de l'appel. Cela permettra notamment au programme de dire piece.mouvement sans avoir à se préoccuper de la classe de la pièce.



## REST

https://happycoding.io/tutorials/java-server/rest-api
