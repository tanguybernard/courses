
# Git par la pratique (11) – Gérer les conflits

**Publié par kikinovak le 23 janvier 2023**

Voici le onzième volet de la formation Git. Dans mon précédent article, nous avons abordé la fusion de deux branches symbolisée par un *merge commit*. Malheureusement les choses ne se passent pas toujours comme prévu, et vous pouvez vous retrouver confronté à un **conflit de fusion**.

Ce cas de figure intimide particulièrement les novices de Git. J’ai donc décidé d’en parler un peu plus en détail. Une fois que vous aurez intégré quelques principes de base, vous verrez que la résolution d’un conflit n’est pas de la magie noire.

## Les conflits par la pratique

Pour illustrer ce qui se passe lorsque la fusion de deux branches résulte en un conflit, je vais reprendre mon exemple de l’atelier pratique sur la création des branches en le modifiant quelque peu.

Commencez par initialiser un nouveau dépôt Git :

```bash
$ cd ~/formation-git/
$ mkdir atelier-16
$ cd atelier-16
$ git init
Initialized empty Git repository in /home/kikinovak/formation-git/atelier-16/.git/

```

Créez un fichier `hello.sh` :

```bash
#!/bin/bash
#
# hello.sh

echo "Hello !"

```

Rendez le fichier exécutable :

```bash
$ chmod +x hello.sh

```

Ajoutez le fichier à l’index de Git et validez-le :

```bash
$ git add hello.sh
$ git commit -m "Commit initial."
[master (root-commit) bf79c2e] Commit initial.
 1 file changed, 5 insertions(+)
 create mode 100755 hello.sh

```

Maintenant, créez deux branches `hello-cow` et `hello-figlet` :

```bash
$ git branch hello-cow
$ git branch hello-figlet

```

Positionnez-vous sur la branche `hello-cow` :

```bash
$ git switch hello-cow 
Switched to branch 'hello-cow'

```

Éditez le script `hello.sh` comme ceci :

```bash
#!/bin/bash
#
# hello.sh

if [ -x /usr/bin/cowsay ]
then
  cowsay "Hello !"
else
  echo "Hello !"
fi

```

Enregistrez les modifications et validez-les :

```bash
$ git add hello.sh 
$ git commit -m "Message avec une vache qui parle."
[hello-cow 0d4f1b9] Message avec une vache qui parle.
 1 file changed, 6 insertions(+), 1 deletion(-)

```

Maintenant, basculez vers la branche `hello-figlet` :

```bash
$ git switch hello-figlet
Switched to branch 'hello-figlet'

```

Éditez le script `hello.sh` pour qu’il ressemble à ceci :

```bash
#!/bin/bash
#
# hello.sh

if [ -x /usr/bin/figlet ]
then
  figlet "Hello !"
else
  echo "Hello !"
fi

```

Enregistrez les modifications et validez-les :

```bash
$ git add hello.sh 
$ git commit -m "Message en lettres ASCII."
[hello-figlet ef91dab] Message en lettres ASCII.
 1 file changed, 6 insertions(+), 1 deletion(-)

```

Puis, revenez sur la branche `master` :

```bash
$ git switch master 
Switched to branch 'master'

```

Le moment est venu de fusionner toutes ces branches :

```bash
$ git branch
  hello-cow
  hello-figlet
* master

```

Avant d’aller plus loin, prenez un moment pour réfléchir à ce qui va se passer. Visualisez l’historique de vos commits et demandez-vous à quoi pourra bien ressembler une fusion de toutes ces branches.

Commençons par intégrer la branche `hello-cow` :

```bash
$ git merge hello-cow
Updating bf79c2e..0d4f1b9
Fast-forward
hello.sh | 7 ++++++-
1 file changed, 6 insertions(+), 1 deletion(-)

```

Notez bien qu’il s’agit d’un **fast-forward merge**, étant donné que la branche `master` n’a pas été modifiée depuis la création de la branche `hello-cow`.

Voici à quoi ressemble mon script `hello.sh` à présent :

```bash
#!/bin/bash
#
# hello.sh

if [ -x /usr/bin/cowsay ]
then
  cowsay "Hello !"
else
  echo "Hello !"
fi

```

