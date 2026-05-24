'use client';

import { useEffect, useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando productos...</p>;

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Inventario de Productos</h1>
      <table border={1} cellPadding={8} style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.price} €</td>
              <td>{p.stock}</td>
              <td>{p.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}