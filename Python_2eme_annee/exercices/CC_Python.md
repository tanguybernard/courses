# Contrôle : les bases de Python (Durée : 1 heure) — Version A

Nom, prénom : ............................................

> Sans machine, sans document. Notions évaluées : variables, conditions, boucles, listes, dictionnaires, fonctions, classes, exceptions.
>
> Barème : Partie 1 sur 5, Partie 2 sur 5, Partie 3 sur 3, Partie 4 sur 7.

## Partie 1 : QCM (10 minutes, 5 points)

*Cochez la ou les bonnes réponses. Une seule réponse est attendue, sauf mention contraire.*

**1. Que vaut `7 // 2` ?**

* [ ] `3.5`
* [ ] `3`
* [ ] `4`
* [ ] `1`

**2. Quel mot-clé permet de définir une fonction ?**

* [ ] `function`
* [ ] `func`
* [ ] `def`
* [ ] `fn`

**3. Quelles valeurs produit `range(2, 6)` ?**

* [ ] 2, 3, 4, 5, 6
* [ ] 2, 3, 4, 5
* [ ] 3, 4, 5
* [ ] 2, 6

**4. Comment ajouter la valeur `8` à la fin de la liste `notes` ?**

* [ ] `notes.push(8)`
* [ ] `notes.add(8)`
* [ ] `notes.append(8)`
* [ ] `notes[] = 8`

**5. Que renvoie une fonction qui ne contient aucun `return` ?**

* [ ] `0`
* [ ] `None`
* [ ] `False`
* [ ] Une erreur

**6. Dans une classe, comment s'appelle la méthode exécutée à la création d'un objet ?**

* [ ] `constructor`
* [ ] `__init__`
* [ ] `new`
* [ ] `create`

**7. Dans une méthode, que représente `self` ?**

* [ ] La classe elle-même
* [ ] L'objet sur lequel la méthode est appelée
* [ ] Le fichier en cours
* [ ] Le premier argument donné à l'appel

**8. Quelles affirmations sont vraies ? (plusieurs réponses)**

* [ ] L'indentation délimite les blocs de code
* [ ] Il faut déclarer le type d'une variable avant de l'utiliser
* [ ] Les booléens s'écrivent `True` et `False`, avec une majuscule
* [ ] Le point-virgule n'est pas nécessaire en fin de ligne

**9. Quelle erreur provoque ce code ?**

```python
stock = {"stylo": 3}
print(stock["gomme"])
```

* [ ] `IndexError`
* [ ] `KeyError`
* [ ] `ValueError`
* [ ] Aucune, il affiche `None`

**10. Quel mot-clé permet de signaler une erreur ?**

* [ ] `throw`
* [ ] `raise`
* [ ] `except`
* [ ] `error`

## Partie 2 : que va afficher ce code ? (15 minutes, 5 points)

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
def remise(prix, taux=10):
    return prix - prix * taux / 100

print(remise(200))
print(remise(200, 50))
```

Affichage :

```text


```

**Code C**

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

**Code D**

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

## Partie 3 : trouvez l'erreur (10 minutes, 3 points)

*Chaque code contient une seule erreur. Entourez-la et écrivez la ligne corrigée.*

**Code E**

```python
def est_majeur(age)
    return age >= 18
```

Ligne corrigée : ............................................................

**Code F**

```python
age = 20
print("Vous avez " + age + " ans")
```

Ligne corrigée : ............................................................

**Code G**

```python
class Produit:
    def __init__(nom, prix):
        self.nom = nom
        self.prix = prix
```

Ligne corrigée : ............................................................

## Partie 4 : écrivez le code (25 minutes, 7 points)

**Exercice 1 : une fonction (3 points)**

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

**Exercice 2 : une classe (4 points)**

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
