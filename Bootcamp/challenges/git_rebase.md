Voici un exercice **guidé pas à pas** sur le thème d'une **Playlist de soirée**.

Le scénario : Vous et un ami essayez de modifier la même playlist en même temps, mais vous n'avez pas les mêmes goûts musicaux. Cela va créer un conflit en deux étapes lors du rebase.

---

### Étape 1 : Installation du décor

On part de zéro. Créez le dossier et la playlist vide.

```bash
# 1. Création du dossier
mkdir rebase-playlist
cd rebase-playlist
git init

# 2. Création de la playlist de base
echo "Chanson 1: Calme" > playlist.txt
echo "Chanson 2: Silence" >> playlist.txt
echo "Chanson 3: Bruit blanc" >> playlist.txt

# 3. Validation
git add playlist.txt
git commit -m "Playlist de départ (ennuyeuse)"

```

### Étape 2 : Votre travail (Branche "Electro")

Vous décidez de dynamiser la soirée. On crée votre branche immédiatement.

```bash
# On crée la branche et on bascule dessus
git switch -c electro

```

Nous allons faire **2 commits** différents pour bien voir le rebase s'arrêter deux fois.

**Modification A (Ligne 1) :**

```bash
# Remplacez la ligne 1
sed -i 's/Calme/Daft Punk/' playlist.txt
git commit -am "Ajout de Daft Punk en intro"

```

**Modification B (Ligne 3) :**

```bash
# Remplacez la ligne 3
sed -i 's/Bruit blanc/Justice/' playlist.txt
git commit -am "Ajout de Justice pour la fin"

```

> **État de votre branche :** Daft Punk / Silence / Justice.

### Étape 3 : Le travail de l'ami (Branche "Main")

Pendant ce temps, votre ami (resté sur `master` ou `main`) a détesté la playlist de base aussi, mais il préfère le Rock.

```bash
# On retourne sur la branche principale
git switch master

```

Lui, il change tout en un seul coup (pour simplifier son côté, mais compliquer le vôtre).

```bash
# Il remplace tout le fichier d'un coup
echo "Chanson 1: Nirvana" > playlist.txt
echo "Chanson 2: AC/DC" >> playlist.txt
echo "Chanson 3: Metallica" >> playlist.txt

# Il valide
git commit -am "Playlist 100% Rock"

```

> **État de la branche master :** Nirvana / AC/DC / Metallica.

---

### Étape 4 : Le Rebase (Le moment de vérité)

Vous voulez mettre votre branche `electro` à jour par rapport à `master`.
Git va devoir prendre vos 2 commits (Daft Punk et Justice) et essayer de les "rejouer" par-dessus la version Rock.

```bash
# Revenez sur votre branche
git switch electro

# Lancez le rebase
git rebase master

```

💥 **STOP ! Premier Conflit.**
Git essaie de poser votre premier commit ("Ajout de Daft Punk").
Il voit que la ligne 1 est "Nirvana" sur master, mais que vous aviez modifié "Calme" en "Daft Punk". Il ne sait pas si "Nirvana" doit remplacer "Daft Punk" ou l'inverse.

### Étape 5 : Résolution du premier round

Ouvrez `playlist.txt`. Vous voyez ceci :

```text
<<<<<<< HEAD
Chanson 1: Nirvana
Chanson 2: AC/DC
Chanson 3: Metallica
=======
Chanson 1: Daft Punk
Chanson 2: Silence
Chanson 3: Bruit blanc
>>>>>>> Ajout de Daft Punk en intro

```

*Notez que le bas du fichier est encore vieux ("Silence", "Bruit blanc") car nous n'en sommes qu'au premier commit !*

**Action :** On veut un mix. Gardons votre Daft Punk en premier, mais acceptons le AC/DC et Metallica de l'ami pour le reste.
Corrigez le fichier pour avoir ceci :

```text
Chanson 1: Daft Punk
Chanson 2: AC/DC
Chanson 3: Metallica

```

Sauvegardez et fermez. Puis dites à Git de continuer :

```bash
git add playlist.txt
git rebase --continue

```

---

### Étape 6 : Résolution du deuxième round

💥 **STOP ! Deuxième Conflit.**
Git a réussi à poser le premier commit. Maintenant, il essaie de poser votre deuxième commit ("Ajout de Justice").
Il essaie de changer la ligne 3 en "Justice". Mais sur master, la ligne 3 est devenue "Metallica".

Ouvrez `playlist.txt` :

```text
Chanson 1: Daft Punk
Chanson 2: AC/DC
<<<<<<< HEAD
Chanson 3: Metallica
=======
Chanson 3: Justice
>>>>>>> Ajout de Justice pour la fin

```

**Action :** Vous tenez à Justice. On remplace Metallica.
Corrigez le fichier pour avoir ceci :

```text
Chanson 1: Daft Punk
Chanson 2: AC/DC
Chanson 3: Justice

```

Sauvegardez et fermez. Puis terminez le rebase :

```bash
git add playlist.txt
git rebase --continue

```

Git devrait vous dire : `Successfully rebased and updated refs/heads/electro.`

### Étape 7 : Admirer le résultat

Vérifiez que l'historique est une belle ligne droite, combinant le travail de tout le monde :

```bash
git log --oneline --graph --all

```

Vous devriez voir :

1. (En haut) Ajout de Justice
2. Ajout de Daft Punk
3. Playlist 100% Rock (Le commit de master s'est inséré *avant* les vôtres)
4. Playlist de départ