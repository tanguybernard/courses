export type Article = { nom: string; prix: number };
export type Client = { fidele: boolean };

const REMISE_FIDELITE = 0.1;
const SEUIL_LIVRAISON_OFFERTE = 50;
const FRAIS_DE_PORT = 5;

export class Panier {
  constructor(
    private readonly articles: Article[],
    private readonly client: Client = { fidele: false },
  ) {}

  private sousTotal(): number {
    return this.articles.reduce((somme, article) => somme + article.prix, 0);
  }

  total(): number {
    const remise = this.client.fidele ? REMISE_FIDELITE : 0;
    return this.sousTotal() * (1 - remise);
  }

  // Décision métier explicite : le seuil porte sur les articles AVANT remise
  fraisDePort(): number {
    return this.sousTotal() >= SEUIL_LIVRAISON_OFFERTE ? 0 : FRAIS_DE_PORT;
  }

  aPayer(): number {
    return this.total() + this.fraisDePort();
  }
}
