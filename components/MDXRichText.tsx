import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import styled from 'styled-components';
import { media } from 'utils/media';
import ArticleImage from './ArticleImage';
import Code from './Code';
import Link from './Link';
import Quote from './Quote';

const components = {
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

const Paragraph = styled.p`
  font-size: 1.8rem;
  line-height: 2.7rem;
  hanging-punctuation: first;

  &:not(:last-child) {
    margin-bottom: 2.7rem;
  }

  & + ul,
  & + li {
    margin-top: -1.5rem !important;
  }
`;

const SecondHeading = styled.h2`
  font-size: 2.5rem;
  line-height: 3.75rem;
  margin-bottom: 3.75rem;
`;
