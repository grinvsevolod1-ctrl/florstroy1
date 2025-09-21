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
    <Overlay>
      <Modal>
        <h3>Заявка на услугу: {selectedService}</h3>

        <Input placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} />

        <Select value={contactMethod} onChange={(e) => setContactMethod(e.target.value)}>
          <option>Телефон</option>
          <option>Email</option>
          <option>Telegram</option>
          <option>WhatsApp</option>
        </Select>

        <Input placeholder={`Ваш ${contactMethod}`} value={contactValue} onChange={(e) => setContactValue(e.target.value)} />

        <Textarea placeholder="Комментарий" value={message} onChange={(e) => setMessage(e.target.value)} />

        <Textarea placeholder="Расчёт / параметры объекта" value={calculation} onChange={(e) => setCalculation(e.target.value)} />

        <Button onClick={handleSubmit}>Отправить</Button>
        <Close onClick={() => setIsOpen(false)}>×</Close>
      </Modal>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const Modal = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 1rem;
  position: relative;
  width: 100%;
  max-width: 500px;
`;

const Input = styled.input`
  width: 100%;
  margin-top: 1rem;
  padding: 1rem;
  font-size: 1.6rem;
`;

const Select = styled.select`
  width: 100%;
  margin-top: 1rem;
  padding: 1rem;
  font-size: 1.6rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  margin-top: 1rem;
  padding: 1rem;
  font-size: 1.6rem;
  height: 100px;
`;

const Button = styled.button`
  margin-top: 2rem;
  padding: 1rem 2rem;
  background: rgb(var(--primary));
  color: white;
  border: none;
  font-size: 1.6rem;
  cursor: pointer;
`;

const Close = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 2rem;
  cursor: pointer;
`;
