import Head from 'next/head';
import NextLink from 'next/link';
import styled from 'styled-components';
import Button from 'components/Button';
import ButtonGroup from 'components/ButtonGroup';
import Container from 'components/Container';
import HeroIllustration from 'components/HeroIllustation';
import OverTitle from 'components/OverTitle';
import { useCalculatorModalContext } from 'contexts/calculator-modal.context';
import { media } from 'utils/media';

export default function Hero() {
  const { setIsCalculatorOpened } = useCalculatorModalContext();

  return (
    <>
      <Head>
        <title>Промышленные и полимерные полы | Florstroy</title>
        <meta
          name="description"
          content="Промышленные бетонные полы, шлифовка, армирование, наливные покрытия. Работаем по Москве и области. Гарантия качества."
        />
        <meta property="og:title" content="Бетонные полы под ключ | Florstroy" />
        <meta
          property="og:description"
          content="Промышленные бетонные полы, шлифовка, армирование, наливные покрытия. Работаем по Москве и области."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://florstroy.ru" />
        <meta property="og:image" content="https://florstroy.ru/preview.jpg" />
      </Head>

      <HeroWrapper>
        <Contents>
          <CustomOverTitle>строительные услуги</CustomOverTitle>
          <Heading>Промышленные и полимерные полы</Heading>
          <Description>
           Наливные полы — идеальное покрытие для сложных условий эксплуатации, которые встречаются на промышленных объектах. Мы специализируемся на устройстве наливных полов. Наши методы работы позволяют выполнять работу по устройству полов оперативно и с оптимальным соотношением ≪цена/качество≫
          </Description>
          <CustomButtonGroup>
            <Button onClick={() => setIsCalculatorOpened(true)}>
              Рассчитать стоимость <span>&rarr;</span>
            </Button>
            <NextLink href="/pricing" passHref>
              <Button transparent>
                Подробнее <span>&rarr;</span>
              </Button>
            </NextLink>
          </CustomButtonGroup>
        </Contents>
        <ImageContainer>
          <HeroIllustration />
        </ImageContainer>
      </HeroWrapper>
    </>
  );
}

const HeroWrapper = styled(Container)`
  position: relative;
  display: flex;
  padding-top: 5rem;
  padding-bottom: 5rem;
  background-image: url('/test-article/13.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) =>
      theme.mode === 'dark'
        ? 'rgba(0, 0, 0, 0.65)'
        : 'rgba(255, 255, 255, 0.4)'};
    z-index: 0;
    transition: background 0.3s ease;
  }

  & > * {
    position: relative;
    z-index: 1;
    color: ${({ theme }) => (theme.mode === 'dark' ? '#fff' : '#111')};
    text-shadow: ${({ theme }) =>
      theme.mode === 'dark'
        ? '0 0 10px rgba(0, 0, 0, 0.6)'
        : '0 0 10px rgba(255, 255, 255, 0.6)'};
  }

  ${media('<=desktop')} {
    padding-top: 1rem;
    flex-direction: column;
    align-items: center;
  }
`;


const Contents = styled.div`
  flex: 1;
  max-width: 60rem;

  ${media('<=desktop')} {
    max-width: 100%;
  }
`;

const CustomButtonGroup = styled(ButtonGroup)`
  margin-top: 4rem;
`;

const ImageContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: flex-start;

  svg {
    max-width: 45rem;
  }

  ${media('<=desktop')} {
    margin-top: 2rem;
    justify-content: center;
    svg {
      max-width: 80%;
    }
  }
`;

const Description = styled.p`
  font-size: 1.8rem;
  opacity: 0.8;
  line-height: 1.6;

  ${media('<=desktop')} {
    font-size: 1.5rem;
  }
`;

const CustomOverTitle = styled(OverTitle)`
  margin-bottom: 2rem;
`;

const Heading = styled.h1`
  font-size: 7.2rem;
  font-weight: bold;
  line-height: 1.1;
  margin-bottom: 4rem;
  letter-spacing: -0.03em;

  ${media('<=tablet')} {
    font-size: 4.6rem;
    margin-bottom: 2rem;
  }
`;
