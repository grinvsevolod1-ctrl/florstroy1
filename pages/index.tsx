import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
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
import { media } from 'utils/media';

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

          <TwoImageSection>
            <ImageTop>
              <img src="/15.jpeg" alt="Наши услуги" />
            </ImageTop>

            <TextBlock>
              <h2>Наши услуги</h2>
              <p>
                FlorStroy предоставляет полный спектр строительных услуг: от проектирования до сдачи объекта. Мы строим дома, коммерческие здания,
                выполняем ремонт и благоустройство. <Link href="/contact">Свяжитесь с нами</Link> для консультации.
              </p>
            </TextBlock>

            <ImageBottom>
              <img src="/2.jpeg" alt="Реализованные проекты" />
            </ImageBottom>
          </TwoImageSection>
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

const TwoImageSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  padding: 10rem 5rem;

  ${media('<=tablet')} {
    padding: 5rem 2rem;
  }
`;

const ImageTop = styled.div`
  width: 100%;
  height: 40rem;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1rem;
  }
`;

const ImageBottom = styled.div`
  width: 100%;
  height: 40rem;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1rem;
  }
`;

const TextBlock = styled.div`
  color: ${({ theme }) => (theme.mode === 'dark' ? '#fff' : '#111')};
  text-shadow: ${({ theme }) =>
    theme.mode === 'dark'
      ? '0 0 10px rgba(0,0,0,0.6)'
      : '0 0 10px rgba(255,255,255,0.4)'};

  h2 {
    font-size: 3.6rem;
    margin-bottom: 2rem;
  }

  p {
    font-size: 1.8rem;
    line-height: 1.6;
  }
`;

export async function getStaticProps() {
  return {
    props: {
      posts: await getAllPosts(),
    },
  };
}
