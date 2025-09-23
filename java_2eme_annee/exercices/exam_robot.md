L'exercice du robot est un excellent moyen d'évaluer les compétences en programmation orientée objet (POO) en Java, car il permet de mettre en pratique plusieurs concepts clés comme l'héritage, le polymorphisme, et l'encapsulation. Voici comment vous pouvez enrichir cet exercice en incluant plusieurs types de robots :

---

## **Exercice : Système de Robots avec Divers Types**

### **Objectif :**
Créer un programme Java qui modélise un système de robots différents, chacun ayant des comportements spécifiques tout en partageant certaines fonctionnalités communes.

### **Types de Robots :**
1. **Robot Soldat** : Peut avancer, reculer, et attaquer.
2. **Robot Médecin** : Peut avancer, reculer, et soigner.
3. **Robot Explorateur** : Peut avancer, reculer, et scanner l'environnement.

### **Consignes :**
- Utiliser une classe abstraite ou une interface pour définir les comportements communs aux robots (avancer, reculer).
- Chaque type de robot doit être représenté par une sous-classe ou une classe concrète implémentant les comportements spécifiques.
- Créer une méthode pour afficher les informations sur chaque robot (type, position).
- Utiliser le polymorphisme pour traiter les robots de manière générique dans un tableau ou une liste.

### **Exemple de Code :**

```java
// Interface ou classe abstraite pour les comportements communs
public abstract class Robot {
    protected int position;

    public Robot(int position) {
        this.position = position;
    }

    public void avancer() {
        position++;
    }

    public void reculer() {
        position--;
    }

    public abstract void actionSpecifique();

    public void afficherInfo() {
        System.out.println("Position : " + position);
    }
}

// Sous-classes pour chaque type de robot
public class RobotSoldat extends Robot {
    public RobotSoldat(int position) {
        super(position);
    }

    @Override
    public void actionSpecifique() {
        System.out.println("Attaque !");
    }
}

public class RobotMedecin extends Robot {
    public RobotMedecin(int position) {
        super(position);
    }

    @Override
    public void actionSpecifique() {
        System.out.println("Soigne !");
    }
}

public class RobotExplorateur extends Robot {
    public RobotExplorateur(int position) {
        super(position);
    }

    @Override
    public void actionSpecifique() {
        System.out.println("Scanne l'environnement !");
    }
}

// Utilisation polymorphique
public class Main {
    public static void main(String[] args) {
        Robot[] robots = new Robot[] {
            new RobotSoldat(0),
            new RobotMedecin(5),
            new RobotExplorateur(10)
        };

        for (Robot robot : robots) {
            robot.avancer();
            robot.afficherInfo();
            robot.actionSpecifique();
        }
    }
}
```

### **Critères d'Évaluation :**
- **Fonctionnalité** : Les robots doivent fonctionner comme décrit.
- **Utilisation des Concepts POO** : Héritage, polymorphisme, encapsulation.
- **Qualité du Code** : Lisibilité, organisation, commentaires.

---

Cet exercice permet aux étudiants de comprendre et d'appliquer les principes fondamentaux de la POO tout en résolvant un problème concret et engageant.
