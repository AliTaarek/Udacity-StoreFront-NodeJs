# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index => http://localhost:3000/products    => get
- Show => http://localhost:3000/products/:id => get
- Create [token required] => http://localhost:3000/products/create => post
- update [token required] => http://localhost:3000/products/:id    => put
- delete [token required] => http://localhost:3000/products/:id    => delete
- [OPTIONAL] Products by category (args: product category) => http://localhost:3000/products/:catagory => get

#### Users
- Index [token required] => http://localhost:3000/users          => get
- Show [token required] => http://localhost:3000/users/:id       => get
- Create  => http://localhost:3000/users/create                  => post
- login => http://localhost:3000/users/login                   => post
- update [token required] => http://localhost:3000/users/:id     => put

#### Orders
- create order [token required] => http://localhost:3000/orders/create   => post
    ( You should send order with array of products each product contains => product_id and quantity
      and also i get the id of the user creating the order from authentication function )
- Current Order by user [token required] => http://localhost:3000/orders/user => get
    ( you don't need to send user id as i mentioned in the above method )
- [OPTIONAL] get user completed order [token required] => http://localhost:3000/orders/user/completed  => get



## Data Shapes
#### Product
 Columns      |            Type
------------- | --------------------------
    id        |     integer
    name      |     varchar(100)
    price     |     integer
    category  |     varchar(100)


#### User
 Columns       |            Type
-------------  | --------------------------
  id           |     integer
  first_name   |    varchar(100)
  last_name    |     varchar(100)
  user_name    |     varchar(100)
  password     |     varchar(100)

 
#### Orders
 Columns      |            Type
------------- | -----------------------
  id          |     integer
  user_id     |     integer (fkey)
  status      |     orderstatus (type)

### status type
 Columns      |            Type
------------- | -------------------------------
 orderstatus  |     ENUM('active', 'completed')

#### Order_products
 Columns      |        Type
------------- | ------------------
  order_id    |     integer (fkey)
  product_id  |     integer (fkey)
  quantity    |     integer