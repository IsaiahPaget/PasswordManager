# PasswordManager

Modular open source password manager. The api for the server should be decoupled and accessible from
any client as I have plans to make a mobile, desktop and chrome extension to act as the client.

The goal of this project is to advance my knowledge of security and end to end development
and as a byproduct have a password manager that can be easily deployed by anyone with a server.

## The API
An examples in Javascript how a client may call this api

These examples use Axios which is a library that needs to be imported, but
you can use any http api or library - [Axios Documentation](https://axios-http.com/docs/api_intro)
#### POST /user/signup
```javascript
const newUser = {
    first_name = "A name",
    last_name = "A last name",
    master_password = "A master_password", // ideally you would want to send this having been hashed on the client side for max security
    email = "An email"
}

try {
    const response = await axios({
        method: "post",
        url: "/user/signup",
        baseURL: `http://${process.env.URL}:${process.env.NODE_PORT}/`,
        data: newUser,
    })
    console.log(response)
} catch (error) {
    console.log(error)
}

// Response will be status 201 if successful
```

#### POST /user/login
```javascript
const newUser = {
    first_name = "A name",
    last_name = "A last name",
    master_password = "A master_password", // ideally you would want to send this having been hashed on the client side for max security
    email = "An email" // used as the "username" to the master_password
}

try {
    const response = await axios({
        method: "post",
        url: "/user/login",
        baseURL: `http://${process.env.URL}:${process.env.NODE_PORT}/`,
        data: newUser,
    })
    console.log(response)
} catch (error) {
    console.log(error)
}

// Reponse will be your vault sent back in JSON
// which will look like this

{
    vault: [
        {
            id: number,
            user_id: number,
            Logins_name: string,
            Logins_password: string,
            Logins_url: string,
            Logins_notes: string,
        },
        //...
    ]
}
```

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
