export type Article = { nom: string; prix: number };
export type Client = { fidele: boolean };

export class Panier {
  constructor(
    private readonly articles: Article[],
    private readonly client: Client = { fidele: false },
  ) {}

  // Ticket : « 10 % de remise pour les clients fidèles »
  total(): number {
    const somme = this.articles.reduce((s, article) => s + article.prix, 0);
    return this.client.fidele ? somme * 0.9 : somme;
  }

  // Livraison offerte dès 50 €, sinon 5 €
  fraisDePort(): number {
    return this.total() >= 50 ? 0 : 5;
  }

  aPayer(): number {
    return this.total() + this.fraisDePort();
  }
}
