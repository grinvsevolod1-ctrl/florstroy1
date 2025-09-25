import NextLink from 'next/link';
import { ViberIcon, TelegramIcon, WhatsappIcon } from 'react-share';
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
            <ListItem title="Монолитная бетонная плита с армированием" href="/blog/test-article-11" />
            <ListItem title="Устройство бетонной площадки" href="/blog/test-article-12" />
            <ListItem title="Устройство бетонной плиты в аграрном объекте" href="/blog/test-article-13" />
            <ListItem title="Устройство бетонного основания в помещении" href="/blog/test-article-14" />
            <ListItem title="Устройство спортивного покрытия в крытом комплексе" href="/blog/test-article-17" />
            <ListItem title="Устройство бетонного пола в складском комплексе" href="/blog/test-article-18" />
            <ListItem title="Устройство резинового покрытия на игровой площадке" href="/blog/test-article-20" />
            <ListItem title="Механизированная укладка бетонной плиты" href="/blog/test-article-21" />
          </ListWrapper>

          <ListWrapper>
            <ListHeader>Контакты</ListHeader>
            <ListItem title="Связаться с нами" href="/contact" />
            <ListItem title="Политика конфиденциальности" href="/privacy-policy" />
          </ListWrapper>
        </ListContainer>

        <BottomBar>
          <ShareBar>
            <NextLink href="https://t.me/74956624994" passHref>
              <a>
                <TelegramIcon size={50} round={true} />
              </a>
            </NextLink>

            <NextLink href="https://wa.me/74956624994" passHref>
              <a>
                <WhatsappIcon size={50} round={true} />
              </a>
            </NextLink>

            <NextLink href="https://wa.me/74956624994" passHref>
              <a>
                <ViberIcon size={50} round={true} />
              </a>
            </NextLink>
          </ShareBar>

          <Copyright>
            &copy; FlorStroy {new Date().getFullYear()} <br />
            <NextLink href="http://netnext.site" passHref>
              <a>Designed And Developed by NetNext Studio</a>
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
