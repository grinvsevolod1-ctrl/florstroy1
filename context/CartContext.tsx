import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  image?: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const STORAGE_KEY = 'flor-cart';
const CartContext = createContext<CartContextType | undefined>(undefined);

function loadCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const cookieData = Cookies.get(STORAGE_KEY);
  const localData = localStorage.getItem(STORAGE_KEY);
  const stored = cookieData && cookieData.length > 2 ? cookieData : localData;

  try {
    const parsed = JSON.parse(stored || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCart(cart: CartItem[]) {
  const serialized = JSON.stringify(cart);
  Cookies.set(STORAGE_KEY, serialized, { expires: 7 });
  localStorage.setItem(STORAGE_KEY, serialized);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(typeof window !== 'undefined' ? loadCart() : []);

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

  useEffect(() => {
    function syncCart(event: StorageEvent) {
      if (event.key === STORAGE_KEY && event.newValue) {
        try {
          const parsed = JSON.parse(event.newValue);
          if (Array.isArray(parsed)) setCart(parsed);
        } catch {}
      }
    }

    window.addEventListener('storage', syncCart);
    return () => window.removeEventListener('storage', syncCart);
  }, []);

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

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCartContext must be used within CartProvider');
  return context;
}
