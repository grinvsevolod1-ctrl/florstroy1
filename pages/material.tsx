import styled from 'styled-components';
import Page from 'components/Page';
import MaterialGrid from 'views/MaterialPage/MaterialGrid';

export default function MaterialPage() {
  return (
    <Page
      title="Материалы для бетонных полов"
      description="Витрина материалов Florstroy: топпинги, эпоксидные составы, упрочнители, гидроизоляция. Закажите напрямую без регистрации."
    >
      <Wrapper>
        <MaterialGrid />
      </Wrapper>
    </Page>
  );
}

const Wrapper = styled.div`
  padding-bottom: 15rem;
`;