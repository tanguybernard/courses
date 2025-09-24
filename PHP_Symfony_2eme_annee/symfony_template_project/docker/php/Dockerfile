FROM php:8.2-fpm

# Installer dépendances système et extensions PHP
RUN apt-get update && apt-get install -y \
    git unzip libicu-dev libpq-dev libzip-dev zip \
    && docker-php-ext-install intl pdo pdo_mysql zip opcache \
    && pecl install apcu \
    && docker-php-ext-enable apcu

# Installer Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/symfony
