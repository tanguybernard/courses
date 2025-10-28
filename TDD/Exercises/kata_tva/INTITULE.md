
## Kata : Calcul de la TVA sur un panier d’offres TV

### Objectif

À partir d’un panier d’**offres TV** et des informations d’un **client**, déterminer si une **TVA** s’applique et renvoyer le **panier enrichi** avec les montants **HT, TVA et TTC**.

---

### Contexte

Un client souscrit à plusieurs **offres TV** parmi les 4 suivantes :

* 🏅 **Sport**
* 🎬 **Cinéma**
* 🌍 **International**
* 👧 **Jeunesse**

Avant de valider la commande et d’afficher le récapitulatif, il faut :

1. Calculer le **total HT** du panier.
2. Déterminer si une **TVA** s’applique en fonction du **pays** et du **code postal** du client.
3. Calculer le montant de la **TVA** et le **total TTC**.
4. Retourner ces informations pour affichage.

---

### Règles de gestion

#### Détermination de la TVA

| Pays                   | Taux de TVA    | Application    |
| ---------------------- | -------------- | -------------- |
| France métropolitaine  | 20 %           | TVA applicable |
| France (971, 972, 974) | 8,5 %          | TVA réduite    |
| France (973, 975, 976) | Non applicable | Pas de TVA     |
| Autre pays UE          | Non applicable | Pas de TVA     |
| Hors UE                | Non applicable | Pas de TVA     |

---

### 🧾 Exemple d’entrée

```json
{
  "client": { "pays": "FRANCE", "code_postal": "75008" },
  "panier": [
    { "offre": "Sport", "prix_ht": 15.00, "quantite": 1 },
    { "offre": "Cinéma", "prix_ht": 12.00, "quantite": 1 },
    { "offre": "Jeunesse", "prix_ht": 8.00, "quantite": 2 }
  ]
}
```

---

### 🧾 Exemple de sortie attendue

```json
{
  "taux_tva": 20.0,
  "total_ht": 43.00,
  "tva": 8.60,
  "total_ttc": 51.60
}
```

---

### ✅ Critères de validation

* Le taux de TVA est correct selon le **pays** et le **code postal** du client.
* Les montants sont justes et arrondis à **2 décimales**.
* Si la TVA ne s’applique pas, elle n’apparaît pas dans le résultat.