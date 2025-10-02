

export class Position {

    constructor(public x: number, public y: number) {
    }

    moveNorth(): Position {
        return new Position(this.x, this.y + 1);
    }

    moveSouth(): Position {
        return new Position(this.x, this.y - 1);
    }

    moveEast(): Position {
        return new Position(this.x + 1, this.y);
    }

    moveWest(): Position {
        return new Position(this.x - 1, this.y);
    }

}