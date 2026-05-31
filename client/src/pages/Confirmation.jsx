import { Link } from "react-router-dom";

function Confirmation() {
  // genererar ett slumpmässigt ordernummer
  const orderNumber = `GF-${Math.floor(Math.random() * 90000) + 10000}`;

  return (
    <div
      style={{
        // background: "#0a0a0f",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "48px 32px",
      }}
    >
      {/* bekräftelseikon */}
      <div
        style={{
          width: "72px",
          height: "72px",
          background: "#FFE81F15",
          border: "1px solid #FFE81F44",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "32px",
          marginBottom: "24px",
        }}
      >
        ✓
      </div>

      {/* rubrik */}
      <h1
        style={{
          fontFamily: "Orbitron, sans-serif",
          fontSize: "22px",
          color: "#FFE81F",
          letterSpacing: "2px",
          margin: "0 0 8px",
          textAlign: "center",
        }}
      >
        ORDER CONFIRMED
      </h1>

      {/* underrubrik */}
      <p
        style={{
          fontSize: "14px",
          color: "#888899",
          fontFamily: "'Exo 2', sans-serif",
          marginBottom: "8px",
          textAlign: "center",
        }}
      >
        Thank you for your purchase! Your order has been received.
      </p>

      {/* ordernummer */}
      <div
        style={{
          fontSize: "12px",
          color: "#C9A800",
          fontFamily: "'Exo 2', sans-serif",
          letterSpacing: "1px",
          marginBottom: "32px",
        }}
      >
        ORDER NUMBER · {orderNumber}
      </div>

      {/* leveransinformation */}
      <div
        style={{
          background: "#12121a",
          border: "1px solid #2a2a3a",
          borderRadius: "10px",
          padding: "20px",
          width: "100%",
          maxWidth: "480px",
          marginBottom: "16px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "11px",
            color: "#888899",
            letterSpacing: "2px",
            marginBottom: "12px",
            fontFamily: "'Exo 2', sans-serif",
          }}
        >
          ESTIMATED DELIVERY
        </div>
        <div
          style={{
            fontSize: "16px",
            color: "#F0F0F0",
            fontFamily: "'Exo 2', sans-serif",
            fontWeight: "500",
          }}
        >
          3–5 parsecs
        </div>
        <div
          style={{
            fontSize: "11px",
            color: "#888899",
            fontFamily: "'Exo 2', sans-serif",
            marginTop: "4px",
          }}
        >
          A confirmation has been sent to your email.
        </div>
      </div>

      {/* knappar */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          width: "100%",
          maxWidth: "480px",
        }}
      >
        {/* tillbaka till startsidan */}
        <Link
          to="/"
          style={{
            flex: 1,
            background: "#FFE81F",
            color: "#0a0a0f",
            padding: "13px",
            borderRadius: "6px",
            textDecoration: "none",
            fontSize: "13px",
            fontWeight: "700",
            fontFamily: "'Exo 2', sans-serif",
            letterSpacing: "1px",
            textAlign: "center",
          }}
        >
          Back to Home
        </Link>

        {/* tillbaka till produktsidan */}
        <Link
          to="/products"
          style={{
            flex: 1,
            background: "transparent",
            color: "#888899",
            padding: "13px",
            borderRadius: "6px",
            textDecoration: "none",
            fontSize: "13px",
            fontFamily: "'Exo 2', sans-serif",
            textAlign: "center",
            border: "1px solid #2a2a3a",
          }}
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default Confirmation;
