import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

// hårdkodade skepp
const featuredProducts = [
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
    name: "Millennium Falcon",
    category: "Freighters",
    price: 104000,
    length: "34.75m",
    crew: "6 crew",
    image: "",
  },
  {
    _id: "3",
    name: "Star Destroyer",
    category: "Capital Ships",
    price: 899000,
    length: "1,600m",
    crew: "37,000 crew",
    image: "",
  },
];

function Home() {
  return (
    <div style={{ background: "#0a0a0f", minHeight: "100vh" }}>
      {/* Hero-sektion — välkomstbanner med CTA-knapp */}
      <div
        style={{
          background: "#0a0a0f",
          padding: "80px 32px",
          textAlign: "center",
          borderBottom: "1px solid #1a1a2a",
        }}
      >
        {/* Liten eyebrow-text ovanför rubriken */}
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

        {/* Underrubrik */}
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

      {/* bestsellers */}
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

        {/* loopar igenom featuredProducts och renderar ett ProductCard per skepp */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {featuredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
