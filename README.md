# PasswordManager
password manager because lastpass sucks

## Getting started developing

Create a .env file at the root directory of the project and populate it with:
```bash
# in the .env file
# application
NODE_PORT=5432 # can be any port

# database
HOST=sqldb # the name of the services running the MySQL - check the docker-compose
DATABASE=database-name # chosen name of database - the database on the MySQL server
PASSWORD=database-password # chosen password
USER=database-user #chosen username
CONNECTION_TIMEOUT=10000 # in miliseconds

```
In the terminal - Navigate to root directory of the project:
``` bash
# in the terminal
# optinal - install node modules - you wont get as many lSP features without
npm install

# start dev container
docker-compose up
```
