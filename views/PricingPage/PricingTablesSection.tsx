import React, { useState } from 'react';
import styled from 'styled-components';
import PricingCard from 'components/PricingCard';
import SectionTitle from 'components/SectionTitle';
import { media } from 'utils/media';

export default function PricingTablesSection() {
  const [withMaterials, setWithMaterials] = useState(true);

  return (
    <Wrapper>
      <TitleWrapper>
        <SectionTitle>Услуги по устройству бетонных полов</SectionTitle>
        <ToggleWrapper>
          <ToggleButton
            active={withMaterials}
            onClick={() => setWithMaterials(true)}
          >
            С материалами
          </ToggleButton>
          <ToggleButton
            active={!withMaterials}
            onClick={() => setWithMaterials(false)}
          >
            Без материалов
          </ToggleButton>
        </ToggleWrapper>
      </TitleWrapper>

      <GridWrapper>
        <PricingCard
          title="Бетонная стяжка"
          description="Базовое выравнивание поверхности"
          benefits={[
            'Толщина до 100 мм',
            'Цементно-песчаная смесь',
            'Механизированная укладка',
            'Подходит под любое покрытие',
            'Гарантия 1 год',
          ]}
        >
          {withMaterials ? 'от 1200' : 'от 800'}
          <span> ₽/м²</span>
        </PricingCard>

        <PricingCard
          title="Полусухая стяжка"
          description="Быстрое выравнивание без лишней влаги"
          benefits={[
            'Толщина 40–100 мм',
            'Механизированная подача',
            'Минимальная усадка',
            'Готовность к отделке через 48 часов',
            'Гарантия 2 года',
          ]}
        >
          {withMaterials ? 'от 1300' : 'от 950'}
          <span> ₽/м²</span>
        </PricingCard>

        <PricingCard
          title="Топпинг"
          description="Упрочнение поверхности для промышленных объектов"
          benefits={[
            'Кварцевый или корундовый состав',
            'Устойчивость к истиранию',
            'Фактура по выбору',
            'Цветовая палитра по RAL',
            'Гарантия 3 года',
          ]}
          isOutlined
        >
          {withMaterials ? 'от 1500' : 'от 1100'}
          <span> ₽/м²</span>
        </PricingCard>

        <PricingCard
          title="Эпоксидное покрытие"
          description="Финишная защита от химии и влаги"
          benefits={[
            'Толщина 2–5 мм',
            'Гладкое или антискользящее',
            'Химическая стойкость',
            'Лёгкая мойка и уход',
            'Гарантия 3 года',
          ]}
        >
          {withMaterials ? 'от 1800' : 'от 1400'}
          <span> ₽/м²</span>
        </PricingCard>

        <PricingCard
          title="Армирование пола"
          description="Повышение прочности конструкции"
          benefits={[
            'Сетка, фибра или арматура',
            'Подходит для складов и СТО',
            'Снижение риска трещин',
            'Совместимо с любым типом бетона',
            'Гарантия 5 лет',
          ]}
        >
          {withMaterials ? 'от 300' : 'от 200'}
          <span> ₽/м²</span>
        </PricingCard>

        <PricingCard
          title="Гидроизоляция основания"
          description="Защита от влаги и грунтовых вод"
          benefits={[
            'Обмазочная или рулонная',
            'Совместима с бетонной стяжкой',
            'Увеличивает срок службы пола',
            'Рекомендовано для цокольных помещений',
            'Гарантия 3 года',
          ]}
        >
          {withMaterials ? 'от 1000' : 'от 700'}
          <span> ₽/м²</span>
        </PricingCard>

        <PricingCard
          title="Монолитная плита"
          description="Надёжная основа под тяжёлые нагрузки"
          benefits={[
            'Толщина до 200 мм',
            'Бетононасос + опалубка',
            'Армирование по проекту',
            'Подходит для ангаров и складов',
            'Гарантия 5 лет',
          ]}
        >
          {withMaterials ? 'от 18000' : 'от 14000'}
          <span> ₽/м³</span>
        </PricingCard>

        <PricingCard
          title="Наливной пол"
          description="Финишное самовыравнивающееся покрытие"
          benefits={[
            'Толщина до 3 мм',
            'Идеально ровная поверхность',
            'Подходит под ламинат, плитку, линолеум',
            'Быстрый набор прочности',
            'Гарантия 2 года',
          ]}
        >
          {withMaterials ? 'от 700' : 'от 500'}
          <span> ₽/м²</span>
        </PricingCard>
      </GridWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 8rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const TitleWrapper = styled.div`
  text-align: center;
  margin-bottom: 6rem;
`;

const ToggleWrapper = styled.div`
  display: inline-flex;
  gap: 2rem;
  margin-top: 2rem;
  justify-content: center;
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

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4rem;

  ${media('<=desktop')} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media('<=tablet')} {
    grid-template-columns: 1fr;
  }
`;
