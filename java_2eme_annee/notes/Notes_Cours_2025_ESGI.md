
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


#### Class

En Java, une classe est une structure conceptuelle utilisée pour créer des objets, mais elle n'est pas elle-même un objet.

#### Integer vs int

    Integer nombre = 10; // Classe wrapper
    System.out.println(nombre.toString()); // Accès à des méthodes d'objet

Integer c'est un wrapper, on accède à des méthode comme parseInt(), plus couteux en mémoire.

#### Passage par valeur

```java
public class Exemple {
    public static void incrementer(int x) {
        x++;
    }

    public static void main(String[] args) {
        int nombre = 10;
        incrementer(nombre);
        System.out.println(nombre); // Affiche toujours 10
    }
}
```


#### Passage par reference 

Note Slide (a parameter with a non-primitive type is passed by reference) : 

_Cette affirmation n'est pas tout à fait exacte. En Java, tous les paramètres sont passés par valeur, y compris les types non primitifs (objets). Cependant, pour les objets, la valeur passée est une référence à l'objet, ce qui peut donner l'impression d'un passage par référence._

_Lorsqu'un objet est passé à une méthode, Java crée une copie de la référence à cet objet, pas une référence directe à la variable originale13. Cette copie pointe vers le même objet en mémoire, mais reste une valeur distincte._


_Le & en PHP offre un véritable passage par référence, permettant une manipulation directe des variables passées en argument_

Pour les objets, la référence (adresse en mémoire) de l'objet est passée par valeur. Cela signifie que la méthode reçoit une copie de la référence, mais les deux références (l'originale et la copie) pointent vers le même objet.

```java
public class Exemple {
    static class Personne {
        String nom;
        Personne(String nom) {
            this.nom = nom;
        }
    }

    public static void changerNom(Personne personne) {
        personne.nom = "Alice";
    }

    public static void main(String[] args) {
        Personne p = new Personne("Bob");
        changerNom(p);
        System.out.println(p.nom); // Affiche "Alice"
    }
}
```

#### Remplacer une référence

La méthode remplacerReference crée un nouvel objet et modifie la copie de la référence. Cela n'affecte pas la référence originale dans main.

```java
public class Exemple {
    static class Personne {
        private String nom;
        Personne(String nom) {
            this.nom = nom;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getName() {
            return this.name;
        }
    }

    public static void remplacerReference(Personne personne) {
        personne = new Personne("Charlie");
    }

    public static void modifyPerson(Personne p) {
        p.setName("Alice");
    }
    

    public static void main(String[] args) {
        Personne p = new Personne("Bob");
        remplacerReference(p);
        System.out.println(p.nom); // Affiche toujours "Bob"
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
