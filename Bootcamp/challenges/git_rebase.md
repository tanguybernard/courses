
# 🎓 TP Git Avancé : Le Rebase Chirurgical

### 🎯 Objectif

Comprendre le **Git Rebase** et la **résolution de conflits logique**.
Contrairement à un `merge` classique, le rebase réécrit l'histoire. Vous allez apprendre à gérer le cas le plus fréquent en entreprise : **Intégrer un correctif critique (Hotfix) tout en continuant votre travail de nettoyage (Refactoring).**

### 📝 Le Scénario

Vous êtes développeur sur une application de facturation.

1. **Votre mission :** Le code actuel fonctionne mais il est "sale" (noms de variables illisibles). Vous devez le nettoyer.
2. **L'imprévu :** Pendant que vous travaillez, une erreur critique est découverte dans le calcul de la TVA. Un correctif est déployé sur la branche principale.

Vous allez devoir **rebaser** votre travail sur ce correctif. Attention : il ne s'agira pas de choisir "l'un ou l'autre", mais de fusionner intelligemment les deux !

---

## Étape 1 : Mise en place du "Code Sale"

Ouvrez votre terminal (Git Bash ou terminal VS Code). Nous allons simuler le projet existant.

1. Créez le dossier et initialisez Git :

```bash
mkdir rebase-tva
cd rebase-tva
git init

```

2. Créez le fichier `tva.py` avec le code initial (mauvais noms, ancienne TVA) :

```bash
# Copiez-collez ces 3 lignes d'un coup
echo "p = 100" > tva.py
echo "t = 1.10" >> tva.py
echo "print(p * t)" >> tva.py

```

3. Validez ce point de départ :

```bash
git add tva.py
git commit -m "Init: Calcul TVA (Code legacy)"

```

---

## Étape 2 : Votre travail de nettoyage (Branche "clean-code")

Vous décidez de rendre ce code plus lisible. Vous ne changez pas la logique, juste les noms.

1. Créez votre branche et basculez dessus :

```bash
git switch -c clean-code

```

2. **Modification A :** On renomme `p` en `prix_ht`.
* Ouvrez `tva.py` et remplacez `p` par `prix_ht`.
* Sauvegardez.
* Validez :


```bash
git commit -am "Refacto: Renommage p -> prix_ht"

```


3. **Modification B :** On renomme `t` en `taux_tva`.
* Ouvrez `tva.py` et remplacez `t` par `taux_tva`.
* Sauvegardez.
* Validez :


```bash
git commit -am "Refacto: Renommage t -> taux_tva"

```



> 🔎 **Vérification :** Votre fichier doit ressembler à ceci :
> ```python
> prix_ht = 100
> taux_tva = 1.10
> print(prix_ht * taux_tva)
> 
> ```
>
>

---

## Étape 3 : Le Correctif Critique (Branche "main")

Pendant ce temps, le service comptabilité signale une urgence : **La TVA est passée à 20% (1.20) !** Il faut corriger ça immédiatement sur la branche principale.

1. Retournez sur la branche principale :

```bash
git switch main

```

2. Le fichier est revenu à son état initial (variables `p` et `t`). Corrigez la valeur `1.10` en `1.20` :

```bash
# Remplacez 1.10 par 1.20 dans le fichier
sed -i 's/1.10/1.20/' tva.py

```

3. Validez le correctif :

```bash
git commit -am "FIX: Correction taux légal à 20%"

```

> 🔎 **État actuel :**
> * `main` a les **mauvais noms** mais la **bonne valeur** (1.20).
> * `clean-code` a les **bons noms** mais la **mauvaise valeur** (1.10).
>
>

---

## Étape 4 : Le Rebase (Moment de vérité)

Vous voulez récupérer le fix de `main` pour que votre code propre soit aussi juste financièrement.

1. Revenez sur votre branche :

```bash
git switch clean-code

```

2. Lancez le rebase :

```bash
git rebase main

```

🛑 **STOP ! Conflit détecté.**
Git vous signale un conflit dans `tva.py`. C'est normal. Git essaie d'appliquer votre renommage sur une ligne qui a changé de valeur sur main.

---

## Étape 5 : La Résolution Logique

1. Ouvrez `tva.py` dans votre éditeur. Vous devriez voir quelque chose comme ceci :

```python
prix_ht = 100
<<<<<<< HEAD
t = 1.20
print(prix_ht * t)
=======
taux_tva = 1.10
print(prix_ht * taux_tva)
>>>>>>> Refacto: Renommage t -> taux_tva

```

2. **Analysez le dilemme :**
* La section `HEAD` (ce qui vient de main) contient la **bonne valeur (1.20)**.
* La section du bas (votre commit) contient le **bon nom de variable (taux_tva)**.


3. **L'action à faire :**
   Ne choisissez pas simplement l'un ou l'autre ! Vous devez **reconstruire** le code pour qu'il soit parfait (Bon nom ET Bonne valeur).
   Modifiez le code pour obtenir ceci :

```python
prix_ht = 100
taux_tva = 1.20
print(prix_ht * taux_tva)

```

4. Une fois le fichier nettoyé et sauvegardé :

```bash
git add tva.py
git rebase --continue

```

*Note : Si Git s'est arrêté deux fois (une fois pour `prix_ht`, une fois pour `taux_tva`), répétez l'opération jusqu'à ce que Git vous dise `Successfully rebased`.*

---

## Étape 6 : Vérification Finale

Avez-vous réussi ? Pour le savoir, nous allons exécuter le script.

1. Lancez le script Python :

```bash
python3 tva.py
# (ou 'python tva.py' selon votre installation)

```

### ✅ Critères de réussite :

1. Le script ne doit pas planter (sinon vous avez mal renommé les variables).
2. Le résultat affiché doit être **120.0**.
* Si ça affiche `110.0` : ❌ Vous avez écrasé le fix du comptable (code faux).
* Si ça affiche `120.0` : 🎉 **Bravo !** Vous avez fusionné la logique métier et la qualité du code.


3. Vérifiez l'historique pour voir la linéarité :

```bash
git log --oneline --graph --all

```

*Vous devriez voir le commit "FIX" tout en bas, suivi de vos commits "Refacto".*