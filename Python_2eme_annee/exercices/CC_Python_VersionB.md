# Contrôle : les bases de Python (Durée : 1 heure) — Version B

Nom, prénom : ............................................

> Sans machine, sans document. Notions évaluées : variables, conditions, boucles, listes, dictionnaires, fonctions, classes, exceptions.
>
> Barème : Partie 1 sur 5, Partie 2 sur 5, Partie 3 sur 3, Partie 4 sur 7.

## Partie 1 : QCM (10 minutes, 5 points)

*Cochez la ou les bonnes réponses. Une seule réponse est attendue, sauf mention contraire.*

**1. Que vaut `9 % 4` ?**

* [ ] `2`
* [ ] `2.25`
* [ ] `1`
* [ ] `0`

**2. Quel mot-clé correspond à « sinon si » ?**

* [ ] `else if`
* [ ] `elif`
* [ ] `elsif`
* [ ] `otherwise`

**3. Quelles valeurs produit `range(3)` ?**

* [ ] 1, 2, 3
* [ ] 0, 1, 2, 3
* [ ] 0, 1, 2
* [ ] 3

**4. Comment obtenir le nombre d'éléments de la liste `notes` ?**

* [ ] `notes.length`
* [ ] `len(notes)`
* [ ] `notes.size()`
* [ ] `count(notes)`

**5. Que vaut `y` à la fin de ce code ?**

```python
def afficher(x):
    print(x)

y = afficher(3)
```

* [ ] `3`
* [ ] `None`
* [ ] `"3"`
* [ ] Le code provoque une erreur

**6. Comment créer un objet de la classe `Livre` ?**

* [ ] `livre = new Livre("Dune")`
* [ ] `livre = Livre("Dune")`
* [ ] `livre = Livre.new("Dune")`
* [ ] `livre = create Livre("Dune")`

**7. À quoi sert la méthode `__str__` ?**

* [ ] À créer l'objet
* [ ] À définir le texte affiché par `print(objet)`
* [ ] À convertir un texte en nombre
* [ ] À supprimer l'objet

**8. Quelles affirmations sont vraies ? (plusieurs réponses)**

* [ ] `and` remplace `&&`
* [ ] `7 / 2` vaut `3`
* [ ] `None` est l'équivalent de `null`
* [ ] Le premier élément d'une liste est à l'indice `0`

**9. Quelle erreur provoque ce code ?**

```python
age = int("abc")
```

* [ ] `TypeError`
* [ ] `KeyError`
* [ ] `ValueError`
* [ ] Aucune, `age` vaut `0`

**10. Quels mots-clés permettent d'attraper une erreur ?**

* [ ] `try` / `catch`
* [ ] `try` / `except`
* [ ] `do` / `rescue`
* [ ] `raise` / `except`

## Partie 2 : que va afficher ce code ? (15 minutes, 5 points)

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
def prix_ttc(prix, tva=20):
    return prix + prix * tva / 100

print(prix_ttc(100))
print(prix_ttc(100, 10))
```

Affichage :

```text


```

**Code C**

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

**Code D**

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

## Partie 3 : trouvez l'erreur (10 minutes, 3 points)

*Chaque code contient une seule erreur. Entourez-la et écrivez la ligne corrigée.*

**Code E**

```python
for i in range(3):
print(i)
```

Ligne corrigée : ............................................................

**Code F**

```python
texte = "12"
print(texte + 3)
```

Ligne corrigée : ............................................................

**Code G**

```python
class Livre:
    def __init__(self, titre):
        titre = titre

    def afficher(self):
        print(self.titre)
```

Ligne corrigée : ............................................................

## Partie 4 : écrivez le code (25 minutes, 7 points)

**Exercice 1 : une fonction (3 points)**

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

**Exercice 2 : une classe (4 points)**

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
