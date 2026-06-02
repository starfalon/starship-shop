import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api";
import useWindowSize from "../hooks/useWindowSize";

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowSize();
  const isMobile = width < 768;

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
    <div style={{ minHeight: "100vh" }}>
      {/* Hero */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: isMobile ? "300px" : "500px",
          display: "flex",
          alignItems: "center",
          // borderBottom: "1px solid #1a1a2a",
          padding: isMobile ? "24px" : "0 64px",
        }}
      >
        {/* bild till höger (döljs på mobil) */}
        {!isMobile && (
          <img
            src="/images/hdestroyer.png"
            alt="hero ship"
            style={{
              position: "absolute",
              right: "-50px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "45%",
              opacity: "0.9",
              zIndex: "0",
            }}
          />
        )}

        {/* gradient (döljs på mobil) */}
        {!isMobile && (
          <div
            style={{
              position: "absolute",
              inset: "0",
              background:
                "linear-gradient(90deg, #0a0a0f 25%, #0a0a0f88 50%, transparent 75%)",
              zIndex: "1",
            }}
          />
        )}

        {/* taglines (döljs på mobil) */}
        {!isMobile && (
          <div
            style={{
              position: "absolute",
              left: "40%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: "2",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              alignItems: "center",
            }}
          >
            {[
              "Ships from all factions and eras",
              "Interest-free financing",
              "100% Hyperspace Guarantee™",
            ].map((text, i) => (
              <div
                key={i}
                style={{
                  fontSize: "16px",
                  color: "#F0F0F0",
                  fontFamily: "'Exo 2', sans-serif",
                  letterSpacing: "0.5px",
                  borderLeft: "2px solid #FFE81F44",
                  paddingLeft: "10px",
                  whiteSpace: "nowrap",
                }}
              >
                {text}
              </div>
            ))}
          </div>
        )}

        {/* Text vänster */}
        <div
          style={{
            position: "relative",
            zIndex: "2",
            maxWidth: isMobile ? "100%" : "520px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: "#C9A800",
              letterSpacing: "3px",
              marginBottom: "16px",
              fontFamily: "'Exo 2', sans-serif",
            }}
          >
            IMPERIAL CLASS · SERIES IV
          </div>

          <h1
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: isMobile ? "28px" : "52px",
              color: "#FFE81F",
              letterSpacing: isMobile ? "2px" : "4px",
              margin: "0 0 16px",
              lineHeight: "1.1",
            }}
          >
            GALACTIC FLEET
          </h1>

          <p
            style={{
              fontSize: "16px",
              color: "#888899",
              marginBottom: "32px",
              fontFamily: "'Exo 2', sans-serif",
              lineHeight: "1.6",
            }}
          >
            Your source for ships from across the galaxy.
          </p>

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
              display: "inline-block",
            }}
          >
            Explore the Fleet
          </Link>
        </div>
      </div>

      {/* utvalda produkter */}
      <div style={{ padding: isMobile ? "24px 16px" : "48px 32px" }}>
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

        {/* visar laddningsindikator medan produkter hämtas */}
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
          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              justifyContent: isMobile ? "center" : "flex-start",
            }}
          >
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
