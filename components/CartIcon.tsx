import styled from 'styled-components';
import { useCartContext } from 'context/CartContext';
import { useState } from 'react';
import CartPreview from './CartPreview';

export default function CartIcon() {
  const { totalItems } = useCartContext();
  const [hovered, setHovered] = useState(false);

  return (
    <CartWrapper onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Icon>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 4h-2l-1 2h2l3.6 7.59-1.35 2.44c-.16.28-.25.61-.25.97 0 1.1.9 2 2 2h12v-2h-12l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.3.12-.48 0-.55-.45-1-1-1h-16zm0 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
        {totalItems > 0 && <Badge>{totalItems}</Badge>}
      </Icon>
      {hovered && <CartPreview />}
    </CartWrapper>
  );
}

const CartWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.div`
  position: relative;
  width: 2.4rem;
  height: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(var(--text));
  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 768px) {
    width: 2rem;
    height: 2rem;
  }
`;

const Badge = styled.span`
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  background: rgb(var(--primary));
  color: white;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.2rem 0.5rem;
  border-radius: 1rem;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.1rem 0.4rem;
    top: -0.4rem;
    right: -0.4rem;
  }
`;