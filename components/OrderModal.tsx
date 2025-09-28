import styled from 'styled-components';
import { useCart } from 'hooks/useCart';
import { useState } from 'react';

type Props = {
  onClose: () => void;
};

export default function OrderModal({ onClose }: Props) {
  const { cart, updateQuantity, removeFromCart, clearCart, finalPrice } = useCart();
  const [name, setName] = useState('');
  const [contactMethod, setContactMethod] = useState('Телефон');
  const [contactValue, setContactValue] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');

    await fetch('/api/sendOrder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart, name, contactMethod, contactValue, email, comment }),
    });

    setStatus('sent');
    clearCart();
  }

  return (
    <Overlay>
      <Modal>
        <Close onClick={onClose}>✖</Close>
        <h2>Оформление заказа</h2>
        {cart.length === 0 ? (
          <p>Корзина пуста.</p>
        ) : (
          <>
            <CartList>
              {cart.map((item) => (
                <CartItem key={item.id}>
                  <Image src={item.image} alt={item.title} />
                  <div>
                    <strong>{item.title}</strong> — {item.price} ₽ ×
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      min={1}
                    />
                  </div>
                  <Remove onClick={() => removeFromCart(item.id)}>✖</Remove>
                </CartItem>
              ))}
            </CartList>
            <Total>Итого: {finalPrice} ₽</Total>
            <Form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <select value={contactMethod} onChange={(e) => setContactMethod(e.target.value)}>
                <option value="Телефон">Телефон</option>
                <option value="Telegram">Telegram</option>
              </select>
              <input
                type="text"
                placeholder={`Ваш ${contactMethod}`}
                value={contactValue}
                onChange={(e) => setContactValue(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email для подтверждения"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <textarea
                placeholder="Комментарий"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Отправка...' : 'Отправить заказ'}
              </button>
            </Form>
            {status === 'sent' && <Success>✅ Заказ отправлен!</Success>}
          </>
        )}
      </Modal>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background: rgb(var(--background));
  padding: 3rem;
  border-radius: 1rem;
  max-width: 60rem;
  width: 100%;
  position: relative;
`;

const Close = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const CartList = styled.ul`
  margin-bottom: 2rem;
  list-style: none;
  padding: 0;
`;

const CartItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;

  input {
    width: 4rem;
    padding: 0.4rem;
  }
`;

const Image = styled.img`
  width: 4rem;
  height: 4rem;
  object-fit: cover;
  border-radius: 0.4rem;
`;

const Remove = styled.button`
  background: transparent;
  border: none;
  font-size: 1.4rem;
  color: red;
  cursor: pointer;
`;

const Total = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  input, select, textarea {
    font-size: 1.4rem;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
  }

  textarea {
    min-height: 8rem;
    resize: vertical;
  }

  button {
    background: rgb(var(--primary));
    color: white;
    font-size: 1.4rem;
    padding: 1rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;

    &:hover {
      background: rgb(var(--primary), 0.85);
    }
  }
`;

const Success = styled.p`
  margin-top: 2rem;
  font-size: 1.4rem;
  color: green;
  font-weight: bold;
`;