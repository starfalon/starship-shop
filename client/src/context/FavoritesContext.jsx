import { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  // favorites är en array av produkter
  const [favorites, setFavorites] = useState([]);

  // lägger till en produkt i favoriter om den inte redan finns
  const addFavorite = (product) => {
    setFavorites((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) return prev;
      return [...prev, product];
    });
  };

  // tar bort en produkt från favoriter baserat på id
  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((item) => item._id !== id));
  };

  // kollar om en produkt redan är i favoriter
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

// custom hook för att komma åt FavoritesContext
export function useFavorites() {
  return useContext(FavoritesContext);
}
