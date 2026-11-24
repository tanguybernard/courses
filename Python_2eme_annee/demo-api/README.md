# Démo : l'API de la base Ares

Une API web écrite avec FastAPI, en une trentaine de lignes. Elle expose les niveaux d'oxygène des dômes de la base.

Démo du formateur, à la fin de la séance 2, sur la slide « Et une API ? ». Hors examen.

## Installation (une seule fois)

Dans ce dossier `demo-api` :

```bash
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install "fastapi[standard]"
```

Sous Windows, la deuxième commande devient `.venv\Scripts\activate`.

## Lancer la démo

```bash
source .venv/bin/activate
fastapi dev main.py
```

Le serveur redémarre tout seul à chaque modification du fichier. Pour arrêter : `Ctrl+C`.

## Ce qu'il faut ouvrir, dans cet ordre

| Adresse | Ce qu'on voit |
|---|---|
| http://127.0.0.1:8000/domes | Tous les dômes et leur niveau d'oxygène, en JSON |
| http://127.0.0.1:8000/domes/Labo | Un seul dôme, avec son niveau d'alerte |
| http://127.0.0.1:8000/domes/Cuisine | Une erreur 404 : le `raise` de la séance 2 |
| http://127.0.0.1:8000/docs | La documentation de l'API, générée toute seule, où l'on peut tester les routes |

## Ce qu'il faut faire remarquer

À part la ligne `@app.get(...)`, les étudiants savent tout lire : un dictionnaire, des fonctions, un `if`, un `raise`.

`@app.get("/domes")` au-dessus d'une fonction joue le rôle de `app.get("/domes", (req, res) => ...)` en Express. La fonction renvoie un dictionnaire et FastAPI le transforme en JSON.

Source : [tutoriel de FastAPI, « Premiers pas »](https://fastapi.tiangolo.com/fr/tutorial/first-steps/).
