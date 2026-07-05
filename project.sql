USE foodsaver;

DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS food;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    userid BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL
);

CREATE TABLE food (
    foodid BIGINT AUTO_INCREMENT PRIMARY KEY,
    foodname VARCHAR(100) NOT NULL,
    quantity INT NOT NULL,
    price INT NOT NULL,
    expire_time BIGINT NOT NULL,
    location VARCHAR(100) NOT NULL,
    active_status ENUM('ACTIVE','INACTIVE') NOT NULL,
    provider_id BIGINT NOT NULL,
    CONSTRAINT fk_food_provider
        FOREIGN KEY (provider_id)
        REFERENCES users(userid)
        ON DELETE CASCADE
);

CREATE TABLE orders (
    order_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    quantity INT NOT NULL,
    order_time BIGINT NOT NULL,
    food_id BIGINT,
    user_id BIGINT,
    CONSTRAINT fk_order_food
        FOREIGN KEY (food_id)
        REFERENCES food(foodid)
        ON DELETE SET NULL,
    CONSTRAINT fk_order_user
        FOREIGN KEY (user_id)
        REFERENCES users(userid)
        ON DELETE SET NULL
);

INSERT INTO users(name,email,password,role)
VALUES
('Provider One','provider@mail.com','1234','PROVIDER'),
('User One','user@mail.com','1234','USER');

INSERT INTO food(foodname,quantity,price,expire_time,location,active_status,provider_id)
VALUES
('Pizza',10,100,UNIX_TIMESTAMP()+3600,'Hostel A','ACTIVE',1),
('Burger',5,50,UNIX_TIMESTAMP()+7200,'Hostel B','ACTIVE',1);

INSERT INTO orders(quantity,order_time,food_id,user_id)
VALUES
(2,UNIX_TIMESTAMP(),1,2),
(1,UNIX_TIMESTAMP(),2,2);

COMMIT;