# Séance 1 : Introduction

---

## Présentation

Découvrir et appréhender un framework PHP web.

---

## Pré-requis

* PHP
* Programmation Orientée Objet
* Structure MVC
* Base de données

---

## Rappels des concepts du MVC

![Schéma de principe du MVC](https://1516221045-files.gitbook.io/~/files/v0/b/gitbook-legacy-files/o/assets%2F-LXc8ZoOM6TzFjRK4eHK%2F-LnpDdM8sxOMgq_R1ucV%2F-LnpEh2Ql_WL68DRsMOP%2Fmvc-architecture.png?alt=media\&token=dc88d1dd-1276-43b6-aa9e-91fb8c2cf8a8)

----

### C: Controller / Contrôleur

C'est lui qui reçoit l'interaction (la demande/**request**) du visiteur. Il se charge de récupérer les éléments nécessaires auprès du/des modèle(s). Il transmets toutes les données nécessaires à la vue.

----

### V: View / Vue

C'est lui qui apporte la réponse (**response/render**) au visiteur. Une vue peut être une page web, un fichier pdf, ... Ne se préoccupe que de l'affiche des informations, n'assure aucun traitement

----

### M: Model / Modèle

C'est lui qui s'occupe de récupérer et préparer les données. Le modèle peut être en lien avec une base de données. Le modèle peut être en lien avec des API. Le modèle prépare les données pour qu'elles soient facilement manipulables par la vue.

---

## Notion de Framework

### Définition générale

En programmation informatique, un framework ou structure logicielle est un ensemble cohérent de composants logiciels structurels, qui sert à créer les fondations ainsi que les grandes lignes de tout ou d’une partie d’un logiciel (architecture). 

Note: 
Un framework se distingue d’une simple bibliothèque logicielle principalement par :
* son caractère générique;
* faiblement spécialisé,&#x20;
* contrairement à certaines bibliothèques ;&#x20;

Un framework peut à ce titre être constitué de plusieurs bibliothèques chacune spécialisée dans un domaine. Un framework peut néanmoins être spécialisé, sur un langage particulier, une plateforme spécifique, un domaine particulier : reporting, mapping, etc. ;

Le cadre de travail (traduction littérale de l’anglais : *framework*) qu’il impose de par sa construction même, guidant l’architecture logicielle voire conduisant le développeur à respecter certains patterns (modèle de conception) ; les bibliothèques le constituant sont alors organisées selon le même paradigme.

----

## Symfony

<img src="./symfony/assets/symfony_logo.png" width="600" height="200" />

----

* Framework MVC en PHP 5 (V2), PHP 7 (V3, V4 et V5 ), PHP8 (V6) libre
* Développé en 2005 par la société Sensio pour répondre à ses besoins
* Division de la société Sensio en deux entités l’agence Web et l’entreprise qui soutient et maintient Symfony : SensioLabs, dirigée par Fabien Potencier, l’auteur de Symfony
* Framework français !, De renommée mondiale
* Premier framework en France et en Europe

----

### SYMFONY : AVANTAGES

* Connectable à presque tous les SGBD
* De nombreux Bundles, contributeurs, utilisateurs
* Moteur de template puissant et simple
* Depuis la V4, Symfony est très léger et très rapide

<img src="./symfony/assets/symfony_release_calendar.png" width="500" height="300" />



Note:
https://symfony.com/releases

---

### Symfony V4 : Un retour aux bases

Avec sa version 4 (et suivante), Symfony à pris un virage important par rapport aux précédentes versions, et se rapproche des "standards" de la majorité des framework, mais à aussi grandement optimisé son poids et sa vitesse d'exécution. Dans une grande logique de simplification Symfony à également automatisé de nombreux mécanismes qui auparavant auraient impliqués de nombreuses lignes de configuration.

----

#### SKELETON ET FLEX

La version **Skeleton** de Symfony : Apporte un framework Symfony très léger, avec le minimum pour faire fonctionner un controller.

La version 4 de Symfony introduit Flex qui est un gestionnaire de "recipes" (recettes), qui permet l'ajout de fonctionnalité à Symfony (gestionnaire de vue, de base de données, d'email, ...) avec un mécanisme d'auto-configuration de ces "bundles". Cela permet donc de fournir par défaut un framework très léger, avec une grande facilité pour lui ajouter tous les composants nécessaires, sans en mettre plus que nécessaire.

Par défaut Symfony version Skeleton ne sais rien faire ! Par contre, il n'embarque pas des dizaines de Bundles dont vous n'aurez peut être jamais besoin (fonctionnement des versions 2 et 3 avec plus de 46 bundles par défaut, contre 10 aujourd'hui).

Grâce à Flex vous installez rapidement le nécessaire pour répondre à votre projet.


----

### Symfony V5 : Continuer vers la simplification et la standardisation <a href="#symfony-v4-un-retour-aux-bases" id="symfony-v4-un-retour-aux-bases"></a>

Avec sa version 5 (et suivante), Symfony continue sa simplification en facilitant l'usage de nombreux composants redéfinis et devenus génériques.

Note:
Une lecture intéressante sur la logique d'évolution du framework Symfony : <https://www.disko.fr/reflexions/technique/symfony-4-4-5-0-les-nouveautes-venir/>



----

## Installations (SF6)

### Configuration requise pour votre serveur

* Un serveur Web
* PHP 8.1 ou supérieur
* [Git (différent de GitHub)](https://git-scm.com/)
* Le gestionnaire de dépendance [Composer](https://getcomposer.org/)
* ou Le nouveau gestionnaire d'installation de Symfony : <https://symfony.com/download>
* Une maîtrise de son système d'exploitation ! (fichiers cachés, variables PATH, php.ini, console...)

Note:
Vous pouvez suivre aussi les éléments de la documentation officielle : <https://symfony.com/doc/current/setup.html>
