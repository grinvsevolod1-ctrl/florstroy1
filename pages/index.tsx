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
             Покрытие применяется на открытых игровых спортивных и детстских площадках, школьных стадионах беговых дорожках.
Варианты устройства покрытий:
однослойное полимерное покрытие с пременением резиновой крошки (SBR) или каучукового гранулянта (EPDM) (минимальная толщина по твердому бетонному или асфальтовому покрытию составляет 10 мм, а по грунтовому основанию составляет 20 мм.)
двухслойное полимерное покрытие с пременением резиновой крошки (SBR) и каучукового гранулянта (EPDM) (минимальная толщина финишнего слоя составляет 5 мм)
двухслойное полимерное покрытие с применением спрей системы (средняя толщина составляет 12 мм.)
Покрытие устраивают на открытых площадках по предворительно подготовленному бетонному, асфальтовому или грунтовому основанию.<Link href="/contact">Свяжитесь с нами</Link> для консультации.
            </p>
          </BasicSection>
          <BasicSection imageUrl="/19.jpeg" title="Реализованные проекты" overTitle="Устройство полимерных полов" reversed>
            <p>
             Полимерные покрытия — это самовыравнивающийся материал. Он довольно прочный и износостойкий. Не боится экстремальных механических нагрузок, повышенной влажности, контактов с водой, кислотами и щелочами, стойко переносит температурные колебания. Полимерный наливной пол укладывают в производственных, складских, торговых и офисных помещениях.
Основные преимущества жидких полов:
бесшовность;
беспыльность;
герметичность;
стойкость к агрессивным средам;
простота ремонта;
низкая стоимость обслуживания;
ударостойкость;
антистатичность и антипроводимость;
лёгкость в уборке;
            </p>
           
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

export async function getStaticProps() {
  return {
    props: {
      posts: await getAllPosts(),
    },
  };
}
