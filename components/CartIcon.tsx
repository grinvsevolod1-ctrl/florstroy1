import styled from 'styled-components';
import { useCartContext } from 'context/CartContext';
import { useState, useEffect } from 'react';
import CartPreview from './CartPreview';

export default function CartIcon() {
  const { totalItems } = useCartContext();
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <IconCircle offsetX="-2px" offsetY="-2px" onClick={() => setIsOpen(true)}>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 4h-2l-1 2h2l3.6 7.59-1.35 2.44c-.16.28-.25.61-.25.97 0 1.1.9 2 2 2h12v-2h-12l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.3.12-.48 0-.55-.45-1-1-1h-16zm0 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
        {totalItems > 0 && <Badge>{totalItems}</Badge>}
      </IconCircle>

      {isMobile && isOpen && (
        <CartPreview isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}

const IconCircle = styled.div<{ offsetX?: string; offsetY?: string }>`
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  background: rgba(var(--text), 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s;
  position: relative;

  &:hover {
    background: rgba(var(--primary), 0.1);
  }

  svg {
    width: 2.4rem;
    height: 2.4rem;
    fill: rgb(var(--text));
    position: relative;
    top: ${(p) => p.offsetY || '0'};
    left: ${(p) => p.offsetX || '0'};
  }
`;

const Badge = styled.span`
  position: absolute;
  top: -0.4rem;
  right: -0.4rem;
  background: rgb(var(--primary));
  color: white;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.2rem 0.5rem;
  border-radius: 1rem;
  line-height: 1;
`;