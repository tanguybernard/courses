### 🏆 Kata : Machine à Laver (Version Intermédiaire)  

📌 **Objectif** : Implémenter une machine à laver en Java avec des fonctionnalités avancées :  
✅ Allumer / Éteindre  
✅ Sélectionner un programme avec durée prédéfinie  
✅ Lancer un lavage avec simulation du temps  
✅ Vérifier l'état de la machine  

---

## **1️⃣ Modélisation de la Machine à Laver**
On utilise une **énumération** pour les programmes et une classe `WashingMachine` qui gère l'état et le cycle.

### **Enum pour les programmes**
```java
public enum WashingProgram {
    DELICATE(30), 
    RAPID(15), 
    INTENSIVE(60);

    private final int duration; // Durée en secondes

    WashingProgram(int duration) {
        this.duration = duration;
    }

    public int getDuration() {
        return duration;
    }
}
```

---

### **Classe WashingMachine**
```java
public class WashingMachine {
    private boolean isOn = false;
    private WashingProgram selectedProgram = null;

    public void powerOn() {
        isOn = true;
        System.out.println("🔵 Machine allumée.");
    }

    public void powerOff() {
        isOn = false;
        selectedProgram = null;
        System.out.println("⚫ Machine éteinte.");
    }

    public void selectProgram(WashingProgram program) {
        if (!isOn) {
            System.out.println("⚠️ Erreur : Allumez la machine avant de choisir un programme !");
            return;
        }
        this.selectedProgram = program;
        System.out.println("✅ Programme sélectionné : " + program + " (" + program.getDuration() + " sec)");
    }

    public void start() {
        if (!isOn || selectedProgram == null) {
            System.out.println("⚠️ Erreur : Sélectionnez un programme avant de démarrer !");
            return;
        }
        
        System.out.println("🌀 Démarrage du programme " + selectedProgram + "...");
        
        try {
            Thread.sleep(selectedProgram.getDuration() * 1000L); // Simulation du lavage
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        System.out.println("✅ Lavage terminé !");
    }
}
```

---

## **2️⃣ Tester la Machine à Laver**
```java
public class Main {
    public static void main(String[] args) {
        WashingMachine machine = new WashingMachine();

        machine.powerOn();
        machine.selectProgram(WashingProgram.INTENSIVE);
        machine.start();
        machine.powerOff();
    }
}
```

---

## **🛠️ Améliorations possibles :**  
- Ajouter un **mode essorage** après le lavage  
- Utiliser un **Thread** séparé pour gérer le lavage en arrière-plan  
- Ajouter un **niveau d'eau et température** configurables  

✅ **Un bon exercice pour manipuler la POO, les énumérations et la gestion des états !** 🚀
