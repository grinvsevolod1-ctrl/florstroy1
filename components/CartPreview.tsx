import styled, { keyframes } from 'styled-components';
import { useCartContext } from 'context/CartContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/router';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartPreview({ isOpen, onClose }: Props) {
  const { cart, totalPrice, updateQuantity, removeFromCart } = useCartContext();
  const [mounted, setMounted] = useState(false);
  const [comment, setComment] = useState('');
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    if (isOpen) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [isOpen]);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (url.includes('/checkout')) onClose();
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    router.events.on('routeChangeStart', handleRouteChange);
    document.addEventListener('keydown', handleEsc);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <Overlay onClick={onClose}>
      <Card onClick={(e) => e.stopPropagation()}>
        <Close onClick={onClose}>
          <CloseIcon viewBox="0 0 24 24">
            <path fill="currentColor" d="M18 6L6 18M6 6l12 12" />
          </CloseIcon>
        </Close>
        <Header>
          <CartIcon viewBox="0 0 24 24">
            <path fill="currentColor" d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 
              0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.16 
              14l.84-2h8.99c.75 0 1.41-.41 1.75-1.03l3.58-6.49A.996.996 
              0 0021.99 3H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 
              13.37 5.48 15 7 15h12v-2H7.16z" />
          </CartIcon>
          Корзина
        </Header>

        {cart.length === 0 ? (
          <Empty>Ваша корзина пуста</Empty>
        ) : (
          <>
            <List>
              {cart.map((item) => (
                <Item key={item.id}>
                  <Image src={item.image} alt={item.title} />
                  <Info>
                    <Title>{item.title}</Title>
                    <Controls>
                      <QtyButton onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</QtyButton>
                      <Qty>{item.quantity}</Qty>
                      <QtyButton onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</QtyButton>
                      <Remove onClick={() => removeFromCart(item.id)}>
                        <RemoveIcon viewBox="0 0 24 24">
                          <path fill="currentColor" d="M18 6L6 18M6 6l12 12" />
                        </RemoveIcon>
                      </Remove>
                    </Controls>
                  </Info>
                </Item>
              ))}
            </List>

            <Comment>
              <label htmlFor="comment">Комментарий к заказу:</label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Например, удобное время для связи или доставка"
              />
            </Comment>

            <Footer>
              <Total>Итого: {totalPrice} ₽</Total>
              <Link
                href={{
                  pathname: '/checkout',
                  query: { comment },
                }}
                passHref
              >
                <Checkout>Оформить</Checkout>
              </Link>
            </Footer>
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
  max-width: 420px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
`;

const CartIcon = styled.svg`
  width: 20px;
  height: 20px;
`;

const Close = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const CloseIcon = styled.svg`
  width: 20px;
  height: 20px;
`;

const Empty = styled.div`
  font-size: 1.4rem;
  text-align: center;
  padding: 2rem 0;
  color: rgb(var(--text), 0.6);
`;

const List = styled.ul`
  flex-grow: 1;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Item = styled.li`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Image = styled.img`
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 0.4rem;
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-size: 1.3rem;
  margin-bottom: 0.4rem;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const QtyButton = styled.button`
  background: rgb(var(--primary));
  color: white;
  border: none;
  padding: 0.3rem 0.6rem;
  font-size: 1.2rem;
  border-radius: 0.3rem;
  cursor: pointer;
`;

const Qty = styled.span`
  font-size: 1.2rem;
  min-width: 2rem;
  text-align: center;
`;

const Remove = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;

const RemoveIcon = styled.svg`
  width: 16px;
  height: 16px;
  color: rgb(var(--accent));
`;

const Comment = styled.div`
  margin-top: 2rem;

  label {
    font-size: 1.2rem;
    display: block;
    margin-bottom: 0.5rem;
  }

  textarea {
    width: 100%;
    height: 80px;
    resize: none;
    padding: 0.8rem;
    font-size: 1.2rem;
    border-radius: 0.4rem;
    border: 1px solid rgba(var(--text), 0.2);
    background: rgb(var(--background));
    color: rgb(var(--text));
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const Total = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
`;

const Checkout = styled.a`
  background: rgb(var(--primary));
  color: white;
  text-align: center;
  padding: 0.8rem 1.2rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-size: 1.4rem;
  font-weight: bold;
  transition: background 0.2s ease;

  &:hover {
    background: rgb(var(--primary), 0.85);
  }
`;
