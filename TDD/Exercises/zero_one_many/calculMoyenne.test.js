const { calculerMoyenne } = require("./calculMoyenne");

describe("calculerMoyenne", () => {
    // Zero / One / Many
    test("aucune note", () => {
        expect(() => calculerMoyenne([])).toThrow("La liste de notes est vide");
    });

    test("une note", () => {
        expect(calculerMoyenne([10])).toBe(10);
    });

    test("plusieurs notes", () => {
        expect(calculerMoyenne([10, 20])).toBe(15);
    });

    // Boundaries
    test("notes aux limites", () => {
        expect(calculerMoyenne([0, 20])).toBe(10);
    });

    test("note négative", () => {
        expect(() => calculerMoyenne([-1])).toThrow("Note hors limites");
    });

    test("note trop grande", () => {
        expect(() => calculerMoyenne([21])).toThrow("Note hors limites");
    });

    // Interfaces
    test("notes en floats", () => {
        expect(calculerMoyenne([12.5, 15.5])).toBeCloseTo(14.0);
    });

    test("note invalide (string)", () => {
        expect(() => calculerMoyenne(["abc"])).toThrow("Note invalide");
    });

    // Scenario réaliste
    test("scénario réel", () => {
        expect(calculerMoyenne([12, 14, 16])).toBe(14);
    });
});
