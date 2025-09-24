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
          <BasicSection imageUrl="/15.jpeg" title="Наши услуги" overTitle="Что мы предлагаем">
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
              <li>Коттедж под Москвой — 706 м²</li>
              <li>Офисный центр в Москве — 1200 м²</li>
              <li>Складской комплекс в Смоленске — 1800 м²</li>
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
  background: none;
  position: relative;

  & > :last-child {
    padding-bottom: 15rem;
  }

  & > *:not(:first-child) {
    margin-top: 15rem;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('/15.jpeg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: blur(8px);
    z-index: 0;
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
`;


export async function getStaticProps() {
  return {
    props: {
      posts: await getAllPosts(),
    },
  };
}
