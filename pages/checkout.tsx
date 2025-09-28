import styled from 'styled-components';
import { useState } from 'react';

export default function Checkout() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Введите корректный email');
      return;
    }

    setSubmitted(true);
    setError('');
  }

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
          <p>Мы отправили подтверждение на <strong>{email}</strong>.</p>
        </Success>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Field>
            <Label>
              <PhoneIcon viewBox="0 0 24 24">
                <path fill="currentColor" d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1v3.5a1 1 0 01-1 1C10.07 22 2 13.93 2 3.5a1 1 0 011-1H6.5a1 1 0 011 1c0 1.35.26 2.67.76 3.88a1 1 0 01-.21 1.11l-2.43 2.3z" />
              </PhoneIcon>
              Телефон
            </Label>
            <Input type="tel" placeholder="+7 (___) ___-__-__" required />
          </Field>

          <Field>
            <Label>
              <EmailIcon viewBox="0 0 24 24">
                <path fill="currentColor" d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 18V8l8 5 8-5v10H4z" />
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
  background: rgb(var(--background));
  color: rgb(var(--text));
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
  background: rgb(var(--background));
  color: rgb(var(--text));
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

const PhoneIcon = styled.svg`
  width: 24px;
  height: 24px;
`;

const EmailIcon = styled.svg`
  width: 24px;
  height: 24px;
`;

const SuccessIcon = styled.svg`
  width: 80px;
  height: 80px;
  margin: auto;
`;