# Examen TDD : le tournoi de tennis de l'école

**Durée** : 30 minutes (45 minutes avec le bonus) · **Langage** : TypeScript (Vitest)

L'école organise un tournoi de tennis. C'est une version simplifiée du jeu de tennis : **un match se joue en un seul jeu**, et le premier joueur qui gagne le jeu gagne le match.

On te demande d'écrire, **en TDD**, la classe qui tient le score.

## Mise en place

```bash
npm install
git init && git add . && git commit -m "départ"
npm run test:watch
```

Le fichier `src/jeu.test.ts` contient déjà un premier test, qui est rouge. À toi de jouer.

## L'API attendue

```ts
const jeu = new Jeu("Alice", "Bob");

jeu.pointPour("Alice");   // Alice marque un point
jeu.score();              // "Quinze-Zéro"
```

Le score s'écrit toujours dans l'ordre **joueur 1, puis joueur 2**.

## Les règles

### Étape 1 : les points

Les points s'annoncent **en français** : `Zéro`, `Quinze`, `Trente`, `Quarante`.

| Points Alice | Points Bob | `score()` |
|---|---|---|
| 0 | 0 | `"Zéro-Zéro"` |
| 1 | 0 | `"Quinze-Zéro"` |
| 2 | 1 | `"Trente-Quinze"` |
| 3 | 2 | `"Quarante-Trente"` |
| 1 | 1 | `"Quinze-A"` |
| 2 | 2 | `"Trente-A"` |

### Étape 2 : le point décisif

À 40-40, `score()` affiche `"Égalité"`.

**Il n'y a pas d'avantage** : à `"Égalité"`, le point suivant gagne le match.

### Étape 3 : la victoire

Le joueur qui marque alors qu'il est à `Quarante` gagne le match : `score()` affiche `"Victoire Alice"` (ou `"Victoire Bob"`).

## Bonus : un set complet

Écris une deuxième classe, `MatchEnUnSet`, qui joue **un set** au lieu d'un seul jeu.

```ts
const match = new MatchEnUnSet("Alice", "Bob");

match.pointPour("Alice");
match.score();   // le score du jeu en cours : "Quinze-Zéro"
match.jeux();    // le nombre de jeux gagnés : "0-0"
```

- Chaque jeu suit les règles des étapes 1 à 3. Quand un jeu est gagné, `jeux()` passe à `"1-0"` (ou `"0-1"`) et un nouveau jeu commence à `"Zéro-Zéro"`.
- Le premier joueur à **4 jeux** gagne le match, **sans qu'il faille 2 jeux d'écart** : 4-3 suffit.
- Une fois le match gagné, `score()` annonce le vainqueur, avec **son nombre de jeux en premier** : `"Victoire Alice 4-2"`, `"Victoire Bob 4-1"`.

## Le rendu

Ta démarche compte autant que ton code. Elle se lit dans ton historique git :

- **un commit par étape du cycle**, avec un préfixe :
  - `red: ...` quand tu ajoutes un test qui échoue ;
  - `green: ...` quand tu le fais passer ;
  - `refactor: ...` quand tu nettoies (optionnel, s'il n'y a rien à nettoyer) ;
- le test est **toujours commité avant** le code qui le fait passer ;
- des noms de tests qui décrivent une **règle**, en français.

À la fin, rends ton dossier avec son `.git`, ou bien le lien vers ton dépôt.

**Barème indicatif** : le code et les tests sur 14 points (dont 3 pour le bonus), la démarche TDD (l'historique git) sur 6 points.
