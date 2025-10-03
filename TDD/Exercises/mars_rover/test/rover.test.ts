import {describe, expect, test} from "@jest/globals"
import {Rover} from "../src/models/Rover";
import {Position} from "../src/models/Position";
import {Direction} from "../src/models/Direction";


describe('Changement de positions', () => {

    let postion: Position;

    beforeEach(() => {
        postion = new Position(2, 2);
    });

    test("devrait se déplacer vers le nord", () => {
        expect(postion.moveNorth()).toStrictEqual(new Position(2, 3));
    });

    test("devrait se déplacer vers le sud", () => {
        const postion = new Position(2, 2);
        expect(postion.moveSouth()).toStrictEqual(new Position(2, 1));
    });

    test("devrait se déplacer vers l'ouest", () => {
        const postion = new Position(2, 2);
        expect(postion.moveWest()).toStrictEqual(new Position(1, 2));
    });

    test("devrait se déplacer vers l'est", () => {
        const postion = new Position(2, 2);
        expect(postion.moveEast()).toStrictEqual(new Position(3, 2));
    });

});


describe("Revoir doit executer les instructions qu'il recoit", () => {

    let rover: Rover;

    beforeEach(() => {
        rover = new Rover(new Position(2, 2), Direction.NORTH);
    });

    test("doit executer plusieurs instruction: FFLF", () => {
        const resultat = rover.executeCommands("FFLF");
        expect(resultat).toStrictEqual("1:4:W");
    });

});

