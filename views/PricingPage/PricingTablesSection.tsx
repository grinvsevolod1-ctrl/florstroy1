import React, { useState } from 'react';
import styled from 'styled-components';
import PricingCard from 'components/PricingCard';
import SectionTitle from 'components/SectionTitle';

export default function PricingTablesSection() {
  const [withMaterials, setWithMaterials] = useState(true);

  return (
    <Wrapper>
      <SectionTitle>Услуги по устройству полов</SectionTitle>

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
    title: 'Спортивные покрытия',
    description: 'Для игровых площадок, стадионов и детских зон',
    priceWith: 'от 2200',
    priceWithout: 'от 1600',
    benefits: [
      'Одно- и двухслойные системы',
      'SBR и EPDM гранулят',
      'Толщина от 10 до 20 мм',
      'Устройство по бетону, асфальту или грунту',
      'Устойчивость к погоде и износу',
    ],
  },
  {
    title: 'Промышленные бетонные полы',
    description: 'Надёжные решения для производств и складов',
    priceWith: 'от 1800',
    priceWithout: 'от 1300',
    benefits: [
      'Высокая механическая и химическая прочность',
      'Ровная нескользкая поверхность',
      'Быстрый монтаж',
      'Устойчивость к температуре и влаге',
      'Лёгкий ремонт и долговечность',
    ],
  },
  {
    title: 'Полимерные наливные полы',
    description: 'Финишное покрытие для коммерческих помещений',
    priceWith: 'от 2000',
    priceWithout: 'от 1500',
    isOutlined: true,
    benefits: [
      'Бесшовность и герметичность',
      'Устойчивость к агрессивным средам',
      'Антистатичность и антипроводимость',
      'Простота ремонта и ухода',
      'Износостойкость и ударопрочность',
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
