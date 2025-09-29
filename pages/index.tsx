import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import BasicSection from 'components/BasicSection';
import Link from 'components/Link';
import { getAllPosts } from 'utils/postsFetcher';
import Cta from 'views/HomePage/Cta';
import Features from 'views/HomePage/Features';
import FeaturesGallery from 'views/HomePage/FeaturesGallery';
import Hero from 'views/HomePage/Hero';
import ScrollableBlogPosts from 'views/HomePage/ScrollableBlogPosts';

export default function Homepage({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>FlorStroy — профессиональное устройство бетонных полов</title>
        <meta name="description" content="Стяжка, топпинг, эпоксидные покрытия, армирование, гидроизоляция. Работаем по Москве и области." />
        <meta property="og:title" content="FlorStroy — профессиональное устройство бетонных полов" />
        <meta property="og:description" content="Стяжка, топпинг, эпоксидные покрытия, армирование, гидроизоляция. Работаем по Москве и области." />
        <meta property="og:url" content="https://florstroy.ru/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://florstroy.ru/test-article/13.jpeg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FlorStroy — профессиональное устройство бетонных полов" />
        <meta name="twitter:description" content="Стяжка, топпинг, эпоксидные покрытия, армирование, гидроизоляция. Работаем по Москве и области." />
        <meta name="twitter:image" content="https://florstroy.ru/test-article/13.jpeg" />
      </Head>

      <HomepageWrapper>
        <WhiteBackgroundContainer>
          <Hero />

          <BasicSection imageUrl="/test-article/18.jpeg" title="Наши услуги" overTitle="Устройство бетонных покрытий">
            <p>
              Покрытие применяется на открытых игровых, спортивных и детских площадках, школьных стадионах и беговых дорожках.
              Устройство возможно по бетонному, асфальтовому или грунтовому основанию.
            </p>

            <ServiceCards>
              <ServiceCard>
                <CardTitle>Бетонные полы</CardTitle>
                <CardText>
                  Бетонный пол с упрочнителем — часто используемая конструкция пола для зданий промышленного назначения.
                  Подходит для большинства помещений без повышенных требований к покрытию пола.
                </CardText>
              </ServiceCard>

              <ServiceCard>
                <CardTitle>Полимерные полы</CardTitle>
                <CardText>
                  Для объектов, подверженных воздействию химически агрессивных сред, постоянным ударным нагрузкам,
                  активному движению транспорта. Удовлетворяет любым санитарным требованиям.
                </CardText>
              </ServiceCard>

              <ServiceCard>
                <CardTitle>Полы для площадок и паркингов</CardTitle>
                <CardText>
                  Для эксплуатации под открытым небом. Выдерживают перепады температуры, процессы заморозки/разморозки,
                  воздействие «дорожной» химии.
                </CardText>
              </ServiceCard>
            </ServiceCards>

            <p>
              <Link href="/contact">Свяжитесь с нами</Link> для консультации и расчёта стоимости.
            </p>
          </BasicSection>

          <BasicSection imageUrl="/19.jpeg" title="Реализованные проекты" overTitle="Устройство полимерных полов" reversed>
            <p>
              Полимерные покрытия — это самовыравнивающийся материал, устойчивый к механическим нагрузкам, влаге, химии и перепадам температуры.
              Идеальны для производственных, складских, торговых и офисных помещений.
            </p>
            <StyledList>
              <li>Бесшовность и герметичность</li>
              <li>Беспыльность и простота уборки</li>
              <li>Устойчивость к агрессивным средам</li>
              <li>Антистатичность и антипроводимость</li>
              <li>Ударостойкость и лёгкость ремонта</li>
              <li>Низкая стоимость обслуживания</li>
            </StyledList>
            <p>
              <Link href="/contact">Свяжитесь с нами</Link> для консультации и расчёта стоимости.
            </p>
          </BasicSection>
        </WhiteBackgroundContainer>

        <DarkerBackgroundContainer>
          <Cta />
          <FeaturesGallery />
          <Features />
          <ScrollableBlogPosts posts={posts} />
        </DarkerBackgroundContainer>
      </HomepageWrapper>
    </>
  );
}

const HomepageWrapper = styled.div`
  & > :last-child {
    margin-bottom: 15rem;
  }
`;

const DarkerBackgroundContainer = styled.div`
  background: rgb(var(--background));

  & > *:not(:first-child) {
    margin-top: 15rem;
  }
`;

const WhiteBackgroundContainer = styled.div`
  background: rgb(var(--secondBackground));

  & > :last-child {
    padding-bottom: 15rem;
  }

  & > *:not(:first-child) {
    margin-top: 15rem;
  }
`;

const StyledList = styled.ul`
  margin: 2rem 0;
  padding-left: 2rem;
  font-size: 1.6rem;
  line-height: 1.6;

  li {
    margin-bottom: 1.2rem;
  }

  strong {
    font-weight: 600;
  }
`;

const ServiceCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 3rem;
  margin: 4rem 0;
`;

const ServiceCard = styled.div`
  background: white;
  border-radius: 1.2rem;
  padding: 2.5rem;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 1.2rem;
  color: var(--primary);
`;

const CardText = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  color: rgb(var(--text));
`;

export async function getStaticProps() {
  return {
    props: {
      posts: await getAllPosts(),
    },
  };
}