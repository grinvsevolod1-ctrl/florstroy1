import styled from 'styled-components';
import Page from 'components/Page';
import { media } from 'utils/media';
import FormSection from 'views/ContactPage/FormSection';
import InformationSection from 'views/ContactPage/InformationSection';

export default function ContactPage() {
  return (
    <Page
      title="Контакты Florstroy"
      description="Свяжитесь с нами: адрес, телефоны, email, карта. Работаем по Москве и области. Оперативный ответ."
    >
      <ContactContainer>
        <InformationSection />
        <FormSection />
      </ContactContainer>
    </Page>
  );
}

const ContactContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 4rem;
  flex-wrap: wrap;
  margin-top: 6rem;

  ${media('<=tablet')} {
    flex-direction: column;
    gap: 3rem;
  }
`;
