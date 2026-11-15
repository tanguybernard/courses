import { describe, expect, it } from "vitest";
import type { Classement } from "./classement";
import { Jeu } from "./jeu";

// Dummy : les étapes 1 à 3 testent le score, pas le classement.
// Le constructeur l'exige, mais ces tests ne le vérifient jamais : il suffit
// d'un objet qui respecte l'interface et ne fait rien.
const classementDummy: Classement = { enregistrer: () => {} };

const nouveauJeu = () => new Jeu("Alice", "Bob", classementDummy);

// Spy : enregistrer() ne renvoie rien, on ne peut donc vérifier que l'appel lui-même.
// Le spy garde la trace des appels, et le test vérifie ensuite combien il y en a eu
// et avec quels arguments. Un stub ne servirait à rien : il n'y a aucune réponse à simuler.
class ClassementSpy implements Classement {
  readonly appels: [string, string][] = [];

  enregistrer(vainqueur: string, perdant: string): void {
    this.appels.push([vainqueur, perdant]);
  }
}

const marquer = (jeu: Jeu, joueur: string, points: number) => {
  for (let i = 0; i < points; i++) jeu.pointPour(joueur);
};

describe("Jeu de tennis du tournoi de l'école", () => {
  describe("Étape 1 : les points s'annoncent en français", () => {
    it("commence à Zéro-Zéro", () => {
      expect(nouveauJeu().score()).toBe("Zéro-Zéro");
    });

    it.each([
      [1, 0, "Quinze-Zéro"],
      [0, 1, "Zéro-Quinze"],
      [2, 1, "Trente-Quinze"],
      [3, 2, "Quarante-Trente"],
      [1, 1, "Quinze-A"],
      [2, 2, "Trente-A"],
    ])("affiche %i point(s) à %i comme %s", (pointsAlice, pointsBob, attendu) => {
      const jeu = nouveauJeu();

      marquer(jeu, "Alice", pointsAlice);
      marquer(jeu, "Bob", pointsBob);

      expect(jeu.score()).toBe(attendu);
    });
  });

  describe("Étape 2 : le point décisif, sans avantage", () => {
    it("affiche Égalité à 40-40", () => {
      const jeu = nouveauJeu();

      marquer(jeu, "Alice", 3);
      marquer(jeu, "Bob", 3);

      expect(jeu.score()).toBe("Égalité");
    });

    it.each(["Alice", "Bob"])("le point qui suit l'égalité fait gagner %s", (joueur) => {
      const jeu = nouveauJeu();
      marquer(jeu, "Alice", 3);
      marquer(jeu, "Bob", 3);

      jeu.pointPour(joueur);

      expect(jeu.score()).toBe(`Victoire ${joueur}`);
    });
  });

  describe("Étape 3 : la victoire", () => {
    it("le joueur qui marque à Quarante gagne le match", () => {
      const jeu = nouveauJeu();

      marquer(jeu, "Alice", 4);

      expect(jeu.score()).toBe("Victoire Alice");
    });

    it("gagne aussi quand l'adversaire a déjà marqué", () => {
      const jeu = nouveauJeu();

      marquer(jeu, "Alice", 2);
      marquer(jeu, "Bob", 4);

      expect(jeu.score()).toBe("Victoire Bob");
    });
  });

  describe("Étape 4 : le résultat est envoyé au classement du tournoi", () => {
    it("n'enregistre rien tant que le match n'est pas fini", () => {
      const classement = new ClassementSpy();
      const jeu = new Jeu("Alice", "Bob", classement);

      marquer(jeu, "Alice", 3);
      marquer(jeu, "Bob", 3);

      expect(classement.appels).toEqual([]);
    });

    it("enregistre le vainqueur puis le perdant à la fin du match", () => {
      const classement = new ClassementSpy();
      const jeu = new Jeu("Alice", "Bob", classement);

      marquer(jeu, "Alice", 1);
      marquer(jeu, "Bob", 4);

      expect(classement.appels).toEqual([["Bob", "Alice"]]);
    });

    it("n'enregistre qu'une seule fois, même si un point est marqué après la victoire", () => {
      const classement = new ClassementSpy();
      const jeu = new Jeu("Alice", "Bob", classement);

      marquer(jeu, "Alice", 4);
      try {
        jeu.pointPour("Bob");
      } catch {
        // L'énoncé n'impose rien ici : ignorer le point ou lever une erreur sont acceptés
      }

      expect(classement.appels).toEqual([["Alice", "Bob"]]);
    });
  });
});
