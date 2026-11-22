# Démo : la base Ares en direct

Un script qui simule les capteurs de la base : toutes les demi-secondes, un dôme tiré au hasard envoie une mesure d'oxygène. Chaque mesure s'affiche dans le terminal, au format du journal de bord (`oxygene:Labo:11`), et le graphique se met à jour.

Démo du formateur, en séance 2, sur la slide « La base en direct ».

## Installation (une seule fois)

Dans ce dossier `demo` :

```bash
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install matplotlib
```

Sous Windows, la deuxième commande devient `.venv\Scripts\activate`.

## Lancer la démo

```bash
source .venv/bin/activate
python3 base_en_direct.py
```

Une fenêtre s'ouvre avec le graphique et les mesures défilent dans le terminal. Pour un bon effet en cours, mettre le terminal à gauche et la fenêtre à droite.

Pour arrêter : fermer la fenêtre, ou `Ctrl+C` dans le terminal. Sans intervention, la démo s'arrête au bout de deux minutes.

## Pourquoi un environnement virtuel

Sur Mac et sur les Linux récents, `pip` refuse d'installer une bibliothèque dans le Python du système (erreur `externally-managed-environment`). L'environnement virtuel est un dossier `.venv` qui contient les bibliothèques de ce projet seulement.

C'est l'équivalent du dossier `node_modules` en Node.js : les dépendances vivent dans le projet, pas dans le système. Le dossier `.venv` est ignoré par git.

## Régler la démo

Deux constantes en haut de `base_en_direct.py` :

| Constante | Rôle | Valeur |
|---|---|---|
| `PAUSE` | secondes entre deux mesures | `0.5` |
| `MESURES` | nombre de mesures avant l'arrêt | `240` |

## Ce qu'il faut faire remarquer

Tout ce qui est dans la boucle principale a déjà été écrit par les étudiants : une boucle `for`, le `split` du kata, un dictionnaire mis à jour, et le graphique de la slide précédente. La seule nouveauté est `plt.pause()`, qui affiche puis attend.

Pour brancher de vrais capteurs, il suffirait de remplacer une seule fonction : `nouvelle_mesure()`.
