# 🎓 Corrigé, version B (pour l'enseignant)

## Partie 1 : QCM (5 points, 0,5 par question)

1. `1` *(reste de la division de 9 par 4)*
2. `elif`
3. 0, 1, 2 *(on part de 0, la borne de fin est exclue)*
4. `len(notes)` *(`notes.length` est le piège TypeScript)*
5. `None` *(la fonction affiche 3 mais ne renvoie rien)*
6. `livre = Livre("Dune")` *(pas de `new`)*
7. À définir le texte affiché par `print(objet)`
8. Réponses **1, 3 et 4**. *(La 2 est fausse : `7 / 2` vaut `3.5`. 0,5 seulement si les trois bonnes réponses sont cochées et pas la 2 ; 0,25 pour deux bonnes réponses sans la 2.)*
9. `ValueError`
10. `try` / `except` *(`try` / `catch` est le piège TypeScript)*

## Partie 2 : que va afficher ce code ? (5 points, 1,25 par code)

**Code A**

```text
2
45
```

*30 et 45 sont majeurs. `ages[-1]` est le dernier élément.*

**Code B**

```text
120.0
110.0
```

*Accepter `120` et `110` avec 1 point sur 1,25 : la division `/` donne un float.*

**Code C**

```text
A3
3
```

*`A1` devient `prise`, seule `A3` est libre.*

**Code D**

```text
True
False
30
```

*Le second remplissage dépasserait la capacité : le niveau reste à 30.*

## Partie 3 : trouvez l'erreur (3 points, 1 par code)

*0,5 pour l'erreur repérée, 0,5 pour la correction.*

**Code E** : la ligne `print(i)` n'est pas indentée (`IndentationError`).

```python
    print(i)
```

**Code F** : on ne peut pas additionner un texte et un nombre (`TypeError`).

```python
print(int(texte) + 3)
```

*Accepter aussi `print(texte + str(3))`, qui affiche `123`.*

**Code G** : le titre n'est pas enregistré dans l'objet, il manque `self.` (`AttributeError` à l'appel de `afficher`).

```python
        self.titre = titre
```

## Partie 4 : écrivez le code (7 points)

**Exercice 1 (3 points)**

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
| Parcours du dictionnaire | 1 |
| Test `>= 18` et compteur | 1 |
| `return` (et non `print`) | 0,5 |

*Accepter `for prenom in ages:` avec `ages[prenom]`, ou `for age in ages.values():`. Un test `> 18` coûte 0,5.*

**Exercice 2 (4 points)**

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
| `class Cagnotte:` et `__init__` avec une liste vide | 1 |
| `self` présent dans chaque méthode et devant l'attribut | 1 |
| `ajouter` : `raise ValueError` si inférieur ou égal à zéro, sinon `append` | 1 |
| `total` (avec `sum` ou une boucle) | 0,5 |
| `nombre_dons` avec `len` | 0,5 |

*Ne pas pénaliser les petites fautes de syntaxe répétées plus d'une fois. Une indentation absente coûte 0,5 sur l'exercice.*
