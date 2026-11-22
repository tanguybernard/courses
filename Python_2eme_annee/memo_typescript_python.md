# Mémo : de TypeScript à Python

## Les bases

| | TypeScript | Python |
|---|---|---|
| Variable | `let note = 14;` | `note = 14` |
| Constante | `const TVA = 20;` | `TVA = 20` (majuscules par convention) |
| Afficher | `console.log(x)` | `print(x)` |
| Texte avec variable | `` `Bonjour ${nom}` `` | `f"Bonjour {nom}"` |
| Commentaire | `// texte` | `# texte` |
| Vrai, faux, rien | `true`, `false`, `null` | `True`, `False`, `None` |
| Fin d'instruction | `;` | fin de ligne |
| Bloc | `{ ... }` | `:` puis 4 espaces |

## Opérations

| | TypeScript | Python |
|---|---|---|
| Division | `7 / 2` vaut `3.5` | `7 / 2` vaut `3.5` |
| Division entière | `Math.floor(7 / 2)` | `7 // 2` |
| Puissance | `2 ** 3` | `2 ** 3` |
| Égal, différent | `===`, `!==` | `==`, `!=` |
| Et, ou, non | `&&`, <code>&#124;&#124;</code>, `!` | `and`, `or`, `not` |
| Incrémenter | `i++` | `i += 1` |
| Convertir | `Number("14")`, `String(14)` | `int("14")`, `str(14)` |

## Conditions et boucles

```python
if note >= 16:
    print("Très bien")
elif note >= 10:
    print("Admis")
else:
    print("Recalé")

for note in notes:        # for (const note of notes)
    print(note)

for i in range(5):        # for (let i = 0; i < 5; i++)
    print(i)

while essais > 0:
    essais -= 1
```

## Listes

| | TypeScript | Python |
|---|---|---|
| Créer | `const l = [1, 2];` | `l = [1, 2]` |
| Taille | `l.length` | `len(l)` |
| Ajouter | `l.push(3)` | `l.append(3)` |
| Dernier élément | `l[l.length - 1]` | `l[-1]` |
| Contient | `l.includes(2)` | `2 in l` |

## Dictionnaires

| | TypeScript | Python |
|---|---|---|
| Créer | `const d = { nom: "Alice" };` | `d = {"nom": "Alice"}` |
| Lire | `d.nom` | `d["nom"]` |
| Modifier | `d.nom = "Bob";` | `d["nom"] = "Bob"` |
| Parcourir | `for (const [k, v] of Object.entries(d))` | `for k, v in d.items():` |

## Fonctions

```python
def est_admis(note, seuil=10):
    return note >= seuil
```

Une fonction sans `return` renvoie `None`.

## Classes

```python
class Dome:
    def __init__(self, nom, oxygene):    # constructor(nom, oxygene)
        self.nom = nom                   # this.nom = nom
        self.oxygene = oxygene

    def consommer(self, quantite):
        self.oxygene -= quantite

    def __str__(self):                   # toString()
        return f"Dôme {self.nom}"

habitat = Dome("Habitat", 82)            # new Dome("Habitat", 82)
habitat.consommer(10)
```

## Erreurs

```python
try:
    note = int(texte)
except ValueError:                   # catch (e)
    print("Texte invalide")

raise ValueError("Note invalide")    # throw new Error("Note invalide")
```
