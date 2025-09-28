import styled from 'styled-components';
import { useCartContext } from 'context/CartContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CartPreview() {
  const { cart, totalPrice, updateQuantity, removeFromCart } = useCartContext();
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
      <MobileCard>
        <MobileHeader>Корзина</MobileHeader>
        <MobileList>
          {cart.map((item) => (
            <MobileItem key={item.id}>
              <span>{item.title}</span>
              <QuantityControls>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </QuantityControls>
              <RemoveButton onClick={() => removeFromCart(item.id)}>✕</RemoveButton>
            </MobileItem>
          ))}
        </MobileList>
        <MobileTotal>Итого: {totalPrice} ₽</MobileTotal>
        <Link href="/checkout" passHref>
          <MobileButton>Оформить заказ</MobileButton>
        </Link>
      </MobileCard>
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
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MobileCard = styled.div`
  background: white;
  width: 90%;
  max-width: 400px;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
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

const MobileItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  button {
    background: rgb(var(--primary));
    color: white;
    border: none;
    padding: 0.3rem 0.8rem;
    font-size: 1.2rem;
    border-radius: 0.3rem;
    cursor: pointer;
  }

  span {
    font-size: 1.2rem;
    min-width: 2rem;
    text-align: center;
  }
`;

const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: rgb(var(--accent));
  font-size: 1.2rem;
  cursor: pointer;
`;

const MobileTotal = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  margin: 2rem 0 1rem;
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