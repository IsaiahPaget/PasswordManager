if ! [ -f "./src/.env" ]; then
	"MSSQL_PASSWORD=<replace_me>" >> ./src/.env
	"MSSQL_CONNECTIONSTRING=Data Source=passwordmanager.db, 1433;Initial Catalog=passwordmanager.logins;User ID=sa;Password=<replace_me_with_the_same_as_above>;Trust Server Certificate=True" >> ./src/.env
fi

if ! [ -f "./src/PasswordManager.Client/.env" ]; then
	"VITE_API_URL=http://localhost:8080/api" >> ./src/PasswordManager.Client/.env
	"# over replace the url with the ip of the server it's running on" >> ./src/PasswordManager.Client/.env
fi

echo "Now go update the passwords in src/.env and src/PasswordManager.Client/.env. Also change the signing key in src/PasswordManager.Web/appsettings.json"
