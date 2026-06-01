import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // registrerar användaren
      await registerUser(formData);

      // navigerar till login efter registrering
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px",
      }}
    >
      <div
        style={{
          background: "#12121a",
          border: "1px solid #2a2a3a",
          borderRadius: "10px",
          padding: "32px",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        {/* rubrik */}
        <h1
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "20px",
            color: "#FFE81F",
            letterSpacing: "2px",
            marginBottom: "8px",
          }}
        >
          CREATE ACCOUNT
        </h1>
        <p
          style={{
            fontSize: "12px",
            color: "#888899",
            fontFamily: "'Exo 2', sans-serif",
            marginBottom: "24px",
          }}
        >
          Join the fleet, commander.
        </p>

        {/* felmeddelande */}
        {error && (
          <div
            style={{
              fontSize: "12px",
              color: "#ff4444",
              marginBottom: "16px",
              fontFamily: "'Exo 2', sans-serif",
            }}
          >
            {error}
          </div>
        )}

        {/* username */}
        <div style={{ marginBottom: "12px" }}>
          <div style={labelStyle}>USERNAME</div>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="commander"
            style={inputStyle}
          />
        </div>

        {/* email */}
        <div style={{ marginBottom: "12px" }}>
          <div style={labelStyle}>EMAIL</div>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="commander@galacticfleet.com"
            style={inputStyle}
          />
        </div>

        {/* lösenord */}
        <div style={{ marginBottom: "24px" }}>
          <div style={labelStyle}>PASSWORD</div>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            style={inputStyle}
          />
        </div>

        {/* register-knapp */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            background: loading ? "#C9A800" : "#FFE81F",
            color: "#0a0a0f",
            border: "none",
            padding: "12px",
            fontSize: "13px",
            fontWeight: "700",
            borderRadius: "6px",
            cursor: loading ? "not-allowed" : "pointer",
            fontFamily: "'Exo 2', sans-serif",
            letterSpacing: "1px",
            marginBottom: "16px",
          }}
        >
          {loading ? "Creating account..." : "Create Account →"}
        </button>

        {/* länk till login */}
        <div
          style={{
            textAlign: "center",
            fontSize: "12px",
            color: "#888899",
            fontFamily: "'Exo 2', sans-serif",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ color: "#FFE81F", textDecoration: "none" }}
          >
            Sign in
          </Link>
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

export default Register;
