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
import Partners from 'views/HomePage/Partners';
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
          <Partners />
          <BasicSection imageUrl="/demo-illustration-1.svg" title="Наши услуги" overTitle="Что мы предлагаем">
            <p>
              FlorStroy предоставляет полный спектр строительных услуг: от проектирования до сдачи объекта. Мы строим дома, коммерческие здания,
              выполняем ремонт и благоустройство. <Link href="/contact">Свяжитесь с нами</Link> для консультации.
            </p>
          </BasicSection>
          <BasicSection imageUrl="/demo-illustration-2.svg" title="Реализованные проекты" overTitle="Наш опыт" reversed>
            <p>
              Мы успешно реализовали десятки проектов по всей Беларуси. Каждый объект — это результат точного планирования, качественных материалов и
              профессиональной команды.
            </p>
            <ul>
              <li>Коттедж в Дроздах — 250 м²</li>
              <li>Офисный центр в Минске — 1200 м²</li>
              <li>Складской комплекс в Борисове — 1800 м²</li>
            </ul>
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
