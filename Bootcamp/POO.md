# POO

## Analogie du Gateau

### 1. La Classe (Class) = La Recette

Imaginez que vous avez une fiche de cuisine plastifiée. C'est votre **Recette**.

* Sur cette fiche, il est écrit qu'il faut de la farine, des œufs et du sucre.
* Il est écrit comment mélanger et combien de temps cuire.
* **Point clé :** Vous ne pouvez pas manger la fiche de recette. Ce n'est qu'un **plan**, un modèle abstrait.

> **En POO :** Une `Classe` est ce plan. Elle définit ce que l'objet *sera*, mais elle n'existe pas encore en mémoire vive comme donnée utilisable.

### 2. L'Objet (Object) = Le Gâteau

Maintenant, vous sortez vos ustensiles, vous suivez la recette et vous produisez un vrai gâteau au chocolat posé sur la table.

* C'est une **Instance** de la recette.
* Vous pouvez utiliser la *même* recette pour faire 3 gâteaux différents : un pour vous, un pour votre voisin, un pour la fête. Ils sont distincts (si je mange le mien, le vôtre est toujours entier), mais ils sont basés sur le même modèle.

> **En POO :** Un `Objet` est l'instance concrète de la classe. C'est lui qui prend de la place en mémoire.

### 3. Les Attributs (Attributes) = Les Ingrédients et Caractéristiques

Chaque gâteau a des spécificités définies par la recette, mais dont les valeurs peuvent changer d'un gâteau à l'autre.

* `saveur` = "Chocolat" ou "Vanille"
* `nombre_etages` = 1 ou 3
* `est_cuit` = Faux (au début) ou Vrai (à la fin)

> **En POO :** Ce sont les **variables** stockées à l'intérieur de l'objet. Elles décrivent son **état**.

### 4. Les Méthodes (Methods) = Les Actions

Ce sont les choses que l'on peut faire avec le gâteau ou que le gâteau peut faire.

* `mélanger()` : Une action qui change l'état des ingrédients.
* `cuire()` : Une action qui change l'attribut `est_cuit` de *Faux* à *Vrai*.
* `manger()` : Une action qui réduit la taille du gâteau.

> **En POO :** Ce sont les **fonctions** définies à l'intérieur de la classe. Elles définissent le **comportement**.

---

```injectablephp
<?php

// 1. LA CLASSE (La Recette)
class Gateau {
    
    // 2. LES ATTRIBUTS (Les Ingrédients / État)
    // "public" signifie que tout le monde peut voir la saveur
    public string $saveur; 
    
    // "private" signifie qu'on ne peut pas modifier la cuisson manuellement
    // (Encapsulation : on protège le fonctionnement interne)
    private bool $estCuit; 

    // 3. LE CONSTRUCTEUR (L'étape de préparation initiale)
    // Cette fonction s'exécute automatiquement quand on fait "new"
    public function __construct(string $saveurChoisie) {
        $this->saveur = $saveurChoisie;
        $this->estCuit = false; // Par défaut, le gâteau est cru
        echo "Préparation d'un gâteau saveur : " . $this->saveur . "<br>";
    }

    // 4. LES MÉTHODES (Les Actions)
    public function cuire() {
        echo "Le gâteau au " . $this->saveur . " entre au four...<br>";
        $this->estCuit = true; // On change l'état interne
    }

    // Une méthode pour vérifier l'état (car $estCuit est privé)
    public function estPret() {
        if ($this->estCuit) {
            return "Le gâteau est prêt à être mangé !";
        } else {
            return "Pas touche ! Il est encore cru.";
        }
    }
}

// --- UTILISATION (Côté Pâtissier) ---

// Création de l'OBJET (L'Instance)
// C'est ici qu'on utilise la recette pour créer un vrai gâteau
$monGateau = new Gateau("Chocolat"); 

echo "<hr>";

// Utilisation des méthodes
echo $monGateau->estPret() . "<br>"; // Il est cru
$monGateau->cuire();                 // On lance l'action de cuire
echo $monGateau->estPret() . "<br>"; // Maintenant il est cuit

?>
```


---

### 5. Concepts Avancés

Pour aller plus loin, voici comment les piliers de la POO s'appliquent à notre cuisine :

#### Le Constructeur (Constructor)

C'est le moment exact où vous cassez les œufs et versez la farine dans le bol. C'est l'initialisation. En code, on dirait : `mon_gateau = nouveau Gateau("Chocolat")`. On "construit" l'objet pour qu'il soit prêt à être utilisé.

#### L'Encapsulation (Encapsulation)

Imaginez un minuteur sur votre four.

* **Public :** Vous pouvez tourner la molette pour mettre "45 minutes". C'est l'interface que vous avez le droit de toucher.
* **Privé :** Vous ne touchez pas aux fils électriques et à l'électronique *à l'intérieur* du four pour le faire chauffer. C'est caché pour votre sécurité et pour que le four fonctionne bien.
* De même, on ne veut pas que quelqu'un puisse changer l'attribut `est_cuit` sans passer par la méthode `cuire()`.

#### L'Héritage (Inheritance)

Vous avez votre recette de base "Gâteau".
Maintenant, vous voulez faire un "Gâteau d'Anniversaire".

* Il a tout ce qu'un gâteau normal a (farine, sucre, méthode `cuire`).
* **Mais** il a des choses en plus : un attribut `nombre_bougies` et une méthode `souffler_bougies()`.
* Le "Gâteau d'Anniversaire" **hérite** du "Gâteau". Pas besoin de réécrire toute la recette de base.

