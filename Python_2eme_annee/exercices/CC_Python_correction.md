# 🎓 Corrigé, version A (pour l'enseignant)

## Partie 1 : QCM (5 points, 0,5 par question)

1. `3` *(division entière)*
2. `def`
3. 2, 3, 4, 5 *(la borne de fin est exclue)*
4. `notes.append(8)` *(`push` est le piège TypeScript)*
5. `None`
6. `__init__`
7. L'objet sur lequel la méthode est appelée
8. Réponses **1, 3 et 4**. *(La 2 est fausse : le typage est dynamique. 0,5 seulement si les trois bonnes réponses sont cochées et pas la 2 ; 0,25 pour deux bonnes réponses sans la 2.)*
9. `KeyError`
10. `raise` *(`throw` est le piège TypeScript)*

## Partie 2 : que va afficher ce code ? (5 points, 1,25 par code)

**Code A**

```text
75
4
```

*10 + 25 + 40 = 75 ; le 5 est ignoré. La liste n'est pas modifiée.*

**Code B**

```text
180.0
100.0
```

*Accepter `180` et `100` avec 1 point sur 1,25 : la division `/` donne un float.*

**Code C**

```text
stylo
gomme
3
```

*`stylo` passe à 2, `cahier` reste à 0 et n'est pas affiché, `gomme` est ajouté.*

**Code D**

```text
True
False
70
```

*Le second retrait est refusé : le solde reste à 70.*

## Partie 3 : trouvez l'erreur (3 points, 1 par code)

*0,5 pour l'erreur repérée, 0,5 pour la correction.*

**Code E** : il manque les deux points à la fin de la ligne `def`.

```python
def est_majeur(age):
```

**Code F** : on ne peut pas additionner un texte et un nombre (`TypeError`).

```python
print("Vous avez " + str(age) + " ans")
```

*Accepter aussi `print(f"Vous avez {age} ans")`.*

**Code G** : il manque `self` en premier paramètre.

```python
    def __init__(self, nom, prix):
```

## Partie 4 : écrivez le code (7 points)

**Exercice 1 (3 points)**

```python
def compter_ruptures(stock):
    compteur = 0
    for nom, quantite in stock.items():
        if quantite == 0:
            compteur += 1
    return compteur
```

| Critère | Points |
|---|---|
| Signature `def compter_ruptures(stock):` | 0,5 |
| Parcours du dictionnaire | 1 |
| Test `== 0` et compteur | 1 |
| `return` (et non `print`) | 0,5 |

*Accepter `for nom in stock:` avec `stock[nom]`, ou `for quantite in stock.values():`.*

**Exercice 2 (4 points)**

```python
class Panier:
    def __init__(self):
        self.prix = []

    def ajouter(self, prix):
        if prix < 0:
            raise ValueError("Le prix ne peut pas être négatif")
        self.prix.append(prix)

    def total(self):
        return sum(self.prix)

    def nombre_articles(self):
        return len(self.prix)
```

| Critère | Points |
|---|---|
| `class Panier:` et `__init__` avec une liste vide | 1 |
| `self` présent dans chaque méthode et devant l'attribut | 1 |
| `ajouter` : `raise ValueError` si négatif, sinon `append` | 1 |
| `total` (avec `sum` ou une boucle) | 0,5 |
| `nombre_articles` avec `len` | 0,5 |

*Ne pas pénaliser les petites fautes de syntaxe répétées plus d'une fois. Une indentation absente coûte 0,5 sur l'exercice.*
