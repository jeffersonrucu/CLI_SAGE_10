FROM wordpress:6.2.2-php8.2

# Instalar dependências do Composer, Node.js e Yarn
RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    gnupg2 \
    && rm -rf /var/lib/apt/lists/*

# Instalar o Composer
RUN wget -q https://getcomposer.org/installer -O composer-setup.php \
    && php composer-setup.php --install-dir=/usr/local/bin --filename=composer \
    && rm composer-setup.php

# Instalar o WP-CLI
RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
    && chmod +x wp-cli.phar \
    && mv wp-cli.phar /usr/local/bin/wp

# Configure the container to run as the same user as the host user
ARG USER_ID=1000
ARG GROUP_ID=1000
RUN groupmod -g ${GROUP_ID} www-data && \
    usermod -u ${USER_ID} -g ${GROUP_ID} www-data

# Definir o diretório de trabalho para o diretório do WordPress
WORKDIR /var/www/html
