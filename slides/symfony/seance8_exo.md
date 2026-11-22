## Séance 8

<p style="text-align:center; color:gray;">
  Tanguy Bernard
</p>

----

## Crédits

<p style="text-align:left;">
Ce cours est adapté à partir du travail original de<br>
<strong>David Annebicque</strong>
</p>

<p style="text-align:left;">
Lien : <a href="https://cours.davidannebicque.fr/symfony" target="_blank" rel="noopener">https://cours.davidannebicque.fr/symfony</a>
</p>

----

<div style="max-height: 500px; overflow-y: auto; border: 1px solid #ccc; padding: 10px; font-size: 0.7em;">

Ajoutez une entité "Auteur" comprenant les champs suivant :

* Nom
* Prénom
* Email
* droit (auteur/administrateur)

Un auteur peut publier des posts, modifier ses posts.

Un auteur avec des droits administrateurs peut modifier tous les posts, et gérer les catégories.

Modifiez l'entité post pour lui ajouter un auteur et sauvegardé l'auteur dans le post (dans un premier temps on fera une liste déroulante des auteurs)

Créer un formulaire pour pouvoir ajouter des auteurs.

</div>

----

### Etapes

<div style="max-height: 500px; overflow-y: auto; border: 1px solid #ccc; padding: 10px; font-size: 0.7em;">


* Créer l'entité auteur (make:entity)
    * Ajouter les 4 champs (nom, prénom, email, droit)
    * Mettre à jour la base de données (bin/console d:s:u -f depuis docker)
* Créer un contrôleur ou lancer la commande make:crud sur auteur
    * Créer ou améliorer le formulaire avec les labels des champs, le mettre en forme en utilisant un thème.
* Modifier l'entité post pour faire une relation avec auteur
    * make:entity sur Post
    * La relation est de type ManyToOne
* Modifier le formulaire (PostType) pour ajouter une liste déroulante avec les auteurs (entity Auteur)

</div>