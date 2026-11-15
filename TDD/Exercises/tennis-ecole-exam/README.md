# Examen TDD : le tournoi de tennis de l'école (version prof)

**Durée** : 40 min, 55 min avec le bonus · **TypeScript + Vitest** · **Public** : M1

L'exercice ressemble au kata Tennis classique, mais **les règles sont changées** : un match se joue en un seul jeu, les scores sont en français, et **il n'y a pas d'avantage**. L'énoncé présente ça comme « une version simplifiée du jeu de tennis », pour que l'IA ne se méfie pas. Un étudiant qui lit l'énoncé applique ces règles. Une IA à qui on colle l'énoncé a tendance à revenir au kata qu'elle connaît par cœur.

L'étape 4 ajoute une dépendance externe, le **classement du tournoi**, pour évaluer les doubles de test. L'étudiant choisit le double qu'il veut, et **justifie son choix**.

> **À faire avant l'examen** : colle `etudiant/ENONCE.md` dans 2 ou 3 IA et regarde ce qui sort. Les tendances décrites ici ne sont pas garanties, et elles peuvent changer d'une version de modèle à l'autre.

## Ce qui est imposé, ce qui est libre

L'énoncé n'impose que le **point d'entrée**, pour pouvoir noter automatiquement :
- la classe `Jeu` dans `src/jeu.ts` ;
- son constructeur `new Jeu("Alice", "Bob", classement)`, avec le classement **obligatoire** ;
- `pointPour(joueur)` et `score()` ;
- l'interface `Classement`, fournie dans `src/classement.ts`.

Tout le reste est libre : il n'y a **ni squelette ni premier test**. Le choix du premier test, l'organisation du code et le choix des doubles font partie de ce qu'on évalue. Le bonus est décrit comme un besoin (« des matchs en un set »), sans classe imposée.

Le classement est obligatoire dès l'étape 1, exprès : les tests des étapes 1 à 3 doivent lui passer quelque chose qui ne sert pas. C'est là que le **dummy** apparaît naturellement.

## Structure

```
etudiant/                  à distribuer tel quel (sans node_modules)
  ENONCE.md                l'énoncé
  src/classement.ts        l'interface imposée, seul fichier fourni
correction/                à NE PAS distribuer
  classement.ts            la même interface
  jeu.ts                   le jeu (étapes 1 à 4)
  jeu.test.ts              15 tests, qui servent aussi à noter
  match-en-un-set.ts       une solution possible du bonus, qui réutilise Jeu
  match-en-un-set.test.ts  7 tests, pour cette solution seulement
```

Les tests de la correction servent aussi de modèle de justification : chaque double y est précédé d'un commentaire qui explique le choix.

## Les pièges

### Pour l'IA

| # | Règle de l'énoncé | Ce que fait l'étudiant qui lit | Ce que l'IA a tendance à produire |
|---|---|---|---|
| 1 | **Pas d'avantage** : à Égalité, le point suivant gagne | le 4e point gagne toujours | `"Advantage"`, puis 2 points d'écart (`Math.abs(a - b) >= 2`) |
| 2 | Scores en français | `"Quinze-Zéro"`, `"Trente-A"`, `"Victoire Alice"` | `"Fifteen-Love"`, `"Thirty-All"`, `"Deuce"`, `"Win for Alice"` |
| 3 | Bonus : **4 jeux, sans 2 jeux d'écart** | 4-3 termine le match | 6 jeux, 2 jeux d'écart, voire un tie-break |
| 4 | Rien de plus que l'énoncé | un jeu, puis un set en bonus | plusieurs sets, un serveur, des statistiques |
| 4 bis | Noms internes libres | noms en français, proches de l'énoncé | noms du kata classique en anglais (`player1Points`, `isDeuce`, `getScore`) |
| 5 | Commit `red` avant `green` | 10 à 15 petits commits | 1 ou 2 commits qui contiennent tout |
| 6 | Justifier **son** choix de double | une justification qui parle de ce cas précis | une définition générique des doubles, recopiée d'un cours |

**Le signe le plus fiable (piège 1)** : la règle sans avantage rend le code *plus simple*, puisque le 4e point gagne toujours. Une copie qui contient de la logique d'avantage écrit du code compliqué pour une règle que l'énoncé interdit : l'énoncé n'a pas été lu.

**Le plus dur à contourner (piège 5)** : il faudrait fabriquer un faux historique git.

### Pour tous les étudiants

- **Les cas d'égalité** : `"Zéro-Zéro"` au début, `"Quinze-A"` et `"Trente-A"` ensuite, mais `"Égalité"` à 40-40, et non `"Quarante-A"`.
- **Trop d'ingénierie** : coder des jeux, des sets et des matchs dès le départ alors que l'énoncé demande un seul jeu.
- **« Une seule fois »** (étape 4) : l'énoncé ne parle pas d'un point marqué après la victoire. C'est à l'étudiant d'y penser : sans garde-fou, le résultat est enregistré une deuxième fois.
- **L'ordre des arguments** : `enregistrer(vainqueur, perdant)`, le vainqueur en premier, même quand c'est le joueur 2.
- **Bonus** : si le set crée ses jeux avec le vrai classement, chaque jeu gagné est enregistré comme un match.

