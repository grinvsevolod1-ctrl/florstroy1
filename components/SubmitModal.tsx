import styled from 'styled-components';
import { useState } from 'react';

export default function SubmitModal({
  calculation,
  onClose,
}: {
  calculation: string;
  onClose: () => void;
}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');

    try {
      await fetch('/api/sendApplicationWithCalculation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, comment, calculation }),
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
          <Input placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input placeholder="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          <Textarea placeholder="Комментарий" value={comment} onChange={(e) => setComment(e.target.value)} rows={3} />

          <SubmitButton type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Отправка...' : 'Отправить заявку'}
          </SubmitButton>

          {status === 'sent' && <Success>Заявка отправлена!</Success>}
          {status === 'error' && <Error>Ошибка отправки. Попробуйте позже.</Error>}
        </Form>
      </Modal>
    </Overlay>
  );
}

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
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: grid;
  gap: 1.5rem;
`;

const Input = styled.input`
  padding: 1rem;
  font-size: 1.6rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
`;

const Textarea = styled.textarea`
  padding: 1rem;
  font-size: 1.6rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
`;

const SubmitButton = styled.button`
  background: rgb(var(--primary));
  color: white;
  padding: 1.2rem;
  font-size: 1.4rem;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
`;

const Success = styled.div`
  color: green;
  font-size: 1.4rem;
`;

const Error = styled.div`
  color: red;
  font-size: 1.4rem;
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
