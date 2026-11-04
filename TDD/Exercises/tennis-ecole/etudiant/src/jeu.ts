export class Jeu {
  constructor(
    private readonly joueur1: string,
    private readonly joueur2: string,
  ) {}

  pointPour(joueur: string): void {}

  score(): string {
    return "";
  }
}
