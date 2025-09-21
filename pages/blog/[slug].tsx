import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Container from 'components/Container';
import { formatDate } from 'utils/formatDate';
import { media } from 'utils/media';
import { getReadTime } from 'utils/readTime';
import Header from 'views/SingleArticlePage/Header';
import MetadataHead from 'views/SingleArticlePage/MetadataHead';
import OpenGraphHead from 'views/SingleArticlePage/OpenGraphHead';
import ShareWidget from 'views/SingleArticlePage/ShareWidget';
import StructuredDataHead from 'views/SingleArticlePage/StructuredDataHead';
import ArticleImage from 'components/ArticleImage'; // путь уточни, если другой


export default function SingleArticlePage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [readTime, setReadTime] = useState('');

  useEffect(() => {
    const currentContent = contentRef.current;
    if (currentContent) {
      setReadTime(getReadTime(currentContent.textContent || ''));
    }

    const prismThemeLinkEl = document.querySelector('link[data-id="prism-theme"]');
    if (!prismThemeLinkEl) {
      const headEl = document.querySelector('head');
      if (headEl) {
        const newEl = document.createElement('link');
        newEl.setAttribute('data-id', 'prism-theme');
        newEl.setAttribute('rel', 'stylesheet');
        newEl.setAttribute('href', '/prism-theme.css');
        newEl.setAttribute('media', 'print');
        newEl.setAttribute('onload', "this.media='all'; this.onload=null;");
        headEl.appendChild(newEl);
      }
    }
  }, []);

  const { slug, content, meta } = props;
  const formattedDate = formatDate(new Date(meta.date));
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
        <ShareWidget title={meta.title} slug={slug} />
        <Header title={meta.title} formattedDate={formattedDate} imageUrl={absoluteImageUrl} readTime={readTime} />
        <MDXRemote {...content} components={{ ArticleImage }} />

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
  margin: 10rem auto;

  ${media('<=tablet')} {
    margin: 5rem auto;
  }
`;
