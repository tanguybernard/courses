## Le "Netflix" Personnel (Gestionnaire de Collection)
   Le concept : Une application pour gérer sa collection de films, séries ou jeux vidéo. On peut ajouter une oeuvre, la noter, et dire si on l'a "Déjà vu" ou "À voir".

### L'intérêt pédagogique :

- SQL : Très bon pour gérer des statuts (status : 'to_watch', 'watching', 'done') et des notes (rating : 1 à 5).
- CSS : C'est un projet très visuel (affiches de films). Idéal pour travailler CSS Grid.
- PHP : Logique de tri (trier par note, par date de sortie).

### Découpage suggéré :

- J1-J2 : BDD (tables movies, users, genres) et affichage de la grille de films.
- J3 : Auth et page détail d'un film.
- J4 : Ajout/Edition avec upload de l'affiche du film.
- J5 : JS/AJAX : Système de notation (cliquer sur des étoiles) qui met à jour la base sans recharger la page.

---

### Option 1 : Le "Mood-Match" (L'Algorithme émotionnel) 🧠
**Le concept :** On ne choisit pas un film par genre (Action, Comédie), mais par **humeur** ou par **contexte**.
**Le "Truc en plus" :** Un générateur de suggestions. L'utilisateur dit : *"J'ai 2 heures devant moi, je suis triste et je veux manger de la pizza"*. L'application doit faire une requête SQL complexe pour trouver LE film parfait.

* **Différence Technique :**
    * **SQL :** Utilisation intensive des filtres (`WHERE duration < 120 AND mood = 'sad'`).
    * **PHP :** Logique de hasard (`array_rand` ou `ORDER BY RAND()`) pour suggérer un film.
    * **Données :** Ajouter des tags non conventionnels en BDD (ex: `mood`: 'Chill', 'Hype', 'Dark', 'Brain-dead').

---

### Option 2 : La "Ciné-Battle" (Gamification) ⚔️
**Le concept :** Au lieu de juste noter des films sur 5 étoiles, on les classe par comparaison.
**Le "Truc en plus" :** Une page **"Duel"**. Deux affiches de films apparaissent côte à côte (choisies au hasard). L'utilisateur clique sur celui qu'il préfère. Cela crée un classement dynamique (Top 100) basé sur les duels gagnés.

* **Différence Technique :**
    * **AJAX (JS) :** Indispensable ici. Quand je vote, ça envoie l'info en PHP, ça met à jour le score en BDD et ça recharge deux nouveaux films sans recharger la page.
    * **SQL :** Compteurs (nombre de victoires / nombre de matchs).
    * **Fun :** C'est très addictif pour les étudiants de voir leur film préféré monter dans le classement.

---

### 🏆 Ma recommandation : L'Option 1 (Mood-Match)
C'est la plus faisable en 5 matinées tout en ayant un effet "magique" pour l'utilisateur.

Voici le planning adapté pour **"Mood-Match"** :

#### Matinée 1 : Architecture & "Tags"
* Conception BDD : Tables `users`, `movies`.
* **Le Twist :** Une table `tags` (id, label, emoji) et une table de liaison `movie_tags`. C'est là qu'on mettra les humeurs (ex: 😭 Triste, ⚡ Énergique, 🧠 Réfléchi).
* Mise en place Git/Structure fichiers.

#### Matinée 2 : Le CRUD standard
* Affichage de la liste des films (Grille CSS).
* Page de détail d'un film.
* Sur la page détail, afficher les tags associés (ex: "Titanic" -> Tags : 😭, 🚢, ❤️).

#### Matinée 3 : Admin & Ajout (La Data)
* Authentification (Login/Register).
* Formulaire d'ajout de film :
    * C'est ici que c'est intéressant : En plus du Titre/Image, l'étudiant doit créer des **checkboxes** pour cocher les "Moods" du film lors de l'ajout.

#### Matinée 4 : Le Moteur de Recherche (Le Cœur du projet)
* Créer une page "Trouve-moi un film".
* Formulaire avec 3 questions :
    1.  *Combien de temps as-tu ?* (< 90min, < 120min, Peu importe).
    2.  *Quelle est ton humeur ?* (Select dynamique depuis la BDD).
    3.  *Bouton : "Surprends-moi !"*
* **PHP/SQL :** Construire la requête qui filtre selon ces critères et renvoie un seul résultat aléatoire.

#### Matinée 5 : JS & UX
* **AJAX :** Faire en sorte que le bouton "Surprends-moi" affiche le résultat sans recharger la page, avec une petite animation CSS (un loader).
* **Historique :** (Bonus) Stocker en session les 3 derniers films suggérés.

Ça vous tente ce côté "Sommelier du cinéma" ?