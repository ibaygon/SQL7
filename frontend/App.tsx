import { useEffect, useState } from "react";

interface Product {
  name: string;
  price: number;
  stock: number;
  category: string;
}

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then(res => res.json())
      .then(setProducts);
  }, []);

  return (
    <div>
      <h1>Inventario</h1>
      <ul>
        {products.map((p, i) => (
          <li key={i}>
            {p.name} — {p.price}€ — {p.category}
          </li>
        ))}
      </ul>
    </div>
  );
}
