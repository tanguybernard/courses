### 🏆 Kata : Machine à Laver (Version Simple)  

📌 **Objectif** : Implémenter une machine à laver en Java avec les fonctionnalités de base :  
✅ Allumer / Éteindre  
✅ Sélectionner un programme  
✅ Lancer le lavage  

---

### **1️⃣ Modélisation de la Machine à Laver**
On commence par une classe `WashingMachine` qui gère l'état de la machine et le programme sélectionné.

```java
public class WashingMachine {
    private boolean isOn = false;
    private String program = null;

    public void powerOn() {
        isOn = true;
        System.out.println("Machine allumée.");
    }

    public void powerOff() {
        isOn = false;
        program = null;
        System.out.println("Machine éteinte.");
    }

    public void selectProgram(String program) {
        if (!isOn) {
            System.out.println("Erreur : Allumez la machine avant de choisir un programme !");
            return;
        }
        this.program = program;
        System.out.println("Programme sélectionné : " + program);
    }

    public void start() {
        if (!isOn || program == null) {
            System.out.println("Erreur : Sélectionnez un programme avant de démarrer !");
            return;
        }
        System.out.println("Démarrage du lavage en mode " + program + "...");
        System.out.println("Lavage terminé !");
    }
}
```

---

### **2️⃣ Tester la Machine à Laver**
On crée une classe `Main` pour simuler son utilisation.

```java
public class Main {
    public static void main(String[] args) {
        WashingMachine machine = new WashingMachine();

        machine.powerOn();
        machine.selectProgram("Délicat");
        machine.start();
        machine.powerOff();
    }
}
```

---

🎯 **Améliorations possibles :**  
- Ajouter plusieurs programmes en `enum`  
- Simuler un temps d’attente avec `Thread.sleep()`  
- Afficher l’état de la machine avec une variable  

✅ **Ce kata est simple et permet de pratiquer la gestion d’état en Java !** 🚀
