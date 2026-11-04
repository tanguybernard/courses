import { describe, expect, it } from "vitest";
import { Jeu } from "./jeu";

describe("Jeu de tennis du tournoi de l'école", () => {
  it("commence à Zéro-Zéro", () => {
    const jeu = new Jeu("Alice", "Bob");

    expect(jeu.score()).toBe("Zéro-Zéro");
  });
});
