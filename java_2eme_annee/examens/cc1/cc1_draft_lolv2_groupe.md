### Controle continue de Java - Programmation Orientée Objet  
**Sujet : Analyse de matchs de League of Legends à partir d'un fichier CSV**

---

#### Objectifs du contrôle continu :

Maîtrise de la Programmation Orientée Objet (POO) en Java :
- Créer et manipuler des classes, des objets et des relations (composition).
- Appliquer les principes d'encapsulation et de modélisation efficace des données.
- Utiliser les collections Java (List, Map, etc.) de manière appropriée.

Gestion des fichiers :
- Lire un fichier CSV et extraire les informations pour créer des objets Java.

Traitement et analyse de données :

- Manipuler les données pour effectuer des analyses (recherche, calculs de statistiques).
- Filtrer et rechercher des informations précises dans une liste d'objets.


Structuration et organisation du code :
- Structurer le code en packages (model, service).
- Organiser les classes de manière claire et cohérente.

#### **Contexte :**
Tu dois créer une application Java orientée objet qui analyse les résultats de matchs de League of Legends à partir d'un fichier CSV. Le fichier contient des informations sur les matchs joués, les champions sélectionnés par chaque équipe et le gagnant du match.

---


## **Travail à réaliser :**
1. **Modélisation des classes :**
   - Crée une classe `Champion` avec les attributs nécessaires (nom, rôle possible si pertinent).
   - Crée une classe `Team` qui contient une liste de 5 champions.
   - Crée une classe `Match` avec les équipes 1 et 2 et l'information sur le gagnant.
   - Crée une classe `MatchService` pour lire et analyser les données du fichier CSV.

2. **Lecture du fichier CSV :**
   - Lis le fichier `matchs.csv` et crée les objets correspondants.
   - Assure une gestion des exceptions si le fichier est manquant ou mal formaté.

3. **Fonctionnalités à implémenter :**
   - Dans la console, afficher le nombre total de matchs joués.
   - Sachant qu'une équipe peut etre blueTeamTag ou redTeamTag, calculer et afficher le pourcentage de victoire pour l'équipe "G2".
   - Permettre à l'utilisateur de rechercher les matchs où un champion spécifique a été joué.
   - Implémente une fonctionnalité permettant de rechercher le meilleur champion top pour contrer un autre champion top.
      > Conseil: Utilise des Map<Champion, Map<ContreChampion, Statistiques>> pour calculer les taux de victoire.

---


### **Contraintes :**
- Respecter les principes de la programmation orientée objet : encapsulation, héritage (si pertinent), abstraction.
- Utilisation des collections appropriées pour stocker les données.
- Gérer les exceptions pour les accès aux fichiers et les erreurs d'entrée utilisateur.
- Organiser le code proprement en utilisant des packages (`model`, `service`).

---

### **Exemple de scénario attendu :**
```

> Recherche de matchs avec le champion "Gnar"
CST [Gnar, Rengar, Ahri, Caitlyn, Leona] vs DIG [Irelia, JarvanIV, Azir, Corki, Annie] - Gagnant : DIG
...

> Rechercher le meilleur contre pour "Darius" en top lane
Le meilleur contre pour Darius est : Teemo (taux de victoire : 65%)
```

---

### **Barème :**
- Modélisation des classes et respect des principes POO : **6 points**
- Lecture et gestion du fichier CSV : **4 points**
- Fonctionnalités demandées correctement implémentées : **6 points**
- Structuration, lisibilité et propreté du code : **4 points**

**Note maximale : 20 points**

---

Bon courage à tous !


## Annexe

https://github.com/chouhbik/Data-Analysis-League-of-Legends-Study/blob/master/matchinfo.csv