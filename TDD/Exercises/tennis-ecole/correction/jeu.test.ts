import { describe, expect, it } from "vitest";
import { Jeu } from "./jeu";

const marquer = (jeu: Jeu, joueur: string, points: number) => {
  for (let i = 0; i < points; i++) jeu.pointPour(joueur);
};

describe("Jeu de tennis du tournoi de l'école", () => {
  describe("Étape 1 : les points s'annoncent en français", () => {
    it("commence à Zéro-Zéro", () => {
      expect(new Jeu("Alice", "Bob").score()).toBe("Zéro-Zéro");
    });

    it.each([
      [1, 0, "Quinze-Zéro"],
      [0, 1, "Zéro-Quinze"],
      [2, 1, "Trente-Quinze"],
      [3, 2, "Quarante-Trente"],
      [1, 1, "Quinze-A"],
      [2, 2, "Trente-A"],
    ])("affiche %i point(s) à %i comme %s", (pointsAlice, pointsBob, attendu) => {
      const jeu = new Jeu("Alice", "Bob");

      marquer(jeu, "Alice", pointsAlice);
      marquer(jeu, "Bob", pointsBob);

      expect(jeu.score()).toBe(attendu);
    });
  });

  describe("Étape 2 : le point décisif, sans avantage", () => {
    it("affiche Égalité à 40-40", () => {
      const jeu = new Jeu("Alice", "Bob");

      marquer(jeu, "Alice", 3);
      marquer(jeu, "Bob", 3);

      expect(jeu.score()).toBe("Égalité");
    });

    it.each(["Alice", "Bob"])("le point qui suit l'égalité fait gagner %s", (joueur) => {
      const jeu = new Jeu("Alice", "Bob");
      marquer(jeu, "Alice", 3);
      marquer(jeu, "Bob", 3);

      jeu.pointPour(joueur);

      expect(jeu.score()).toBe(`Victoire ${joueur}`);
    });
  });

  describe("Étape 3 : la victoire", () => {
    it("le joueur qui marque à Quarante gagne le match", () => {
      const jeu = new Jeu("Alice", "Bob");

      marquer(jeu, "Alice", 4);

      expect(jeu.score()).toBe("Victoire Alice");
    });

    it("gagne aussi quand l'adversaire a déjà marqué", () => {
      const jeu = new Jeu("Alice", "Bob");

      marquer(jeu, "Alice", 2);
      marquer(jeu, "Bob", 4);

      expect(jeu.score()).toBe("Victoire Bob");
    });
  });
});
