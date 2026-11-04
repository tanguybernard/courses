# Examen TDD : le tournoi de tennis de l'école (version prof)

**Durée** : 30 min, 45 min avec le bonus · **TypeScript + Vitest** · **Public** : M1

L'exercice ressemble au kata Tennis classique, mais **les règles sont changées** : un match se joue en un seul jeu, les scores sont en français, et **il n'y a pas d'avantage**. L'énoncé présente ça comme « une version simplifiée du jeu de tennis », pour que l'IA ne se méfie pas. Un étudiant qui lit l'énoncé applique ces règles. Une IA à qui on colle l'énoncé a tendance à revenir au kata qu'elle connaît par cœur.

> **À faire avant l'examen** : colle `etudiant/ENONCE.md` dans 2 ou 3 IA et regarde ce qui sort. Les tendances décrites ici ne sont pas garanties, et elles peuvent changer d'une version de modèle à l'autre.

## Structure

```
etudiant/                  à distribuer tel quel (sans node_modules)
  ENONCE.md                l'énoncé
  src/jeu.ts               squelette vide
  src/jeu.test.ts          un premier test, rouge
correction/                à NE PAS distribuer
  jeu.ts                   le jeu (étapes 1 à 3)
  jeu.test.ts              12 tests
  match-en-un-set.ts       le bonus, qui réutilise Jeu
  match-en-un-set.test.ts  6 tests
```

## Les pièges

### Pour l'IA

| # | Règle de l'énoncé | Ce que fait l'étudiant qui lit | Ce que l'IA a tendance à produire |
|---|---|---|---|
| 1 | **Pas d'avantage** : à Égalité, le point suivant gagne | le 4e point gagne toujours | `"Advantage"`, puis 2 points d'écart (`Math.abs(a - b) >= 2`) |
| 2 | Scores en français | `"Quinze-Zéro"`, `"Trente-A"`, `"Victoire Alice"` | `"Fifteen-Love"`, `"Thirty-All"`, `"Deuce"`, `"Win for Alice"` |
| 3 | Bonus : **4 jeux, sans 2 jeux d'écart** | 4-3 termine le match | 6 jeux, 2 jeux d'écart, voire un tie-break |
| 4 | Rien de plus que l'énoncé | un jeu, puis un set en bonus | plusieurs sets, un serveur, des statistiques |
| 5 | Commit `red` avant `green` | 10 à 15 petits commits | 1 ou 2 commits qui contiennent tout |

**Le signe le plus fiable (piège 1)** : la règle sans avantage rend le code *plus simple*, puisque le 4e point gagne toujours. Une copie qui contient de la logique d'avantage écrit du code compliqué pour une règle que l'énoncé interdit : l'énoncé n'a pas été lu.

**Le plus dur à contourner (piège 5)** : il faudrait fabriquer un faux historique git.

### Pour tous les étudiants

- **Les cas d'égalité** : `"Zéro-Zéro"` au début, `"Quinze-A"` et `"Trente-A"` ensuite, mais `"Égalité"` à 40-40, et non `"Quarante-A"`.
- **Trop d'ingénierie** : coder des jeux, des sets et des matchs dès le départ alors que l'énoncé demande un seul jeu.

> Un indice ne prouve rien. Un étudiant qui connaît le kata Tennis peut revenir à l'avantage par réflexe. En cas de doute, **demande-lui à l'oral d'expliquer un de ses tests**, ou de changer une règle en direct (« et si on passait à 5 jeux ? »).

## Noter avec les tests de la correction

```bash
cp correction/jeu.test.ts <copie>/src/jeu.correction.test.ts
cp correction/match-en-un-set.test.ts <copie>/src/match-en-un-set.correction.test.ts   # si bonus
cd <copie> && npx vitest run correction
```

Les tests sont regroupés par étape (`describe`), ce qui permet de lire directement les étapes réussies. Ils supposent que l'étudiant a gardé l'API de l'énoncé (`Jeu`, `MatchEnUnSet`, `pointPour`, `score`, `jeux`) et les noms de fichiers `jeu.ts` et `match-en-un-set.ts`.

Vérifié sur deux mutants de la correction :
- **version avec avantage** : 2 tests rouges (`le point qui suit l'égalité fait gagner Alice / Bob`) ;
- **bonus en 6 jeux** : 2 tests rouges (`annonce la victoire…`, `4-3 suffit…`).

## Barème proposé (sur 20)

| Critère | Points |
|---|---|
| Étape 1 : points en français, cas d'égalité | 4 |
| Étape 2 : Égalité et point décisif, sans avantage | 4 |
| Étape 3 : victoire | 1 |
| Qualité des tests : noms qui décrivent une règle, cas limites | 2 |
| Bonus : match en un set (4-3 suffit, annonce du vainqueur) | 3 |
| **Démarche TDD** (git log) : test commité avant le code, petits pas, refactor | 6 |

Pour lire la démarche :

```bash
git log --oneline --stat
```

## Questions bonus (à l'oral ou pour ceux qui finissent tôt)

1. Que se passe-t-il avec `pointPour("Charlie")` ? Quel test écris-tu en premier ?
2. Un point marqué après la victoire : que devrait-il se passer ? (la correction l'ignore, l'énoncé ne dit rien)
3. Le tournoi passe à 5 jeux : combien de lignes changes-tu ?
4. Pourquoi la règle sans avantage rend-elle le code plus simple que le kata classique ?
