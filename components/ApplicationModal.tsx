import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { useNewsletterModalContext } from 'contexts/newsletter-modal.context';

export default function ApplicationModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    contactMethod: 'phone',
    contactValue: '+7',
    service: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;

    if (name === 'contactMethod') {
      let preset = '';
      if (value === 'phone' || value === 'whatsapp') preset = '+7';
      if (value === 'telegram') preset = '@';
      setFormData((prev) => ({
        ...prev,
        contactMethod: value,
        contactValue: preset,
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
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

  useEffect(() => {
    if (status === 'sent') {
      const timer = setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status, onClose]);

  function getPlaceholder(method: string) {
    switch (method) {
      case 'phone':
      case 'whatsapp':
        return '+7XXXXXXXXXX';
      case 'email':
        return 'example@domain.ru';
      case 'telegram':
        return '@username';
      default:
        return '';
    }
  }

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Title>Оставить заявку</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            ref={nameInputRef}
            name="name"
            placeholder="Ваше имя"
            onChange={handleChange}
            required
          />

          <Select name="contactMethod" value={formData.contactMethod} onChange={handleChange}>
            <option value="phone">Телефон</option>
            <option value="email">Email</option>
            <option value="telegram">Telegram</option>
            <option value="whatsapp">WhatsApp</option>
          </Select>

          {formData.contactMethod === 'email' ? (
            <Input
              type="email"
              name="contactValue"
              placeholder={getPlaceholder(formData.contactMethod)}
              value={formData.contactValue}
              onChange={handleChange}
              required
            />
          ) : (
            <Input
              type="text"
              name="contactValue"
              inputMode={formData.contactMethod === 'phone' || formData.contactMethod === 'whatsapp' ? 'tel' : 'text'}
              pattern={formData.contactMethod === 'phone' || formData.contactMethod === 'whatsapp' ? '\\+?[0-9\\s\\-()]{7,}' : undefined}
              placeholder={getPlaceholder(formData.contactMethod)}
              value={formData.contactValue}
              onChange={handleChange}
              required
            />
          )}

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
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);

  @media (max-width: 600px) {
    margin: 2rem;
    padding: 2rem;
  }
`;

const Title = styled.h2`
  font-size: 2.2rem;
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

const Select = styled.select`
  padding: 1rem;
  font-size: 1.6rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
`;

const SubmitButton = styled.button`
  background: rgb(var(--primary));
  color: white;
  padding: 1.25rem;
  font-size: 1.4rem;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background: rgb(var(--primary), 0.9);
  }
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
  font-size: 1.4rem;
`;

const Error = styled.div`
  color: red;
  font-size: 1.4rem;
`;
