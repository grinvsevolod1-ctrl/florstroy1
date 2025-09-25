import React, { useState } from 'react';
import styled from 'styled-components';
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
          <Card key={index} isOutlined={card.isOutlined}>
            <CardTitle>{card.title}</CardTitle>
            <CardDescription>{card.description}</CardDescription>
            <BenefitsList>
              {card.benefits.map((item, i) => (
                <BenefitItem key={i}>{item}</BenefitItem>
              ))}
            </BenefitsList>
            <CardPrice>
              {withMaterials ? card.priceWith : card.priceWithout}
              <span> ₽/м²</span>
            </CardPrice>
          </Card>
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
  color: ${(p) => (p.active ? '#142756ff' : 'rgb(var(--primary))')};
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

const Card = styled.div<{ isOutlined?: boolean }>`
  flex: 1 1 300px;
  padding: 3rem;
  border-radius: 1rem;
  background: rgb(var(--cardBackground));
  border: ${(p) => (p.isOutlined ? '2px solid rgba(var(--primary), 0.4)' : 'none')};
  box-shadow: var(--shadow-md);
`;

const CardTitle = styled.h3`
  font-size: 2.2rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin-bottom: 1rem;
`;

const CardDescription = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  color: rgb(var(--text));
  margin-bottom: 2rem;
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
`;

const BenefitItem = styled.li`
  position: relative;
  padding-left: 2.4rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: rgb(var(--text));

  &::before {
    content: '✔';
    position: absolute;
    left: 0;
    top: 0;
    color: rgb(var(--primary));
    font-size: 1.4rem;
    line-height: 1.6rem;
  }
`;

const CardPrice = styled.div`
  font-size: 2rem;
  font-weight: 600;
  color: rgb(var(--primary));
`;
