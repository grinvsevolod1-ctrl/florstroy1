import styled from 'styled-components';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import {
  FaTelegramPlane as TelegramIcon,
  FaWhatsapp as WhatsappIcon,
  FaVk as VkIcon,
  FaInstagram as InstagramIcon,
} from 'react-icons/fa';

export default function InformationSection() {
  return (
    <Wrapper>
      <Grid>
        <Block>
          <Title>Контакты Мидеан</Title>
          <InfoList>
            <li><strong>ИНН:</strong> 5032258560</li>
            <li><strong>Адрес:</strong> Россия, Московская область, г. Орехово, Можайское шоссе д.7</li>
            <li><strong>Телефон:</strong> <a href="tel:+74956624994">+7 495 662 49 94</a></li>
            <li><strong>Телефон:</strong> <a href="tel:+79681868828">+7 968 186 88 28</a></li>
            <li><strong>Email:</strong> <a href="mailto:info@fabrikastroy.ru">info@fabrikastroy.ru</a></li>
          </InfoList>

          <Socials>
            <SocialIconLink href="https://t.me/florstroy" target="_blank">
              {TelegramIcon({})} Telegram
            </SocialIconLink>
            <SocialIconLink href="https://wa.me/79681868828" target="_blank">
              {WhatsappIcon({})} WhatsApp
            </SocialIconLink>
            <SocialIconLink href="https://vk.com/florstroy" target="_blank">
              {VkIcon({})} VK
            </SocialIconLink>
            <SocialIconLink href="https://instagram.com/florstroy" target="_blank">
              {InstagramIcon({})} Instagram
            </SocialIconLink>
          </Socials>
        </Block>

        <MapBlock>
          <YMaps>
            <Map defaultState={{ center: [55.6785, 37.2631], zoom: 15 }} width="100%" height="400px">
              <Placemark geometry={[55.6785, 37.2631]} />
            </Map>
          </YMaps>
          <MapButton
            href="https://yandex.ru/maps/?ll=37.2631%2C55.6785&z=15&mode=search&text=Можайское%20шоссе%207"
            target="_blank"
          >
            Открыть в Яндекс.Картах
          </MapButton>
        </MapBlock>
      </Grid>
    </Wrapper>
  );
}


const Wrapper = styled.div`
  width: 100%;
  max-width: 1000px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;

  ${media('<=tablet')} {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Title = styled.h3`
  font-size: 3rem;
  font-weight: bold;
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  font-size: 1.6rem;
  line-height: 1.8;

  li {
    margin-bottom: 0.8rem;
  }

  a {
    color: rgb(var(--primary));
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  strong {
    font-weight: 600;
  }
`;

const Socials = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const SocialIconLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.6rem;
  color: rgb(var(--primary));
  text-decoration: none;
  padding: 0.6rem 1rem;
  border: 1px solid rgba(var(--primary), 0.3);
  border-radius: 0.6rem;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(var(--primary), 0.05);
    border-color: rgb(var(--primary));
  }

  svg {
    font-size: 1.8rem;
  }
`;

const MapBlock = styled.div`
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

const MapButton = styled.a`
  display: inline-block;
  margin-top: 2rem;
  font-size: 1.5rem;
  color: white;
  background: rgb(var(--primary));
  padding: 1rem 2rem;
  border-radius: 0.6rem;
  text-decoration: none;
  text-align: center;

  &:hover {
    background: rgba(var(--primary), 0.85);
  }
`;
