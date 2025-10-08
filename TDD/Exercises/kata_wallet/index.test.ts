import { describe, test, expect } from "@jest/globals"
import {Wallet} from "./Wallet";
import {defaultExchangeImpl} from "./exchange_rate_simulator";
import {Currency} from "./Exchange";

describe('Kata Wallet', () =>{

    test("devrait donner le même montant lors de la conversion dans une même devise", () =>{
        const wallet = new Wallet( 4, "EURO");
        expect(wallet.convert("EURO",defaultExchangeImpl)).toBe(4)
    })

    test("Stub — renvoyer des valeurs contrôlées (pas d'assertion sur appels)", () => {
        // Stub : on veut forcer une valeur pour un cas précis
        const stub = (amount: number, from: Currency, to: Currency) => {
            if (from === "EURO" && to === "DOLLARS") return 42;
        };

        const wallet = new Wallet( 4, "EURO");
        expect(wallet.convert("DOLLARS",stub)).toBe(42)
    });


    test("Fake - exchange", () => {
        // Fake : une implémentation "réelle" simplifiée
        const fake = (amount: number, from: any, to: any) => {
            if (from === "EURO" && to === "DOLLARS") return amount * 1.2;
            if (from === "DOLLARS" && to === "EUR") return amount * 0.8;
            if (from === to) return amount;
            throw new Error("fake: pair non définie");
        };

        //Comme en prod
        const wallet = new Wallet( 4, "EURO");
        expect(wallet.convert("DOLLARS",fake)).toBe(4.80)
    });

    test("Spy exchange", () => {
        const realImpl = defaultExchangeImpl; // implémentation par défaut fournie
        const spy = jest.fn((amount: number, from: Currency, to: Currency) => {
            return realImpl(amount, from, to);
        });

        const wallet = new Wallet( 4, "EURO");
        wallet.convert("DOLLARS",spy);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(4, "EURO", "DOLLARS");

    });

    test("Mock exchange", () => { //Tester le comment (agi correctement) et pas le quoi (le resultat final)
        //Le mock simule une dépendance et vérifier les interactions
        // Le Stub donne juste une réponse.
        // Le spy observe juste
        const mockFn = jest.fn((amount: number, from: Currency, to: Currency) => {
            if (from === to) return amount;
            return amount * 3;
        });

        const wallet = new Wallet( 4, "EURO");
        wallet.convert("DOLLARS",mockFn);
        expect(mockFn).toHaveBeenCalled();
        expect(mockFn).toHaveBeenCalledWith(4, "EURO", "DOLLARS");
        expect(mockFn).toHaveBeenCalledTimes(1);
    });
})