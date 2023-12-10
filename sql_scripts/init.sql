CREATE TABLE IF NOT EXISTS customers (
    id INT AUTO_INCREMENT,
    username VARCHAR(255),
    master_password VARCHAR(255),
    email VARCHAR(255),
    PRIMARY KEY(id)
);

INSERT INTO customers (username, master_password, email) VALUES ('SAMPLE', 'USER', 'TEST');

CREATE TABLE IF NOT EXISTS logins (
    id INT AUTO_INCREMENT,
    user_id VARCHAR(255),
    password VARCHAR(255),
    url VARCHAR(255),
    comments VARCHAR(255),
    created_on VARCHAR(255),
    PRIMARY KEY(id)
);