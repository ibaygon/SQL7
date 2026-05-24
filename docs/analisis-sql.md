# Análisis SQL

## INNER JOIN
Devuelve solo filas donde hay coincidencia en ambas tablas.

Ejemplo real:
Mostrar productos que sí tienen categoría asignada.

## LEFT JOIN
Devuelve todas las filas de la tabla izquierda, aunque no tengan coincidencia.

Ejemplo real:
obtener todas las categorías, incluso las que no tienen
productos aún. Útil para un panel de administración que muestre categorías vacías.

```sql
SELECT c.name AS categoria, COUNT(p.id) AS total_productos
FROM categories c
LEFT JOIN products p ON c.id = p.category_id
GROUP BY c.name;
```

Si usáramos INNER JOIN aquí, las categorías sin productos desaparecerían del resultado.