
# Installation

docker-compose up -d --build

## Creation du projet

docker-compose run --rm php composer create-project symfony/skeleton:"7.3.x" .

## See

http://localhost:8009/


## Security / Authentication

Login

    docker-compose run --rm php bin/console make:security:form-login

Register

    docker-compose run --rm php bin/console make:registration-form


Pour tester : mail shodo, password : admin1234


### Créer un utilisateur Admin

    php bin/console security:hash-password

➡️ Saisis un mot de passe, récupère le hash

Puis :


    php bin/console doctrine:query:sql "INSERT INTO user (email, roles, password) VALUES ('admin@example.com', '["ROLE_ADMIN"]', '<LE_HASH>');"


Dans Docker :

Attention dans Docker  le hash, on doit echapper les caractères spéciaux  pour indiquer au système qu’il doit être interprété comme un caractère normal.

Exemple ici : \$2y\$13\$

    docker-compose run --rm php bin/console doctrine:query:sql "INSERT INTO user (email, roles, password) VALUES ('admin@example.com', '[\"ROLE_ADMIN\"]', '\$2y\$13\$7VBGx0Ti2hVpGlHA9/eDReYpurXp97pM5l7TvxudcrABKh3g9sLyG');"

Pour tester : admin@example.com , password : admin1234

## ORM / Entity

Création de la base :

    php bin/console doctrine:database:create

Création d'une entité liée à une table


    php bin/console make:entity Product

Création de la migration pour le Product

    php bin/console make:migration

Execution de la migration

    php bin/console doctrine:migrations:migrate



## Formulaire

    php bin/console make:form ProductType


> Choisir Product


Dans src/Form un fichier ProductType.php est créé


## ManyToOne


    php bin/console make:entity Comment

Ajouter les annotations aux Comment et Product


Générer le fichier de migration

    php bin/console make:migration

Appliquer la migration

    php bin/console doctrine:migrations:migrate