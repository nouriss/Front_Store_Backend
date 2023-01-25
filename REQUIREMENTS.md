# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
    * read products list:
        - A INDEX route: 'products/' [GET] 
- Show
    * read a product by id
        - A SHOW route: 'products/:id' [GET] 
- Create [token required]
    * create a product
        -  A CREATE route: 'products/' [POST]
            - [x] body : {
                            "name": "Falcon Booster fx1002",
                            "price": 1000,
                            "category": "rocket engine"   
                         } 
            - [x] Authoratization: bearer<JWT>

- Update [token required]
    * update a product
        -  A UPDATE route: 'products/' [PUT]
            - [x] body : {
                            "name": "Falcon Booster fx1002",
                            "price": 1500,
                            "category": "rocket engine"   
                         } 
            - [x] Authoratization: bearer<JWT>

- delete [token required]
    * delete a product
        -  A DELETE route: 'products/:id' [DELETE]
            - [x] body :
            - [x] Authoratization: bearer<JWT>

- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
    * read users list:
        - A INDEX route: 'users/' [GET] 
            - [x] Authoratization: bearer<JWT>
- Show [token required]
    * read a users by id
        - A SHOW route: 'users/:id' [GET] 
            - [x] Authoratization: bearer<JWT>

- Create N[token required]
    * create a users
        -  A CREATE route: 'users/' [POST]
            - [x] body : {
                            "firstname": "zainedin",
                            "lastname": "zidane zizou",
                            "password": "worldCup98", 
                         } 
            - [x] Authoratization: bearer<JWT>
- update N[token required]
    * update a users
        -  A CREATE route: 'users/' [PUT]
            - [x] body : {
                            "firstname": "zainedin",
                            "lastname": "zidane zizou",
                            "password": "worldCup2022", 
                         } 
            - [x] Authoratization: bearer<JWT>

- delete [token required]
    * delete a users
        -  A DELETE route: 'users/:id' [DELETE]
            - [x] body :
            - [x] Authoratization: bearer<JWT>
            
#### Orders
- Index [token required]
    * read orders list:
        - A INDEX route: 'orders/' [GET] 
            - [x] Authoratization: bearer<JWT>
- Show [token required]
    * read an order by id
        - A SHOW route: 'orders/:id' [GET] 
            - [x] Authoratization: bearer<JWT>

- Create [token required]
    * create a order
        -  A CREATE route: 'orders/' [POST]
            - [x] body : {
                            "user_id": 3,
                            "status": "active" 
                         } 
            - [x] Authoratization: bearer<JWT>

- Update [token required]
    * update a order
        -  A UPDATE route: 'orders/' [PUT]
            - [x] body : {
                            "user_id": 3,
                            "status": "complete" 
                         } 
            - [x] Authoratization: bearer<JWT>

- delete [token required]
    * delete a orders
        -  A DELETE route: 'orders/:id' [DELETE]
            - [x] body :
            - [x] Authoratization: bearer<JWT>
            

- AddProduct [token required]
    * add a product to an order
        -  A AddProduct route: 'orders/:orderID/products' [POST]
            - [x] body : {
                            "productId": 1,
                            "quantity": 6,
                            "userId": 1
                         }
            - [x] Authoratization: bearer<JWT>


- Current Order by user (args: user id)[token required]
    * read order by user id
        - A AddProduct route: '/orders/users/:userID' [POST]
            - [x] body : {
                            "orderId": 1,
                            "orderStatus": "active"
                         }
            - [x] Authoratization: bearer<JWT>

    
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
- id
- name
- price
- [OPTIONAL] category

    * Table: Products (
                    id SERIAL PRIMARY KEY, 
                    name VARCHAR(100), 
                    price integer, 
                    category VARCHAR(50)
                    )
#### User
- id
- firstName
- lastName
- password

    * Table: Users (
                    id SERIAL PRIMARY KEY,
                    firstname VARCHAR(100),
                    lastname VARCHAR(100), 
                    password_digest VARCHAR
                );
#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

    * Table: orders (
                    id SERIAL PRIMARY KEY,
                    user_id bigint REFERENCES users(id), 
                    status VARCHAR(100)
                    );
    * Table order_products (
                    id SERIAL PRIMARY KEY,
                    quantity integer,
                    order_id bigint REFERENCES orders(id),
                    product_id bigint REFERENCES products(id)
                    );