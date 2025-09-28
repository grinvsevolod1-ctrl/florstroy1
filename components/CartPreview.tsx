import styled, { keyframes } from 'styled-components';
import { useCartContext } from 'context/CartContext';
import Link from 'next/link';
import { useEffect } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartPreview({ isOpen, onClose }: Props) {
  const { cart, totalPrice, updateQuantity, removeFromCart } = useCartContext();

  useEffect(() => {
    if (isOpen) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [isOpen]);

  if (!isOpen || cart.length === 0) return null;

  return (
    <MobileOverlay onClick={onClose}>
      <MobileCard onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>✕</CloseButton>
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
  );
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

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
  position: relative;
  animation: ${fadeIn} 0.3s ease-out;
`;

const MobileHeader = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
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
  text-align: center;
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

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.6rem;
  color: rgb(var(--text));
  cursor: pointer;
`;