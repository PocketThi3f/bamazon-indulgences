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

INSERT INTO products (product_name, department_name, price, stock_quantity)
  VALUES ('Instant Noodles', 'Snacks', 0.75, 300), ('Ruffles', 'Snacks', 0.50, 75),
    ('Gaming Chair', 'Furniture', 129.99, 100), ('Coffee', 'Necessity', 19.99, 150),
    ('Charmin Ultra Soft Toilet Paper', 'Necessity', 22.50, 200), ('Red Bull 12 Pack', 'Necessity', 39.99, 125),
    ('PS4', 'Games/Consoles', 199.99, 150), ('Borderlands', 'Games/Consoles', 19.99, 50),
    ('New Nintendo 3DS XL', 'Games/Consoles', 297.95, 175), ('Reclining Sofa', 'Furniture', 1200.00 , 100)
    
SELECT * FROM products;
    
SELECT item_id, department_name FROM products
GROUP BY department_name, item_id;