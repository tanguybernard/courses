
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