# Démo live coding : modifier une règle métier, avec et sans tests

**Durée** : 20 à 25 minutes · **Message** : le danger d'un changement n'est pas qu'il casse l'écran, c'est qu'il casse *une autre règle* sans aucun signal.

## Mise en place

```bash
npm install
npm run demo        # affiche le panier d'un client fidèle
npm test            # lance Vitest (aucun test au départ)
```

Le projet démarre dans l'état `etapes/0-depart/` (déjà copié dans `src/`).

## Le contexte à poser

Un panier calcule un total et des frais de port :
- livraison **offerte dès 50 €**, sinon **5 €** ;
- le client a déjà un statut `fidele`, mais il ne sert à rien pour l'instant.

**Ticket** : « *10 % de remise pour les clients fidèles.* »

Lance `npm run demo` : 52 € de panier, port offert, **52,00 € à payer**.

---

## Étape 1 : on code « comme d'habitude », sans test

Demande à un étudiant (ou fais-le toi-même) d'implémenter le ticket. La modification attendue :

```ts
total(): number {
  const somme = this.articles.reduce((s, article) => s + article.prix, 0);
  return this.client.fidele ? somme * 0.9 : somme;
}
```

Relance `npm run demo` :

```
Total articles : 46.80 €
Frais de port  : 5.00 €
À payer        : 51.80 €
```

> **À demander à la salle** : « C'est bon ? On livre ? »
> Le total est juste (46,80 €), le dev est content. Laisse-les chercher.
> Le client, lui, attendait **46,80 €** et paie **51,80 €** : `fraisDePort()` appelle `total()`, donc la remise a fait passer le panier sous le seuil de 50 €. Aucune erreur, aucun log.

Sauvegarde de cette étape : `etapes/1-a-l-aveugle/panier.ts`

**Points à faire dire aux étudiants**
- Qui aurait vu ce bug en relecture de code ? (le diff ne touche qu'une ligne)
- Combien de temps avant que ça remonte ? (ticket client, semaines plus tard)
- Que se passe-t-il quand il y aura 30 règles de ce type ?

---

## Étape 2 : on ajoute le filet de sécurité

```bash
cp etapes/2-filet-de-securite/panier.test.ts src/
npm run test:watch
```

Deux tests passent au rouge :

| Test | Pourquoi |
|---|---|
| `restent offerts pour un client fidèle…` | le port est facturé alors que le panier fait 52 € |
| `vaut le total remisé quand la livraison est offerte` | on obtient 51,80 € au lieu de 46,80 € |

> **Insiste sur le nom du test** : « le seuil porte sur les articles avant remise ». C'est une **décision métier** que personne n'avait formulée. Le code l'avait tranchée par accident. Le test la rend explicite.

Question à poser : *« Et si le métier voulait le seuil après remise ? »* Réponse : on change le test d'abord, il devient rouge, puis on adapte le code. C'est le cycle TDD.

---

## Étape 3 : on corrige, guidé par les tests

Ajoute un `sousTotal()` privé et fais porter le seuil dessus :

```bash
cp etapes/3-correction/panier.ts src/panier.ts
```

Les 6 tests passent au vert. `npm run demo` affiche 46,80 € à payer.

**Refactoring gratuit** : les constantes (`REMISE_FIDELITE`, `SEUIL_LIVRAISON_OFFERTE`, `FRAIS_DE_PORT`) ont pu être extraites sans peur. Les tests protègent le comportement.

---

## Pour refaire la démo

```bash
cp etapes/0-depart/panier.ts src/panier.ts
rm -f src/panier.test.ts
```

## Pistes pour aller plus loin (exercices)

1. Le métier change d'avis : le seuil doit s'appliquer **après** remise. Quel test écris-tu en premier ?
2. Ajouter un code promo de 5 € : quelles règles existantes peut-il casser ?
3. Les flottants : `51.800000000000004` est apparu dans le message d'erreur. Comment représenter l'argent proprement (centimes entiers) ?
4. Mutation testing : supprimer un `>=` en `>` dans le code et vérifier qu'un test échoue (cas limite à exactement 50 €).

## Structure

```
src/
  panier.ts          code courant (état de départ)
  demo.ts            essai manuel, sans test
etapes/
  0-depart/          état initial
  1-a-l-aveugle/     modification naïve du total
  2-filet-de-securite/   tests Vitest à copier dans src/
  3-correction/      version corrigée
```
