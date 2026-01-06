
## 📅 Le Programme Détaillé (5 Jours)

### JOUR 1 : Audit de Données & Git Flow (Le Nettoyage)

* **Contexte Pro :** "Avant de construire, il faut déblayer le terrain." On récupère le fameux fichier CSV corrompu (celui que je t'ai donné plus haut).
* **Objectifs Tech :** Git, Algorithmique de base (Parsing), Scripting.
* **Le Planning :**
- Mise en place de l'organisation. Binômes, création du repo Git, règles de nommage des branches (`feature/parsing`, `fix/csv`).
- Écriture d'un script (PHP ou JS) pour lire le fichier `export_vieux_stock.csv`.
* **Le Challenge Réaliste :** Ils doivent générer un fichier "propre" (JSON ou nouveau CSV) où :
* Les devises sont harmonisées (tout en Int).
* Les doublons sont supprimés.
* Les plateformes sont normalisées ("N64" et "Nintendo 64" deviennent la même chose).


Note : 
- Ils doivent valider avec moi le fichier
- Je veux 4 catégories : NEUF, BON, MOYEN, ABIMÉ



### JOUR 2 : Architecture BDD (La Fondation)

* **Contexte Pro :** "Excel, c'est fini. On passe sur du solide."
* **Objectifs Tech :** SQL, Modélisation (MCD), Relations (Clés étrangères).
* **Le Planning :**
- Conception du MCD au tableau blanc.
- Création de la base de données (MySQL/MariaDB ou SQLite).
- Importer les données "propres" du Jour 1 dans cette nouvelle base SQL via un script d'insertion.



### JOUR 3 : L'API REST (Le Moteur)

* **Contexte Pro :** "Le Front et le Back sont deux équipes séparées. On communique via une API."
* **Objectifs Tech :** Backend (Node/Express ou PHP/Slim), JSON, Codes HTTP.
* **Le Planning :**
* `GET /api/products` (Liste tout).
* `GET /api/products/{id}` (Détail).
* `POST /api/products` (Création).
* `DELETE /api/products/{id}` (Suppression).


* **Le Challenge Réaliste :** Vous jouez le rôle du Lead Dev. Vous leur interdisez de passer au Front tant que leur API ne marche pas parfaitement sur **Postman**. Si Postman renvoie une erreur 500 ou un JSON mal formé, vous refusez le ticket.


Note :
- Ils doivent valider avec moi la partie Postman


### JOUR 4 : Dashboard & UI (Le Tableau de Bord)

* **Contexte Pro :** "Kenji veut un outil efficace. Pas un site vitrine, un outil de travail."
* **Objectifs Tech :** HTML5, CSS (Grid/Flex), JS (Fetch/Async Await), Manipulation du DOM.
* **Le Planning :**
- Structure HTML et appel AJAX (`fetch`) pour remplir un grand tableau `<table>` ou une grille de cartes.
- Les fonctionnalités UX.
    - Bouton "Supprimer" avec confirmation.
    - Filtres dynamiques (Par console, par état).
- Afficher en haut de page le "Montant total du stock" (somme des prix) et le "Nombre de jeux en stock".


* **Le "Plus" Fun :** Imposer une charte graphique "Retrogaming" (Police Pixel, couleurs néons) pour le CSS.



### JOUR 5 : Recette & Déploiement (La Livraison)

* **Contexte Pro :** "Mise en production ce soir 17h."
* **Objectifs Tech :** Debug, Sécurité basique, Hébergement.
* **Le Planning :**
* **Matin :** "Bug Bash". Chaque groupe teste le projet d'un autre groupe et tente de le casser.
* *Exemple :* Essayer de rentrer un prix négatif. Essayer de créer un jeu sans titre.


* **Après-midi :** Correction des bugs trouvés et nettoyage du code (suppression des `console.log` et des commentaires inutiles).
* **16h00 : La DÉMO.**
* Pitch de 5 minutes par groupe. Ils vous montrent comment ils ajoutent le jeu "Zelda" à la base et comment le stock se met à jour instantanément.





---

### 🎓 Critères d'évaluation 


1. **Git :** L'historique des commits est-il propre ? Ont-ils travaillé sur des branches ?
2. **Qualité de code :** Indentation, nom des variables en anglais (c'est la norme pro).
3. **Fonctionnel :** Est-ce que le "Total du stock" est juste ? Est-ce que la création d'un produit marche ?
4. **Interface :** Est-ce que c'est utilisable ? (Pas besoin d'être beau, mais "User Friendly").