```injectablephp
// La classe Parent (déjà vue)
class Gateau {
    protected string $saveur; // "protected" = accessible par les enfants (contrairement à private)

    public function __construct($saveur) {
        $this->saveur = $saveur;
    }

    public function cuire() {
        echo "Le gâteau " . $this->saveur . " cuit...<br>";
    }
}

// La classe Enfant
class GateauAnniversaire extends Gateau {
    public int $bougies;

    public function __construct($saveur, $nombreBougies) {
        // On appelle le constructeur du Parent pour gérer la saveur
        parent::__construct($saveur); 
        $this->bougies = $nombreBougies;
    }

    public function feter() {
        echo "Joyeux Anniversaire ! On souffle les " . $this->bougies . " bougies !<br>";
    }
}

$anniv = new GateauAnniversaire("Fraise", 25);
$anniv->cuire(); // Hérité du parent !
$anniv->feter(); // Spécifique à l'enfant
```

#### Le Polymorphisme (Polymorphism)

Le Polymorphisme, c'est la capacité de votre code à manipuler n'importe quel objet sans savoir ce que c'est, du moment qu'il respecte le contrat.


La fonction encaisser, c'est elle qui acceptera plusieurs objets (poly) 
avec des formes (morphe) qui respecent un même contrat.

```injectablephp
// 1. DÉFINITION DU CONTRAT
// Tout objet qui implémente ceci promet qu'il saura donner son prix.
interface Vendable {
    public function getPrix();
}

// 2. LES OBJETS (Qui n'ont rien à voir entre eux)

// Le Gâteau signe le contrat
class Gateau implements Vendable {
    public function getPrix() {
        return 15.00; // Code spécifique au gâteau
    }
}

// Le Livre signe le même contrat
class LivreCuisine implements Vendable {
    public function getPrix() {
        return 29.99; // Code spécifique au livre
    }
}

// 3. L'UTILISATION PUISSANTE (Polymorphisme via Interface)

class CaisseEnregistreuse {
    // Regardez le type demandé ici : "Vendable"
    // La caisse accepte N'IMPORTE QUOI tant que c'est "Vendable"
    public function encaisser(Vendable $article) {
        echo "Bip ! Article scanné : " . $article->getPrix() . "€<br>";
    }
}

// Action !
$monGateau = new Gateau();
$monLivre = new LivreCuisine();
$laCaisse = new CaisseEnregistreuse();

$laCaisse->encaisser($monGateau); // Affiche : 15€
$laCaisse->encaisser($monLivre);  // Affiche : 29.99€
```

### Abstraction

**L'abstraction, c'est définir l'action globale (le QUOI) mais forcer l'enfant à fournir le détail précis (le COMMENT).**

Dans notre exemple :

1. **Le Parent (Abstrait)** impose la règle : *"Tout gâteau doit passer au four."*
2. **L'Enfant (Concret)** fournit la variable manquante : *"Pour moi, c'est 12 minutes."*

C'est une **recette à trous** que l'enfant est obligé de remplir.


```injectablephp
<?php

// 1. LA CLASSE ABSTRAITE (Le Modèle)
abstract class GateauChocolat {
    
    // --- MÉTHODE CONCRÈTE (Le Processus Global) ---
    // Tous les gâteaux au chocolat suivent cette procédure.
    // On ne la code qu'une seule fois ici.
    public function lancerCuisson() {
        echo "🔥 Four préchauffé à 180°C.<br>";
        
        // APPEL DE L'ABSTRACTION :
        // Le parent demande : "Combien de temps je dois régler le minuteur ?"
        $minutes = $this->getTempsDeCuisson();
        
        echo "⏳ Le gâteau cuit pendant " . $minutes . " minutes.<br>";
        
        // Logique visuelle basée sur le temps (juste pour l'exemple)
        if ($minutes < 15) {
            echo "✨ Résultat : Le cœur est encore liquide !<br>";
        } else {
            echo "🍞 Résultat : Le gâteau est bien gonflé et tout tendre.<br>";
        }
        echo "-----------------------------------<br>";
    }

    // --- MÉTHODE ABSTRAITE (Le "Trou") ---
    // On force les enfants à donner un nombre entier (int).
    abstract public function getTempsDeCuisson(): int;
}

// 2. LES ENFANTS (Les Spécialités)

class Fondant extends GateauChocolat {
    // Le fondant veut rester liquide, il impose un temps court.
    public function getTempsDeCuisson(): int {
        return 12; // 12 minutes
    }
}

class Moelleux extends GateauChocolat {
    // Le moelleux doit être cuit à cœur, il impose un temps plus long.
    public function getTempsDeCuisson(): int {
        return 25; // 25 minutes
    }
}

// 3. EN CUISINE (Exécution)

$monFondant = new Fondant();
$monMoelleux = new Moelleux();

echo "<h3>👨‍🍳 Commande 1 : Un Fondant</h3>";
$monFondant->lancerCuisson(); 
// Le code va chercher "12", donc il dira que le cœur est liquide.

echo "<h3>👨‍🍳 Commande 2 : Un Moelleux</h3>";
$monMoelleux->lancerCuisson(); 
// Le code va chercher "25", donc il dira que le gâteau est tendre.

?>
```

