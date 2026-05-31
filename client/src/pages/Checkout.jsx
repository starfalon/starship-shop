import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  // formens state, håller koll på vad användaren skriver in
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    paymentMethod: "card",
  });

  // håller koll på valideringsfel
  const [errors, setErrors] = useState({});

  // uppdaterar formData när användaren skriver i ett fält
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // validerar formuläret innan det skickas
  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email.includes("@"))
      newErrors.email = "Invalid email address";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    return newErrors;
  };

  // hanterar formulärets submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // kör validering, om det nlir fel visas de utan att skicka
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // tömmer varukorgen och navigerar till confirmation
    clearCart();
    navigate("/confirmation");
  };

  return (
    <div style={{ background: "#0a0a0f", minHeight: "100vh", padding: "32px" }}>
      <h1
        style={{
          fontFamily: "Orbitron, sans-serif",
          fontSize: "20px",
          color: "#F0F0F0",
          letterSpacing: "2px",
          marginBottom: "24px",
        }}
      >
        CHECKOUT
      </h1>

      {/* Tvåkolumnslayout (vänster: formulär, höger: ordersammanfattning) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 320px",
          gap: "24px",
        }}
      >
        {/* vänster: formulär */}
        <div>
          {/* Kontaktuppgifter */}
          <div
            style={{
              background: "#12121a",
              border: "1px solid #2a2a3a",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                color: "#888899",
                letterSpacing: "2px",
                marginBottom: "16px",
                fontFamily: "'Exo 2', sans-serif",
              }}
            >
              CONTACT DETAILS
            </div>

            {/* Förnamn och efternamn på samma rad */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                marginBottom: "12px",
              }}
            >
              <div>
                <div style={labelStyle}>FIRST NAME</div>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Luke"
                  style={inputStyle}
                />
                {/* visar felmeddelande om validering misslyckas */}
                {errors.firstName && (
                  <div style={errorStyle}>{errors.firstName}</div>
                )}
              </div>
              <div>
                <div style={labelStyle}>LAST NAME</div>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Skywalker"
                  style={inputStyle}
                />
                {errors.lastName && (
                  <div style={errorStyle}>{errors.lastName}</div>
                )}
              </div>
            </div>

            {/* E-post */}
            <div style={{ marginBottom: "12px" }}>
              <div style={labelStyle}>EMAIL</div>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="luke@rebellion.com"
                style={inputStyle}
              />
              {errors.email && <div style={errorStyle}>{errors.email}</div>}
            </div>

            {/* Telefonnummer */}
            <div>
              <div style={labelStyle}>PHONE</div>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="070-123 45 67"
                style={inputStyle}
              />
              {errors.phone && <div style={errorStyle}>{errors.phone}</div>}
            </div>
          </div>

          {/* Betalningsmetod */}
          <div
            style={{
              background: "#12121a",
              border: "1px solid #2a2a3a",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                color: "#888899",
                letterSpacing: "2px",
                marginBottom: "16px",
                fontFamily: "'Exo 2', sans-serif",
              }}
            >
              PAYMENT METHOD
            </div>

            {/* Två betalningsalternativ:kort och Swish */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              {/* Kortbetalning */}
              <div
                onClick={() =>
                  setFormData((prev) => ({ ...prev, paymentMethod: "card" }))
                }
                style={{
                  background: "#0a0a0f",
                  border:
                    formData.paymentMethod === "card"
                      ? "1px solid #FFE81F"
                      : "1px solid #2a2a3a",
                  borderRadius: "8px",
                  padding: "16px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span style={{ fontSize: "24px" }}>💳</span>
                <div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#F0F0F0",
                      fontFamily: "'Exo 2', sans-serif",
                    }}
                  >
                    Card
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#888899",
                      fontFamily: "'Exo 2', sans-serif",
                    }}
                  >
                    Visa, Mastercard
                  </div>
                </div>
              </div>

              {/* Swish */}
              <div
                onClick={() =>
                  setFormData((prev) => ({ ...prev, paymentMethod: "swish" }))
                }
                style={{
                  background: "#0a0a0f",
                  border:
                    formData.paymentMethod === "swish"
                      ? "1px solid #FFE81F"
                      : "1px solid #2a2a3a",
                  borderRadius: "8px",
                  padding: "16px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span style={{ fontSize: "24px" }}>📱</span>
                <div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#F0F0F0",
                      fontFamily: "'Exo 2', sans-serif",
                    }}
                  >
                    Swish
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#888899",
                      fontFamily: "'Exo 2', sans-serif",
                    }}
                  >
                    Pay with mobile
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skicka-knapp */}
          <button
            onClick={handleSubmit}
            style={{
              width: "100%",
              background: "#FFE81F",
              color: "#0a0a0f",
              border: "none",
              padding: "13px",
              fontSize: "13px",
              fontWeight: "700",
              borderRadius: "6px",
              cursor: "pointer",
              letterSpacing: "1px",
              fontFamily: "'Exo 2', sans-serif",
            }}
          >
            Place Order →
          </button>
        </div>

        {/* höger kolumn: ordersammanfattning */}
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
            YOUR ORDER
          </div>

          {/* lista över valda produkter */}
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

          {/* Shipping */}
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

          {/* totalpris */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
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

          {/* säkerhetstext */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginTop: "12px",
            }}
          >
            <span>🔒</span>
            <span
              style={{
                fontSize: "10px",
                color: "#888899",
                fontFamily: "'Exo 2', sans-serif",
              }}
            >
              Secure payment — all data is encrypted
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// återanvändbar style för formuläret
const labelStyle = {
  fontSize: "11px",
  color: "#888899",
  letterSpacing: "0.5px",
  marginBottom: "6px",
  fontFamily: "'Exo 2', sans-serif",
};

const inputStyle = {
  width: "100%",
  background: "#0a0a0f",
  border: "1px solid #2a2a3a",
  borderRadius: "6px",
  padding: "10px 14px",
  fontSize: "13px",
  color: "#F0F0F0",
  fontFamily: "'Exo 2', sans-serif",
  boxSizing: "border-box",
};

const errorStyle = {
  fontSize: "11px",
  color: "#ff4444",
  marginTop: "4px",
  fontFamily: "'Exo 2', sans-serif",
};

export default Checkout;
