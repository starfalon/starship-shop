import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrder } from "../api";
import useWindowSize from "../hooks/useWindowSize";

function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const isMobile = width < 768;

  // formens state (håller koll på vad användaren skriver in)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    paymentMethod: "card",
  });

  // håller koll på valideringsfel
  const [errors, setErrors] = useState({});

  // håller koll på om ordern skickas just nu
  const [submitting, setSubmitting] = useState(false);

  // uppdaterar formData när användaren skriver i ett fält
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // validerar formen innan det skickas
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    // kör validering (om fel finns visas de utan att skicka)
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);

    try {
      // bygger ihop order-objektet som skickas till backenden
      const orderData = {
        items: cartItems.map((item) => ({
          product_id: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        total: totalPrice,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        paymentMethod: formData.paymentMethod,
      };

      // skickar ordern till backenden
      await createOrder(orderData);

      // tömmer varukorgen och navigerar till bekräftelsesidan
      clearCart();
      navigate("/confirmation");
    } catch (err) {
      console.error("Failed to create order", err);
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", padding: isMobile ? "16px" : "32px" }}>
      <h1
        style={{
          fontFamily: "Orbitron, sans-serif",
          fontSize: isMobile ? "16px" : "20px",
          color: "#F0F0F0",
          letterSpacing: "2px",
          marginBottom: "24px",
        }}
      >
        CHECKOUT
      </h1>

      {/* två kolumner: vänster: formulär, höger: ordersammanfattning — staplas på mobil */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 320px",
          gap: "24px",
        }}
      >
        {/* vänster kolumn (form) */}
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

            {/* Förnamn och efternamn — staplas på mobil */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
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

            {/* telefonnummer */}
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

          {/* betalningsmetod */}
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

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              {/* kortbetalning */}
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
                  padding: isMobile ? "12px" : "16px",
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

              {/* swish */}
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
                  padding: isMobile ? "12px" : "16px",
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

          {/*  felmeddelande om API-anropet misslyckas */}
          {errors.submit && (
            <div style={{ ...errorStyle, marginBottom: "12px" }}>
              {errors.submit}
            </div>
          )}

          {/* Skicka-knapp (inaktiveras medan ordern skickas) */}
          <button
            onClick={handleSubmit}
            disabled={submitting}
            style={{
              width: "100%",
              background: submitting ? "#C9A800" : "#FFE81F",
              color: "#0a0a0f",
              border: "none",
              padding: "13px",
              fontSize: "13px",
              fontWeight: "700",
              borderRadius: "6px",
              cursor: submitting ? "not-allowed" : "pointer",
              letterSpacing: "1px",
              fontFamily: "'Exo 2', sans-serif",
            }}
          >
            {submitting ? "Placing Order..." : "Place Order →"}
          </button>
        </div>

        {/* höger kolumn (ordersammanfattning) */}
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
