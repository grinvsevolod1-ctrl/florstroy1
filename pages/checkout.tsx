import styled from 'styled-components';
import { useCart } from 'hooks/useCart';
import { useState } from 'react';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const [name, setName] = useState('');
  const [contactMethod, setContactMethod] = useState<'Телефон' | 'Email' | 'Telegram'>('Телефон');
  const [contactValue, setContactValue] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await fetch('/api/sendOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cart,
          name,
          contactMethod,
          contactValue,
          email,
          comment,
        }),
      });

      clearCart();
      setSubmitted(true);
    } catch (error) {
      console.error('Ошибка отправки:', error);
    }
  }

  if (submitted) {
    return (
      <Wrapper>
        <Title>Спасибо за заказ!</Title>
        <Text>Мы свяжемся с вами в ближайшее время.</Text>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Title>Оформление заказа</Title>
      {cart.length === 0 ? (
        <Text>Ваша корзина пуста.</Text>
      ) : (
        <>
          <ItemList>
            {cart.map((item) => (
              <Item key={item.id}>
                <span>{item.title}</span>
                <span>{item.quantity} × {item.price} ₽</span>
              </Item>
            ))}
          </ItemList>
          <Total>Итого: {totalPrice} ₽</Total>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Select value={contactMethod} onChange={(e) => setContactMethod(e.target.value as any)}>
              <option value="Телефон">Телефон</option>
              <option value="Email">Email</option>
              <option value="Telegram">Telegram</option>
            </Select>

            <Input
              type="text"
              placeholder={`Ваш ${contactMethod.toLowerCase()}`}
              value={contactValue}
              onChange={(e) => setContactValue(e.target.value)}
              required
            />

            <Input
              type="email"
              placeholder="Email для подтверждения (необязательно)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Textarea
              placeholder="Комментарий к заказу"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <SubmitButton type="submit">Подтвердить заказ</SubmitButton>
          </Form>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 600px;
  margin: 4rem auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2.4rem;
  margin-bottom: 2rem;
`;

const Text = styled.p`
  font-size: 1.6rem;
  color: rgb(var(--text), 0.7);
`;

const ItemList = styled.div`
  margin-bottom: 2rem;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
`;

const Total = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Input = styled.input`
  padding: 1rem;
  font-size: 1.4rem;
  border: 1px solid rgba(var(--text), 0.2);
  border-radius: 0.5rem;
`;

const Textarea = styled.textarea`
  padding: 1rem;
  font-size: 1.4rem;
  border: 1px solid rgba(var(--text), 0.2);
  border-radius: 0.5rem;
  resize: vertical;
  min-height: 6rem;
`;

const Select = styled.select`
  padding: 1rem;
  font-size: 1.4rem;
  border: 1px solid rgba(var(--text), 0.2);
  border-radius: 0.5rem;
`;

const SubmitButton = styled.button`
  background: rgb(var(--primary));
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.4rem;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background: rgb(var(--primary), 0.85);
  }
`;