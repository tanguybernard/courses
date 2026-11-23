# 🎓 Corrigé, version B (pour l'enseignant)

## Partie 1 : QCM (3 points, 0,5 par question)

1. `1` *(reste de la division de 9 par 4)*
2. 0, 1, 2 *(on part de 0, la borne de fin est exclue)*
3. `len(notes)` *(`notes.length` est le piège TypeScript)*
4. `None` *(la fonction affiche 3 mais ne renvoie rien)*
5. `livre = Livre("Dune")` *(pas de `new`)*
6. À définir le texte affiché par `print(objet)`

## Partie 2 : que va afficher ce code ? (6 points, 2 par code)

**Code A**

```text
2
45
```

*30 et 45 sont majeurs. `ages[-1]` est le dernier élément.*

**Code B**

```text
A3
3
```

*`A1` devient `prise`, seule `A3` est libre.*

**Code C**

```text
True
False
30
```

*Le second remplissage dépasserait la capacité : le niveau reste à 30.*

## Partie 3 : écrivez le code (11 points)

**Exercice 1 (4 points)**

```python
def compter_majeurs(ages):
    compteur = 0
    for prenom, age in ages.items():
        if age >= 18:
            compteur += 1
    return compteur
```

| Critère | Points |
|---|---|
| Signature `def compter_majeurs(ages):` | 0,5 |
| Parcours du dictionnaire | 1,5 |
| Test `>= 18` et compteur | 1,5 |
| `return` (et non `print`) | 0,5 |

*Accepter `for prenom in ages:` avec `ages[prenom]`, ou `for age in ages.values():`. Un test `> 18` coûte 0,5.*

**Exercice 2 (7 points)**

```python
class Cagnotte:
    def __init__(self):
        self.dons = []

    def ajouter(self, don):
        if don <= 0:
            raise ValueError("Le don doit être supérieur à zéro")
        self.dons.append(don)

    def total(self):
        return sum(self.dons)

    def nombre_dons(self):
        return len(self.dons)
```

| Critère | Points |
|---|---|
| `class Cagnotte:` et `__init__` avec une liste vide | 1,5 |
| `self` présent dans chaque méthode et devant l'attribut | 1,5 |
| `ajouter` : `raise ValueError` si inférieur ou égal à zéro, sinon `append` | 2 |
| `total` (avec `sum` ou une boucle) | 1 |
| `nombre_dons` avec `len` | 1 |

*Ne pas pénaliser les petites fautes de syntaxe répétées plus d'une fois. Une indentation absente coûte 0,5 sur l'exercice.*
