CREATE TABLE order_products (
  order_id   INTEGER NOT NULL REFERENCES orders(id) ,
  product_id INTEGER NOT NULL REFERENCES products(id) ,
  quantity   INTEGER NOT NULL ,
  PRIMARY KEY(order_id, product_id)
);