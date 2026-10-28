"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "dastoor-cart-v2";

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setCart(JSON.parse(stored));
    } catch {
      setCart([]);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  const addItem = (item) => {
    setCart((current) => {
      const exists = current.find((entry) => entry.id === item.id);
      if (exists) {
        return current.map((entry) =>
          entry.id === item.id ? { ...entry, qty: entry.qty + 1 } : entry,
        );
      }
      return [...current, { ...item, qty: 1 }];
    });
  };

  const updateQty = (id, qty) => {
    setCart((current) =>
      current
        .map((entry) => (entry.id === id ? { ...entry, qty } : entry))
        .filter((entry) => entry.qty > 0),
    );
  };

  const removeItem = (id) => {
    setCart((current) => current.filter((entry) => entry.id !== id));
  };

  const clearCart = () => setCart([]);

  const itemCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart],
  );
  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart],
  );
  const delivery = subtotal > 0 ? (subtotal >= 1500 ? 0 : 149) : 0;
  const total = subtotal + delivery;

  const value = {
    cart,
    addItem,
    updateQty,
    removeItem,
    clearCart,
    itemCount,
    subtotal,
    delivery,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}
