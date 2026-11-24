"""Démo : l'API de la base Ares, avec FastAPI.

Lancer :  fastapi dev main.py
Ouvrir :  http://127.0.0.1:8000/domes
          http://127.0.0.1:8000/domes/Labo
          http://127.0.0.1:8000/docs
Arrêter : Ctrl+C dans le terminal.
"""

from fastapi import FastAPI, HTTPException

app = FastAPI(title="Base Ares")

niveaux = {"Habitat": 82, "Serre": 45, "Garage": 28, "Labo": 12}


def alerte(niveau):
    if niveau >= 60:
        return "verte"
    elif niveau >= 30:
        return "orange"
    elif niveau >= 10:
        return "rouge"
    return "évacuation"


@app.get("/domes")
def lire_domes():
    return niveaux


@app.get("/domes/{nom}")
def lire_dome(nom):
    if nom not in niveaux:
        raise HTTPException(404, "Dôme inconnu")
    return {"nom": nom, "oxygene": niveaux[nom], "alerte": alerte(niveaux[nom])}
