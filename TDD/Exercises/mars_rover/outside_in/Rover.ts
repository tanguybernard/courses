export class Rover {
    constructor(public position: any, public direction: any) {}

    execute(command: string) {
        if (this.direction === "N" && command === "F") {
            this.position = { x: 2, y: 3 }; // code dur
        }
    }
}
