import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  // hämtar totalItems från CartContext
  const { totalItems } = useCart();

  return (
    <nav
      style={{
        background: "#1a1a2e",
        borderBottom: "1px solid #2a2a3a",
        padding: "0 32px",
        height: "70px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* logga/länk till home */}
      <Link
        to="/"
        style={{
          fontFamily: "Orbitron, sans-serif",
          fontSize: "20px",
          color: "#FFE81F",
          letterSpacing: "3px",
          textDecoration: "none",
          fontWeight: "700",
        }}
      >
        GALACTIC FLEET
      </Link>

      {/* navbarlänkar*/}
      <div style={{ display: "flex", gap: "24px" }}>
        <Link to="/" style={navLink}>
          Home
        </Link>
        <Link to="/products" style={navLink}>
          All Ships
        </Link>
      </div>

      {/* cartknapp */}
      <Link
        to="/cart"
        style={{
          fontSize: "16px",
          color: "#FFE81F",
          border: "1px solid #FFE81F44",
          padding: "5px 14px",
          borderRadius: "4px",
          textDecoration: "none",
          fontWeight: "700",
          fontFamily: "'Exo 2', sans-serif",
        }}
      >
        View Cart ({totalItems})
      </Link>
    </nav>
  );
}

// återanvändbar style för navbarlänkar
const navLink = {
  fontSize: "15px",
  color: "#888899",
  textDecoration: "none",
  fontFamily: "'Exo 2', sans-serif",
  fontWeight: "700",
};

export default Navbar;
