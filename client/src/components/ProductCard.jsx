// använder useCart för att lägga till i varukorgen
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  // hämtar addToCart från CartContext
  const { addToCart } = useCart();

  return (
    <div
      style={{
        background: "#12121a",
        border: "1px solid #2a2a3a",
        borderRadius: "10px",
        overflow: "hidden",
        cursor: "pointer",
        width: "280px",
      }}
    >
      {/* Bildyta */}
      <div
        style={{
          height: "140px",
          background: "#0d0d18",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{ maxHeight: "120px", maxWidth: "100%", objectFit: "contain" }}
        />
      </div>

      <div style={{ padding: "14px" }}>
        {/* kategori */}
        <div
          style={{
            fontSize: "10px",
            color: "#C9A800",
            letterSpacing: "1.5px",
            marginBottom: "4px",
            fontFamily: "'Exo 2', sans-serif",
          }}
        >
          {product.category}
        </div>

        {/* namn */}
        <div
          style={{
            fontSize: "14px",
            fontWeight: "500",
            color: "#F0F0F0",
            marginBottom: "4px",
            fontFamily: "'Exo 2', sans-serif",
          }}
        >
          {product.name}
        </div>

        {/* specs  */}
        <div
          style={{
            fontSize: "11px",
            color: "#888899",
            marginBottom: "12px",
            fontFamily: "'Exo 2', sans-serif",
          }}
        >
          {product.length} · {product.crew}
        </div>

        <hr
          style={{
            border: "none",
            borderTop: "1px solid #1e1e2a",
            margin: "10px 0",
          }}
        />

        {/* pris och add-knapp */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "10px",
                color: "#888899",
                fontFamily: "'Exo 2', sans-serif",
              }}
            >
              PRICE
            </div>

            <div
              style={{
                fontSize: "14px",
                color: "#FFE81F",
                fontWeight: "500",
                fontFamily: "'Exo 2', sans-serif",
              }}
            >
              ⬡ {product.price.toLocaleString("sv-SE")}
            </div>
          </div>

          {/* anropar addToCart med product-objektet */}
          <button
            onClick={() => addToCart(product)}
            style={{
              fontSize: "11px",
              padding: "7px 16px",
              border: "1px solid #FFE81F55",
              borderRadius: "4px",
              color: "#FFE81F",
              background: "transparent",
              cursor: "pointer",
              fontFamily: "'Exo 2', sans-serif",
            }}
          >
            + Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
