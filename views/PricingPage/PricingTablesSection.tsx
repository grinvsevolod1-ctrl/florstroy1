import React, { useState } from 'react';
import styled from 'styled-components';
import PricingCard from 'components/PricingCard';
import SectionTitle from 'components/SectionTitle';

export default function PricingTablesSection() {
  const [withMaterials, setWithMaterials] = useState(true);

  return (
    <Wrapper>
      <SectionTitle>Услуги по устройству бетонных полов</SectionTitle>

      <ToggleWrapper>
        <ToggleButton active={withMaterials} onClick={() => setWithMaterials(true)}>
          С материалами
        </ToggleButton>
        <ToggleButton active={!withMaterials} onClick={() => setWithMaterials(false)}>
          Без материалов
        </ToggleButton>
      </ToggleWrapper>

      <CardsWrapper>
        {cards.map((card, index) => (
          <PricingCard
            key={index}
            title={card.title}
            description={card.description}
            benefits={card.benefits}
            isOutlined={card.isOutlined}
          >
            {withMaterials ? card.priceWith : card.priceWithout}
            <span> ₽/м²</span>
          </PricingCard>
        ))}
      </CardsWrapper>
    </Wrapper>
  );
}

const cards = [
  {
    title: 'Бетонная стяжка',
    description: 'Базовое выравнивание поверхности',
    priceWith: 'от 1200',
    priceWithout: 'от 800',
    benefits: [
      'Толщина до 100 мм',
      'Цементно-песчаная смесь',
      'Механизированная укладка',
      'Подходит под любое покрытие',
      'Гарантия 1 год',
    ],
  },
  {
    title: 'Полусухая стяжка',
    description: 'Быстрое выравнивание без лишней влаги',
    priceWith: 'от 1300',
    priceWithout: 'от 950',
    benefits: [
      'Толщина 40–100 мм',
      'Механизированная подача',
      'Минимальная усадка',
      'Готовность к отделке через 48 часов',
      'Гарантия 2 года',
    ],
  },
  {
    title: 'Топпинг',
    description: 'Упрочнение поверхности для промышленных объектов',
    priceWith: 'от 1500',
    priceWithout: 'от 1100',
    isOutlined: true,
    benefits: [
      'Кварцевый или корундовый состав',
      'Устойчивость к истиранию',
      'Фактура по выбору',
      'Цветовая палитра по RAL',
      'Гарантия 3 года',
    ],
  },
  {
    title: 'Эпоксидное покрытие',
    description: 'Финишная защита от химии и влаги',
    priceWith: 'от 1800',
    priceWithout: 'от 1400',
    benefits: [
      'Толщина 2–5 мм',
      'Гладкое или антискользящее',
      'Химическая стойкость',
      'Лёгкая мойка и уход',
      'Гарантия 3 года',
    ],
  },
];

const Wrapper = styled.div`
  padding: 8rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  box-sizing: border-box;
  overflow-x: hidden;
`;

const ToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 4rem 0;
  flex-wrap: wrap;
`;

const ToggleButton = styled.button<{ active?: boolean }>`
  padding: 1rem 2rem;
  font-size: 1.6rem;
  border: 1px solid rgba(var(--primary), 0.4);
  background: ${(p) => (p.active ? 'rgb(var(--primary))' : 'transparent')};
  color: ${(p) => (p.active ? '#fff' : 'rgb(var(--primary))')};
  border-radius: 0.6rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(p) => (p.active ? 'rgba(var(--primary), 0.85)' : 'rgba(var(--primary), 0.05)')};
  }
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4rem;
  justify-content: center;
  align-items: stretch;
`;
