dotnet ef --startup-project ../PasswordManager.Web/ migrations add $1
dotnet ef --startup-project ../PasswordManager.Web/ database update
