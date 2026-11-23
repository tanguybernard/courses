# Contrôle : les bases de Python (Durée : 40 minutes) — Version A

Nom, prénom : ............................................

> Sans machine, sans document. Notions évaluées : variables, conditions, boucles, listes, dictionnaires, fonctions, classes, exceptions.
>
> Barème : Partie 1 sur 3, Partie 2 sur 6, Partie 3 sur 11.

## Partie 1 : QCM (5 minutes, 3 points)

*Cochez la ou les bonnes réponses. Une seule réponse est attendue, sauf mention contraire.*

**1. Que vaut `7 // 2` ?**

* [ ] `3.5`
* [ ] `3`
* [ ] `4`
* [ ] `1`

**2. Quelles valeurs produit `range(2, 6)` ?**

* [ ] 2, 3, 4, 5, 6
* [ ] 2, 3, 4, 5
* [ ] 3, 4, 5
* [ ] 2, 6

**3. Comment ajouter la valeur `8` à la fin de la liste `notes` ?**

* [ ] `notes.push(8)`
* [ ] `notes.add(8)`
* [ ] `notes.append(8)`
* [ ] `notes[] = 8`

**4. Que renvoie une fonction qui ne contient aucun `return` ?**

* [ ] `0`
* [ ] `None`
* [ ] `False`
* [ ] Une erreur

**5. Dans une classe, comment s'appelle la méthode exécutée à la création d'un objet ?**

* [ ] `constructor`
* [ ] `__init__`
* [ ] `new`
* [ ] `create`

**6. Dans une méthode, que représente `self` ?**

* [ ] La classe elle-même
* [ ] L'objet sur lequel la méthode est appelée
* [ ] Le fichier en cours
* [ ] Le premier argument donné à l'appel

## Partie 2 : que va afficher ce code ? (10 minutes, 6 points)

*Écrivez exactement ce qui s'affiche, une ligne par `print`.*

**Code A**

```python
prix = [10, 25, 5, 40]
total = 0
for p in prix:
    if p > 8:
        total += p
print(total)
print(len(prix))
```

Affichage :

```text


```

**Code B**

```python
stock = {"stylo": 3, "cahier": 0}
stock["stylo"] -= 1
stock["gomme"] = 5

for nom, quantite in stock.items():
    if quantite > 0:
        print(nom)
print(len(stock))
```

Affichage :

```text



```

**Code C**

```python
class Compte:
    def __init__(self, solde):
        self.solde = solde

    def retirer(self, montant):
        if montant > self.solde:
            return False
        self.solde -= montant
        return True

c = Compte(100)
print(c.retirer(30))
print(c.retirer(80))
print(c.solde)
```

Affichage :

```text



```

## Partie 3 : écrivez le code (25 minutes, 11 points)

**Exercice 1 : une fonction (4 points)**

Écrivez une fonction `compter_ruptures(stock)`.

* Elle reçoit un dictionnaire qui associe un nom de produit à sa quantité.
* Elle renvoie le nombre de produits dont la quantité vaut `0`.

Exemple :

```python
stock = {"stylo": 3, "cahier": 0, "gomme": 0}
print(compter_ruptures(stock))   # 2
```

```text








```

**Exercice 2 : une classe (7 points)**

Écrivez une classe `Panier`.

* À la création, le panier ne contient aucun prix.
* `ajouter(prix)` ajoute un prix au panier. Si le prix est négatif, la méthode signale une erreur `ValueError`.
* `total()` renvoie la somme des prix.
* `nombre_articles()` renvoie le nombre de prix dans le panier.

Exemple :

```python
panier = Panier()
panier.ajouter(10)
panier.ajouter(5)
print(panier.total())             # 15
print(panier.nombre_articles())   # 2
```

```text
















```
