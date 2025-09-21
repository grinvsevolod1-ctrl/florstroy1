import styled from 'styled-components';
import { useState } from 'react';

type ContactMethod = 'Телефон' | 'Email' | 'Telegram' | 'WhatsApp';

export default function SubmitModal({
  calculation,
  onClose,
}: {
  calculation: string;
  onClose: () => void;
}) {
  const [name, setName] = useState('');
  const [contactMethod, setContactMethod] = useState<ContactMethod>('Телефон');
  const [contactValue, setContactValue] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');

    try {
      await fetch('/api/sendApplicationWithCalculation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          contactMethod,
          contactValue,
          service: 'Расчёт бетонного пола',
          message,
          calculation,
        }),
      });
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Title>Оформление заявки</Title>
        <Form onSubmit={handleSubmit}>
          <Field>
            <Label>Ваше имя</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} required />
          </Field>

          <Field>
            <Label>Способ связи</Label>
            <Select value={contactMethod} onChange={(e) => setContactMethod(e.target.value as ContactMethod)}>
              <option value="Телефон">Телефон</option>
              <option value="Email">Email</option>
              <option value="Telegram">Telegram</option>
              <option value="WhatsApp">WhatsApp</option>
            </Select>
          </Field>

          <Field>
            <Label>{contactMethod}</Label>
            <Input value={contactValue} onChange={(e) => setContactValue(e.target.value)} required />
          </Field>

          <Field>
            <Label>Комментарий</Label>
            <Textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} />
          </Field>

          <SubmitButton type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Отправка...' : 'Отправить заявку'}
          </SubmitButton>

          {status === 'sent' && <Success>Заявка успешно отправлена!</Success>}
          {status === 'error' && <Error>Ошибка отправки. Попробуйте позже.</Error>}
        </Form>
      </Modal>
    </Overlay>
  );
}

// Стили
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  width: 100%;
  max-width: 600px;
  background: white;
  padding: 3rem;
  border-radius: 1rem;
  position: relative;

  @media (max-width: 600px) {
    margin: 1rem;
    padding: 2rem;
  }
`;

const Title = styled.h2`
  font-size: 2.4rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
`;

const Input = styled.input`
  padding: 1rem;
  font-size: 1.6rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background: #f9f9f9;

  &:focus {
    border-color: rgb(var(--primary));
    outline: none;
  }
`;

const Select = styled.select`
  padding: 1rem;
  font-size: 1.6rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background: #f9f9f9;

  &:focus {
    border-color: rgb(var(--primary));
    outline: none;
  }
`;

const Textarea = styled.textarea`
  padding: 1rem;
  font-size: 1.6rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background: #f9f9f9;
  resize: vertical;

  &:focus {
    border-color: rgb(var(--primary));
    outline: none;
  }
`;

const SubmitButton = styled.button`
  background: rgb(var(--primary));
  color: white;
  padding: 1.2rem 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  border: none;
  border-radius: 0.6rem;
  cursor: pointer;
  align-self: center;
  transition: background 0.3s;

  &:hover {
    background: rgb(var(--primary), 0.85);
  }
`;

const Success = styled.div`
  color: green;
  font-size: 1.4rem;
  text-align: center;
`;

const Error = styled.div`
  color: red;
  font-size: 1.4rem;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
`;
