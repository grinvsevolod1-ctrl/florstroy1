import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import type { MDXComponents } from 'mdx/types'; // 👈 тип для компонентов
import styled from 'styled-components';
import { media } from 'utils/media';
import ArticleImage from './ArticleImage';
import Code from './Code';
import Link from './Link';
import Quote from './Quote';

const components: MDXComponents = {
  img: ArticleImage,
  code: Code,
  a: Link,
  blockquote: Quote,
};

export default function MDXRichText({ content }: { content: MDXRemoteSerializeResult }) {
  return (
    <Container>
      <MDXRemote {...content} components={components} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  section:not(:last-child) {
    margin-bottom: 3.8rem;
  }

  a {
    word-break: break-word;
  }

  ${media('<=desktop')} {
    .remark-highlight {
      width: 100%;
      overflow-x: auto;
    }
  }

  ol,
  ul {
    font-size: 1.8rem;
    line-height: 2.7rem;
    margin: 0;
    padding-left: 2.4rem;
    li {
      & > * {
        vertical-align: top;
      }
    }

    &:not(:last-child) {
      margin-bottom: 2.7rem;
    }
  }
`;
