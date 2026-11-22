"""Démo : la base Ares en direct.

Les capteurs envoient une mesure toutes les demi-secondes, au même format
que le journal de bord du kata (capteur:nom:valeur). Chaque ligne s'affiche
dans le terminal et le graphique se met à jour.

Lancer :  python3 base_en_direct.py
Arrêter : fermer la fenêtre, ou Ctrl+C dans le terminal.
"""

import random

import matplotlib.pyplot as plt

PAUSE = 0.5      # secondes entre deux mesures
MESURES = 240    # nombre de mesures avant l'arrêt (2 minutes)

niveaux = {"Habitat": 82, "Serre": 45, "Garage": 28, "Labo": 12}


def couleur(niveau):
    if niveau >= 60:
        return "green"
    elif niveau >= 30:
        return "orange"
    return "red"


def nouvelle_mesure():
    """Un capteur tiré au hasard envoie une ligne de journal."""
    dome = random.choice(list(niveaux.keys()))
    variation = random.randint(-6, 5)
    niveau = niveaux[dome] + variation
    if niveau < 0:
        niveau = 0
    if niveau > 100:
        niveau = 100
    return f"oxygene:{dome}:{niveau}"


def dessiner():
    domes = []
    valeurs = []
    couleurs = []
    for dome, niveau in niveaux.items():
        domes.append(dome)
        valeurs.append(niveau)
        couleurs.append(couleur(niveau))

    plt.cla()    # efface le dessin précédent
    plt.bar(domes, valeurs, color=couleurs)
    plt.axhline(30, color="red", linestyle="--")
    plt.ylim(0, 100)
    plt.ylabel("Oxygène (%)")
    plt.title("Base Ares, en direct")


for numero in range(MESURES):
    ligne = nouvelle_mesure()
    print(ligne)

    morceaux = ligne.split(":")
    niveaux[morceaux[1]] = int(morceaux[2])

    dessiner()
    plt.pause(PAUSE)    # affiche, puis attend la mesure suivante

    if not plt.get_fignums():    # la fenêtre a été fermée
        break
