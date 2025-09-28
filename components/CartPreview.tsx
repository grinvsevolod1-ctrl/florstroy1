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
        ))}
      </ul>
      <Total>Итого: {totalPrice} ₽</Total>
      <Link href="/checkout" passHref>
        <CheckoutButton>Оформить</CheckoutButton>
      </Link>
    </Preview>
  );
}

const Preview = styled.div`
  position: absolute;
  top: 3.5rem;
  right: 0;
  background: rgb(var(--background));
  border: 1px solid rgba(var(--text), 0.1);
  padding: 1rem;
  border-radius: 0.6rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  z-index: 100;
  width: 22rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Total = styled.div`
  margin-top: 1rem;
  font-weight: bold;
`;

const CheckoutButton = styled.a`
  display: block;
  margin-top: 1rem;
  background: rgb(var(--primary));
  color: white;
  text-align: center;
  padding: 0.6rem;
  border-radius: 0.4rem;
  text-decoration: none;
`;

// 📱 Мобильная версия
const MobileOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgb(var(--background));
  z-index: 999;
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

const MobileHeader = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const MobileList = styled.ul`
  flex-grow: 1;
  font-size: 1.4rem;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MobileTotal = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  margin: 2rem 0;
`;

const MobileButton = styled.a`
  background: rgb(var(--primary));
  color: white;
  text-align: center;
  padding: 1rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-size: 1.4rem;
`;