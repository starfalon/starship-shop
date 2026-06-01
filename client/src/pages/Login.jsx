import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api";

function Login() {
  const navigate = useNavigate();

  // formens state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // håller koll på fel och laddningsstatus
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // uppdaterar formData när användaren skriver
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // skickar login-request till backenden
      const res = await loginUser(formData);

      // sparar JWT-token i localStorage
      localStorage.setItem("token", res.data.accessToken);

      // navigerar till startsidan efter inloggning
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
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
        {/* rubriken */}
        <h1
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "20px",
            color: "#FFE81F",
            letterSpacing: "2px",
            marginBottom: "8px",
          }}
        >
          SIGN IN
        </h1>
        <p
          style={{
            fontSize: "12px",
            color: "#888899",
            fontFamily: "'Exo 2', sans-serif",
            marginBottom: "24px",
          }}
        >
          Welcome back, commander.
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

        {/* email */}
        <div style={{ marginBottom: "12px" }}>
          <div style={labelStyle}>EMAIL</div>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="user@galacticfleet.com"
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

        {/*     login-knapp */}
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
          {loading ? "Signing in..." : "Sign In →"}
        </button>

        {/* länk till register */}
        <div
          style={{
            textAlign: "center",
            fontSize: "12px",
            color: "#888899",
            fontFamily: "'Exo 2', sans-serif",
          }}
        >
          No account?{" "}
          <Link
            to="/register"
            style={{ color: "#FFE81F", textDecoration: "none" }}
          >
            Create one
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

export default Login;
