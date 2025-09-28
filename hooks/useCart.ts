import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  image?: string;
  quantity: number;
};

const STORAGE_KEY = 'flor-cart';

function loadCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const cookieData = Cookies.get(STORAGE_KEY);
  const localData = localStorage.getItem(STORAGE_KEY);
  const stored = cookieData && cookieData.length > 2 ? cookieData : localData;

  try {
    const parsed = JSON.parse(stored || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Ошибка парсинга корзины:', e);
    return [];
  }
}

function saveCart(cart: CartItem[]) {
  const serialized = JSON.stringify(cart);
  Cookies.set(STORAGE_KEY, serialized, { expires: 7 });
  localStorage.setItem(STORAGE_KEY, serialized);
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>(typeof window !== 'undefined' ? loadCart() : []);
  const [addedItem, setAddedItem] = useState<CartItem | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCart(loadCart());
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      saveCart(cart);
    }
  }, [cart]);

  function addToCart(item: Omit<CartItem, 'quantity'>) {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        const updated = prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
        setAddedItem({ ...existing, quantity: existing.quantity + 1 });
        return updated;
      }
      const newItem = { ...item, quantity: 1 };
      setAddedItem(newItem);
      return [...prev, newItem];
    });
  }

  function removeFromCart(id: string) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function updateQuantity(id: string, quantity: number) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  }

  function clearCart() {
    setCart([]);
    localStorage.removeItem(STORAGE_KEY);
    Cookies.remove(STORAGE_KEY);
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const finalPrice = totalPrice;

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    finalPrice,
    addedItem,
    setAddedItem,
  };
}