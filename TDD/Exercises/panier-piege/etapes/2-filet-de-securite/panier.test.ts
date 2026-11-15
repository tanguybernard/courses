import { describe, expect, it } from "vitest";
import { Panier } from "./panier";

const roman = { nom: "Roman", prix: 32 };
const carnet = { nom: "Carnet", prix: 20 };

describe("Panier", () => {
  describe("total", () => {
    it("additionne le prix des articles", () => {
      const panier = new Panier([roman, carnet]);

      expect(panier.total()).toBe(52);
    });

    it("applique 10 % de remise à un client fidèle", () => {
      const panier = new Panier([roman, carnet], { fidele: true });

      expect(panier.total()).toBeCloseTo(46.8, 2);
    });
  });

  describe("frais de port", () => {
    it("sont de 5 € sous 50 € d'articles", () => {
      const panier = new Panier([{ nom: "Stylo", prix: 40 }]);

      expect(panier.fraisDePort()).toBe(5);
    });

    it("sont offerts dès 50 € d'articles", () => {
      const panier = new Panier([roman, carnet]);

      expect(panier.fraisDePort()).toBe(0);
    });

    it("restent offerts pour un client fidèle : le seuil porte sur les articles avant remise", () => {
      const panier = new Panier([roman, carnet], { fidele: true });

      expect(panier.fraisDePort()).toBe(0);
    });
  });

  describe("montant à payer", () => {
    it("vaut le total remisé quand la livraison est offerte", () => {
      const panier = new Panier([roman, carnet], { fidele: true });

      expect(panier.aPayer()).toBeCloseTo(46.8, 2);
    });
  });
});
