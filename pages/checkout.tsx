import styled from 'styled-components';
import { useState } from 'react';
import { useCartContext } from 'context/CartContext';

export default function Checkout() {
  const { cart, totalPrice } = useCartContext();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Введите корректный email');
      return;
    }

    try {
      await fetch('/api/sendOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cart,
          name: 'Клиент',
          contactMethod: 'Email',
          contactValue: email,
          email,
          comment: '',
        }),
      });
      setSubmitted(true);
      setError('');
    } catch {
      setError('Ошибка отправки заказа');
    }
  }

  return (
    <Wrapper>
      <Title>Оформление заказа</Title>

      {submitted ? (
        <Success>
          <SuccessIcon viewBox="0 0 24 24">
            <path fill="green" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </SuccessIcon>
          <h3>Спасибо за заказ!</h3>
          <p>Подтверждение отправлено на <strong>{email}</strong>.</p>
        </Success>
      ) : (
        <Form onSubmit={handleSubmit}>
          <CartBlock>
            <CartIcon viewBox="0 0 24 24">
              <path fill="currentColor" d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 
              0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.16 
              14l.84-2h8.99c.75 0 1.41-.41 1.75-1.03l3.58-6.49A.996.996 
              0 0021.99 3H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 
              13.37 5.48 15 7 15h12v-2H7.16z" />
            </CartIcon>
            <h3>Корзина</h3>
            <ul>
              {cart.map((item) => (
                <li key={item.id}>
                  <strong>{item.title}</strong> × {item.quantity} — {item.price * item.quantity} ₽
                </li>
              ))}
            </ul>
            <Total>Итого: {totalPrice} ₽</Total>
          </CartBlock>

          <Field>
            <Label>
              <EmailIcon viewBox="0 0 24 24">
                <path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 
                  2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 
                  2v.01L12 13 4 6.01V6h16zM4 18V8l8 5 8-5v10H4z" />
              </EmailIcon>
              Email <span>*</span>
            </Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && <Error>{error}</Error>}
          </Field>

          <Submit>Оформить заказ</Submit>
        </Form>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 3rem 2rem;
`;

const Title = styled.h2`
  font-size: 2.4rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const CartBlock = styled.div`
  background: rgba(var(--text), 0.03);
  padding: 2rem;
  border-radius: 1rem;

  h3 {
    font-size: 1.6rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin-bottom: 1rem;

    li {
      font-size: 1.4rem;
      margin-bottom: 0.5rem;
    }
  }
`;

const Total = styled.div`
  font-weight: bold;
  font-size: 1.4rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;

  span {
    color: red;
    margin-left: 0.4rem;
  }
`;

const Input = styled.input`
  margin-top: 0.5rem;
  padding: 1rem;
  font-size: 1.4rem;
  border: 1px solid rgba(var(--text), 0.2);
  border-radius: 0.4rem;
`;

const Submit = styled.button`
  background: rgb(var(--primary));
  color: white;
  font-size: 1.6rem;
  padding: 1.2rem;
  border: none;
  border-radius: 0.6rem;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: rgb(var(--primary), 0.85);
  }
`;

const Error = styled.div`
  color: red;
  font-size: 1.2rem;
  margin-top: 0.5rem;
`;

const Success = styled.div`
  text-align: center;

  h3 {
    font-size: 2rem;
    margin-top: 1rem;
  }

  p {
    font-size: 1.4rem;
    margin-top: 0.5rem;
  }
`;

const EmailIcon = styled.svg`
  width: 20px;
  height: 20px;
`;

const CartIcon = styled.svg`
  width: 20px;
  height: 20px;
`;

const SuccessIcon = styled.svg`
  width: 80px;
  height: 80px;
  margin: auto;
`;