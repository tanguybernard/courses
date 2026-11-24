# Idées pour une v2 du contrôle de 40 minutes

Notes prises après la première version, à reprendre au prochain passage sur le sujet.

## Récupérer l'avant-dernier élément d'une liste

Teste les indices négatifs, que le cours montre et que le contrôle actuel n'interroge pas.

```python
mesures = [82, 45, 28, 12]
print(mesures[-2])
```

Réponse : `28`. Erreurs attendues chez les étudiants : `12` (confusion avec `-1`), ou `mesures[len(mesures) - 1]` qui donne le dernier.

## « Où est l'erreur ? »

Un court programme avec une seule erreur à entourer et à corriger. Plus proche du quotidien que de nommer le type d'erreur, et ça se corrige vite.

```python
def alerte(niveau)
    if niveau >= 60:
        return "verte"
    return "rouge"
```

Réponse : il manque les deux-points après `def alerte(niveau)`.

Autres erreurs possibles pour la version B ou d'autres questions :

- deux-points oubliés après un `if`, un `for` ou un `else` ;
- indentation manquante dans le corps d'une boucle ;
- `self` oublié dans les paramètres d'une méthode ;
- `=` au lieu de `==` dans une condition.

## Où les placer

Je suppose : dans le QCM ou la lecture de code, à la place d'une question existante, pour garder la durée de 40 minutes. À trancher au moment de la v2.
