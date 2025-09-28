import styled from 'styled-components';
import { useCartContext } from 'context/CartContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CartPreview() {
  const { cart, totalPrice } = useCartContext();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (cart.length === 0) return null;

  return isMobile ? (
    <MobileOverlay>
      <MobileHeader>Корзина</MobileHeader>
      <MobileList>
        {cart.map((item) => (
          <li key={item.id}>
            {item.title} × {item.quantity}
          </li>
        ))}
      </MobileList>
      <MobileTotal>Итого: {totalPrice} ₽</MobileTotal>
      <Link href="/checkout" passHref>
        <MobileButton>Оформить заказ</MobileButton>
      </Link>
    </MobileOverlay>
  ) : (
    <Preview>
      <ul>
        {cart.slice(0, 3).map((item) => (
          <li key={item.id}>
            {item.title} × {item.quantity}
          </li>