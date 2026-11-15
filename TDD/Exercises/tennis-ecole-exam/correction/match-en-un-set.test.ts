import { describe, expect, it, vi } from "vitest";
import type { Classement } from "./classement";
import { MatchEnUnSet } from "./match-en-un-set";

// Dummy : ces tests vérifient le score, pas le classement.
const classementDummy: Classement = { enregistrer: () => {} };

const gagnerDesJeux = (match: MatchEnUnSet, joueur: string, jeux: number) => {
  for (let i = 0; i < 4 * jeux; i++) match.pointPour(joueur);
};

describe("Bonus : match en un set", () => {
  it("commence à 0-0, Zéro-Zéro", () => {
    const match = new MatchEnUnSet("Alice", "Bob", classementDummy);

    expect(match.jeux()).toBe("0-0");
    expect(match.score()).toBe("Zéro-Zéro");
  });

  it("affiche le score du jeu en cours", () => {
    const match = new MatchEnUnSet("Alice", "Bob", classementDummy);

    match.pointPour("Alice");

    expect(match.score()).toBe("Quinze-Zéro");
  });

  it("un jeu gagné compte et un nouveau jeu repart à Zéro-Zéro", () => {
    const match = new MatchEnUnSet("Alice", "Bob", classementDummy);

    gagnerDesJeux(match, "Bob", 1);

    expect(match.jeux()).toBe("0-1");
    expect(match.score()).toBe("Zéro-Zéro");
  });

  it("annonce la victoire avec les jeux du vainqueur en premier", () => {
    const match = new MatchEnUnSet("Alice", "Bob", classementDummy);

    gagnerDesJeux(match, "Alice", 1);
    gagnerDesJeux(match, "Bob", 4);

    expect(match.score()).toBe("Victoire Bob 4-1");
  });

  it("le match continue à 3 jeux partout", () => {
    const match = new MatchEnUnSet("Alice", "Bob", classementDummy);

    gagnerDesJeux(match, "Alice", 3);
    gagnerDesJeux(match, "Bob", 3);

    expect(match.jeux()).toBe("3-3");
    expect(match.score()).toBe("Zéro-Zéro");
  });

  it("4-3 suffit, sans 2 jeux d'écart", () => {
    const match = new MatchEnUnSet("Alice", "Bob", classementDummy);

    gagnerDesJeux(match, "Alice", 3);
    gagnerDesJeux(match, "Bob", 3);
    gagnerDesJeux(match, "Alice", 1);

    expect(match.score()).toBe("Victoire Alice 4-3");
  });

  // Spy avec vi.fn() : même raison que pour le jeu, on vérifie un appel sortant
  // qui ne renvoie rien. Ici on vérifie aussi qu'un jeu gagné n'envoie rien.
  it("n'enregistre que le résultat du match, pas celui de chaque jeu", () => {
    const enregistrer = vi.fn();
    const match = new MatchEnUnSet("Alice", "Bob", { enregistrer });

    gagnerDesJeux(match, "Alice", 3);
    gagnerDesJeux(match, "Bob", 3);
    expect(enregistrer).not.toHaveBeenCalled();

    gagnerDesJeux(match, "Bob", 1);
    expect(enregistrer).toHaveBeenCalledOnce();
    expect(enregistrer).toHaveBeenCalledWith("Bob", "Alice");
  });
});
