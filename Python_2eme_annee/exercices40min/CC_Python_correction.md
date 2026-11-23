# 🎓 Corrigé, version A (pour l'enseignant)

## Partie 1 : QCM (3 points, 0,5 par question)

1. `3` *(division entière)*
2. 2, 3, 4, 5 *(la borne de fin est exclue)*
3. `notes.append(8)` *(`push` est le piège TypeScript)*
4. `None`
5. `__init__`
6. L'objet sur lequel la méthode est appelée

## Partie 2 : que va afficher ce code ? (6 points, 2 par code)

**Code A**

```text
75
4
```

*10 + 25 + 40 = 75 ; le 5 est ignoré. La liste n'est pas modifiée.*

**Code B**

```text
stylo
gomme
3
```

*`stylo` passe à 2, `cahier` reste à 0 et n'est pas affiché, `gomme` est ajouté.*

**Code C**

```text
True
False
70
```

*Le second retrait est refusé : le solde reste à 70.*

## Partie 3 : écrivez le code (11 points)

**Exercice 1 (4 points)**

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
| Parcours du dictionnaire | 1,5 |
| Test `== 0` et compteur | 1,5 |
| `return` (et non `print`) | 0,5 |

*Accepter `for nom in stock:` avec `stock[nom]`, ou `for quantite in stock.values():`.*

**Exercice 2 (7 points)**

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
| `class Panier:` et `__init__` avec une liste vide | 1,5 |
| `self` présent dans chaque méthode et devant l'attribut | 1,5 |
| `ajouter` : `raise ValueError` si négatif, sinon `append` | 2 |
| `total` (avec `sum` ou une boucle) | 1 |
| `nombre_articles` avec `len` | 1 |

*Ne pas pénaliser les petites fautes de syntaxe répétées plus d'une fois. Une indentation absente coûte 0,5 sur l'exercice.*
