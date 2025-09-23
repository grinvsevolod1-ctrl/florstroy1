import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import React, { useRef } from 'react';
import styled from 'styled-components';
import Container from 'components/Container';
import { media } from 'utils/media';
import Header from 'views/SingleArticlePage/Header';
import MetadataHead from 'views/SingleArticlePage/MetadataHead';
import OpenGraphHead from 'views/SingleArticlePage/OpenGraphHead';
import StructuredDataHead from 'views/SingleArticlePage/StructuredDataHead';
import ArticleImage from 'components/ArticleImage';
import Code from 'components/Code';
import Quote from 'components/Quote';

export default function SingleArticlePage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const { slug, content, meta } = props;
  const absoluteImageUrl = meta.imageUrl.replace(/\/+/, '/');

  return (
    <>
      <Head>
        <noscript>
          <link rel="stylesheet" href="/prism-theme.css" />
        </noscript>
      </Head>
      <OpenGraphHead slug={slug} {...meta} />
      <StructuredDataHead slug={slug} {...meta} />
      <MetadataHead {...meta} />
      <CustomContainer id="content" ref={contentRef}>
        <Header title={meta.title} imageUrl={absoluteImageUrl} readTime="" />
        <ArticleBody>
          <MDXRemote {...content} components={{ ArticleImage, Code, Quote }} />
        </ArticleBody>
      </CustomContainer>
    </>
  );
}

export async function getStaticPaths() {
  const postsDir = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDir);

  const paths = filenames
    .filter((name) => name.endsWith('.mdx'))
    .map((name) => ({
      params: { slug: name.replace(/\.mdx$/, '') },
    }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext<{ slug: string }>) {
  const { slug } = params!;
  const filePath = path.join(process.cwd(), 'posts', `${slug}.mdx`);
  const source = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(source);
  const mdxSource = await serialize(content);

  return {
    props: {
      slug,
      content: mdxSource,
      meta: {
        title: data.title || '',
        description: data.description || '',
        date: data.date || '',
        tags: data.tags || '',
        imageUrl: data.imageUrl || '',
        author: data.author || '',
      },
    },
  };
}

const CustomContainer = styled(Container)`
  position: relative;
  max-width: 90rem;
  margin: 6rem auto;

  ${media('<=tablet')} {
    margin: 4rem auto;
  }
`;

const ArticleBody = styled.div`
  font-size: 1.8rem;
  line-height: 1.6;
  color: var(--text-main);
  margin-top: 4rem;

  ${media('<=tablet')} {
    font-size: 1.6rem;
    margin-top: 3rem;
  }

  & > *:not(:last-child) {
    margin-bottom: 2.4rem;
  }
`;
const ArticleBody = styled.div`
  font-size: 1.8rem;
  line-height: 1.65;
  color: var(--text-main);
  margin-top: 4rem;

  ${media('<=tablet')} {
    font-size: 1.6rem;
    margin-top: 3rem;
  }

  & > h1, & > h2, & > h3 {
    font-weight: 600;
    margin: 3.2rem 0 1.6rem;
    line-height: 1.3;
    color: var(--text-dark);
  }

  & > p {
    margin-bottom: 2.4rem;
    text-align: justify;
  }

  & > blockquote {
    font-style: italic;
    background: var(--background-light);
    padding: 2rem 3rem;
    border-left: 4px solid var(--primary);
    margin: 2.4rem 0;
  }

  & > ul, & > ol {
    margin: 2rem 0 2.4rem 2.4rem;
    padding-left: 1.6rem;
  }

  & > img {
    max-width: 100%;
    margin: 3rem auto;
    display: block;
    border-radius: 8px;
  }

  & > pre {
    background: #f4f4f4;
    padding: 2rem;
    border-radius: 6px;
    overflow-x: auto;
    margin: 2.4rem 0;
  }
`;
