import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  image?: string;
  quantity: number;
};

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = Cookies.get('flor-cart');
    if (stored) setCart(JSON.parse(stored));
  }, []);

  useEffect(() => {
    Cookies.set('flor-cart', JSON.stringify(cart), { expires: 7 });
  }, [cart]);

  function addToCart(item: Omit<CartItem, 'quantity'>) {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }

  function removeFromCart(id: string) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return { cart, addToCart, removeFromCart, clearCart, totalItems, totalPrice };
}