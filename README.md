# Hoteru

**Technologies used in this project:**

- Angular
- PHP
- Laravel
- PostgreSQL
- Node
- NPM
- Angular Material
- NGX Charts

In order to execute this project you will need to install these technologies.

If you want to install node, npm and Angular you will need to copy and paste
these commands in your terminal:

```bash
sudo apt install nodejs npm
npm install -g @angular/cli
```

If you're using windows or another linux system. Please check Official Angular
page [here](https://angular.io/)

Now to install PHP and laravel you'll need to execute these commands:

```bash
sudo apt install curl php-cli php-mbstring
curl -sS https://getcomposer.org/installer -o composer-setup.php
sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer
```

If you're using windows or another linux system. Please check Official Laravel
page [here](https://laravel.com/)

And you also will need postgreSQL. Please execute the next command in your
terminal:

```bash
sudo apt install postgresql
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

Now you have all we need to use this project. To run backend app please
execute the next command inside **hoteru-backend** directory:

```bash
php artisan serve
```

and to execute client app execute the next command inside **hoteru-frontend**
directory:

```bash
ng s
```

**The client app will be listening in port: 4200.**

