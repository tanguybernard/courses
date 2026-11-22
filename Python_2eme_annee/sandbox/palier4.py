"""Kata du journal de bord, palier 4 : le tableau de bord dans le terminal.

Lancer :  python3 palier4.py
"""

journal = [
    "oxygene:Habitat:82",
    "eau:cuve:150",
    "oxygene:Serre: 45 ",
    "batterie:principale:64",
    "oxygene:Labo:erreur",
    "oxygene:Garage:28",
    "eau:cuve:120",
    "batterie:secours:100",
    "oxygene:Labo:12",
]

# Palier 4 bis : les codes de couleur du terminal
VERT = "\033[92m"
JAUNE = "\033[93m"
ROUGE = "\033[91m"
FIN = "\033[0m"


# --- Palier 1 : lire le journal ---

def capteur(ligne):
    return ligne.split(":")[0]


def nom(ligne):
    return ligne.split(":")[1]


def valeur(ligne):
    texte = ligne.split(":")[2].strip()
    if texte.isdigit():
        return int(texte)
    return None


def niveaux_oxygene(journal):
    niveaux = {}
    for ligne in journal:
        if capteur(ligne) == "oxygene" and valeur(ligne) is not None:
            niveaux[nom(ligne)] = valeur(ligne)
    return niveaux


# --- Le niveau d'alerte (mob « tout remettre en fonctions ») ---

def alerte(niveau):
    if niveau >= 60:
        return "verte"
    elif niveau >= 30:
        return "orange"
    elif niveau >= 10:
        return "rouge"
    return "évacuation"


# --- Palier 4 : le tableau de bord ---

def afficher_tableau(niveaux):
    for dome, niveau in niveaux.items():
        barre = "█" * (niveau // 5)
        print(f"{dome.ljust(8)} {barre.ljust(20)} {niveau} % {alerte(niveau)}")


# --- Palier 4 bis : le même, en couleur ---

def couleur(niveau):
    if niveau >= 60:
        return VERT
    elif niveau >= 30:
        return JAUNE
    return ROUGE


def afficher_tableau_couleur(niveaux):
    for dome, niveau in niveaux.items():
        barre = "█" * (niveau // 5)
        print(f"{dome.ljust(8)} {couleur(niveau)}{barre.ljust(20)}{FIN} {niveau} % {alerte(niveau)}")


niveaux = niveaux_oxygene(journal)

print("Palier 4")
afficher_tableau(niveaux)

print()
print("Palier 4 bis, en couleur")
afficher_tableau_couleur(niveaux)
