## La Grille de Notation Quotidienne (Système d'XP)

Voici une grille simple sur **5 points par jour** (Total /20 + Bonus). 

### LUNDI : Data & Git (Le Nettoyeur)

*Livrable : Le fichier `clean_data.json` et l'historique Git.*

* **1 pt :** Le dépôt Git est propre (avec un `.gitignore` qui exclut `node_modules` ou fichiers systèmes).
* **1 pt :** Le script de nettoyage tourne sans erreur.
* **2 pts :** Le fichier JSON final est parfait (Prix en entier, pas de doublons, nom des consoles harmonisés).
* **1 pt :** **Challenge Git réussi** (Preuve qu'ils ont géré le conflit du matin).

### MARDI : SQL & Architecture (L'Architecte)

*Livrable : Un export SQL (`dump.sql`) ou une capture d'écran de la table remplie.*

* **2 pts :** Structure de la BDD cohérente (Types de colonnes corrects : `INT` pour prix, `VARCHAR` pour noms).
* **3 pts :** Importation réussie. La table contient bien les 50 jeux nettoyés (pas de lignes vides, pas de `NULL` non gérés).

### MERCREDI : Backend API (Le Facteur)

*Livrable : Une Collection Postman (fichier `.json` exporté).*

* **1 pt :** Serveur lancé et fonctionnel (pas d'erreur 500 au démarrage).
* **2 pts :** Route `GET /api/games` renvoie un JSON valide avec tous les jeux.
* **2 pts :** **Preuve Postman :** Tu leur demandes de t'envoyer le fichier d'export de leur collection Postman. Tu l'importes chez toi, tu lances le test. Si ça marche = 2 points.
* *C'est radical et très formateur.* Ils doivent apprendre à sauvegarder et exporter une collection.



### JEUDI : Frontend (Le Peintre)

*Livrable : Démo visuelle sur leur écran.*

* **2 pts :** Les données s'affichent (la boucle JS fonctionne).
* **2 pts :** Le design "Neo-Retro" est respecté (Couleurs, Polices, Grille).
* **1 pt :** Le code JS est propre (Utilisation de `fetch` avec `async/await` et pas de vieux `XMLHttpRequest`).

### VENDREDI : Déploiement & Features (Le Pro)

*Livrable : Pitch final.*

* **Bonus (+2 à +5) :**
* La suppression fonctionne.
* Les KPIs (Total stock) sont calculés.
* Le site est "Responsive".
* Ils ont réussi à héberger le site (même en local réseau).



---

### 💡 Comment corriger vite (en 15 min max) ?

* **Pour Lundi/Mardi/Mercredi :** Tu leur demandes de pousser leur code sur le repo GitHub/GitLab. Tu clones le soir, tu lances `node cleaning_script.js` (Lundi) ou tu regardes le Postman (Mercredi).
* **Le Feedback :** Le lendemain matin au "Daily Meeting" de 9h, tu affiches le "Leaderboard" (anonyme ou pas, selon l'ambiance) : *"Bravo au groupe Alpha qui a le JSON le plus propre, par contre le groupe Beta, vous m'avez laissé des doublons sur Mario !"*.

Ça te va comme structure d'évaluation ?