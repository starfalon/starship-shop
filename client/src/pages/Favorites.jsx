import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useFavorites } from "../context/FavoritesContext";

function Favorites() {
  const { favorites } = useFavorites();

  // tomt state om inga favoriter
  if (favorites.length === 0) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        <div
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "20px",
            color: "#F0F0F0",
          }}
        >
          NO FAVORITES YET
        </div>
        <p style={{ color: "#888899", fontFamily: "'Exo 2', sans-serif" }}>
          Save ships by clicking the heart icon.
        </p>
        <Link
          to="/products"
          style={{
            background: "#FFE81F",
            color: "#0a0a0f",
            padding: "10px 28px",
            borderRadius: "4px",
            textDecoration: "none",
            fontFamily: "'Exo 2', sans-serif",
            fontWeight: "700",
          }}
        >
          Browse Ships
        </Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", padding: "32px" }}>
      <h1
        style={{
          fontFamily: "Orbitron, sans-serif",
          fontSize: "20px",
          color: "#F0F0F0",
          letterSpacing: "2px",
          marginBottom: "8px",
        }}
      >
        FAVORITES
      </h1>
      <div
        style={{
          fontSize: "12px",
          color: "#888899",
          fontFamily: "'Exo 2', sans-serif",
          marginBottom: "24px",
        }}
      >
        {favorites.length} {favorites.length === 1 ? "ship" : "ships"} saved
      </div>

      {/* grid med favorites */}
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {favorites.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
