import styled from 'styled-components';
import { useState } from 'react';

type CoatingType = 'шлифованный' | 'эпоксидный' | 'топпинг';
type FoundationType = 'грунт' | 'песок' | 'бетон' | 'плита';
type ReinforcementType = 'сетка' | 'фибра' | 'арматура';
type ExtraWorkType = 'гидроизоляция' | 'демпфер' | 'швы' | 'укладка';

export default function CalculatorModal({ onClose }: { onClose: () => void }) {
  const [area, setArea] = useState('');
  const [foundation, setFoundation] = useState<FoundationType>('бетон');
  const [coating, setCoating] = useState<CoatingType>('шлифованный');
  const [thickness, setThickness] = useState('100');
  const [reinforced, setReinforced] = useState(false);
  const [reinforcementType, setReinforcementType] = useState<ReinforcementType>('сетка');
  const [extras, setExtras] = useState<ExtraWorkType[]>([]);
  const [comment, setComment] = useState('');
  const [price, setPrice] = useState<number | null>(null);

  const baseRate: Record<CoatingType, number> = {
    шлифованный: 1200,
    эпоксидный: 1800,
    топпинг: 1500,
  };

  const foundationFactor: Record<FoundationType, number> = {
    грунт: 1.2,
    песок: 1.1,
    бетон: 1.0,
    плита: 0.9,
  };

  const reinforcementCost: Record<ReinforcementType, number> = {
    сетка: 300,
    фибра: 200,
    арматура: 500,
  };

  const extraWorkCost: Record<ExtraWorkType, number> = {
    гидроизоляция: 150,
    демпфер: 100,
    швы: 80,
    укладка: 250,
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

          <Select value={foundation} onChange={(e) => setFoundation(e.target.value as FoundationType)}>
            <option value="грунт">Основание: грунт</option>
            <option value="песок">Основание: песок</option>
            <option value="бетон">Основание: бетон</option>
            <option value="плита">Основание: плита</option>
          </Select>

          <Select value={coating} onChange={(e) => setCoating(e.target.value as CoatingType)}>
            <option value="шлифованный">Покрытие: шлифованный бетон</option>
            <option value="эпоксидный">Покрытие: эпоксидное</option>
            <option value="топпинг">Покрытие: топпинг</option>
          </Select>

          <Input
            type="number"
            placeholder="Толщина слоя, мм"
            value={thickness}
            onChange={(e) => setThickness(e.target.value)}
            required
          />

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

          {reinforced && (
            <Select
              value={reinforcementType}
              onChange={(e) => setReinforcementType(e.target.value as ReinforcementType)}
            >
              <option value="сетка">Сетка</option>
              <option value="фибра">Фибра</option>
              <option value="арматура">Арматура</option>
            </Select>
          )}

          <ExtrasBlock>
            {Object.keys(extraWorkCost).map((key) => (
              <label key={key}>
                <input
                  type="checkbox"
                  checked={extras.includes(key as ExtraWorkType)}
                  onChange={() => toggleExtra(key as ExtraWorkType)}
                />
                {key}
              </label>
            ))}
          </ExtrasBlock>

          <Textarea
            placeholder="Комментарий или объект"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
          />

          <SubmitButton type="submit">Рассчитать</SubmitButton>

          {price !== null && (
            <Result>
              <strong>Предварительная стоимость:</strong> {price.toLocaleString()} ₽
              <br />
              <strong>Объём бетона:</strong> {(Number(area) * Number(thickness) / 1000).toFixed(2)} м³
              <br />
              <strong>Выбранные опции:</strong> {[
                `Основание: ${foundation}`,
                `Покрытие: ${coating}`,
                reinforced ? `Армирование: ${reinforcementType}` : 'Без армирования',
                ...extras,
              ].join(', ')}
            </Result>
          )}
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
  max-width: 700px;
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

const ExtrasBlock = styled.div`
  display: grid;
  gap: 0.5rem;
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
  margin-top: 2rem;
  line-height: 1.6;
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
