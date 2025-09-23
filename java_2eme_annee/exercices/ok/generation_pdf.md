

## 🧾 **Exercice : Génération d’un devis PDF avec iText**

### 🎯 Objectif :

Créer une application Java qui génère un **devis** PDF contenant les informations d’un client et une liste d’articles.

---

### 📋 Énoncé :

Vous devez écrire une application Java qui permet de :

1. Créer un objet `Client` (nom, adresse).
2. Créer une liste d’objets `Article` (nom, quantité, prix unitaire).
3. Calculer le **prix total TTC**.
4. Générer un fichier PDF nommé `devis_<client>_<date>.pdf` contenant :

    * Un en-tête avec le nom de l’entreprise ("Ma Société")
    * Les informations du client
    * La date
    * Un tableau des articles
    * Le total
    * Une note de bas de page : "Devis valable 30 jours."

---

### ✅ Contraintes :

* Utiliser la bibliothèque **iText 7**
* Générer un fichier lisible et bien structuré
* Bonus : insérer un logo d'entreprise en haut du PDF (facultatif)

---

## ✅ **Solution Java avec iText 7**

### 📦 Dépendance Maven (iText 7 Core) :

```xml
<dependency>
  <groupId>com.itextpdf</groupId>
  <artifactId>itext7-core</artifactId>
  <version>7.1.15</version>
  <type>pom</type>
</dependency>
```

---

### 📌 Remarques pédagogiques :

* **Travail par binôme** : un fait la partie objets métier, l'autre gère la génération du PDF.


