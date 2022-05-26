CREATE TABLE users (
    id serial PRIMARY KEY,
    first_name varchar(100) NOT NULL,
    last_name varchar(100) NOT NULL, 
    user_name varchar(100) NOT NULL,
    password varchar(100) NOT NULL
);