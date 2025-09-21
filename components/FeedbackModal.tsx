import styled from 'styled-components';
import { useFeedbackModalContext } from 'contexts/feedback-modal.context';
import { useState } from 'react';
import InputMask from 'react-input-mask';

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
        <CloseButton onClick={() => setIsOpen(false)}>×</CloseButton>
        <Title>Заявка на услугу</Title>

        <Form>
          <Grid>
            <Field>
              <Label>Имя</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ваше имя"
              />
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
  {contactMethod === 'Телефон' ? (
    <PhoneInputMasked
      mask="+7 (999) 999-99-99"
      maskChar="_"
      value={contactValue}
      onChange={(e) => setContactValue(e.target.value)}
      placeholder="+7 (___) ___-__-__"
    />
  ) : (
    <Input
      value={contactValue}
      onChange={(e) => setContactValue(e.target.value)}
      placeholder={`Ваш ${contactMethod}`}
    />
  )}
</Field>


            <Field>
              <Label>Услуга / объект</Label>
              <Input value={selectedService} disabled />
            </Field>
          </Grid>

          <Field>
            <Label>Комментарий</Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Опишите задачу или пожелания"
            />
          </Field>

          <Field>
            <Label>Расчёт / параметры объекта</Label>
            <Textarea
              value={calculation}
              onChange={(e) => setCalculation(e.target.value)}
              placeholder="Например: 120 м², толщина 80 мм, армирование сеткой"
            />
          </Field>

          <SubmitButton onClick={handleSubmit}>Отправить заявку</SubmitButton>
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
  max-width: 900px;
  max-height: 90vh;
  background: white;
  padding: 3rem;
  border-radius: 1rem;
  position: relative;
  overflow-y: auto;

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
  gap: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
  color: #333;
`;

const Select = styled.select`
  padding: 1rem;
  font-size: 1.6rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background: #f9f9f9;
  transition: border 0.2s;

  &:focus {
    border-color: rgb(var(--primary));
    outline: none;
  }
`;

const Input = styled.input`
  padding: 1rem;
  font-size: 1.6rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background: #f9f9f9;
  transition: border 0.2s;

  &:focus {
    border-color: rgb(var(--primary));
    outline: none;
  }
`;

const PhoneInputMasked = styled(InputMask)`
  padding: 1rem;
  font-size: 1.6rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background: #f9f9f9;
  transition: border 0.2s;
  width: 100%;

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
  transition: border 0.2s;

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

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
`;
const MaskedInput = styled(InputMask)`
  padding: 1rem;
  font-size: 1.6rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background: #f9f9f9;
  transition: border 0.2s;
  width: 100%;

  &:focus {
    border-color: rgb(var(--primary));
    outline: none;
  }
`;
