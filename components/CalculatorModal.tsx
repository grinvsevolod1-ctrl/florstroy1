import styled from 'styled-components';
import { useState } from 'react';

export default function CalculatorModal({ onClose }: { onClose: () => void }) {
  const [area, setArea] = useState('');
  const [type, setType] = useState('basic');
  const [reinforced, setReinforced] = useState(false);
  const [comment, setComment] = useState('');
  const [price, setPrice] = useState<number | null>(null);

  function calculate() {
    const base = type === 'basic' ? 1200 : type === 'epoxy' ? 1800 : 1500;
    const extra = reinforced ? 300 : 0;
    const total = Number(area) * (base + extra);
    setPrice(total);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    calculate();
    // TODO: отправка в Telegram или API
  }

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Title>Калькулятор стоимости</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="number"
            placeholder="Площадь, м²"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            required
          />

          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="basic">Базовое покрытие</option>
            <option value="epoxy">Эпоксидное покрытие</option>
            <option value="polished">Шлифованный бетон</option>
          </Select>

          <CheckboxWrapper>
            <label>
              <input
                type="checkbox"
                checked={reinforced}
                onChange={(e) => setReinforced(e.target.checked)}
              />
              Армирование
            </label>
          </CheckboxWrapper>

          <Textarea
            placeholder="Комментарий или объект"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
          />

          <SubmitButton type="submit">Рассчитать</SubmitButton>

          {price !== null && <Result>Предварительная стоимость: {price.toLocaleString()} ₽</Result>}
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
    margin: 2rem;
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

const Select = styled.select`
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

const CheckboxWrapper = styled.div`
  font-size: 1.4rem;
  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
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

const Result = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  margin-top: 1rem;
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
