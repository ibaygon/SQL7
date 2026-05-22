INSERT INTO categories (name, description) VALUES
('Electrónica', 'Dispositivos tecnológicos'),
('Hogar', 'Muebles y decoración');

INSERT INTO products (name, price, stock, category_id)
VALUES
('Televisor', 499.99, 10, (SELECT id FROM categories WHERE name='Electrónica')),
('Sofá', 299.99, 5, (SELECT id FROM categories WHERE name='Hogar'));
