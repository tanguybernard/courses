# Projet Fil Rouge : Simulateur de Combat "Star Wars"

**Objectif :** Développer une application console robuste en Java illustrant les piliers de la POO.
**Contexte Technique :** Java moderne, gestion stricte des erreurs, architecture évolutive.

---

### Étape 1 : Modélisation et Instanciation (Les Bases)

**Concept :** Définition de types, allocation mémoire, cycle de vie de l'objet.

**Consigne :**

1. Définir une classe `Jedi` représentant une entité du système.
2. Attributs : `nom` (String), `sante` (int), `puissance` (int).
3. Définir un **Constructeur** permettant d'initialiser ces attributs lors de l'instanciation (`new`).
4. Implémenter une méthode `afficherEtat()` qui formate les données de l'objet sur la sortie standard.

**Livrable attendu :**
Un `Main` instanciant deux objets distincts (références mémoires différentes) et affichant leur état initial.

---

### Étape 2 : Encapsulation et Invariants (Sécurisation)

**Concept :** Masquage de l'information, validation des données, *Fail Fast*.

**Consigne :**

1. **Visibilité :** Rendre tous les attributs `private`.
2. **Intégrité des données (Votre demande) :**
* Le système ne doit pas permettre la création d'un personnage avec une santé négative ou un nom vide.
* Dans le constructeur, implémenter une validation conditionnelle.
* Si la donnée est invalide, lever une `IllegalArgumentException` (ou afficher un message d'erreur bloquant selon votre avancement sur les exceptions).


3. **Accesseurs :** Fournir des getters pour la lecture (lecture seule pour le nom).
4. **Mutateurs contrôlés :** Créer une méthode `recevoirDegats(int montant)` plutôt qu'un `setSante()`. Cette méthode garantit que la santé ne descend jamais en dessous de 0.

**Code cible (Exemple pour le cours) :**

```java
public Jedi(String nom, int sante, int puissance) {
    if (sante <= 0) {
        throw new IllegalArgumentException("La santé initiale doit être positive.");
    }
    if (nom == null || nom.trim().isEmpty()) {
        throw new IllegalArgumentException("Le nom ne peut pas être vide.");
    }
    this.nom = nom;
    this.sante = sante;
    this.puissance = puissance;
}

```

---

### Étape 3 : Hiérarchie et Abstraction (Architecture)

**Concept :** Factorisation du code, spécialisation, classe abstraite.

**Consigne :**

1. **Refactoring :** Extraire les attributs et comportements communs (`nom`, `sante`, `recevoirDegats`) dans une classe mère `Personnage`.
2. **Abstraction :**
* La classe `Personnage` doit être `abstract` (on ne peut pas instancier un "personnage" générique).
* Définir la signature `public abstract void attaquer(Personnage cible);` sans implémentation.


3. **Héritage :**
* `Jedi` étend `Personnage`. Implémentation : attaque standard.
* `Sith` étend `Personnage`. Implémentation : attaque augmentée si sa propre santé est basse (mécanique de "Rage").


4. **Surcharge (Override) :** Redéfinir `toString()` dans chaque classe pour identifier le type d'entité (ex: "[Jedi] Obi-Wan").

---

### Étape 4 : Polymorphisme et Collections (Le Moteur)

**Concept :** Manipulation générique, liaison dynamique (Dynamic Binding), itération.

**Consigne :**

1. Utiliser une collection typée `List<Personnage>` pour stocker des entités hétérogènes (Jedi et Sith mélangés).
2. Développer un **Moteur de Tour** :
* Une boucle parcourt la liste des personnages vivants.
* Chaque personnage sélectionne une cible (algorithme simple : le suivant dans la liste).
* Appel de la méthode `attaquer()`.


3. **Observation :** Démontrer que l'appel `p.attaquer()` exécute le code spécifique à l'instance réelle (Jedi ou Sith) sans que le moteur n'ait besoin de connaître le type exact (pas de `instanceof`).

---

### Étape 5 (Bonus/Avancé) : I/O et Robustesse

**Concept :** Séparation Vue/Modèle, Gestion des entrées utilisateur.

**Consigne :**

1. Développer une classe utilitaire `InputHandler` qui encapsule la classe `Scanner`.
2. Elle doit fournir une méthode `saisirEntier(int min, int max)` robuste qui :
* Gère les erreurs de type (si l'utilisateur tape "abc" au lieu d'un chiffre).
* Boucle tant que la saisie n'est pas valide.


3. Utiliser cette classe pour permettre à l'utilisateur de configurer les PV des personnages au lancement du programme.

---

### Suggestion pédagogique pour le cours : Le "Code Review"

Comme le ton est plus sérieux, vous pouvez introduire une pratique professionnelle :
À la fin de l'étape 2 (Encapsulation), demandez aux étudiants d'échanger leurs codes par binôme.

* **Mission :** "Essayez de 'casser' la classe de votre voisin en l'instanciant avec des valeurs absurdes (`null`, `-100`, `Integer.MAX_VALUE`). Si le programme plante (crash) au lieu de gérer l'erreur, le code est rejeté."

Est-ce que cette formulation plus rigoureuse vous convient mieux ?