Là aussi, réfléchissez et essayez d’anticiper ce qui va se passer pour la suite. Puis lancez-vous et tentez de fusionner la branche `hello-figlet` :

```bash
$ git merge hello-figlet 
Auto-merging hello.sh
CONFLICT (content): Merge conflict in hello.sh
Automatic merge failed; fix conflicts and then commit the result.

```

Argh. Le message d’erreur `CONFLICT` a l’air passablement intimidant. Essayons d’en savoir un peu plus :

```bash
$ git status
On branch master
You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)
        both modified:   hello.sh

no changes added to commit (use "git add" and/or "git commit -a")

```

Git fait de son mieux pour nous aider ici, si nous suivons ses suggestions. Ouvrons donc le fichier `hello.sh` avec notre éditeur de texte préféré et voyons à quoi il ressemble :

```bash
#!/bin/bash
#
# hello.sh
<<<<<<< HEAD
if [ -x /usr/bin/cowsay ]
then
  cowsay "Hello !"
=======
if [ -x /usr/bin/figlet ]
then
  figlet "Hello !"
>>>>>>> hello-figlet
else
  echo "Hello !"
fi

```

Une belle pagaille ? Pas tant que ça en fait. Essayons de comprendre toutes ces annotations :

* La ligne qui commence par `<<<<<<<` marque le début de la zone conflictuelle.
* Pour l’instant, retenez que `HEAD` symbolise la branche sur laquelle vous vous trouvez, en l’occurrence `master`.
* Le marqueur `=======` représente la frontière entre les deux zones à fusionner.
* La ligne qui commence par `>>>>>>>` délimite la fin de la zone conflictuelle.
* `hello-figlet` c’est la branche que nous souhaitons fusionner dans la branche `HEAD`, en l’occurrence `master`.

À présent, c’est à vous d’éditer le fichier `hello.sh` pour résoudre le conflit manuellement. En gros, vous avez quatre possibilités :

1. Ignorer les changements introduits dans la branche `hello-figlet`.
2. Conserver les changements de la branche `hello-figlet`.
3. Tout garder et tenter de faire un mix des deux branches.
4. Décider de faire complètement autre chose.

Vous commencez peut-être à comprendre pourquoi Linus Torvalds a appelé Git « the stupid content tracker » (*man git*). Git n’essaie même pas de résoudre ce genre de conflit à votre place. Dès qu’il ne sait plus quoi faire, il vous rend la main et c’est à vous de décider ce qu’il faut faire.

Une fois que vous avez édité le fichier `hello.sh` à votre convenance, enregistrez les modifications et ajoutez le résultat final à la zone d’indexation :

```bash
$ git add hello.sh

```

Si vous effectuez un commit, Git va lancer un éditeur de texte avec un message automatique :

```text
Merge branch 'hello-figlet'
# Conflicts:
#       hello.sh
#
# It looks like you may be committing a merge.
# If this is not correct, please run
#       git update-ref -d MERGE_HEAD
# and try again.

```

Là aussi, vous pouvez conserver le message généré par Git. Enregistrez et quittez l’éditeur.

```bash
[master f44f55d] Merge branch 'hello-figlet'

```

Félicitations ! Vous venez de résoudre votre premier conflit de fusion avec Git.

## Exercice

1. Créez un répertoire `formation-git/atelier-17` et initialisez un dépôt Git dans ce répertoire.
2. Éditez un script `hello.sh` qui affiche `Hello world !`
3. Ajoutez le script à la branche `master`.
4. Créez deux branches `i-love-dogs` et `i-love-cats`.
5. Basculez vers la branche `i-love-dogs`.
6. Éditez `hello.sh` pour qu’il affiche `Hello dogs !`
7. Enregistrez et validez.
8. Basculez vers la branche `i-love-cats`.
9. Éditez `hello.sh` pour qu’il affiche `Hello cats !`
10. Enregistrez et validez.
11. Revenez dans la branche `master`.
12. Fusionnez successivement les deux branches `i-love-dogs` et `i-love-cats`.
13. Essayez de résoudre les conflits de fusion selon vos préférences.

*Lire la suite : [Afficher l’historique*](https://blog.microlinux.fr)

---

source :

https://blog.microlinux.fr/formation-git-11-conflits/
