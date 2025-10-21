import React, { useState } from 'react';
import styled from 'styled-components';
import SectionTitle from 'components/SectionTitle';
import { useFeedbackModalContext } from 'contexts/feedback-modal.context';

export default function PricingTablesSection() {
  const [withMaterials, setWithMaterials] = useState(true);
  const { setIsOpen, setSelectedService } = useFeedbackModalContext();

  const handleOpenModal = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setIsOpen(true);
  };

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
          <Card key={index}>
            <CardContent>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>
                {card.description.map((block, i) => (
                  <DescriptionBlock key={i}>
                    {block.heading && <BlockHeading>{block.heading}</BlockHeading>}
                    {block.paragraphs.map((p, j) => (
                      <Paragraph key={j}>{p}</Paragraph>
                    ))}
                    {block.list && (
                      <StyledList>
                        {block.list.map((item, k) => (
                          <li key={k}>{item}</li>
                        ))}
                      </StyledList>
                    )}
                  </DescriptionBlock>
                ))}
              </CardDescription>
            </CardContent>
            <CardPriceRow>
              <CardPrice>
                <span>{withMaterials ? card.priceWith : card.priceWithout}</span>
                <Currency>₽/м²</Currency>
              </CardPrice>
              <FeedbackButton onClick={() => handleOpenModal(card.title)}>
                Оставить заявку
              </FeedbackButton>
            </CardPriceRow>
          </Card>
        ))}
      </CardsWrapper>
    </Wrapper>
  );
}

const cards = [
  {
    title: 'Спортивные покрытия',
    priceWith: 'от 2200',
    priceWithout: 'от 1600',
    description: [
      {
        heading: 'Устройство спортивных покрытий',
        paragraphs: [
          'Покрытие применяется на открытых игровых, спортивных и детских площадках, школьных стадионах, беговых дорожках.',
        ],
      },
      {
        heading: 'Варианты устройства покрытий:',
        list: [
          'Однослойное полимерное покрытие с применением резиновой крошки (SBR) или каучукового гранулянта (EPDM). Минимальная толщина по твёрдому бетонному или асфальтовому покрытию — 10 мм, по грунтовому основанию — 20 мм.',
          'Двухслойное полимерное покрытие с применением резиновой крошки (SBR) и каучукового гранулянта (EPDM). Минимальная толщина финишного слоя — 5 мм.',
          'Двухслойное полимерное покрытие с применением спрей-системы. Средняя толщина — 12 мм.',
        ],
        paragraphs: [
          'Покрытие устраивают на открытых площадках по предварительно подготовленному бетонному, асфальтовому или грунтовому основанию.',
        ],
      },
    ],
  },
  {
    title: 'Промышленные бетонные полы',
    priceWith: 'от 1800',
    priceWithout: 'от 750',
    description: [
      {
        heading: 'Устройство бетонных промышленных полов',
        paragraphs: [
          'В условиях производства полы должны выдерживать ежедневные интенсивные нагрузки, вес оборудования и техники, быть устойчивыми к химическим веществам, применяемым на производстве.',
          'Промышленные бетонные полы, устройством которых занимается наша компания, обладают всеми необходимыми характеристиками, чтобы выдержать ежедневные интенсивные нагрузки.',
        ],
      },
      {
        heading: 'Преимущества:',
        list: [
          'Высокая прочность — механическая и химическая.',
          'Ровная нескользкая поверхность.',
          'Долговечность.',
          'Устойчивость к температурным воздействиям.',
          'Ремонтопригодность: ремонт производится легко и быстро, внешний вид сохраняется.',
          'Быстрый монтаж и низкая цена заливки за квадратный метр.',
        ],
        paragraphs: [],
      },
    ],
  },
  {
    title: 'Полимерные наливные полы',
    priceWith: 'от 2000',
    priceWithout: 'от 1000',
    description: [
      {
        heading: 'Устройство полимерных полов',
        paragraphs: [
          'Полимерные покрытия — это самовыравнивающийся материал. Он прочный и износостойкий, не боится экстремальных механических нагрузок, повышенной влажности, контактов с водой, кислотами и щелочами, стойко переносит температурные колебания.',
          'Полимерный наливной пол укладывают в производственных, складских, торговых и офисных помещениях.',
        ],
      },
      {
        heading: 'Преимущества:',
        list: [
          'Бесшовность.',
          'Беспыльность.',
          'Герметичность.',
          'Стойкость к агрессивным средам.',
          'Простота ремонта.',
          'Низкая стоимость обслуживания.',
          'Ударостойкость.',
          'Антистатичность и антипроводимость.',
          'Лёгкость в уборке.',
        ],
        paragraphs: [],
      },
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

const Card = styled.div`
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 3rem;
  border-radius: 1rem;
  background: rgb(var(--cardBackground));
  border: 2px solid rgba(var(--primary), 0.4);
  box-shadow: var(--shadow-md);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
`;

const CardContent = styled.div``;

const CardTitle = styled.h3`
  font-size: 2.2rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin-bottom: 2rem;
`;

const CardDescription = styled.div`
  font-size: 1.5rem;
  color: rgb(var(--text));
  line-height: 1.6;
`;

const DescriptionBlock = styled.div`
  margin-bottom: 2.4rem;
`;

const BlockHeading = styled.h4`
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: rgb(var(--primary));
`;

const Paragraph = styled.p`
  margin-bottom: 1rem;
`;

const StyledList = styled.ul`
  padding-left: 2rem;
  margin: 1rem 0;
  list-style: disc;

  li {
    margin-bottom: 0.6rem;
  }
`;

const CardPriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const CardPrice = styled.div`
  display: inline-flex;
  align-items: baseline;
  gap: 0.4rem;
  font-size: 2rem;
  font-weight: 600;
  color: rgb(var(--primary));
  white-space: nowrap;
  flex-shrink: 0;
`;

const Currency = styled.span`
  font-size: 1.4rem;
  color: rgb(var(--text));
  line-height: 1;
  position: relative;
  top: -1px;
`;

const FeedbackButton = styled.button`
  padding: 0.6rem 1.2rem;
  font-size: 1.4rem;
  background: linear-gradient(135deg, rgb(var(--primary)) 0%, #4e7fff 100%);
  color: #fff;
  border: none;
  border-radius: 0.4rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(var(--primary), 0.3);
  }
`;
