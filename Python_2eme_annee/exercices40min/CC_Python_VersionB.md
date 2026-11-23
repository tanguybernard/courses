# Contrôle : les bases de Python (Durée : 40 minutes) — Version B

Nom, prénom : ............................................

> Sans machine, sans document. Notions évaluées : variables, conditions, boucles, listes, dictionnaires, fonctions, classes, exceptions.
>
> Barème : Partie 1 sur 3, Partie 2 sur 6, Partie 3 sur 11.

## Partie 1 : QCM (5 minutes, 3 points)

*Cochez la ou les bonnes réponses. Une seule réponse est attendue, sauf mention contraire.*

**1. Que vaut `9 % 4` ?**

* [ ] `2`
* [ ] `2.25`
* [ ] `1`
* [ ] `0`

**2. Quelles valeurs produit `range(3)` ?**

* [ ] 1, 2, 3
* [ ] 0, 1, 2, 3
* [ ] 0, 1, 2
* [ ] 3

**3. Comment obtenir le nombre d'éléments de la liste `notes` ?**

* [ ] `notes.length`
* [ ] `len(notes)`
* [ ] `notes.size()`
* [ ] `count(notes)`

**4. Que vaut `y` à la fin de ce code ?**

```python
def afficher(x):
    print(x)

y = afficher(3)
```

* [ ] `3`
* [ ] `None`
* [ ] `"3"`
* [ ] Le code provoque une erreur

**5. Comment créer un objet de la classe `Livre` ?**

* [ ] `livre = new Livre("Dune")`
* [ ] `livre = Livre("Dune")`
* [ ] `livre = Livre.new("Dune")`
* [ ] `livre = create Livre("Dune")`

**6. À quoi sert la méthode `__str__` ?**

* [ ] À créer l'objet
* [ ] À définir le texte affiché par `print(objet)`
* [ ] À convertir un texte en nombre
* [ ] À supprimer l'objet

## Partie 2 : que va afficher ce code ? (10 minutes, 6 points)

*Écrivez exactement ce qui s'affiche, une ligne par `print`.*

**Code A**

```python
ages = [12, 30, 17, 45]
compteur = 0
for a in ages:
    if a >= 18:
        compteur += 1
print(compteur)
print(ages[-1])
```

Affichage :

```text


```

**Code B**

```python
places = {"A1": "libre", "A2": "prise"}
places["A1"] = "prise"
places["A3"] = "libre"

for numero, etat in places.items():
    if etat == "libre":
        print(numero)
print(len(places))
```

Affichage :

```text


```

**Code C**

```python
class Reservoir:
    def __init__(self, capacite):
        self.capacite = capacite
        self.niveau = 0

    def remplir(self, litres):
        if self.niveau + litres > self.capacite:
            return False
        self.niveau += litres
        return True

r = Reservoir(50)
print(r.remplir(30))
print(r.remplir(30))
print(r.niveau)
```

Affichage :

```text



```

## Partie 3 : écrivez le code (25 minutes, 11 points)

**Exercice 1 : une fonction (4 points)**

Écrivez une fonction `compter_majeurs(ages)`.

* Elle reçoit un dictionnaire qui associe un prénom à un âge.
* Elle renvoie le nombre de personnes qui ont 18 ans ou plus.

Exemple :

```python
ages = {"Alice": 20, "Bob": 15, "Chloé": 18}
print(compter_majeurs(ages))   # 2
```

```text








```

**Exercice 2 : une classe (7 points)**

Écrivez une classe `Cagnotte`.

* À la création, la cagnotte ne contient aucun don.
* `ajouter(don)` ajoute un don à la cagnotte. Si le don est inférieur ou égal à zéro, la méthode signale une erreur `ValueError`.
* `total()` renvoie la somme des dons.
* `nombre_dons()` renvoie le nombre de dons reçus.

Exemple :

```python
cagnotte = Cagnotte()
cagnotte.ajouter(20)
cagnotte.ajouter(5)
print(cagnotte.total())         # 25
print(cagnotte.nombre_dons())   # 2
```

```text
















```
