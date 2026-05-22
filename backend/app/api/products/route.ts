import { db } from "@/lib/db";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function GET() {
  const rows = await db`
    SELECT p.name, p.price, p.stock, c.name AS category
    FROM products p
    INNER JOIN categories c ON p.category_id = c.id
  `;
  return NextResponse.json(rows, { headers: corsHeaders });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, price, stock, category_id } = body;

  await db`
    INSERT INTO products (name, price, stock, category_id)
    VALUES (${name}, ${price}, ${stock}, ${category_id})
  `;
  return NextResponse.json({ ok: true }, { headers: corsHeaders });
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
