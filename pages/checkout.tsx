import styled from 'styled-components';
import { useCartContext } from 'context/CartContext';
import { useState } from 'react';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCartContext();
  const contactOptions = ['Телефон', 'Telegram', 'Viber', 'WhatsApp'];
  const [contactIndex, setContactIndex] = useState(0);
  const [name, setName] = useState('');
  const [contactValue, setContactValue] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const contactMethod = contactOptions[contactIndex];

  function validateContact(value: string): boolean {
    if (contactMethod === 'Телефон') {
      return /^[\d\s+()-]{6,}$/.test(value);
    }
    return /^@?[a-zA-Z0-9_]{3,}$/.test(value);
  }

  function handleContactChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value;

    if (contactMethod === 'Телефон') {
      value = value.replace(/[^\d+()\s-]/g, ''); // разрешаем стереть +7
    }

    if (['Telegram', 'Viber', 'WhatsApp'].includes(contactMethod)) {
      if (value.length === 0) value = '@';
      if (!value.startsWith('@')) value = '@' + value.replace(/^@+/, '');
    }

    setContactValue(value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!validateContact(contactValue)) {
      setError(`Неверный формат для ${contactMethod.toLowerCase()}`);
      return;
    }

    try {
      await fetch('/api/sendOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cart,
          name,
          contactMethod,
          contactValue,
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

            <ContactMethod>
              <button
                type="button"
                onClick={() => setContactIndex((i) => (i > 0 ? i - 1 : contactOptions.length - 1))}
              >
                ←
              </button>
              <IconLabel>
                {contactMethod === 'Телефон' && '📞'}
                {contactMethod === 'Telegram' && '📲'}
                {contactMethod === 'Viber' && '💬'}
                {contactMethod === 'WhatsApp' && '🟢'}
              </IconLabel>
              <span>{contactMethod}</span>
              <button
                type="button"
                onClick={() => setContactIndex((i) => (i < contactOptions.length - 1 ? i + 1 : 0))}
              >
                →
              </button>
            </ContactMethod>

            <Input
              type="text"
              placeholder={`Ваш ${contactMethod.toLowerCase()}`}
              value={contactValue}
              onChange={handleContactChange}
              required
            />

            <Hint>
              {contactMethod === 'Телефон' && 'Введите номер в любом формате, например: +7 (999) 123-45-67'}
              {contactMethod === 'Telegram' && 'Введите имя пользователя, например: @username'}
              {contactMethod === 'Viber' && 'Введите имя или номер, например: @vibername'}
              {contactMethod === 'WhatsApp' && 'Введите номер или имя, например: @whatsappuser'}
            </Hint>

            {error && <ErrorText>{error}</ErrorText>}

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

const ContactMethod = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: 1.4rem;

  button {
    background: rgb(var(--primary));
    color: white;
    border: none;
    padding: 0.4rem 1rem;
    font-size: 1.2rem;
    border-radius: 0.3rem;
    cursor: pointer;
  }

  span {
    font-weight: bold;
    min-width: 8rem;
    text-align: center;
  }
`;

const IconLabel = styled.div`
  font-size: 1.6rem;
`;

const Hint = styled.div`
  font-size: 1.2rem;
  color: rgb(var(--text), 0.6);
  margin-top: -1rem;
`;

const ErrorText = styled.div`
  color: red;
  font-size: 1.2rem;
  margin-top: -1rem;
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