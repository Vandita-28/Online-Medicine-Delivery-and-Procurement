import React, { createContext, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const { user } = useContext(AuthContext);

  const addToCart = (medicine) => {
    if (!user) {
      alert("Please log in to add items to your cart");
      return;
    }
    console.log(user)
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === medicine._id || item.id === medicine.id);
      if (existingItem) {
        return prevCart.map((item) =>
          (item.id === medicine._id || item.id === medicine.id)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...medicine, id: medicine._id || medicine.id, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    if (!user) {
      alert("Please log in to manage your cart");
      return;
    }

    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (!user) {
      alert("Please log in to update your cart");
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
