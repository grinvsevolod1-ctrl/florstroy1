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
  background-color: var(--background, #ffffff);
  color: var(--text-main, #222222);
  padding: 4rem 2rem;

  & > :last-child {
    margin-bottom: 15rem;
  }

  @media (prefers-color-scheme: dark) {
    background-color: var(--background-dark, #121212);
    color: var(--text-light, #f0f0f0);
  }
`;
