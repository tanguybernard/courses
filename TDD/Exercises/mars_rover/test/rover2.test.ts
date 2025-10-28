import {describe, expect, test} from "@jest/globals"
import {Position} from "../src/models/Position";
import {Direction} from "../src/models/Direction";
import {RoverAvecCarte} from "../src/models/RoverAvecCarte";


describe('Mar Rover', () => {

    test("devrait se déplacer vers le nord", () => {

        const carte = new Carte(5, 5);

        const rover = new RoverAvecCarte(carte, new Position(2, 2), Direction.NORTH);

        expect(rover.executeCommands("F")).toStrictEqual("2:3:N");

    });

    test("devrait rester sur place pour ne pas sortir de la carte", () => {

        const carte = new Carte(5, 5);

        const rover = new RoverAvecCarte(carte, new Position(2, 2), Direction.NORTH);

        expect(rover.executeCommands("FFFF")).toStrictEqual("2:5:N");

    });

});

class Carte {

    constructor(public width: number, public height: number) {

    }
}

