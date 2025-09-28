import Link from 'next/link';
import styled from 'styled-components';
import { useCart } from 'hooks/useCart';

export default function CartIcon() {
  const { cart } = useCart();
  const count = cart.length;

  return (
    <Link href="/checkout" passHref>
      <IconWrapper>
        🛒
        {count > 0 && <Badge>{count}</Badge>}
      </IconWrapper>
    </Link>
  );
}

const IconWrapper = styled.a`
  position: relative;
  font-size: 2.4rem;
  text-decoration: none;
  color: rgb(var(--text));
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