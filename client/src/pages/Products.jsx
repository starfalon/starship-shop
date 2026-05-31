import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api";

const categories = [
  "All",
  "Starfighters",
  "Capital Ships",
  "Shuttles & Corvettes",
  "Freighters",
];

function Products() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // hämtar produkter från backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // filtrerar produkterna baserat på activeCategory
  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  if (loading)
    return (
      <div
        style={{
          // background: "#0a0a0f",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "Orbitron, sans-serif",
            color: "#FFE81F",
            fontSize: "16px",
          }}
        >
          Loading ships...
        </div>
      </div>
    );

  if (error)
    return (
      <div
        style={{
          // background: "#0a0a0f",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "Orbitron, sans-serif",
            color: "#ff4444",
            fontSize: "16px",
          }}
        >
          {error}
        </div>
      </div>
    );

  return (
    <div style={{ minHeight: "100vh", padding: "32px" }}>
      {/* Sidans header med rubrik och antal visade produkter */}
      <div style={{ marginBottom: "24px" }}>
        <h1
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "20px",
            color: "#F0F0F0",
            letterSpacing: "2px",
            margin: "0 0 6px",
          }}
        >
          ALL SHIPS
        </h1>
        {/* Visar hur många produkter som matchar filtret */}
        <div
          style={{
            fontSize: "12px",
            color: "#888899",
            fontFamily: "'Exo 2', sans-serif",
          }}
        >
          Showing {filtered.length} of {products.length} ships
        </div>
      </div>

      {/* Filterknappar */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          marginBottom: "32px",
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              fontSize: "11px",
              padding: "6px 16px",
              borderRadius: "20px",
              border:
                activeCategory === cat
                  ? "1px solid #FFE81F"
                  : "1px solid #2a2a3a",
              color: activeCategory === cat ? "#FFE81F" : "#888899",
              background: activeCategory === cat ? "#FFE81F0a" : "transparent",
              cursor: "pointer",
              fontFamily: "'Exo 2', sans-serif",
              letterSpacing: "0.5px",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Produktgrid (renderar ett ProductCard per filtrerad produkt) */}
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {filtered.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
