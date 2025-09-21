import styled from 'styled-components';
import { useFeedbackModalContext } from 'contexts/feedback-modal.context';
import { useState } from 'react';

export default function FeedbackModal() {
  const { isOpen, setIsOpen, selectedService } = useFeedbackModalContext();

  const [name, setName] = useState('');
  const [contactMethod, setContactMethod] = useState('Телефон');
  const [contactValue, setContactValue] = useState('');
  const [message, setMessage] = useState('');
  const [calculation, setCalculation] = useState('');

  const handleSubmit = async () => {
    const payload = {
      name,
      contactMethod,
      contactValue,
      service: selectedService,
      message,
      calculation,
    };

    try {
      await fetch('/api/send-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      setIsOpen(false);
      setName('');
      setContactMethod('Телефон');
      setContactValue('');
      setMessage('');
      setCalculation('');
    } catch (err) {
      console.error('Ошибка отправки:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <Overlay onClick={() => setIsOpen(false)}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>Заявка на услугу</Title>
          <Close onClick={() => setIsOpen(false)}>×</Close>
        </Header>

        <Subtitle>{selectedService}</Subtitle>

        <Field>
          <Label>Имя</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Field>

        <Field>
          <Label>Способ связи</Label>
          <Select value={contactMethod} onChange={(e) => setContactMethod(e.target.value)}>
            <option>Телефон</option>
            <option>Email</option>
            <option>Telegram</option>
            <option>WhatsApp</option>
          </Select>
        </Field>

        <Field>
          <Label>{contactMethod}</Label>
          <Input value={contactValue} onChange={(e) => setContactValue(e.target.value)} />
        </Field>

        <Field>
          <Label>Комментарий</Label>
          <Textarea value={message} onChange={(e) => setMessage(e.target.value)} />
        </Field>

        <Field>
          <Label>Расчёт / параметры объекта</Label>
          <Textarea value={calculation} onChange={(e) => setCalculation(e.target.value)} />
        </Field>

        <SubmitButton onClick={handleSubmit}>Отправить заявку</SubmitButton>
      </Modal>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  padding: 2rem;
`;

const Modal = styled.div`
  background: #fff;
  border-radius: 1.2rem;
  padding: 3rem;
  width: 100%;
  max-width: 500px;
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 40px rgba(0,0,0,0.1);

  @media (max-width: 600px) {
    padding: 2rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 2.4rem;
  margin: 0;
`;

const Subtitle = styled.div`
  font-size: 1.6rem;
  margin: 1rem 0 2rem;
  color: rgba(var(--textSecondary), 0.8);
`;

const Close = styled.div`
  font-size: 2.4rem;
  cursor: pointer;
  line-height: 1;
`;

const Field = styled.div`
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: block;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  color: rgba(var(--textSecondary), 0.9);
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  font-size: 1.6rem;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 0.6rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem;
  font-size: 1.6rem;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 0.6rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  font-size: 1.6rem;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 0.6rem;
  resize: vertical;
  min-height: 80px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1.2rem;
  font-size: 1.6rem;
  background: rgb(var(--primary));
  color: #fff;
  border: none;
  border-radius: 0.6rem;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(var(--primary), 0.85);
  }
`;
