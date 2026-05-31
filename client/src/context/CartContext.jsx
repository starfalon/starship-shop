// hanterar cartens state
// alla komponenter kan komma åt varukorgen via useCart-hooken
import { createContext, useContext, useState } from "react";

// context objekt som vi delar med hela appen
const CartContext = createContext();

// cartprovider wrappas runt hela appen i main.jsx
// alla komponenter inuti kan använda useCart()
export function CartProvider({ children }) {
  // cartItems är en array av produkter med quantity
  const [cartItems, setCartItems] = useState([]);

  // lägger till en produkt i varukorgen, om produkten redan finns ökas quantity med 1
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // tar bort en produktfrån varukorgen baserat på id
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  // uppdaterar quantity
  // om quantity är mindre än 1 görs ingenting
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item._id === id ? { ...item, quantity } : item)),
    );
  };

  // tömmer hela varukorgen efter beställning gjorts
  const clearCart = () => setCartItems([]);

  // beräknar totalpriset i varukorgen
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // beräknar antal varor i varukorgen
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    // delar ut alla värden och funktioner till alla childs (children?)
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// custom hook för att enkelt komma åt CartContext i alla komponenter
export function useCart() {
  return useContext(CartContext);
}
