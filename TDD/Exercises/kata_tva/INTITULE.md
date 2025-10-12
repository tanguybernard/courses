

## 🧩 Kata : Calcul de la TVA sur un panier

### 🎯 Objectif

À partir d’un panier d’articles et des informations d’une **entreprise**, déterminer si une **TVA** s’applique et renvoyer le **panier enrichi** avec les montants **HT, TVA et TTC**.

---

### 📦 Contexte

Une entreprise possède un compte sur la plateforme et passe une commande composée de plusieurs articles.
Avant d’afficher le récapitulatif sur le site, il faut :

1. Calculer le **total HT** du panier.
2. Vérifier si une **TVA** s’applique selon le **pays** et le **code postal** de l’entreprise.
3. Calculer la **TVA** et le **total TTC**.
4. Retourner ces informations pour affichage.

---

### ⚙️ Règles de gestion

#### Détermination de la TVA

| Pays                    | Taux de TVA     | Application    |
|-------------------------|-----------------|----------------|
| France métropolitaine   | 20 %            | TVA applicable |
| France (971, 972, 974)  | 8,5 %           | TVA réduite    |
| France (973, 975, 976)  | Non applicable  | Pas de TVA     |
| Autre pays UE           | Non applicable  | Pas de TVA     |
| Hors UE                 | Non applicable  | Pas de TVA     |



### 🧾 Exemple d’entrée

```json
{
  "entreprise": { "pays": "FRANCE", "code_postal": "97200" },
  "panier": [
    { "nom": "Adhésion annuelle", "prix_ht": 100.00, "quantite": 1 },
    { "nom": "Option premium", "prix_ht": 50.00, "quantite": 2 }
  ]
}
```

---

### 🧾 Exemple de sortie attendue

```json
{
  "taux_tva": 8.5,
  "total_ht": 200.00,
  "tva": 17.00,
  "total_ttc": 217.00
}
```

---

### ✅ Critères de validation

* Le taux de TVA est correct selon le pays et le code postal de l’entreprise.
* Les montants sont justes et arrondis à 2 décimales.
* Si la TVA ne s’applique pas, elle n’apparaît pas dans le résultat.
