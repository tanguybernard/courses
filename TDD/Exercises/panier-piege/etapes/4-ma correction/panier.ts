export type Article = { nom: string; prix: number };
export type Client = { fidele: boolean };

export class Panier {
  constructor(
    private readonly articles: Article[],
    private readonly client: Client = { fidele: false },
  ) {}

  sousTotal(): number {
    return this.articles.reduce((somme, article) => somme + article.prix, 0);
  }

  total() : number {
  return this.client.fidele ? this.sousTotal() * 0.9 : this.sousTotal();
    
  }

  // Livraison offerte dès 50 €, sinon 5 €
  fraisDePort(): number {
    return this.sousTotal() >= 50 ? 0 : 5;
  }

  aPayer(): number {
    return this.total() + this.fraisDePort();
  }
}
