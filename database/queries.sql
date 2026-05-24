-- INNER JOIN: producto, precio y nombre de categoria
SELECT p.name AS producto, p.price AS precio, c.name AS categoria
FROM products p
INNER JOIN categories c ON p.category_id = c.id;

-- GROUP BY + COUNT: cuantos productos por categoria
SELECT c.name AS categoria, COUNT(p.id) AS total_productos
FROM categories c
LEFT JOIN products p ON c.id = p.category_id
GROUP BY c.name;