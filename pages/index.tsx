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

          <CircleImageSection>
            <CircleImage>
              <img src="/15.jpeg" alt="Наши услуги" />
              <Caption>Наши услуги</Caption>
            </CircleImage>
            <CircleImage>
              <img src="/2.jpeg" alt="Реализованные проекты" />
              <Caption>Реализованные проекты</Caption>
            </CircleImage>
          </CircleImageSection>
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

const CircleImageSection = styled.section`
  display: flex;
  justify-content: center;
  gap: 6rem;
  padding: 10rem 5rem;

  ${media('<=tablet')} {
    flex-direction: column;
    align-items: center;
    padding: 5rem 2rem;
  }
`;

const CircleImage = styled.div`
  position: relative;
  width: 28rem;
  height: 28rem;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Caption = styled.div`
  position: absolute;
  bottom: -4rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.6rem;
  font-weight: 500;
  color: ${({ theme }) => (theme.mode === 'dark' ? '#fff' : '#111')};
  text-shadow: ${({ theme }) =>
    theme.mode === 'dark'
      ? '0 0 8px rgba(0,0,0,0.6)'
      : '0 0 8px rgba(255,255,255,0.6)'};
  margin-top: 1rem;
  text-align: center;
`;

export async function getStaticProps() {
  return {
    props: {
      posts: await getAllPosts(),
    },
  };
}
