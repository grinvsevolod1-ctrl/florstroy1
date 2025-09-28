import styled from 'styled-components';
import { useCartContext } from 'context/CartContext';
import Link from 'next/link';

export default function CartPreview() {
  const { cart, totalPrice } = useCartContext();

  if (cart.length === 0) return null;

  return (
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