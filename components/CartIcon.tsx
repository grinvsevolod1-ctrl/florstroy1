import Link from 'next/link';
import styled from 'styled-components';
import { useCart } from 'hooks/useCart';
import { useState } from 'react';
import CartPreview from './CartPreview';

export default function CartIcon() {
  const { totalItems } = useCart();
  const [hovered, setHovered] = useState(false);

  return (
    <CartWrapper onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Icon>🛒{totalItems > 0 && <Badge>{totalItems}</Badge>}</Icon>
      {hovered && <CartPreview />}
    </CartWrapper>
  );
}

const CartWrapper = styled.div`
  position: relative;
`;

const Icon = styled.div`
  font-size: 2.4rem;
  cursor: pointer;
`;

const Badge = styled.span`
  position: absolute;
  top: -0.4rem;
  right: -0.8rem;
  background: rgb(var(--primary));
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 0.2rem 0.6rem;
  border-radius: 1rem;
`;