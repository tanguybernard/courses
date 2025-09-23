

# 📝 Examen – Java Avancé : Programmation Orientée Objet & Intégration API

**Thème : Star Wars**
**Durée : 1h30**

---

## 🎯 Contexte

Vous devez développer une application capable d’analyser les personnages de l’univers Star Wars. L’objectif est de concevoir un modèle orienté objet pertinent, de récupérer des données via l’API SWAPI et d’effectuer un traitement spécifique.

---

## 📌 Travail demandé


### 0. Structure

Vous devez rendre un projet avec cette structure (format zip)

nom-prenom-examen-java/
│
├── src/
│   ├── main/
│   │   └── java/        # Code source Java principal
│   └── test/
│       └── java/        # Code source des tests unitaires
│
├── pom.xml              # Fichier de configuration Maven (si Maven)
├── build.gradle         # Fichier de configuration Gradle (si Gradle)
└── README.md            # Documentation du projet



### 1. Modélisation orientée objet

Concevez un modèle Java pour représenter les personnages de Star Wars.

* Réfléchissez aux types de personnages, à leurs caractéristiques communes et leurs différences.
* Vous devrez utiliser au moins un mécanisme d’héritage (classe abstraite, interface, etc.) pour structurer votre modèle.
* Pensez à exploiter le polymorphisme pour les comportements communs ou spécifiques.

### 2. Récupération des données

* Récupérez les 15 premiers personnages depuis l'une des API :

- https://swapi.info/api
- https://www.swapi.tech/api

* Pour chaque personnage, récupérez au minimum :

  * Le nom
  * Le genre
  * La taille
  * La planète d’origine (en effectuant la requête sur le lien `homeworld` fourni)
* Instanciez les objets de votre modèle avec ces données.

### 3. Traitement métier

#### 🧩 Présentation des personnages

Ajoutez une méthode presentation() dans la classe de base ou une interface, puis redéfinissez-la dans chaque sous-classe pour personnaliser le message.
Écrivez un traitement qui parcourt la liste de tous les personnages et appelle cette méthode sur chacun d’eux, 
afin d’afficher leur présentation adaptée (par exemple pour différencier un humain d'un droide).

#### 🪐 Nombre de personnages par planète

Écrivez une fonction qui regroupe ces personnages par planète d’origine.
La fonction retournera une structure qui associe à chaque nom de planète la liste des personnages qui en sont originaires.

#### ➕ Calcul de moyenne de taille par planète 
Pour chaque planète d’origine, calculez la taille moyenne des personnages originaires de cette planète.

Affichez un message clair du type :

    Planète : Tatooine – Taille moyenne des personnages : 175 cm

#### 📏 Personnages les plus grands
Identifiez le ou les personnages les plus grands parmi les 12 récupérés.

Affichez un message clair du type :

    Personnage le plus grand : Chewbacca (228 cm)

---

### 4. Tests unitaires (Bonus)

* Écrivez au moins deux tests unitaires validant vos traitements métiers.
* L’utilisation de JUnit est un plus.

---

## 📊 Barème

* Modélisation orientée objet (héritage, abstraction, polymorphisme) : 6 points
* Intégration avec l’API : 5 points
* Traitement métier (regroupement) : 4 points
* Clarté et organisation du code : 3 points
* Tests unitaires : 2 points (+1 bonus si JUnit bien utilisé)

