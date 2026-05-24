# 🗄️ Learning Inventory

Sistema de gestión de inventario con base de datos relacional en la nube.

Aplicación fullstack que demuestra el uso de PostgreSQL serverless, consultas
SQL avanzadas, endpoints REST seguros y despliegue en producción.

| Despliegue | URL |
|------------|-----|
| Frontend   | https://learning-inventory-xxx.vercel.app |

---

## Características

1. Consulta de productos con su categoría mediante INNER JOIN en tiempo real
2. API REST con endpoints GET y POST protegidos contra inyección SQL mediante consultas parametrizadas
3. Base de datos PostgreSQL serverless en Neon con esquema normalizado y restricciones de integridad referencial

---

## Tecnologías

### Frontend
| Tecnología | Uso |
|------------|-----|
| Next.js 15 | Framework React con App Router y Server Components |
| TypeScript | Tipado estático en componentes y llamadas a la API |
| React Hooks | `useEffect` y `useState` para gestión de estado y fetch de datos |

### Backend
| Tecnología | Uso |
|------------|-----|
| Next.js API Routes | Endpoints REST dentro del mismo proyecto Next.js |
| @neondatabase/serverless | Driver oficial para conectar con PostgreSQL en Neon |
| Drizzle ORM | Abstracción tipada del esquema y consultas sin SQL manual |

### Auxiliares
| Tecnología | Uso |
|------------|-----|
| Neon | PostgreSQL serverless con branching y escalado a cero |
| Vercel | Despliegue automático desde GitHub con variables de entorno |
| Git | Control de versiones y flujo de trabajo con ramas |

---

## Estructura del proyecto

La raíz del repositorio contiene tres carpetas principales.

### La carpeta database
Contiene los scripts SQL del proyecto: schema.sql con la definición de tablas, claves y constraints; seed.sql con los datos iniciales de categorías y productos; y queries.sql con las consultas avanzadas de JOIN y GROUP BY.

### La carpeta docs 
Contiene la documentación técnica: arquitectura-datos.md explica el modelo relacional y las decisiones sobre foreign keys; analisis-sql.md compara INNER JOIN y LEFT JOIN con ejemplos reales; y seguridad-db.md documenta qué es la inyección SQL y cómo se previene con parámetros preparados.

### La carpeta learning-inventory-backend
Es el proyecto Next.js. Dentro de lib se encuentran db.ts con el cliente Neon, drizzle.ts con la instancia del ORM y schema.ts con el esquema tipado en TypeScript. Dentro de app está page.tsx con el frontend que muestra la tabla de productos, y la carpeta api con los endpoints: products/route.ts gestiona GET con JOIN y POST parametrizado, y categories/route.ts usa Drizzle ORM para la consulta.


---

## Descargar y ejecutar

```bash
git clone https://github.com/ibaygon/SQL7.git
cd SQL7/learning-inventory-backend
```

Crea el archivo `.env.local` dentro de `learning-inventory-backend/`: postgresql://neondb_owner:npg_ikIEm8nUpa1W@ep-round-frost-abbmid0b-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

---

## Desplegar en Vercel

### Backend + Frontend (mismo proyecto Next.js)

1. Sube el repositorio a GitHub
2. Ve a [vercel.com](https://vercel.com) → **New Project** → importa el repo
3. En **Root Directory** escribe `learning-inventory-backend`
4. En **Environment Variables** añade:
   - `DATABASE_URL` → tu connection string de Neon
5. Click en **Deploy**

Vercel detectará automáticamente Next.js y construirá el proyecto.

---

## ORM vs SQL puro

Este proyecto usa tanto SQL puro como Drizzle ORM para ilustrar ambos enfoques.

### SQL puro (en `api/products/route.ts`): 
Control total sobre la consulta,
imprescindible para entender qué ocurre en la base de datos.

### Drizzle ORM (en `api/categories/route.ts`): 
El esquema vive en TypeScript,
las consultas tienen autocompletado y los errores de tipos se detectan en
compilación antes de llegar a producción. En proyectos grandes, esto reduce
errores y acelera el desarrollo.