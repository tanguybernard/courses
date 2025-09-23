
## 🎯 Exercice : "Jeu de Plateau - Course de Véhicules"

### 🧠 Objectifs pédagogiques
- Mettre en œuvre **l’abstraction**, **l’héritage** et le **polymorphisme**
- Travailler avec des **méthodes abstraites**
- Concevoir un système extensible pour un **jeu de course**

---

### 🏁 Contexte

Tu conçois un jeu de plateau où différents types de **véhicules** s'affrontent sur une piste. Chaque type de véhicule a une façon différente de se déplacer.

---

### 📚 Classes à concevoir

#### 1. `Vehicule` (classe abstraite)
- `String nom`
- `int position`

✅ Méthodes :
- `abstract void avancer()` — chaque véhicule avance à sa manière
- `void afficherPosition()` — affiche le nom et la position

---

#### 2. `Voiture` (hérite de `Vehicule`)
- Avance de **3 à 6 cases** à chaque tour (utilise `Random`)

---

#### 3. `Moto` (hérite de `Vehicule`)
- Avance de **2 à 8 cases**, mais a 30% de chance de glisser et perdre son tour (reste sur la meme case)

---

#### 4. `Camion` (hérite de `Vehicule`)
- Avance de **1 à 4 cases**, mais ne glisse jamais

---

#### 5. `Course`
- Liste des véhicules (`List<Vehicule>`)
- Méthodes :
  - `void lancerTour()` — chaque véhicule joue un tour
  - `boolean courseTerminee()` — la course se termine si un véhicule dépasse 50
  - `void afficherClassement()` — classement selon la position

---

### 🧪 Exemple d’utilisation

```java
Vehicule v1 = new Voiture("Ferrari");
Vehicule v2 = new Moto("Yamaha");
Vehicule v3 = new Camion("Volvo");

Course course = new Course(Arrays.asList(v1, v2, v3));

while (!course.courseTerminee()) {
    course.lancerTour();
    course.afficherClassement();
}
```

---

### 🔥 Bonus

- Afficher un **podium final**
- Gérer des **obstacles** ou des **bonus de vitesse** sur certaines cases
- Ajouter une méthode `boost()` (polymorphisme encore) que certains véhicules peuvent utiliser une fois par course
