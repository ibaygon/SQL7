# Arquitectura de datos

## ¿Qué significa que `category_id` sea una foreign key?

Una foreign key (clave foránea) es una columna que establece un vínculo entre
dos tablas. En nuestro caso, `products.category_id` debe contener un valor que
exista en `categories.id`. El motor de base de datos garantiza esta restricción
automáticamente: es imposible insertar un producto con una categoría que no existe.

## ON DELETE CASCADE vs ON DELETE RESTRICT

Hemos elegido ON DELETE RESTRICT porque es el comportamiento más seguro en
un sistema de inventario.

- ON DELETE RESTRICT: impide borrar una categoría si tiene productos asociados.
  Obliga al desarrollador a gestionar los productos primero. Evita pérdidas de datos accidentales.

- ON DELETE CASCADE: borraría automáticamente todos los productos de esa categoría
  al eliminar la categoría. Peligroso en producción: un error eliminaría datos reales
  de forma irreversible.

En un e-commerce, perder todos los productos de "Electrónica" por un DELETE
accidental sería un desastre. RESTRICT nos fuerza a ser explícitos.