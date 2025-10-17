import {describe, test, expect} from "@jest/globals"


describe("Machine à Café Inside Out", () => {

    test("devrait renvoyer les caracteristiques du produit", () => {

        //nom, prix, options[sucre+, intensité+], ingrédients
        //ARRANGE
        const espresso = new Produit(
            "Espresso",
            0.70,
            ["sucre"],
            ["caffeine", "sucre"]
        )

        expect(espresso).toMatchObject({nom: "Espresso", prix: 0.70, options: ["sucre"]})
    })

    test("devrait afficher tout les produits", () => {

        //ARRANGE
        const produits = [
            new Produit(
                "Espresso",
                0.70,
                ["sucre"],
                ["caffeine", "sucre"]
            ),
            new Produit(
                "Latte",
                0.80,
                ["sucre", "sucre"],
                ["caffeine", "sucre", "sucre"]
            ),
            new Produit(
                "Cappuccino",
                0.90,
                ["sucre", "sucre"],
                ["caffeine", "sucre", "sucre"]
            )
        ]

        //ACT
        const display = afficherProduits(produits)
        //ASSERT
        expect(display.map(it => it.nom)).toEqual(["Espresso", "Latte", "Cappuccino"])

    })

})


class Produit{

    constructor(public nom: string, public prix: number,
                public options: string[],public ingredients: string[]
    ) {
    }
}


function afficherProduits(produits) {
    return produits

}