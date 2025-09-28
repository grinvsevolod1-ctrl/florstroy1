import styled, { keyframes } from 'styled-components';
import { useCartContext } from 'context/CartContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartPreview({ isOpen, onClose }: Props) {
  const { cart, totalPrice, updateQuantity, removeFromCart } = useCartContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <Overlay onClick={onClose}>
      <Card onClick={(e) => e.stopPropagation()}>
        <Close onClick={onClose}>✕</Close>
        <Header>Корзина</Header>

        {cart.length === 0 ? (
          <Empty>Ваша корзина пуста</Empty>
        ) : (
          <>
            <List>
              {cart.map((item) => (
                <Item key={item.id}>
                  <span>{item.title}</span>
                  <Controls>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </Controls>
                  <Remove onClick={() => removeFromCart(item.id)}>✕</Remove>
                </Item>
              ))}
            </List>
            <Total>Итого: {totalPrice} ₽</Total>
            <Link href="/checkout" passHref>
              <Checkout>Оформить заказ</Checkout>
            </Link>
          </>
        )}
      </Card>
    </Overlay>,
    document.body
  );
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  background: rgb(var(--background));
  color: rgb(var(--text));
  width: 90%;
  max-width: 400px;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  position: relative;
  animation: ${fadeIn} 0.3s ease-out;
`;

const Header = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Empty = styled.div`
  font-size: 1.4rem;
  text-align: center;
  padding: 2rem 0;
  color: rgb(var(--text), 0.6);
`;

const List = styled.ul`
  flex-grow: 1;
  font-size: 1.4rem;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Controls = styled.div`
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

const Remove = styled.button`
  background: transparent;
  border: none;
  color: rgb(var(--accent));
  font-size: 1.2rem;
  cursor: pointer;
`;

const Total = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  margin: 2rem 0 1rem;
  text-align: center;
`;

const Checkout = styled.a`
  background: rgb(var(--primary));
  color: white;
  text-align: center;
  padding: 1rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-size: 1.4rem;
`;

const Close = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.6rem;
  color: rgb(var(--text));
  cursor: pointer;
`;