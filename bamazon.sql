CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2),
    stock_quantity INT(100),
    PRIMARY KEY (item_id)
);

DESCRIBE products;

SELECT * FROM products;