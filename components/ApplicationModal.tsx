import styled from 'styled-components';
import { useState } from 'react';
import { useNewsletterModalContext } from 'contexts/newsletter-modal.context';

export default function ApplicationModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');

    try {
      await fetch('/api/sendApplication', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return (
    <Overlay>
      <Modal>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Title>Оставить заявку</Title>
        <Form onSubmit={handleSubmit}>
          <Input name="name" placeholder="Ваше имя" onChange={handleChange} required />
          <Input name="phone" placeholder="Телефон" onChange={handleChange} required />
          <Input name="email" placeholder="Email" onChange={handleChange} />
          <Input name="service" placeholder="Услуга / объект" onChange={handleChange} />
          <Textarea name="message" placeholder="Комментарий" onChange={handleChange} rows={4} />
          <SubmitButton type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Отправка...' : 'Отправить'}
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
  z-index: 1000;
`;

const Modal = styled.div`
  max-width: 500px;
  margin: 5rem auto;
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  position: relative;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  font-size: 1rem;
`;

const Textarea = styled.textarea`
  padding: 0.75rem;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  background: rgb(var(--primary));
  color: white;
  padding: 0.75rem;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
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

const Success = styled.div`
  color: green;
  font-size: 1rem;
`;

const Error = styled.div`
  color: red;
  font-size: 1rem;
`;
