import { useCart } from 'hooks/useCart';
import styled from 'styled-components';
import { useState } from 'react';

export default function CheckoutPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');

    await fetch('/api/sendOrder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart, name, phone, comment }),
    });

    setStatus('sent');
    clearCart();
  }

  return (
    <Wrapper>
      <h1>Оформление заказа</h1>
      {cart.length === 0 ? (
        <p>Корзина пуста.</p>
      ) : (
        <>
          <CartList>
            {cart.map((item) => (
              <CartItem key={item.id}>
                <strong>{item.title}</strong> — {item.price} ₽ ×
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  min={1}
                />
                <RemoveButton onClick={() => removeFromCart(item.id)}>✖</RemoveButton>
              </CartItem>
            ))}
          </CartList>
          <Total>Итого: {totalPrice} ₽</Total>
          <Form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Телефон или Email"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <textarea
              placeholder="Комментарий к заказу"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Отправка...' : 'Отправить заказ'}
            </button>
          </Form>
          {status === 'sent' && <Success>✅ Заказ успешно отправлен!</Success>}
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 60rem;
  margin: 5rem auto;
  padding: 2rem;
`;

const CartList = styled.ul`
  margin-bottom: 2rem;
  list-style: none;
  padding: 0;
`;

const CartItem = styled.li`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  input {
    width: 4rem;
    padding: 0.4rem;
    font-size: 1.2rem;
  }
`;

const RemoveButton = styled.button`
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

  input, textarea {
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