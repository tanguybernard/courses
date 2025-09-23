Voici l'exercice 1 détaillé, suivi d’une **solution complète en Java avec iText 7**.

---

## 🧾 **Exercice 1 : Génération d’un devis PDF avec iText**

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

### 📄 Code complet :

```java
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.*;
import com.itextpdf.layout.property.UnitValue;
import com.itextpdf.layout.property.TextAlignment;

import java.io.File;
import java.time.LocalDate;
import java.util.List;

public class DevisPdfGenerator {

    public static void main(String[] args) throws Exception {
        Client client = new Client("Dupont SARL", "42 avenue de la République, 75011 Paris");
        List<Article> articles = List.of(
            new Article("Imprimante HP", 2, 150.0),
            new Article("Câble USB", 5, 10.0),
            new Article("Écran 24\"", 1, 199.99)
        );

        generateDevisPdf(client, articles);
    }

    public static void generateDevisPdf(Client client, List<Article> articles) throws Exception {
        String date = LocalDate.now().toString();
        String filename = "devis_" + client.getNom().replaceAll("\\s+", "_") + "_" + date + ".pdf";

        PdfWriter writer = new PdfWriter(new File(filename));
        PdfDocument pdf = new PdfDocument(writer);
        Document doc = new Document(pdf);

        // En-tête
        Paragraph header = new Paragraph("Ma Société")
                .setBold()
                .setFontSize(20)
                .setTextAlignment(TextAlignment.CENTER);
        doc.add(header);

        doc.add(new Paragraph("Date : " + date));
        doc.add(new Paragraph("Client : " + client.getNom()));
        doc.add(new Paragraph("Adresse : " + client.getAdresse()).setMarginBottom(10));

        // Tableau des articles
        Table table = new Table(UnitValue.createPercentArray(new float[]{4, 2, 2, 2}))
                .useAllAvailableWidth();

        table.addHeaderCell("Article");
        table.addHeaderCell("Quantité");
        table.addHeaderCell("Prix unitaire");
        table.addHeaderCell("Total");

        double total = 0;
        for (Article a : articles) {
            double totalArticle = a.getQuantite() * a.getPrixUnitaire();
            total += totalArticle;

            table.addCell(a.getNom());
            table.addCell(String.valueOf(a.getQuantite()));
            table.addCell(String.format("%.2f €", a.getPrixUnitaire()));
            table.addCell(String.format("%.2f €", totalArticle));
        }

        doc.add(table);

        doc.add(new Paragraph("Total TTC : " + String.format("%.2f €", total))
                .setBold()
                .setTextAlignment(TextAlignment.RIGHT)
                .setMarginTop(10));

        doc.add(new Paragraph("Note : Devis valable 30 jours.")
                .setItalic()
                .setFontSize(10)
                .setMarginTop(20));

        doc.close();

        System.out.println("PDF généré : " + filename);
    }
}

class Client {
    private final String nom;
    private final String adresse;

    public Client(String nom, String adresse) {
        this.nom = nom;
        this.adresse = adresse;
    }

    public String getNom() { return nom; }
    public String getAdresse() { return adresse; }
}

class Article {
    private final String nom;
    private final int quantite;
    private final double prixUnitaire;

    public Article(String nom, int quantite, double prixUnitaire) {
        this.nom = nom;
        this.quantite = quantite;
        this.prixUnitaire = prixUnitaire;
    }

    public String getNom() { return nom; }
    public int getQuantite() { return quantite; }
    public double getPrixUnitaire() { return prixUnitaire; }
}
```

---

### 📌 Remarques pédagogiques :

* **Travail par binôme** : un fait la partie objets métier, l'autre gère la génération du PDF.


