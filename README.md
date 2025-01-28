### Instruction on running project:
- Clone project from github
- Rename .env.eaxample to .env
- Configure DB details on .env file:
    - DB_CONNECTION=mysql
    - DB_HOST=127.0.0.1
    - DB_PORT=3306
    - DB_DATABASE=car4sure_db
    - DB_USERNAME=root
    - DB_PASSWORD=
- Configure the app url and app name (Optional):
    - APP_NAME=Care4Sure
    - APP_URL=https://Car4Sure.test

### Run these commands on termnial:
- composer install
- php artisan optimize:
- php artisan key:generate
- php artisan migrate
- php artisandb:seed
- npm install
- npm run dev
- php artisan serve (optional depending on which local server you are using)

### Open app url and you can register. 

### Technologies I used to build app
    - Laravel 11 
    - React & Inertia (makes it easy to make requests to server-side, efficient for updates ensuring faster rendering, reusable components)
    - MySQL
    - PHP 8.2.22

