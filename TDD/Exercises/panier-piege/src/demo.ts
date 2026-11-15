import { Panier } from "./panier";

// Un client fidèle commande pour 52 € d'articles
const panier = new Panier(
  [
    { nom: "Roman", prix: 32 },
    { nom: "Carnet", prix: 20 },
  ],
  {fidele : true}
);

const euros = (montant: number) => `${montant.toFixed(2)} €`;

console.log("Total articles :", euros(panier.total()));
console.log("Frais de port  :", euros(panier.fraisDePort()));
console.log("À payer        :", euros(panier.aPayer()));
