import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import useWindowSize from "../hooks/useWindowSize";

function Navbar() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const windowSize = useWindowSize();
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const isMobile = width < 768;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      style={{
        background: "#1a1a2e",
        borderBottom: "1px solid #2a2a3a",
        padding: isMobile ? "12px 16px" : "0 32px",
        height: isMobile ? "auto" : "70px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: isMobile ? "wrap" : "nowrap",
        gap: isMobile ? "8px" : "0",
      }}
    >
      {/* logga */}
      <Link
        to="/"
        style={{
          fontFamily: "Orbitron, sans-serif",
          fontSize: isMobile ? "16px" : "20px",
          color: "#FFE81F",
          letterSpacing: "3px",
          textDecoration: "none",
          fontWeight: "700",
        }}
      >
        GALACTIC FLEET
      </Link>

      {/* nav-länkar */}
      <div style={{ display: "flex", gap: isMobile ? "12px" : "24px" }}>
        <Link to="/" style={navLink}>
          Home
        </Link>
        <Link to="/products" style={navLink}>
          All Ships
        </Link>
        <Link to="/favorites" style={navLink}>
          Favorites
        </Link>
      </div>

      {/* login/logout och varukorg */}
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        {user ? (
          // Inloggad (användarnamn och logout)
          <>
            {!isMobile && (
              <span
                style={{
                  fontSize: "15px",
                  color: "#FFE81F",
                  fontFamily: "'Exo 2', sans-serif",
                }}
              >
                {user?.username}
              </span>
            )}
            <button
              onClick={handleLogout}
              style={{
                fontSize: "15px",
                color: "#888899",
                background: "none",
                border: "2px solid #2a2a3a",
                padding: "5px 14px",
                borderRadius: "4px",
                cursor: "pointer",
                fontFamily: "'Exo 2', sans-serif",
              }}
            >
              Sign Out
            </button>
          </>
        ) : (
          // inte inloggad (Sign In-knapp)
          <Link
            to="/login"
            style={{
              fontSize: "15px",
              color: "#FFE81F",
              border: "2px solid #FFE81F44",
              padding: "5px 14px",
              borderRadius: "4px",
              textDecoration: "none",
              fontFamily: "'Exo 2', sans-serif",
            }}
          >
            Sign In
          </Link>
        )}

        {/* cart */}
        <Link
          to="/cart"
          style={{
            fontSize: "15px",
            color: "#FFE81F",
            border: "2px solid #FFE81F44",
            padding: "5px 14px",
            borderRadius: "4px",
            textDecoration: "none",
            fontWeight: "700",
            fontFamily: "'Exo 2', sans-serif",
          }}
        >
          {isMobile ? `🛒 (${totalItems})` : `View Cart (${totalItems})`}
        </Link>
      </div>
    </nav>
  );
}

const navLink = {
  fontSize: "15px",
  color: "#888899",
  textDecoration: "none",
  fontFamily: "'Exo 2', sans-serif",
  fontWeight: "700",
};

export default Navbar;
