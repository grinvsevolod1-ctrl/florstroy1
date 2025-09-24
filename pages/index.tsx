import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import BasicSection from 'components/BasicSection';
import Link from 'components/Link';
import { EnvVars } from 'env';
import { getAllPosts } from 'utils/postsFetcher';
import Cta from 'views/HomePage/Cta';
import Features from 'views/HomePage/Features';
import FeaturesGallery from 'views/HomePage/FeaturesGallery';
import Hero from 'views/HomePage/Hero';
import ScrollableBlogPosts from 'views/HomePage/ScrollableBlogPosts';
import Testimonials from 'views/HomePage/Testimonials';

export default function Homepage({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{EnvVars.SITE_NAME}</title>
        <meta
          name="description"
          content="FlorStroy — надёжные строительные решения, проекты под ключ, отзывы клиентов и быстрая заявка."
        />
      </Head>
      <HomepageWrapper>
        <WhiteBackgroundContainer>
          <Hero />

          <BasicSection imageUrl="/15.jpeg" title="Наши услуги" overTitle="Устройство спортивных покрытий">
            <p>
              Покрытие применяется на открытых игровых, спортивных и детских площадках, школьных стадионах и беговых дорожках.
              Устройство возможно по бетонному, асфальтовому или грунтовому основанию.
            </p>
            <StyledList>
              <li>
                <strong>Однослойное покрытие</strong> — с применением резиновой крошки (SBR) или каучукового гранулянта (EPDM).
                <br />
                Толщина: 10 мм по твёрдому основанию, 20 мм по грунту.
              </li>
              <li>
                <strong>Двухслойное покрытие</strong> — с SBR и EPDM.
                <br />
                Толщина финишного слоя: от 5 мм.
              </li>
              <li>
                <strong>Спрей-система</strong> — двухслойное покрытие с распылением.
                <br />
                Средняя толщина: около 12 мм.
              </li>
            </StyledList>
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
          </BasicSection>
        </WhiteBackgroundContainer>

        <DarkerBackgroundContainer>
          <Cta />
          <FeaturesGallery />
          <Features />
          <Testimonials />
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

export async function getStaticProps() {
  return {
    props: {
      posts: await getAllPosts(),
    },
  };
}
