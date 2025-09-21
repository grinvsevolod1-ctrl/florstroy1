import React from 'react';
import styled from 'styled-components';
import AutofitGrid from 'components/AutofitGrid';
import PricingCard from 'components/PricingCard';
import SectionTitle from 'components/SectionTitle';

export default function PricingTablesSection() {
  return (
    <Wrapper>
      <SectionTitle>Услуги по устройству бетонных полов</SectionTitle>
      <AutofitGrid>
        <PricingCard
          title="Бетонная стяжка"
          description="Базовое выравнивание поверхности"
          benefits={[
            'Толщина до 100 мм',
            'Цементно-песчаная смесь',
            'Ручная или механизированная укладка',
            'Подходит под любое покрытие',
            'Гарантия 1 год',
          ]}
        >
          от 1200<span> ₽/м²</span>
        </PricingCard>

        <PricingCard
          title="Полусухая стяжка"
          description="Быстрое выравнивание без лишней влаги"
          benefits={[
            'Толщина 40–100 мм',
            'Механизированная подача',
            'Минимальная усадка',
            'Готовность к финишной отделке через 48 часов',
            'Гарантия 2 года',
          ]}
        >
          от 1300<span> ₽/м²</span>
        </PricingCard>

        <PricingCard
          title="Топпинг"
          description="Упрочнение поверхности для промышленных объектов"
          benefits={[
            'Кварцевый или корундовый состав',
            'Устойчивость к истиранию',
            'Гладкая или шероховатая фактура',
            'Цветовая палитра по RAL',
            'Гарантия 3 года',
          ]}
          isOutlined
        >
          от 1500<span> ₽/м²</span>
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
          от 1800<span> ₽/м²</span>
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
          от 300<span> ₽/м²</span>
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
          от 1000<span> ₽/м²</span>
        </PricingCard>

        <PricingCard
          title="Устройство монолитной плиты"
          description="Надёжная основа под тяжёлые нагрузки"
          benefits={[
            'Толщина до 200 мм',
            'Бетононасос + опалубка',
            'Армирование по проекту',
            'Подходит для ангаров и складов',
            'Гарантия 5 лет',
          ]}
        >
          от 18000<span> ₽/м³</span>
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
          от 700<span> ₽/м²</span>
        </PricingCard>
      </AutofitGrid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  & > *:not(:first-child) {
    margin-top: 8rem;
  }
`;
