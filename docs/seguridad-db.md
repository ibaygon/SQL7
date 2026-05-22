# Seguridad en la Capa de Persistencia

## 1. ¿Qué es una inyección SQL?

La inyección SQL es una vulnerabilidad que ocurre cuando los datos proporcionados por el usuario se insertan directamente en una consulta sin validación ni separación entre código y datos.  
Esto permite que un atacante modifique la consulta original.

### Ejemplo vulnerable

```ts
const userId = req.body.id; // Entrada manipulable: "1 OR 1=1"
const query = `SELECT * FROM users WHERE id = ${userId}`;
const result = await db(query);
```

Un atacante podría enviar:
1 OR 1=1
Y obtener todos los usuarios.

--- 

## 2. Consultas parametrizadas
Las consultas parametrizadas separan la consulta del dato.
El driver envía:
- La consulta SQL
- Los valores por canales distintos.

Esto neutraliza cualquier intento de inyección.

### Ejemplo seguro

```ts
const { name, price, category_id } = body;

await db`
  INSERT INTO products (name, price, category_id)
  VALUES (${name}, ${price}, ${category_id})
`;
```

El driver de Neon convierte cada ${variable} en un parámetro seguro.

---

## 3. Cómo se aplica en este proyecto

En app/api/products/route.ts:
- Todas las consultas usan parámetros.
- No concatenamos strings.
- No ejecutamos SQL dinámico inseguro.

Esto garantiza:
- Integridad de datos
- Protección contra ataques
- Seguridad en producción