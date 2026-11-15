import type { Classement } from "./classement";
import { Jeu } from "./jeu";

const JEUX_POUR_GAGNER = 4; // sans 2 jeux d'écart

// Chaque jeu du set ne doit rien envoyer au classement : seul le match compte
const AUCUN_CLASSEMENT: Classement = { enregistrer: () => {} };

export class MatchEnUnSet {
  private jeuEnCours: Jeu;
  private readonly jeuxGagnes: [number, number] = [0, 0];

  constructor(
    private readonly joueur1: string,
    private readonly joueur2: string,
    private readonly classement: Classement,
  ) {
    this.jeuEnCours = this.nouveauJeu();
  }

  pointPour(joueur: string): void {
    if (this.vainqueur() !== undefined) return;

    this.jeuEnCours.pointPour(joueur);

    const vainqueurDuJeu = this.jeuEnCours.vainqueur();
    if (vainqueurDuJeu === undefined) return;

    this.jeuxGagnes[vainqueurDuJeu === this.joueur1 ? 0 : 1]++;
    this.jeuEnCours = this.nouveauJeu();

    const vainqueur = this.vainqueur();
    if (vainqueur !== undefined) {
      const perdant = vainqueur === this.joueur1 ? this.joueur2 : this.joueur1;
      this.classement.enregistrer(vainqueur, perdant);
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

  private nouveauJeu(): Jeu {
    return new Jeu(this.joueur1, this.joueur2, AUCUN_CLASSEMENT);
  }

  private vainqueur(): string | undefined {
    if (this.jeuxGagnes[0] === JEUX_POUR_GAGNER) return this.joueur1;
    if (this.jeuxGagnes[1] === JEUX_POUR_GAGNER) return this.joueur2;
    return undefined;
  }
}
