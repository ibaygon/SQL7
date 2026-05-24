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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/products')
      .then(res => {
        if (!res.ok) throw new Error('Error en la respuesta');
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ padding: '2rem' }}>Cargando productos...</p>;
  if (error) return <p style={{ padding: '2rem', color: 'red' }}>Error: {error}</p>;

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Inventario de Productos</h1>
      <p>{products.length} productos encontrados</p>
      <table
        border={1}
        cellPadding={10}
        style={{ borderCollapse: 'collapse', width: '100%', marginTop: '1rem' }}
      >
        <thead style={{ backgroundColor: '#f0f0f0' }}>
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
              <td>{Number(p.price).toFixed(2)} €</td>
              <td>{p.stock}</td>
              <td>{p.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}