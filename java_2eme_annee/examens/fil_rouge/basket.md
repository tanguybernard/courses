# Projet Fil Rouge : "Java Basket Manager"

**Objectif :** Développer un simulateur de franchise NBA complet.
**Structure :** 5 étapes progressives pour un contrôle continu sur 30 heures.

---

### Étape 1 : La Draft (Les Bases)

**Concepts :** Classes, attributs, constructeurs, `this`, instanciation.

* **Consigne :** Créez une classe `Joueur`. Un joueur est défini par son `nom`, son `numeroMaillot` et son `adresseTir` (un entier entre 0 et 100 représentant son pourcentage de réussite).
* **Action :** Implémentez un constructeur pour initialiser ces trois attributs. Ajoutez une méthode `afficherStats()` qui affiche les détails du joueur dans la console.
* **Livrable :** Un fichier `Main` qui crée plusieurs instances de joueurs et appelle leurs méthodes.

---

### Étape 2 : Le Règlement de la Ligue (Encapsulation)

**Concepts :** Private, Getters/Setters, Validation de données, Logique métier.

* **Consigne :** Sécurisez les données de vos joueurs pour éviter les valeurs impossibles.
* **Action :**
1. Passez tous les attributs en `private`.
2. Créez les **Getters** (pour tous) et les **Setters** (uniquement pour ce qui peut changer).
3. **Validation :** Le constructeur et les setters doivent empêcher un numéro de maillot négatif ou une adresse de tir supérieure à 100.
4. Ajoutez une méthode `encaisserFatigue(int effort)` qui augmente un nouvel attribut `fatigue`.


* **Livrable :** Une classe `Joueur` robuste où les données sont protégées et validées.

---

### Étape 3 : Spécialisation des Postes (Héritage & Abstraction)

**Concepts :** `abstract`, `extends`, `@Override`, factorisation du code.

* **Consigne :** Un club contient des profils différents. Créez une classe mère **abstraite** `MembreClub`.
* **Action :**
1. `MembreClub` contient les bases : `nom` et `salaire`.
2. Ajoutez la méthode **abstraite** : `public abstract void jouerAction();`.
3. Faites hériter `Joueur` de `MembreClub`. Son action sera : "Tente un tir au panier".
4. Créez une classe `Pivot` (qui hérite de `Joueur`) avec un attribut `taille`. Son action sera : "Tente un dunk dévastateur".
5. Créez une classe `Meneur` (qui hérite de `Joueur`) avec un attribut `vitesse`. Son action sera : "Distribue une passe aveugle".


* **Livrable :** Une architecture de classes utilisant l'héritage pour spécialiser les comportements.

---

### Étape 4 : Le Match et les Probabilités (Polymorphisme & Collections)

**Concepts :** `ArrayList`, Boucles, `java.util.Random`, Liaison dynamique.

* **Consigne :** Créez une classe `Equipe` qui gère une liste de membres et simule les actions de jeu.
* **Action :**
1. Utilisez une `ArrayList<MembreClub>` pour stocker les joueurs de l'équipe.
2. **Moteur de simulation :** Créez une méthode `lancerSequence()`. Elle parcourt la liste et appelle `jouerAction()` pour chaque membre.
3. **Calcul de réussite :** Pour les tirs des joueurs, utilisez la classe `Random`.
* Générez un nombre entre 0 et 100.
* Si `nombreAleatoire <= adresseTir`, le panier est marqué.


4. Affichez le score total à la fin de la séquence.


* **Livrable :** Un simulateur capable de traiter n'importe quel type de joueur et de calculer un score aléatoire basé sur leurs stats.

---

### Étape 5 : Le Bureau du Manager (I/O & Robustesse)

**Concepts :** `Scanner`, `try-catch`, gestion des exceptions, menus.

* **Consigne :** Créez une interface interactive pour piloter la franchise.
* **Action :**
1. Développez un menu console (1: Recruter, 2: Voir Effectif, 3: Jouer Match, 4: Quitter).
2. **Gestion des erreurs :** Utilisez des blocs `try-catch` pour capturer les erreurs de saisie (ex: si l'utilisateur tape du texte à la place du salaire ou du numéro de maillot).
3. Ajoutez une vérification : impossible de lancer un match si l'équipe est vide.


* **Livrable :** Une application console finie, interactive et qui ne "crash" jamais malgré les erreurs de l'utilisateur.