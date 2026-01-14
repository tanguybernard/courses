# 🏀 TP Rapide : Le Piège de l'Héritage

Vous développez le jeu "2K27".
Le moteur du jeu gère une action : le **Alley-Oop** (passe en l'air suivie d'un dunk).
Votre mission est de coder les différentes réactions des joueurs face à cette passe.


### 1. Le Code à produire

**A. Classe Abstraite `Joueur**`

* **Attributs :** `nom` (String), `fatigue` (int, 0 à 100).
* **Méthode `recevoirPasse()` :**
* C'est le **contrat** : Si `fatigue < 100`, le joueur **doit** tenter l'action.
* Appelle la méthode abstraite `dunker()`.


* **Méthode abstraite :** `protected abstract void dunker();`

**B. Classe `Pivot` (Hérite de `Joueur`)**

* **Méthode `dunker()` :** Affiche "{nomDuPivot} s'envole et écrase le cercle !" et ajoute +10 de fatigue.

**C. Classe `Sniper` (Hérite de `Joueur`)**

* **Méthode `dunker()` :** Affiche "{nomDuSniper} saute de toutes ses forces !" et ajoute +30 de fatigue.


**D. Classe `PivotStar` (Hérite de `Pivot`)**

* Si `fatigue > 25` : Lance une Exception ("Pas envie !").
* Sinon : Appelle `super.dunker()`.

---

### 2. Le Scénario (Main)

Copiez ce code et exécutez-le :

NB: Le traduire en PHP

```java
Pivot gobert = new Pivot("Gobert");
gobert.fatigue = 50;

PivotStar shaq = new PivotStar("Shaq");
shaq.fatigue = 30;

List<Joueur> equipe = List.of(gobert, shaq);

System.out.println("--- DÉBUT DU MATCH ---");

for (Joueur j : equipe) {
    try {
        j.recevoirPasse(); 
    } catch (RuntimeException e) {
        System.out.println("CRASH : " + e.getMessage());
    }
}

```

---

### 3. La Question pour les étudiants

> **Pourquoi le programme a-t-il planté pour Shaq ?**

