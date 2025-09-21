import styled from 'styled-components';
import { useState, useRef } from 'react';
import SubmitModal from './SubmitModal';

type CoatingType = 'Шлифованный' | 'Эпоксидный' | 'Топпинг';
type FoundationType = 'Грунт' | 'Песок' | 'Бетон' | 'Плита';
type ReinforcementType = 'Сетка' | 'Фибра' | 'Арматура';
type ExtraWorkType = 'Гидроизоляция' | 'Демпфер' | 'Швы' | 'Укладка';

export default function CalculatorModal({ onClose }: { onClose: () => void }) {
  const [area, setArea] = useState('');
  const [foundation, setFoundation] = useState<FoundationType>('Бетон');
  const [coating, setCoating] = useState<CoatingType>('Шлифованный');
  const [thickness, setThickness] = useState('100');
  const [reinforced, setReinforced] = useState(false);
  const [reinforcementType, setReinforcementType] = useState<ReinforcementType>('Сетка');
  const [extras, setExtras] = useState<ExtraWorkType[]>([]);
  const [comment, setComment] = useState('');
  const [price, setPrice] = useState<number | null>(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const baseRate: Record<CoatingType, number> = {
    Шлифованный: 1200,
    Эпоксидный: 1800,
    Топпинг: 1500,
  };

  const foundationFactor: Record<FoundationType, number> = {
    Грунт: 1.2,
    Песок: 1.1,
    Бетон: 1.0,
    Плита: 0.9,
  };

  const reinforcementCost: Record<ReinforcementType, number> = {
    Сетка: 300,
    Фибра: 200,
    Арматура: 500,
  };

  const extraWorkCost: Record<ExtraWorkType, number> = {
    Гидроизоляция: 150,
    Демпфер: 100,
    Швы: 80,
    Укладка: 250,
  };

  function toggleExtra(name: ExtraWorkType) {
    setExtras((prev) =>
      prev.includes(name) ? prev.filter((e) => e !== name) : [...prev, name]
    );
  }

  function calculate() {
    const base = baseRate[coating];
    const extra = extras.reduce((sum, key) => sum + extraWorkCost[key], 0);
    const reinforcement = reinforced ? reinforcementCost[reinforcementType] : 0;
    const factor = foundationFactor[foundation];
    const total =
      Number(area) *
      (base + reinforcement + extra) *
      factor *
      Number(thickness) /
      100;

    setPrice(Math.round(total));
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    calculate();
  }

  const volume = price !== null ? (Number(area) * Number(thickness)) / 1000 : 0;
  const selectedOptions =
    price !== null
      ? [
          `Основание: ${foundation}`,
          `Покрытие: ${coating}`,
          reinforced ? `Армирование: ${reinforcementType}` : 'Без армирования',
          ...extras,
        ]
      : [];

  const calculationText =
    price !== null
      ? `Стоимость: ${price.toLocaleString()} ₽\nОбъём: ${volume.toFixed(2)} м³\nОпции: ${selectedOptions.join(', ')}\nКомментарий: ${comment}`
      : '';

  return (
    <>
      <Overlay onClick={onClose}>
        <Modal onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={onClose}>×</CloseButton>
          <Title>Калькулятор стоимости</Title>
          <Form onSubmit={handleSubmit}>
            <Grid>
              <Field>
                <Label>Площадь, м²</Label>
                <Input type="number" value={area} onChange={(e) => setArea(e.target.value)} required />
              </Field>
              <Field>
                <Label>Толщина слоя, мм</Label>
                <Input type="number" value={thickness} onChange={(e) => setThickness(e.target.value)} required />
              </Field>
              <Field>
                <Label>Тип основания</Label>
                <Select value={foundation} onChange={(e) => setFoundation(e.target.value as FoundationType)}>
                  {Object.keys(foundationFactor).map((key) => (
                    <option key={key} value={key}>{key}</option>
                  ))}
                </Select>
              </Field>
              <Field>
                <Label>Тип покрытия</Label>
                <Select value={coating} onChange={(e) => setCoating(e.target.value as CoatingType)}>
                  {Object.keys(baseRate).map((key) => (
                    <option key={key} value={key}>{key}</option>
                  ))}
                </Select>
              </Field>
              <Field>
                <Label>Армирование</Label>
                <Checkbox>
                  <input type="checkbox" checked={reinforced} onChange={(e) => setReinforced(e.target.checked)} />
                  <span>{reinforced ? 'Да' : 'Нет'}</span>
                </Checkbox>
              </Field>
              {reinforced && (
                <Field>
                  <Label>Тип армирования</Label>
                  <Select value={reinforcementType} onChange={(e) => setReinforcementType(e.target.value as ReinforcementType)}>
                    {Object.keys(reinforcementCost).map((key) => (
                      <option key={key} value={key}>{key}</option>
                    ))}
                  </Select>
                </Field>
              )}
              <Field style={{ gridColumn: '1 / -1' }}>
                <Label>Дополнительные работы</Label>
                <Extras>
                  {Object.keys(extraWorkCost).map((key) => (
                    <label key={key}>
                      <input type="checkbox" checked={extras.includes(key as ExtraWorkType)} onChange={() => toggleExtra(key as ExtraWorkType)} />
                      {key}
                    </label>
                  ))}
                </Extras>
              </Field>
              <Field style={{ gridColumn: '1 / -1' }}>
                <Label>Комментарий</Label>
                <Textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={3} />
              </Field>
            </Grid>

            <SubmitButton type="submit">Рассчитать</SubmitButton>

            {price !== null && (
              <div ref={resultRef}>
                <Result>
                  <strong>Предварительная стоимость:</strong> {price.toLocaleString()} ₽<br />
                  <strong>Объём бетона:</strong> {volume.toFixed(2)} м³<br />
                  <strong>Выбранные опции:</strong> {selectedOptions.join(', ')}
                </Result>
                <SubmitButton type="button" onClick={() => setShowSubmitModal(true)}>
                  Перейти к оформлению
                </SubmitButton>
              </div>
            )}
          </Form>
        </Modal>
      </Overlay>

      {showSubmitModal && (
        <SubmitModal calculation={calculationText} onClose={() => setShowSubmitModal(false)} />
      )}
    </>
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

const Checkbox = styled.label`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.4rem;
  font-weight: 500;

  input {
    width: 1.6rem;
    height: 1.6rem;
    accent-color: rgb(var(--primary));
  }
`;

const Extras = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;

  label {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 1.4rem;

    input {
      width: 1.4rem;
      height: 1.4rem;
      accent-color: rgb(var(--primary));
    }
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

const Result = styled.div`
  font-size: 1.6rem;
  line-height: 1.6;
  margin-top: 2rem;
  background: #f5f5f5;
  padding: 1.5rem;
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

