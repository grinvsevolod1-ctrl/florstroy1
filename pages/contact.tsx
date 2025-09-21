import styled from 'styled-components';
import Page from 'components/Page';
import { media } from 'utils/media';
import InformationSection from 'views/ContactPage/InformationSection';

export default function ContactPage() {
  return (
    <Page
      title="Контакты Florstroy"
      description="Адрес, телефоны, email, карта. Работаем по Москве и области. Связь через Telegram, WhatsApp, VK."
    >
      <ContactContainer>
        <InformationSection />
      </ContactContainer>
    </Page>
  );
}

const ContactContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 6rem 2rem;

  ${media('<=tablet')} {
    padding: 4rem 1rem;
  }
`;
