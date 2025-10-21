import styled from "styled-components"
import Page from "components/Page"
import FaqSection from "views/PricingPage/FaqSection"
import PricingTablesSection from "views/PricingPage/PricingTablesSection"

export default function PricingPage() {
  return (
    <Page
      title="Услуги по устройству бетонных полов"
      description="Florstroy — профессиональное устройство бетонных полов: стяжка, топпинг, эпоксидные покрытия, армирование, гидроизоляция. Работаем по Москве и области."
      keywords="цены на бетонные полы, стоимость устройства полов, прайс на стяжку, топпинг цена, эпоксидные покрытия стоимость"
      canonical="https://florstroy.ru/pricing"
    >
      <Wrapper>
        <PricingTablesSection />
        <FaqSection />
      </Wrapper>
    </Page>
  )
}

const Wrapper = styled.div`
  & > :last-child {
    margin-bottom: 15rem;
  }
`
