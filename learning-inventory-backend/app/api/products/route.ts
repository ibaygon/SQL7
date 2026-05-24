import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET() {
  try {
    const products = await sql`
      SELECT 
        p.id,
        p.name,
        p.price,
        p.stock,
        c.name AS category
      FROM products p
      INNER JOIN categories c ON p.category_id = c.id
      ORDER BY p.name
    `;
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error al obtener productos' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, price, stock, category_id } = body;

    if (!name || !price || !category_id) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios' },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO products (name, price, stock, category_id)
      VALUES (${name}, ${price}, ${stock ?? 0}, ${category_id})
      RETURNING *
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error al crear producto' },
      { status: 500 }
    );
  }
}