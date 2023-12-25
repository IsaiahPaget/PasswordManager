# PasswordManager

Modular open source password manager

## Contributing

Clone the repo
```bash
# in the terminal
git clone https://github.com/isaiahpaget/PasswordManager.git

# move into the newly cloned repo
cd PasswordManager
```

Create a .env file at the root directory of the project and populate it with:
```bash
# in the .env file
# application
URL=127.0.0.1 # or the ip of the server you are hosting it on
NODE_PORT=5432 # can be any port

# database
HOST=mysqldb # the name of the services running the MySQL - check the docker-compose.yaml
DATABASE=database-name # chosen name of database - the database on the MySQL server
PASSWORD=database-password # chosen password
USER=database-user #chosen username
CONNECTION_TIMEOUT=10000 # in miliseconds
SQL_LOCAL_PORT=3307 # can be any port that is not the NODE_PORT
SQL_DOCKER_PORT=3306 # has to be this because the image is choosing to operate on this port

```
In the terminal - Navigate to root directory of the project:
``` bash
# in the terminal
# optinal - install node modules - you wont get as many lSP features without
npm install

# start dev container
docker-compose build
docker-compose up
```

### Resetting the database
The database has persistant data from docker volumes and so when making changes to the schema, database name and such you may need to reset the database
```bash
# list all the volumes
docker volume ls

# remove the passwordmanager_db
docker volume rm passwordmanager_db

```
