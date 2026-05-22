import { db } from "@/lib/db";

export async function GET() {
  const rows = await db`
    SELECT p.name, p.price, p.stock, c.name AS category
    FROM products p
    INNER JOIN categories c ON p.category_id = c.id
  `;
  return Response.json(rows);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, price, stock, category_id } = body;

  await db`
    INSERT INTO products (name, price, stock, category_id)
    VALUES (${name}, ${price}, ${stock}, ${category_id})
  `;

  return Response.json({ ok: true });
}
