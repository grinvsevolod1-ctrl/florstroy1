import React from 'react';
import styled from 'styled-components';
import AutofitGrid from 'components/AutofitGrid';
import PricingCard from 'components/PricingCard';
import SectionTitle from 'components/SectionTitle';

export default function PricingTablesSection() {
  return (
    <Wrapper>
      <SectionTitle>Пакеты услуг по устройству бетонных полов</SectionTitle>
      <AutofitGrid>
        <PricingCard
          title="Базовый"
          description="Для небольших помещений и складов"
          benefits={[
            'Шлифованный бетон',
            'Толщина до 100 мм',
            'Без армирования',
            'Подготовка основания',
            'Гарантия 1 год',
          ]}
        >
          от 1200<span> ₽/м²</span>
        </PricingCard>

        <PricingCard
          title="Стандарт"
          description="Оптимально для производственных помещений"
          benefits={[
            'Топпинг или эпоксидное покрытие',
            'Толщина до 120 мм',
            'Армирование фиброй или сеткой',
            'Гидроизоляция и демпфер',
            'Гарантия 3 года',
          ]}
          isOutlined
        >
          от 1500<span> ₽/м²</span>
        </PricingCard>

        <PricingCard
          title="Премиум"
          description="Для высоких нагрузок и спецобъектов"
          benefits={[
            'Эпоксидное покрытие + упрочнитель',
            'Толщина от 150 мм',
            'Армирование арматурой',
            'Полный цикл работ под ключ',
            'Гарантия 5 лет',
            'Фотофиксация и акты',
          ]}
        >
          от 1800<span> ₽/м²</span>
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
