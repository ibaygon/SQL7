import { useState, useEffect } from "react";
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

type Product = {
  name: string;
  price: string;
  stock: number;
  category: string;
};

function App() {
  const [count, setCount] = useState(0)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch("https://sql-8.vercel.app/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error cargando productos:", err))
  }, [])

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <h2 style={{ marginTop: "40px" }}>Productos desde el backend</h2>
      <ul>
        {products.map((p, i) => (
          <li key={i}>
            {p.name} — {p.price}€ — Stock: {p.stock} — {p.category}
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
