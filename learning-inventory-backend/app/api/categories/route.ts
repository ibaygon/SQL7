import { NextResponse } from 'next/server';
import { db } from '@/lib/drizzle';
import { categories } from '@/lib/schema';

export async function GET() {
  try {
    // Sin escribir SQL — Drizzle lo genera tipado
    const result = await db.select().from(categories);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener categorías' }, { status: 500 });
  }
}