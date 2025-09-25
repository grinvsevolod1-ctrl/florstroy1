import React, { useState } from 'react';
import styled from 'styled-components';
import PricingCard from 'components/PricingCard';
import SectionTitle from 'components/SectionTitle';
import CurrencySwitcher from 'components/CurrencySwitcher';
import FilterBar from 'components/FilterBar';

export default function PricingTablesSection() {
  const [withMaterials, setWithMaterials] = useState(true);
  const [currency, setCurrency] = useState<'RUB' | 'BYN'>('RUB');
  const [filter, setFilter] = useState<'all' | 'sports' | 'industrial' | 'polymer'>('all');

  const filteredCards = cards.filter((card) =>
    filter === 'all' ? true : card.type === filter
  );

  return (
    <Wrapper>
      <SectionTitle>Услуги по устройству полов</SectionTitle>

      <Controls>
        <ToggleGroup>
          <ToggleButton active={withMaterials} onClick={() => setWithMaterials(true)}>
            С материалами
          </ToggleButton>
          <ToggleButton active={!withMaterials} onClick={() => setWithMaterials(false)}>
            Без материалов
          </ToggleButton>
        </ToggleGroup>

        <CurrencySwitcher currency={currency} onChange={setCurrency} />
        <FilterBar active={filter} onChange={setFilter} />
      </Controls>

      <CardsWrapper>
        {filteredCards.map((card, index) => (
          <AnimatedCard key={index} delay={index * 100}>
            <PricingCard
              title={card.title}
              description={card.description}
              benefits={card.benefits}
              isOutlined={card.isOutlined}
            >
              {currency === 'RUB'
                ? withMaterials
                  ? card.priceWithRUB
                  : card.priceWithoutRUB
                : withMaterials
                ? card.priceWithBYN
                : card.priceWithoutBYN}
              <span>{currency === 'RUB' ? ' ₽/м²' : ' BYN/м²'}</span>
            </PricingCard>
          </AnimatedCard>
        ))}
      </CardsWrapper>
    </Wrapper>
  );
}

const cards = [
  {
    type: 'sports',
    title: 'Спортивные покрытия',
    description: 'Для игровых площадок, стадионов и детских зон',
    priceWithRUB: 'от 2200',
    priceWithoutRUB: 'от 1600',
    priceWithBYN: 'от 70',
    priceWithoutBYN: 'от 50',
    benefits: [
      'Одно- и двухслойные системы',
      'SBR и EPDM гранулят',
      'Толщина от 10 до 20 мм',
      'Устройство по бетону, асфальту или грунту',
      'Устойчивость к погоде и износу',
    ],
  },
  {
    type: 'industrial',
    title: 'Промышленные бетонные полы',
    description: 'Надёжные решения для производств и складов',
    priceWithRUB: 'от 1800',
    priceWithoutRUB: 'от 1300',
    priceWithBYN: 'от 57',
    priceWithoutBYN: 'от 42',
    benefits: [
      'Высокая механическая и химическая прочность',
      'Ровная нескользкая поверхность',
      'Быстрый монтаж',
      'Устойчивость к температуре и влаге',
      'Лёгкий ремонт и долговечность',
    ],
  },
  {
    type: 'polymer',
    title: 'Полимерные наливные полы',
    description: 'Финишное покрытие для коммерческих помещений',
    priceWithRUB: 'от 2000',
    priceWithoutRUB: 'от 1500',
    priceWithBYN: 'от 63',
    priceWithoutBYN: 'от 47',
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

const Wrapper = styled.section`
  padding: 8rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  box-sizing: border-box;
  overflow-x: hidden;
`;

const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin: 4rem 0;
`;

const ToggleGroup = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const ToggleButton = styled.button<{ active?: boolean }>`
  padding: 1rem 2rem;
  font-size: 1.6rem;
  border: 1px solid rgba(var(--primary), 0.4);
  background-color: ${(p) => (p.active ? 'rgb(var(--primary))' : 'transparent')};
  color: ${(p) => (p.active ? '#fff' : 'rgb(var(--primary))')};
  border-radius: 0.6rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(p) =>
      p.active ? 'rgba(var(--primary), 0.85)' : 'rgba(var(--primary), 0.05)'};
  }
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4rem;
  justify-content: center;
  align-items: stretch;
`;

const AnimatedCard = styled.div<{ delay?: number }>`
  animation: fadeInUp 0.6s ease forwards;
  animation-delay: ${(p) => p.delay}ms;
  opacity: 0;

  @keyframes fadeInUp {
    0% {
      transform: translateY(20px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
