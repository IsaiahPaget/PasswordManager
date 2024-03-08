# PasswordManager

Modular open source password manager. The api for the server should be decoupled and accessible from
any client as I have plans to make a mobile, desktop and chrome extension.

The goal of this project is to advance my knowledge of security and full stack development
and as a by-product have a password manager that can be easily deployed by anyone with a server.

## The API

Every example is JSON sent in the body of the HTTP request

### Register
POST: https://www.host/auth/register
```
{
    "lastName": "john",
    "firstName": "smith",
    "masterPassword": "Sup3rSeCUr3P@$$Word",
    "email": "john.s@mail.com"
}
```

Returns a the user if successfull

### Login
POST: https://www.host/auth/login
```
{
    "lastName": "john",
    "firstName": "smith",
    "masterPassword": "Sup3rSeCUr3P@$$Word",
    "email": "john.s@mail.com"
}
```

Returns the whole user including the id without the master password

### Get Vault
POST: https://www.host/vault/
```
{
    "lastName": "john",
    "firstName": "smith",
    "masterPassword": "Sup3rSeCUr3P@$$Word",
    "email": "john.s@mail.com"
}
```
Returns the all the details from every login

### Create Login
POST: https://www.host/vault/new
```
{
    "auth": {
        "lastName": "john",
        "firstName": "smith",
        "masterPassword": "Sup3rSeCUr3P@$$Word",
        "email": "john.s@mail.com"
    },
    "login": {
        "loginName": "blah",
        "loginUrl": "https://youtube.com",
        "loginPassword": "password123"
    }
}
```

Returns the login id which is needed for updating and deleting a login

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
