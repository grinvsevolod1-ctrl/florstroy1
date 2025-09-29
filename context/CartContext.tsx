import styled from 'styled-components';
import { useCartContext } from 'context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function CartPage() {
  const { cart, totalPrice, updateQuantity, removeFromCart } = useCartContext();
  const [removingId, setRemovingId] = useState<string | null>(null);

  return (
    <Wrapper>
      <Title>Корзина</Title>
      {cart.length === 0 ? (
        <Empty>Ваша корзина пуста.</Empty>
      ) : (
        <>
          <ItemList>
            {cart.map((item) => (
              <Item key={item.id} className={removingId === item.id ? 'removing' : ''}>
                {item.image && (
                  <ImageWrapper>
                    <Image src={item.image} alt={item.title} width={80} height={80} />
                  </ImageWrapper>
                )}
                <Info>
                  <ItemTitle>{item.title}</ItemTitle>
                  <ItemPrice>{item.price} ₽</ItemPrice>
                  <QuantityControls>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </QuantityControls>
                  <RemoveButton
                    onClick={() => {
                      setRemovingId(item.id);
                      setTimeout(() => {
                        removeFromCart(item.id);
                        setRemovingId(null);
                      }, 300);
                    }}
                  >
                    Удалить
                  </RemoveButton>
                </Info>
              </Item>
            ))}
          </ItemList>
          <Summary>
            <Total>Итого: {totalPrice} ₽</Total>
            <Link href="/checkout" passHref>
              <CheckoutButton>ОФОРМИТЬ ЗАКАЗ</CheckoutButton>
            </Link>
          </Summary>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 800px;
  margin: 4rem auto;
  padding: 2rem;

  @media (max-width: 600px) {
    padding: 1rem;
    margin: 2rem auto;
  }
`;

const Title = styled.h1`
  font-size: 2.4rem;
  margin-bottom: 2rem;
`;

const Empty = styled.p`
  font-size: 1.6rem;
  text-align: center;
  color: rgb(var(--text), 0.6);
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Item = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  border-bottom: 1px solid rgba(var(--text), 0.1);
  padding-bottom: 1rem;
  transition: opacity 0.3s ease;

  &.removing {
    opacity: 0.3;
  }

  &:hover {
    background: rgba(var(--primary), 0.05);
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ImageWrapper = styled.div`
  flex-shrink: 0;
`;

const Info = styled.div`
  flex-grow: 1;
`;

const ItemTitle = styled.h3`
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
`;

const ItemPrice = styled.div`
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  button {
    background: rgb(var(--primary));
    color: white;
    border: none;
    padding: 0.4rem 1rem;
    font-size: 1.2rem;
    border-radius: 0.3rem;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: rgb(var(--primary), 0.8);
    }

    &:disabled {
      background: rgba(var(--primary), 0.4);
      cursor: not-allowed;
    }
  }

  span {
    font-size: 1.4rem;
    min-width: 2rem;
    text-align: center;
  }
`;

const RemoveButton = styled.button`
  margin-top: 0.5rem;
  background: transparent;
  color: rgb(var(--accent));
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: red;
  }
`;

const Summary = styled.div`
  margin-top: 3rem;
  text-align: right;
  position: sticky;
  bottom: 2rem;
  background: white;
  padding-top: 1rem;
`;

const Total = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const CheckoutButton = styled.button`
  background: black;
  color: white;
  padding: 1rem 2rem;
  font-size: 1.4rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgb(30, 30, 30);
  }
`;
