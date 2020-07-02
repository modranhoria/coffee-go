Create DB container for dev env

`docker run -d --name mysql-dev -p 3306:3306 -e MYSQL_ROOT_PASSWORD=coffee -e MYSQL_DATABASE=coffee_db -e MYSQL_USER
=coffee -e MYSQL_PASSWORD=coffee -v $HOME/mysql:/var/lib/mysql mysql:8.0.20`