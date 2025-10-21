import Head from "next/head"
import type { PropsWithChildren } from "react"
import styled from "styled-components"
import Container from "./Container"

export interface PageProps {
  title: string
  description?: string
  keywords?: string
  ogImage?: string
  canonical?: string
}

export default function Page({
  title,
  description,
  keywords,
  ogImage,
  canonical,
  children,
}: PropsWithChildren<PageProps>) {
  const fullTitle = `${title} | FlorStroy`
  const defaultOgImage = ogImage || "https://florstroy.ru/test-article/13.jpeg"
  const pageUrl = canonical || `https://florstroy.ru${typeof window !== "undefined" ? window.location.pathname : ""}`

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />

        {keywords && <meta name="keywords" content={keywords} />}

        {/* Open Graph */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={defaultOgImage} />
        <meta property="og:image:alt" content={title} />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:site_name" content="FlorStroy" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={defaultOgImage} />
        <meta name="twitter:image:alt" content={title} />

        {/* Canonical URL */}
        {canonical && <link rel="canonical" href={canonical} />}

        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="yandex" content="index, follow" />
        <meta name="author" content="FlorStroy" />

        <link rel="alternate" hrefLang="ru" href={pageUrl} />
        <link rel="alternate" hrefLang="x-default" href={pageUrl} />
      </Head>
      <Wrapper>
        <Container>
          <ChildrenWrapper>{children}</ChildrenWrapper>
        </Container>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  background: rgb(var(--background));
`

const ChildrenWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 10rem;
`
