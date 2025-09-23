### 🎯 **Exercice : Gestion d'une Médiathèque de Séries et Films**

---

## **Contexte**
Tu es passionné(e) de séries TV et de films, et tu veux créer une application Java pour gérer ta propre médiathèque. Cette application doit te permettre d'ajouter, de consulter et de supprimer des films et des séries. Tu dois organiser ton code de manière **propre** en respectant les principes **SOLID**.

---

## **Objectifs de l'exercice**
1. **Appliquer les concepts SOLID** pour concevoir une application bien structurée.
2. **Séparer la logique métier** de la gestion des données (accès à la base de données via JDBC pur, sans framework).
3. Utiliser **l'héritage** et le **polymorphisme** pour gérer à la fois des séries et des films.
4. Pratiquer les requêtes SQL basiques.

---

## **Fonctionnalités attendues**
L'application doit permettre de :
1. **Ajouter un film** avec les informations suivantes :
    - Titre
    - Année de sortie
    - Genre
    - Note sur 10

2. **Ajouter une série** avec les informations suivantes :
    - Titre
    - Année de sortie
    - Nombre de saisons
    - Statut (terminée ou non)

3. **Afficher toute la médiathèque** (films et séries confondus).
4. **Supprimer un film ou une série** par son identifiant.

---

## **Contraintes techniques**
- Utilisation de **JDBC pur** pour se connecter à une base de données MySQL.
- Respecter les principes **SOLID** pour une architecture propre.
- Séparation stricte entre la couche **d'accès aux données** (repository) et la couche **métier** (service).
- Utilisation d'une interface `Media` pour représenter les films et les séries.
- Créer un dépôt Git pour versionner ton code.

---

## **Modélisation**
1. **Interface Media** : représente un média avec les méthodes `getTitle()`, `getYear()`, etc.
2. **Classes Movie et Series** qui implémentent `Media`.
3. **MediaRepository** (interface) avec les méthodes suivantes :
    - `addMedia(Media media)`
    - `getAllMedia()`
    - `findById(int id)`
    - `deleteMedia(int id)`
4. **Implémentation JDBC** de `MediaRepository`.

---

## **Préparation de la base de données**
- Créer une base de données nommée `media_db` avec deux tables : `movies` et `series`.
- Exemple de création de tables :

```sql
CREATE DATABASE media_db;
USE media_db;

CREATE TABLE movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    year INT,
    genre VARCHAR(50),
    rating DOUBLE
);

CREATE TABLE series (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    year INT,
    seasons INT,
    completed BOOLEAN
);
```

---

## **Consignes supplémentaires**
- Assure-toi de gérer les exceptions liées à la base de données correctement.
- Le code doit être lisible et bien commenté.
- Utilise les **annotations Lombok** (`@Data`, `@AllArgsConstructor`, etc.) pour simplifier la gestion des getters/setters.
- L'application doit être testée avec des exemples concrets.

---

## **Critères d'évaluation**
- Respect des principes **SOLID**.
- Séparation claire des responsabilités (données vs métier).
- Utilisation correcte des concepts d'**héritage** et de **polymorphisme**.
- Cohérence et clarté du code.
- Fonctionnement correct de l'application.

---

## **Idée bonus**
Si tu veux aller plus loin, tu peux ajouter une fonctionnalité de recherche par titre ou de filtre par genre.
