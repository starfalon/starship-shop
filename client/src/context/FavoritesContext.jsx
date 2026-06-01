import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  // läser favoriter från localStorage vid start om de finns
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // sparar favoriter till localStorage varje gång de ändras
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (product) => {
    setFavorites((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) return prev;
      return [...prev, product];
    });
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((item) => item._id !== id));
  };

  const isFavorite = (id) => {
    return favorites.some((item) => item._id === id);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
