
## 🧩 **Examen – Développement piloté par les tests (TDD)**

**Durée :** 1 heure
**Total :** 20

---

### 🧠 **Partie 1 – Compréhension rapide (4 points, ~10 min)**

**1.** En une ou deux phrases, expliquez le principe du TDD et ses trois étapes clés. *(2 pts)*
**2.** Citez deux avantages concrets du TDD. *(1 pts)*
**3.** Quelle est la différence entre un fake et un stub ? Donnez un exemple rapide. *(1 pts)*

---

### 💻 **Partie 2 – Cas pratique : gestion de panier e-commerce (15 points, ~50 min)**

#### **Contexte :**

Vous développez un système qui permet d’ajouter des produits et de calculer le total du panier.
Chaque produit a un nom et un prix. Le panier doit appliquer une **réduction de 10 %** si le total dépasse **100 €**.

---

#### **Objectif :**

Mettre en œuvre le cycle **TDD complet** pour cette fonctionnalité.

---


Le panier doit permettre :

- d’ajouter des produits (nom + prix),
- de calculer le total du panier,
- d’appliquer une réduction de 10 % si le total dépasse 100 €,
- et de renvoyer un total exact dans tous les cas.

Vous devez produire :

1. Les tests unitaires nécessaires pour valider le comportement attendu.
2. Le code correspondant (implémentation complète et propre).
3. Un code final refactorisé, lisible et cohérent.
4. Expliquez en quelques lignes comment vous intégreriez ces tests dans un pipeline CI/CD.

---

### 🧾 **Barème récapitulatif**

| Partie    | Description             |  Points |
| :-------- | :---------------------- | :-----: |
| 1         | Compréhension rapide    |    15   |
| 2.1       | Rédaction des tests     |    25   |
| 2.2       | Implémentation minimale |    25   |
| 2.3       | Refactoring             |    25   |
| 2.4       | Intégration continue    |    10   |
| **Total** |                         | **100** |

