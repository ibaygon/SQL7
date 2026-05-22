# Arquitectura de Datos

## Foreign Key: category_id
El campo `category_id` en la tabla `products` es una clave foránea que garantiza que cada producto pertenece a una categoría válida.

Esto asegura integridad referencial: no puede existir un producto con una categoría inexistente.

## ¿Qué pasa si borramos una categoría con productos asociados?

- **ON DELETE CASCADE** → elimina también los productos asociados.
- **ON DELETE RESTRICT** → impide borrar la categoría si tiene productos.

### Opción más segura
**ON DELETE RESTRICT**, porque evita eliminar datos accidentalmente.
