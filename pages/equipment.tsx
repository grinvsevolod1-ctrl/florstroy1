import styled from 'styled-components';
import Page from 'components/Page';
import EquipmentGrid from 'views/EquipmentPage/EquipmentGrid';

export default function EquipmentPage() {
  return (
    <Page
      title="Оборудование для бетонных полов"
      description="Витрина оборудования Florstroy: затирочные машины, пылесосы, миксеры, лазерные нивелиры. Закажите напрямую без регистрации."
    >
      <Wrapper>
        <EquipmentGrid />
      </Wrapper>
    </Page>
  );
}

const Wrapper = styled.div`
  padding-bottom: 15rem;
`;