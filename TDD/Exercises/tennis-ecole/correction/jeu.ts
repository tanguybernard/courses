const NOMS_DES_POINTS = ["Zéro", "Quinze", "Trente", "Quarante"];
const POINTS_POUR_GAGNER = 4; // pas d'avantage : le 4e point gagne toujours

export class Jeu {
  private readonly points: [number, number] = [0, 0];

  constructor(
    private readonly joueur1: string,
    private readonly joueur2: string,
  ) {}

  pointPour(joueur: string): void {
    this.points[joueur === this.joueur1 ? 0 : 1]++;
  }

  vainqueur(): string | undefined {
    if (this.points[0] >= POINTS_POUR_GAGNER) return this.joueur1;
    if (this.points[1] >= POINTS_POUR_GAGNER) return this.joueur2;
    return undefined;
  }

  score(): string {
    const vainqueur = this.vainqueur();
    if (vainqueur !== undefined) return `Victoire ${vainqueur}`;

    const [points1, points2] = this.points;
    if (points1 !== points2) return `${NOMS_DES_POINTS[points1]}-${NOMS_DES_POINTS[points2]}`;
    if (points1 === 0) return "Zéro-Zéro";
    if (points1 === 3) return "Égalité";
    return `${NOMS_DES_POINTS[points1]}-A`;
  }
}
