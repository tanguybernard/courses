import {Rover} from "./Rover";

test("rover avance vers le Nord", () => {
    const rover = new Rover(new Position(2, 2), Direction.N); //ça ne compile pas, c'est normal

    rover.execute("F");

    expect(rover.position).toStrictEqual(new Position(2, 3));
    expect(rover.direction).toBe(Direction.N);
});
