import { useState } from "react";
import ProductCard from "../components/ProductCard";

// hårdkokdade produkter så länge
const allProducts = [
  {
    _id: "1",
    name: "X-Wing",
    category: "Starfighters",
    price: 149999,
    length: "12.5m",
    crew: "1 pilot + R2",
    image: "",
  },
  {
    _id: "2",
    name: "TIE Fighter",
    category: "Starfighters",
    price: 89999,
    length: "6.3m",
    crew: "1 pilot",
    image: "",
  },
  {
    _id: "3",
    name: "A-Wing",
    category: "Starfighters",
    price: 175000,
    length: "9.6m",
    crew: "1 pilot",
    image: "",
  },
  {
    _id: "4",
    name: "Millennium Falcon",
    category: "Freighters",
    price: 104000,
    length: "34.75m",
    crew: "6 crew",
    image: "",
  },
  {
    _id: "5",
    name: "Slave I",
    category: "Freighters",
    price: 98000,
    length: "21.5m",
    crew: "1 pilot",
    image: "",
  },
  {
    _id: "6",
    name: "Star Destroyer",
    category: "Capital Ships",
    price: 899000,
    length: "1,600m",
    crew: "37,000 crew",
    image: "",
  },
  {
    _id: "7",
    name: "Mon Calamari Cruiser",
    category: "Capital Ships",
    price: 650000,
    length: "1,200m",
    crew: "5,000 crew",
    image: "",
  },
  {
    _id: "8",
    name: "Lambda Shuttle",
    category: "Shuttles & Corvettes",
    price: 59999,
    length: "20m",
    crew: "6 crew",
    image: "",
  },
  {
    _id: "9",
    name: "Tantive IV",
    category: "Shuttles & Corvettes",
    price: 240000,
    length: "150m",
    crew: "165 crew",
    image: "",
  },
];

// kategorier för filterknappar
const categories = [
  "All",
  "Starfighters",
  "Capital Ships",
  "Shuttles & Corvettes",
  "Freighters",
];

function Products() {
  // activeCategory håller koll på vilket filter som är aktivt
  const [activeCategory, setActiveCategory] = useState("All");

  // filtrerar produkterna baserat på activeCategory
  // om 'All' är valt visas alla produkter
  const filtered =
    activeCategory === "All"
      ? allProducts
      : allProducts.filter((p) => p.category === activeCategory);

  return (
    <div style={{ background: "#0a0a0f", minHeight: "100vh", padding: "32px" }}>
      {/* sidans header med rubrik och antal visade produkter */}
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
        {/* visar hur många produkter som matchar filtret */}
        <div
          style={{
            fontSize: "12px",
            color: "#888899",
            fontFamily: "'Exo 2', sans-serif",
          }}
        >
          Showing {filtered.length} of {allProducts.length} ships
        </div>
      </div>

      {/* filterknappar (en per kategori) */}
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
              // aktiv knapp får gul border och text, inaktiv får grå
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

      {/* Produktgrid (ett ProductCard per filtrerad produkt) */}
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {filtered.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
