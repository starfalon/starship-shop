import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  // hämtar från CartContext
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

  // om varukorgen är tom visas ett tomt state med länk tillbaka till produktsidan
  if (cartItems.length === 0) {
    return (
      <div
        style={{
          background: "#0a0a0f",
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
          YOUR CART IS EMPTY
        </div>
        <p style={{ color: "#888899", fontFamily: "'Exo 2', sans-serif" }}>
          No ships selected yet.
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
    <div style={{ background: "#0a0a0f", minHeight: "100vh", padding: "32px" }}>
      <h1
        style={{
          fontFamily: "Orbitron, sans-serif",
          fontSize: "20px",
          color: "#F0F0F0",
          letterSpacing: "2px",
          marginBottom: "8px",
        }}
      >
        YOUR CART
      </h1>

      {/* visar antal skepp i varukorgen */}
      <div
        style={{
          fontSize: "12px",
          color: "#888899",
          fontFamily: "'Exo 2', sans-serif",
          marginBottom: "24px",
        }}
      >
        {cartItems.length} {cartItems.length === 1 ? "ship" : "ships"} selected
      </div>

      {/* vänster: varor, höger: sammanfattning */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 320px",
          gap: "24px",
        }}
      >
        {/* vänster kolumn (lista med valda produkter) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {cartItems.map((item) => (
            <div
              key={item._id}
              style={{
                background: "#12121a",
                border: "1px solid #2a2a3a",
                borderRadius: "10px",
                padding: "16px",
                display: "flex",
                gap: "16px",
                alignItems: "center",
              }}
            >
              {/* Produktbild */}
              <div
                style={{
                  width: "80px",
                  height: "60px",
                  background: "#0d0d18",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    maxHeight: "50px",
                    maxWidth: "70px",
                    objectFit: "contain",
                  }}
                />
              </div>

              {/* Produktinfo */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#C9A800",
                    letterSpacing: "1.5px",
                    fontFamily: "'Exo 2', sans-serif",
                  }}
                >
                  {item.category}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#F0F0F0",
                    fontFamily: "'Exo 2', sans-serif",
                  }}
                >
                  {item.name}
                </div>
              </div>

              {/* pris, quantity-kontroller och remove-knapp */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: "10px",
                }}
              >
                {/* totalpris för denna rad (pris × quantity) */}
                <div
                  style={{
                    fontSize: "14px",
                    color: "#FFE81F",
                    fontWeight: "500",
                    fontFamily: "'Exo 2', sans-serif",
                  }}
                >
                  ⬡ {(item.price * item.quantity).toLocaleString("sv-SE")}
                </div>

                {/* Quantity-kontroller (minus, antal, plus) */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    style={qtyBtn}
                  >
                    −
                  </button>
                  <span
                    style={{
                      fontSize: "13px",
                      color: "#F0F0F0",
                      minWidth: "16px",
                      textAlign: "center",
                    }}
                  >
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    style={qtyBtn}
                  >
                    +
                  </button>
                </div>

                {/* ta bort produkten från varukorgen */}
                <button
                  onClick={() => removeFromCart(item._id)}
                  style={{
                    fontSize: "11px",
                    color: "#888899",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'Exo 2', sans-serif",
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Höger kolumn (ordersammanfattning) */}
        <div
          style={{
            background: "#12121a",
            border: "1px solid #2a2a3a",
            borderRadius: "10px",
            padding: "20px",
            height: "fit-content",
          }}
        >
          <div
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "13px",
              color: "#F0F0F0",
              letterSpacing: "1px",
              marginBottom: "16px",
            }}
          >
            ORDER SUMMARY
          </div>

          {/* lista varje produkt med namn och delpris */}
          {cartItems.map((item) => (
            <div
              key={item._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: "#888899",
                  fontFamily: "'Exo 2', sans-serif",
                }}
              >
                {item.name} × {item.quantity}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: "#F0F0F0",
                  fontFamily: "'Exo 2', sans-serif",
                }}
              >
                ⬡ {(item.price * item.quantity).toLocaleString("sv-SE")}
              </span>
            </div>
          ))}

          <hr
            style={{
              border: "none",
              borderTop: "1px solid #1e1e2a",
              margin: "14px 0",
            }}
          />

          {/* shipping */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                color: "#888899",
                fontFamily: "'Exo 2', sans-serif",
              }}
            >
              Shipping
            </span>
            <span
              style={{
                fontSize: "12px",
                color: "#4CAF50",
                fontFamily: "'Exo 2', sans-serif",
              }}
            >
              Free
            </span>
          </div>

          <hr
            style={{
              border: "none",
              borderTop: "1px solid #1e1e2a",
              margin: "14px 0",
            }}
          />

          {/* totalpris (beräknas i CartContext) */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <span
              style={{
                fontSize: "14px",
                color: "#F0F0F0",
                fontWeight: "500",
                fontFamily: "'Exo 2', sans-serif",
              }}
            >
              Total
            </span>
            <span
              style={{
                fontSize: "18px",
                color: "#FFE81F",
                fontWeight: "500",
                fontFamily: "'Exo 2', sans-serif",
              }}
            >
              ⬡ {totalPrice.toLocaleString("sv-SE")}
            </span>
          </div>

          {/* knapp till checkout */}
          <Link
            to="/checkout"
            style={{
              display: "block",
              background: "#FFE81F",
              color: "#0a0a0f",
              padding: "12px",
              borderRadius: "6px",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: "700",
              fontFamily: "'Exo 2', sans-serif",
              letterSpacing: "1px",
              textAlign: "center",
              marginBottom: "8px",
            }}
          >
            Proceed to Checkout →
          </Link>

          {/* länk tillbaka till produktsidan */}
          <Link
            to="/products"
            style={{
              display: "block",
              background: "transparent",
              color: "#888899",
              padding: "10px",
              borderRadius: "6px",
              textDecoration: "none",
              fontSize: "12px",
              fontFamily: "'Exo 2', sans-serif",
              textAlign: "center",
              border: "1px solid #2a2a3a",
            }}
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

// återanvändbart style-objekt för quantity-knapparna
const qtyBtn = {
  width: "24px",
  height: "24px",
  background: "#0a0a0f",
  border: "1px solid #2a2a3a",
  borderRadius: "4px",
  color: "#F0F0F0",
  fontSize: "14px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default Cart;
