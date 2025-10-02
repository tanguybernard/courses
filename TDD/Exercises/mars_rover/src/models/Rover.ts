import {Position} from "./Position";
import {Direction} from "./Direction";
import {Movement} from "./Movement";


export class Rover {

    constructor(private position: Position, private direction: Direction) {
    }

    moveV1(movement: Movement) {
        switch (movement) {
            case Movement.F:
                this.position = new Position(this.position.x, this.position.y+1);

        }
        return this.position

    }

    moveV2(movement: Movement) {
        if (movement === Movement.F) {
            switch (this.direction) {
                case Direction.NORTH: return this.position.moveNorth();
                case Direction.SOUTH: return this.position.moveSouth();
                case Direction.EAST: return this.position.moveEast();
                case Direction.WEST: return this.position.moveWest();
            }
        }
    }

    executeCommands(movements: Movement[]): string {
        for (const movement of movements) {
            this.moveV3(movement);
        }
        return this.position.x + ':'+this.position.y+ ":"+this.direction;
    }

    moveV3(movement: Movement) {
         switch (movement) {
             case Movement.F:
                 switch (this.direction) {
                     case Direction.NORTH: this.position = this.position.moveNorth();break;
                     case Direction.SOUTH: this.position = this.position.moveSouth();break;
                     case Direction.EAST: this.position = this.position.moveEast();break;
                     case Direction.WEST: this.position = this.position.moveWest();break;
                     default: throw new Error("Unknown direction");
                }
                 break;
             case Movement.L:
                 this.direction = this.turnLeft();break;
             default:
                throw new Error("Unknown movement");
         }

    }

    private turnLeft(): Direction {
        switch (this.direction) {
            case Direction.NORTH: return Direction.WEST;
            case Direction.WEST: return Direction.SOUTH;
            case Direction.SOUTH: return Direction.EAST;
            case Direction.EAST: return Direction.NORTH;
        }
    }
}