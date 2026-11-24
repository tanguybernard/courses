# Programme : introduction à Python

**Public :** 2e année de bachelor, premier cours de Python.
**Pré-requis :** avoir déjà programmé (TypeScript, Node.js, notions de POO).
**Durée :** 7 heures, en deux demi-journées de 3h30.
**Évaluation :** individuelle, sur papier, sans machine (40 minutes en fin de séance 2).

## Objectif

À l'issue des deux séances, l'étudiant sait écrire seul un script Python qui applique une logique métier simple : variables, conditions, boucles, listes et dictionnaires, fonctions, classes.

Hors périmètre : lecture de fichiers, appels d'API, héritage. Deux bibliothèques externes sont montrées en démonstration et hors examen : matplotlib et FastAPI.

## Méthode

Chaque notion suit le même cycle d'environ 30 minutes :

1. **Syntaxe** sur slides, avec l'équivalent TypeScript à côté.
2. **« Que va afficher ce code ? »** : réponse individuelle sur papier, sans exécuter. C'est l'entraînement à l'évaluation.
3. **Mob programming** : un pilote au poste projeté, la salle dicte. Le pilote est tiré au sort (roulette) et change toutes les 4 à 5 minutes.

Le fil rouge est une mission sur Mars : le logiciel de bord de la base Ares surveille l'oxygène de ses dômes (niveau d'alerte, dômes critiques, consommation), puis classes `Dome` et `Base`.

Le contenu suit le tutoriel officiel Python (chapitres 3 à 9) ; la référence du chapitre figure dans les notes orateur de chaque section.

## Séance 1 : écrire un script (3h30)

| Durée | Contenu |
|---|---|
| 15 min | Positionnement papier, non noté ([positionnement.md](positionnement.md)) |
| 15 min | Présentation, lancer un script |
| 15 min | Variables, types, opérations, f-strings (sans mob) |
| 30 min | Conditions : `if`, `elif`, `else`, `and`, `or`, `not` |
| 15 min | Pause |
| 30 min | Boucles : `for`, `range`, `while`, `break`, `continue` |
| 35 min | Listes et dictionnaires |
| 10 min | Fonctions : `def`, `return`, valeurs par défaut |
| 45 min | Kata en mob : analyser le journal de bord des capteurs, en quatre paliers (oxygène, autonomie en eau, batteries, tableau de bord dans le terminal) |

Slides : `slides/python/seance1.md`

Le deck contient volontairement plus que ce qui tient en 3h30. À sauter en priorité si le temps manque, dans cet ordre : le mob « tout remettre en fonctions » (20 min), les paliers 2 à 4 du kata, les slides `while` et `break` / `continue`, puis le mob « le tour des dômes ».

## Séance 2 : structurer son code (3h30)

| Durée | Contenu |
|---|---|
| 10 min | Rappel de la séance 1 |
| 50 min | Classes et objets : `class`, `__init__`, `self`, méthodes, `__str__` |
| 30 min | Erreurs et exceptions : lire une erreur, `try` / `except`, `raise` |
| 15 min | Pause |
| 25 min | Modules : `import`, bibliothèque standard, puis `pip`, un graphique matplotlib et la base « en direct » en démo ([demo/base_en_direct.py](demo/base_en_direct.py)) |
| 35 min | Mob de synthèse : la classe `Base`, puis le mob « le graphique de la base » |
| 5 min | Démo : une API en quinze lignes avec FastAPI ([demo-api/main.py](demo-api/main.py)) |
| 40 min | Évaluation papier ([exercices40min](exercices40min/CC_Python.md)) |

Slides : `slides/python/seance2.md`

## Documents

| Fichier | Usage |
|---|---|
| [positionnement.md](positionnement.md) | Test de départ, non noté |
| [memo_typescript_python.md](memo_typescript_python.md) | Fiche mémo à distribuer |
| [exercices40min/CC_Python.md](exercices40min/CC_Python.md) | Évaluation de 40 minutes, version A |
| [exercices40min/CC_Python_VersionB.md](exercices40min/CC_Python_VersionB.md) | Évaluation de 40 minutes, version B |
| [exercices40min/CC_Python_correction.md](exercices40min/CC_Python_correction.md) | Corrigé et barème, version A |
| [exercices40min/CC_Python_VersionB_correction.md](exercices40min/CC_Python_VersionB_correction.md) | Corrigé et barème, version B |
| [exercices/](exercices/) | Ancienne version d'une heure, avec la partie « trouvez l'erreur » |

Les corrigés des mobs sont dans les notes orateur des slides (touche `S`).

## Pour aller plus loin

* Tutoriel officiel en français, chapitres 3 à 9 : https://docs.python.org/fr/3/tutorial/
* Exercices gradués : https://exercism.org/tracks/python
