import styled from 'styled-components';
import Page from 'components/Page';
import FaqSection from 'views/PricingPage/FaqSection';
import PricingTablesSection from 'views/PricingPage/PricingTablesSection';

export default function PricingPage() {
  return (
    <Page
      title="Услуги по устройству бетонных полов"
      description="Florstroy — профессиональное устройство бетонных полов: стяжка, топпинг, эпоксидные покрытия, армирование, гидроизоляция. Работаем по Москве и области."
    >
      <Wrapper>
        <PricingTablesSection />
        <FaqSection />
      </Wrapper>
    </Page>
  );
}

const Wrapper = styled.div`
  & > :last-child {
    margin-bottom: 15rem;
  }
`;