> Un indice ne prouve rien. Un étudiant qui connaît le kata Tennis peut revenir à l'avantage par réflexe. En cas de doute, **demande-lui à l'oral d'expliquer un de ses tests**, ou de changer une règle en direct (« et si on passait à 5 jeux ? »).

## Les doubles de test : ce qu'on attend selon le choix

| Double | Cohérent ? | Pourquoi |
|---|---|---|
| **Dummy** | oui, pour les étapes 1 à 3 | le classement est obligatoire, mais ces tests ne s'en servent pas |
| **Spy** | oui | on enregistre les appels, puis on vérifie qu'il y en a un seul, avec les bons arguments |
| **Mock** | oui | on fixe à l'avance l'attente « un appel, avec (Alice, Bob) » |
| **Fake** | oui | un classement en mémoire, avec une liste de résultats qu'on peut lire ensuite |
| **Stub** | **à argumenter** | `enregistrer` ne renvoie rien, donc il n'y a aucune réponse à simuler. Un étudiant qui choisit un stub doit l'expliquer, et c'est un bon test de sa compréhension. |

Avec Vitest, `vi.fn()` peut servir de dummy, de spy ou de mock : c'est **l'usage** qui fait le type de double, pas l'outil. Une justification qui répond « j'ai utilisé `vi.fn()` donc c'est un mock » n'a pas compris la différence.

**Côté IA** : elle écrit très bien `vi.fn()` et une justification générique. Une justification qui ne parle pas de *ce* cas, ou qui parle de stub pour une méthode qui ne renvoie rien, est un bon point de départ pour une question à l'oral.

## Noter

### Le jeu (étapes 1 à 4) : automatiquement

```bash
cp correction/jeu.test.ts <copie>/src/jeu.correction.test.ts
cd <copie> && npx vitest run correction
```

Les tests sont regroupés par étape (`describe`), ce qui permet de lire directement les étapes réussies. Ils ne dépendent que du point d'entrée imposé, et apportent leurs propres doubles. Le test « une seule fois » accepte qu'un point marqué après la victoire soit ignoré **ou** lève une erreur, puisque l'énoncé ne tranche pas.

La justification des doubles se lit à la main, dans les commentaires des tests de l'étudiant.

Vérifié sur des mutants de la correction :

| Mutant | Tests rouges |
|---|---|
| avec avantage | 2 (`le point qui suit l'égalité fait gagner Alice / Bob`) |
| enregistre à nouveau après la victoire | 1 (`n'enregistre qu'une seule fois…`) |
| vainqueur et perdant inversés | 2 (`enregistre le vainqueur puis le perdant…`, `n'enregistre qu'une seule fois…`) |

### Le bonus : à la main

L'organisation est libre, donc les tests de `match-en-un-set.test.ts` ne s'appliquent pas tels quels. Ils servent de liste de cas à vérifier dans les tests de l'étudiant :

- [ ] un jeu gagné compte, et le jeu suivant repart à `"Zéro-Zéro"` ;
- [ ] à 3 jeux partout, le match continue ;
- [ ] **4-3 termine le match**, sans 2 jeux d'écart (sur la correction, un bonus en 6 jeux fait échouer 3 tests) ;
- [ ] l'annonce donne les jeux du vainqueur en premier : `"Victoire Bob 4-1"` ;
- [ ] le classement n'enregistre que **le match**, pas chaque jeu (sur la correction, un set qui passe le vrai classement à ses jeux fait échouer 1 test) ;
- [ ] `Jeu` fonctionne toujours : les tests de notation du jeu passent encore.

## Barème proposé (sur 20)

| Critère | Points |
|---|---|
| Étape 1 : points en français, cas d'égalité | 3 |
| Étape 2 : Égalité et point décisif, sans avantage | 4 |
| Étape 3 : victoire | 1 |
| Étape 4 : tests du classement (une seule fois, bon ordre, rien avant la fin) | 2 |
| Étape 4 : justification des doubles | 1 |
| Qualité des tests et du code : premier test bien choisi, noms qui décrivent une règle, cas limites | 1 |
| Bonus : match en un set, noté à la main | 2 |
| **Démarche TDD** (git log) : test commité avant le code, petits pas, refactor | 6 |

Pour lire la démarche :

```bash
git log --oneline --stat
```

## Questions bonus (à l'oral ou pour ceux qui finissent tôt)

1. Que se passe-t-il avec `pointPour("Charlie")` ? Quel test écris-tu en premier ?
2. Tu as utilisé un spy : qu'est-ce qui changerait si tu le remplaçais par un fake ? Et par un stub ?
3. Le tournoi passe à 5 jeux : combien de lignes changes-tu ?
4. Pourquoi la règle sans avantage rend-elle le code plus simple que le kata classique ?
