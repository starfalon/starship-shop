import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api";

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // hämtar de tre första produkterna från backenden som utvalda skepp
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        // tar bara de tre första produkterna för hero-sektionen
        setFeaturedProducts(res.data.slice(0, 3));
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div style={{ background: "#0a0a0f", minHeight: "100vh" }}>
      {/* Hero */}
      <div
        style={{
          background: "#0a0a0f",
          padding: "80px 32px",
          textAlign: "center",
          borderBottom: "1px solid #1a1a2a",
        }}
      >
        {/* Liten text ovanför rubriken */}
        <div
          style={{
            fontSize: "11px",
            color: "#C9A800",
            letterSpacing: "3px",
            marginBottom: "12px",
            fontFamily: "'Exo 2', sans-serif",
          }}
        >
          IMPERIAL CLASS · SERIES IV
        </div>

        {/* Huvudrubrik */}
        <h1
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "48px",
            color: "#FFE81F",
            letterSpacing: "4px",
            margin: "0 0 16px",
          }}
        >
          GALACTIC FLEET
        </h1>

        {/* underrubrik */}
        <p
          style={{
            fontSize: "16px",
            color: "#888899",
            marginBottom: "32px",
            fontFamily: "'Exo 2', sans-serif",
          }}
        >
          Your source for ships from across the galaxy.
        </p>

        {/* CTA-knapp som leder till produktsidan */}
        <Link
          to="/products"
          style={{
            background: "#FFE81F",
            color: "#0a0a0f",
            padding: "12px 32px",
            borderRadius: "4px",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "700",
            fontFamily: "'Exo 2', sans-serif",
            letterSpacing: "1px",
          }}
        >
          Explore the Fleet
        </Link>
      </div>

      {/* utvalda produkter */}
      <div style={{ padding: "48px 32px" }}>
        <div
          style={{
            fontSize: "11px",
            color: "#888899",
            letterSpacing: "2px",
            marginBottom: "24px",
            fontFamily: "'Exo 2', sans-serif",
          }}
        >
          FEATURED SHIPS
        </div>

        {/* vvisar laddningsindikator medan produkter hämtas */}
        {loading ? (
          <div
            style={{
              color: "#FFE81F",
              fontFamily: "Orbitron, sans-serif",
              fontSize: "14px",
            }}
          >
            Loading ships...
          </div>
        ) : (
          // loopar igenom featuredProducts och renderar ett ProductCard per skepp
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
