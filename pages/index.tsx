import Head from "next/head"
import type { InferGetStaticPropsType } from "next"
import styled from "styled-components"
import Page from "components/Page"
import { getAllPosts } from "utils/postsFetcher"
import Hero from "views/HomePage/Hero"
import Partners from "views/HomePage/Partners"
import ScrollableBlogPosts from "views/HomePage/ScrollableBlogPosts"
import Testimonials from "views/HomePage/Testimonials"
import Cta from "views/HomePage/Cta"
import Features from "views/HomePage/Features"
import FeaturesGallery from "views/HomePage/FeaturesGallery"

export default function Homepage({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Page>
      <Head>
        <title>ФлорСтрой - Профессиональное строительство и ремонт в Москве и области</title>
        <meta
          name="description"
          content="ФлорСтрой - ведущая строительная компания в Москве. Строительство домов, ремонт квартир, коммерческое строительство. Гарантия качества и лучшие цены."
        />
        <meta
          name="keywords"
          content="строительство, ремонт, строительная компания, строительство домов, ремонт квартир, Москва, ФлорСтрой"
        />
        <meta property="og:title" content="ФлорСтрой - Профессиональное строительство и ремонт" />
        <meta
          property="og:description"
          content="Ведущая строительная компания в Москве. Строительство домов, ремонт квартир, коммерческое строительство."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://florstroy.ru" />
        <meta property="og:image" content="https://florstroy.ru/demo-illustration-1.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ФлорСтрой - Профессиональное строительство и ремонт" />
        <meta name="twitter:description" content="Ведущая строительная компания в Москве" />
        <link rel="canonical" href="https://florstroy.ru" />
      </Head>
      <HomepageWrapper>
        <WhiteBackgroundContainer>
          <Hero />
          <Partners />
          <Features />
          <FeaturesGallery />
          <Testimonials />
          <ScrollableBlogPosts posts={posts} />
        </WhiteBackgroundContainer>
        <DarkerBackgroundContainer>
          <Cta />
        </DarkerBackgroundContainer>
      </HomepageWrapper>
    </Page>
  )
}

const HomepageWrapper = styled.div`
  & > :last-child {
    margin-bottom: 15rem;
  }
`

const DarkerBackgroundContainer = styled.div`
  background: rgb(var(--background));

  & > *:not(:first-child) {
    margin-top: 15rem;
  }
`

const WhiteBackgroundContainer = styled.div`
  background: rgb(var(--secondBackground));

  & > :last-child {
    padding-bottom: 15rem;
  }

  & > *:not(:first-child) {
    margin-top: 15rem;
  }
`

export async function getStaticProps() {
  return {
    props: {
      posts: await getAllPosts(),
    },
  }
}
