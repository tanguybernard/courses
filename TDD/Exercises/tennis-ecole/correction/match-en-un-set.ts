import { Jeu } from "./jeu";

const JEUX_POUR_GAGNER = 4; // sans 2 jeux d'écart

export class MatchEnUnSet {
  private jeuEnCours: Jeu;
  private readonly jeuxGagnes: [number, number] = [0, 0];

  constructor(
    private readonly joueur1: string,
    private readonly joueur2: string,
  ) {
    this.jeuEnCours = new Jeu(joueur1, joueur2);
  }

  pointPour(joueur: string): void {
    // Non demandé par l'énoncé : un point après la victoire est ignoré
    if (this.vainqueur() !== undefined) return;

    this.jeuEnCours.pointPour(joueur);

    const vainqueurDuJeu = this.jeuEnCours.vainqueur();
    if (vainqueurDuJeu !== undefined) {
      this.jeuxGagnes[vainqueurDuJeu === this.joueur1 ? 0 : 1]++;
      this.jeuEnCours = new Jeu(this.joueur1, this.joueur2);
    }
  }

  jeux(): string {
    return `${this.jeuxGagnes[0]}-${this.jeuxGagnes[1]}`;
  }

  score(): string {
    const [jeux1, jeux2] = this.jeuxGagnes;
    const vainqueur = this.vainqueur();
    if (vainqueur === this.joueur1) return `Victoire ${vainqueur} ${jeux1}-${jeux2}`;
    if (vainqueur === this.joueur2) return `Victoire ${vainqueur} ${jeux2}-${jeux1}`;
    return this.jeuEnCours.score();
  }

  private vainqueur(): string | undefined {
    if (this.jeuxGagnes[0] === JEUX_POUR_GAGNER) return this.joueur1;
    if (this.jeuxGagnes[1] === JEUX_POUR_GAGNER) return this.joueur2;
    return undefined;
  }
}
