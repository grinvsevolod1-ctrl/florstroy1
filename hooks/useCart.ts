import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export function useCart() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const stored = Cookies.get('flor-cart');
    if (stored) setCart(JSON.parse(stored));
  }, []);

  useEffect(() => {
    Cookies.set('flor-cart', JSON.stringify(cart), { expires: 7 });
  }, [cart]);

  function addToCart(item: any) {
    setCart((prev) => [...prev, item]);
  }

  function clearCart() {
    setCart([]);
  }

  return { cart, addToCart, clearCart };
}