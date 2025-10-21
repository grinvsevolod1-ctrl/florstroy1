import Head from 'next/head';
import styled from 'styled-components';
import Container from 'components/Container';
import NotFoundIllustration from 'components/NotFoundIllustration';

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>Страница не найдена | FlorStroy</title>
        <meta name="robots" content="noindex" />
        <meta name="description" content="К сожалению, запрашиваемая страница не найдена. Возможно, она была удалена или перемещена." />
      </Head>

      <Wrapper>
        <Container>
          <ImageContainer>
            <NotFoundIllustration />
          </ImageContainer>
          <Title>404 — Страница не найдена</Title>
          <Description>
            К сожалению, такой страницы не существует. Проверьте адрес или вернитесь на <a href="/">главную</a>.
          </Description>
        </Container>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  background: rgb(var(--background));
  margin: 10rem 0;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 4.8rem;
  margin-top: 5rem;
`;

const Description = styled.div`
  font-size: 2rem;
  opacity: 0.8;
  margin-top: 2.5rem;

  a {
    color: rgb(var(--primary));
    text-decoration: underline;
  }
`;

const ImageContainer = styled.div`
  width: 25rem;
  margin: auto;
`;
