import styled from 'styled-components';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

export default function InformationSection() {
  return (
    <Wrapper>
      <Block>
        <Title>Контакты Мидеан</Title>
        <InfoList>
          <li><strong>ИНН:</strong> 5032235580</li>
          <li><strong>Адрес:</strong> Россия, Московская область, г. Одинцово, Можайское шоссе д.8г</li>
          <li><strong>Телефон:</strong> <a href="tel:+74956624094">+7 495 662 40 94</a></li>
          <li><strong>Телефон:</strong> <a href="tel:+79651686358">+7 965 168 63 58</a></li>
          <li><strong>Email:</strong> <a href="mailto:info@florstroy.ru">info@florstroy.ru</a></li>
        </InfoList>

        <Socials>
          <a href="https://t.me/florstroy" target="_blank" rel="noopener noreferrer">Telegram</a>
          <a href="https://wa.me/79651686358" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a href="https://vk.com/florstroy" target="_blank" rel="noopener noreferrer">VK</a>
          <a href="https://instagram.com/florstroy" target="_blank" rel="noopener noreferrer">Instagram</a>
        </Socials>
      </Block>

      <MapBlock>
        <YMaps>
          <Map
            defaultState={{
              center: [55.6785, 37.2631],
              zoom: 15,
            }}
            width="100%"
            height="400px"
          >
            <Placemark geometry={[55.6785, 37.2631]} />
          </Map>
        </YMaps>
      </MapBlock>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  margin-top: 10rem;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
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
  gap: 2rem;
  flex-wrap: wrap;

  a {
    font-size: 1.6rem;
    color: rgb(var(--primary));
    text-decoration: none;
    border-bottom: 1px dashed rgb(var(--primary));

    &:hover {
      border-bottom: 1px solid rgb(var(--primary));
    }
  }
`;

const MapBlock = styled.div`
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;
