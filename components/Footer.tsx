import NextLink from 'next/link';
import { FacebookIcon, TelegramIcon, WhatsappIcon } from 'react-share';
import styled from 'styled-components';
import Container from 'components/Container';
import { media } from 'utils/media';

export default function Footer() {
  return (
    <FooterWrapper>
      <Container>
        <ListContainer>
          <ListWrapper>
            <ListHeader>
              <NextLink href="/blog" passHref>
                <a>Наши проекты</a>
              </NextLink>
            </ListHeader>
            <ListItem title="Бетонный пол в промышленном ангаре" href="/blog/test-article-4" />
            <ListItem title="Основание под детскую площадку" href="/blog/test-article-5" />
            <ListItem title="Полы в холодильном складе" href="/blog/test-article-6" />
            <ListItem title="Полы для логистического центра" href="/blog/test-article-3" />
          </ListWrapper>

          <ListWrapper>
            <ListHeader>Контакты</ListHeader>
            <ListItem title="Связаться с нами" href="/contact" />
            <ListItem title="Политика конфиденциальности" href="/privacy-policy" />
          </ListWrapper>
        </ListContainer>

        <BottomBar>
          <ShareBar>
            <NextLink href="https://t.me/florstroy" passHref>
              <a>
                <TelegramIcon size={50} round={true} />
              </a>
            </NextLink>

            <NextLink href="https://wa.me/79999999999" passHref>
              <a>
                <WhatsappIcon size={50} round={true} />
              </a>
            </NextLink>

            <NextLink href="https://www.facebook.com/florstroy" passHref>
              <a>
                <FacebookIcon size={50} round={true} />
              </a>
            </NextLink>
          </ShareBar>

          <Copyright>
            &copy; FlorStroy {new Date().getFullYear()} <br />
            <NextLink href="http://netnext.site" passHref>
              <a>Designedd And Developed by NetNext Studio</a>
            </NextLink>
          </Copyright>
        </BottomBar>
      </Container>
    </FooterWrapper>
  );
}

function ListItem({ title, href }: { title: string; href: string }) {
  return (
    <ListItemWrapper>
      <NextLink href={href} passHref>
        <a>{title}</a>
      </NextLink>
    </ListItemWrapper>
  );
}

// стили остаются без изменений

const FooterWrapper = styled.div`
  padding-top: 10rem;
  padding-bottom: 4rem;
  background: rgb(var(--secondary));
  color: rgb(var(--textSecondary));
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ListHeader = styled.p`
  font-weight: bold;
  font-size: 2.25rem;
  margin-bottom: 2.5rem;

  a {
    color: rgb(var(--textSecondary));
    text-decoration: none;
  }
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5rem;
  margin-right: 5rem;

  & > *:not(:first-child) {
    margin-top: 1rem;
  }

  ${media('<=tablet')} {
    flex: 0 40%;
    margin-right: 1.5rem;
  }

  ${media('<=phone')} {
    flex: 0 100%;
    margin-right: 0rem;
  }
`;

const ListItemWrapper = styled.p`
  font-size: 1.6rem;

  a {
    text-decoration: none;
    color: rgba(var(--textSecondary), 0.75);
  }
`;

const ShareBar = styled.div`
  & > *:not(:first-child) {
    margin-left: 1rem;
  }
`;

const Copyright = styled.p`
  font-size: 1.5rem;
  margin-top: 0.5rem;
  text-align: right;

  a {
    color: rgba(var(--textSecondary), 0.75);
    text-decoration: none;
  }

  ${media('<=tablet')} {
    text-align: center;
    margin-top: 2rem;
  }
`;

const BottomBar = styled.div`
  margin-top: 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${media('<=tablet')} {
    flex-direction: column;
  }
`;
