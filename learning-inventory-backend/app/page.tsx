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

  const getStockStyle = (stock: number) => {
    if (stock > 10) return { badge: 'bg-green-950 text-green-400', label: `${stock} uds` };
    if (stock > 0)  return { badge: 'bg-yellow-950 text-yellow-400', label: `${stock} uds` };
    return { badge: 'bg-red-950 text-red-400', label: '0 uds' };
  };

  return (
    <main className="min-h-screen bg-[#0f0f0f] font-serif">

      {/* Header */}
      <div className="border-b border-[#2a2a2a] px-12 py-8 flex items-baseline gap-4">
        <h1 className="text-[#f5f0e8] text-2xl font-normal tracking-widest uppercase">
          Inventario
        </h1>
        <span className="text-[#555] text-sm tracking-wider">
          Sistema de gestión
        </span>
      </div>

      <div className="px-12 py-10">

        {loading && (
          <p className="text-[#666] tracking-widest text-xs uppercase">
            Cargando...
          </p>
        )}

        {error && (
          <p className="text-red-400 bg-[#1a0f0f] border border-[#3a1a1a] px-6 py-4 text-sm">
            Error: {error}
          </p>
        )}

        {!loading && !error && (
          <>
            {/* Contador */}
            <div className="flex items-center gap-3 mb-8">
              <span className="bg-[#c9a84c] text-[#0f0f0f] text-xs font-bold px-2 py-1 tracking-wider">
                {products.length}
              </span>
              <span className="text-[#666] text-xs tracking-widest uppercase">
                productos
              </span>
            </div>

            {/* Cabecera */}
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr] px-5 pb-3 border-b border-[#2a2a2a] mb-1">
              {['Producto', 'Categoría', 'Precio', 'Stock'].map(h => (
                <span
                  key={h}
                  className="text-[#c9a84c] text-[0.65rem] tracking-[0.15em] uppercase font-mono"
                >
                  {h}
                </span>
              ))}
            </div>

            {/* Filas */}
            {products.map((p, i) => {
              const stock = getStockStyle(p.stock);
              return (
                <div
                  key={p.id}
                  className={`
                    grid grid-cols-[2fr_1fr_1fr_1fr] px-5 py-4
                    border-b border-[#1a1a1a]
                    hover:bg-[#1e1e1e] transition-colors duration-150
                    ${i % 2 !== 0 ? 'bg-[#141414]' : 'bg-transparent'}
                  `}
                >
                  <span className="text-[#f5f0e8] text-sm self-center">
                    {p.name}
                  </span>
                  <span className="text-[#888] text-xs tracking-wider self-center">
                    {p.category}
                  </span>
                  <span className="text-[#c9a84c] text-sm font-mono self-center">
                    {Number(p.price).toFixed(2)} €
                  </span>
                  <div className="self-center">
                    <span className={`text-xs font-mono px-2 py-1 tracking-wider ${stock.badge}`}>
                      {stock.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </main>
  );
}