import {Position} from "./Position";

//1er
test("position.moveNorth() augmente y de 1", () => {
    const pos = new Position(2, 2);

    expect(pos.moveNorth()).toStrictEqual(new Position(2, 3));
});

//2eme
test("direction N tourne à gauche → W", () => {
    expect(Direction.N.turnLeft()).toBe(Direction.W);
});

//3eme
test("rover orienté Nord avance d’une case vers le Nord", () => {
    const rover = new Rover(new Position(2, 2), Direction.N);

    rover.execute("F");

    expect(rover.position).toStrictEqual(new Position(2, 3));
});