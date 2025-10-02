import {describe, expect, test} from "@jest/globals"
import {Rover} from "../src/models/Rover";
import {Position} from "../src/models/Position";
import {Movement} from "../src/models/Movement";
import {Direction} from "../src/models/Direction";


describe('Rover', () => {

    let rover: Rover;

    beforeEach(() => {
        rover = new Rover(new Position(2, 2), Direction.NORTH);
    });

    test(`rover avance Nord`, () => {
        const newPosition = rover.moveV1(Movement.F)
        //En Jest, toBe fait une comparaison par référence (===), pas par contenu.
        expect(newPosition).toStrictEqual(new Position(2,3));
    });

    test("rover avance vers l'Est", () => {
        const rover = new Rover(new Position(2, 2), Direction.EAST);

        const newPosition = rover.moveV2(Movement.F);

        expect(newPosition).toStrictEqual(new Position(3, 2));
    });


    test("rover reçois plusieurs instruction: FFLF", () => {

        const resultat = rover.executeCommands([Movement.F, Movement.F, Movement.L, Movement.F]);

        expect(resultat).toStrictEqual("1:4:W");
    });

});

