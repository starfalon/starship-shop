import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // user håller koll på inloggad användare (null om ingen är inloggad )
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //kollar om användaren redan är inloggad när appen startar genom att hämta token från localStorage och verifiera den
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await getCurrentUser();
        setUser(res.data);
      } catch (err) {
        // Token är ogiltig eller eller för gammal = remove
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // loggar in användaren och sparar token
  const login = (token, userData) => {
    localStorage.setItem("token", token);
    setUser(userData);
  };

  // loggar ut användaren och tar bort token
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// custom hook för att komma åt AuthContext
export function useAuth() {
  return useContext(AuthContext);
}
