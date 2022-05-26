create type Orderstatus as enum('active', 'completed');
CREATE TABLE orders (
    id serial PRIMARY KEY, 
    user_id INTEGER NOT NULL REFERENCES users(id), 
    status Orderstatus NOT NULL 
)