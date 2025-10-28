import {describe, test, expect} from "@jest/globals"


describe("Rover", () => {

    test("devrait bouger vers le nord si la command est d'avancer", () => {
        const position = new Position(0, 0)
        expect(position.moveNorth()).toEqual({x:0, y: 1})
    })

    test("devrait faire avancer le Rover direction Nord vers le nord", () => {

        const rover = new Rover(new Position(0, 0), "N")
        expect(rover.avancer()).toEqual({x:0, y: 1})

    })

})


class Rover {
    constructor(public position: Position, public direction: string) {
    }
    avancer() {
        return this.position.moveNorth()
    }
}


class Position {
    constructor(public x: number, public y: number) {
    }

    moveNorth(): Position {
        return new Position(this.x, this.y + 1);
    }
}