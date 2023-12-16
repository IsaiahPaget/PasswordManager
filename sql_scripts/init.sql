CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT,
    last_name VARCHAR(20),
    first_name VARCHAR(20),
    master_password VARCHAR(255),
    email VARCHAR(255),
    account_created_on DATETIME,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS Ext_Auth (
    id INT AUTO_INCREMENT,
    Ext_Auth_user_id INT,
    Ext_Auth_mac_address VARCHAR(255),
    Ext_Auth_ip VARCHAR(255),
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
)

CREATE TABLE IF NOT EXISTS Logins (
    id INT AUTO_INCREMENT,
    user_id INT,
    Logins_name VARCHAR(255),
    Logins_url VARCHAR(255),
    Logins_password VARCHAR(255),
    Logins_notes VARCHAR(255),
    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES Users(id)
)

INSERT INTO Users (last_name, first_name, master_password, email, account_created_on) VALUES ('Karen', 'Kunts', 'Pa$$w0rd123', 'test@email.com', "1975-1-1");
