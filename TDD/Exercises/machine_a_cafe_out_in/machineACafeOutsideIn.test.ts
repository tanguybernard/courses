import {describe, test, expect} from "@jest/globals"


describe("Machine à Café Outside In", () => {


    test("devrait afficher tout les produits", () => {

        //ARRANGE
        const produits = [
            new Produit("Espresso"),
            new Produit("Latte"),
            new Produit("Cappuccino")
        ]

        //ACT
        const display = afficherProduits(produits)
        //ASSERT
        expect(display.map(it => it.nom)).toEqual(["Espresso", "Latte", "Cappuccino"])

    })
})


class Produit {
    constructor(public nom: String) {
    }

}

const afficherProduits = (produits) => produits