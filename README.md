# PasswordManager
password manager because lastpass sucks

## Getting started developing

Create a .env file at the root directory of the project and populate it with:
```bash
# in the .env file
# application
NODE_PORT=5432 # can be any port

# database
HOST=localhost # can be the host name of the server you are running mysql on
DATABASE=database-name # chosen name of database
PASSWORD=database-password # chosen password
USER=database-user #chosen username
CONNECTION_TIMEOUT=10000 # in miliseconds

```
Navigate to root directory of the project
``` bash
# in the terminal
# install node modules
npm install

# start dev container
docker-compose up
```
