// NavigationDrawer.tsx
import { useNewsletterModalContext } from 'contexts/newsletter-modal.context';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { NavItems } from 'types';
import ClientOnly from './ClientOnly';
import CloseIcon from './CloseIcon';
import OriginalDrawer from './Drawer';

type NavigationDrawerProps = PropsWithChildren<{ items: NavItems }>;

export default function NavigationDrawer({ children, items }: NavigationDrawerProps) {
  const { setIsModalOpened } = useNewsletterModalContext();
  const { close } = OriginalDrawer.useDrawer();

  function handleContactClick() {
    close();
    setIsModalOpened(true);
  }

  return (
    <OriginalDrawer.Drawer>
      <Wrapper>
        <ClientOnly>
          <OriginalDrawer.Target openClass="drawer-opened" closedClass="drawer-closed">
            <div className="my-drawer">
              <div className="my-drawer-container">
                <DrawerCloseButton />
                <NavItemsList items={items} />
                <ContactInfo>
                  <a href="tel:+79651686358">📞 +7 965 168-63-58</a>
                  <a href="mailto:info@florstroy.ru">✉️ info@florstroy.ru</a>
                  <a
                    href="https://yandex.by/maps/10743/odincovo/house/mozhayskoye_shosse_8g/Z04YdABgTEEDQFtvfXp3eH5gYA==/?ll=37.270544%2C55.669234&z=15"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📍 Одинцово, Можайское шоссе д.8Г
                  </a>
                </ContactInfo>
                <ContactButton onClick={handleContactClick}>📩 Связаться</ContactButton>
              </div>
            </div>
          </OriginalDrawer.Target>
        </ClientOnly>
      </Wrapper>
      {children}
    </OriginalDrawer.Drawer>
  );
}

function NavItemsList({ items }: { items: NavItems }) {
  const { close } = OriginalDrawer.useDrawer();
  const router = useRouter();

  useEffect(() => {
    function handleRouteChangeComplete() {
      close();
    }

    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    return () => router.events.off('routeChangeComplete', handleRouteChangeComplete);
  }, [close, router]);

  return (
    <ul>
      {items.map((item, idx) =>
        item.href ? (
          <NavItem key={idx}>
            <NextLink href={item.href} passHref>
              <a>{item.title}</a>
            </NextLink>
          </NavItem>
        ) : null
      )}
    </ul>
  );
}

function DrawerCloseButton() {
  const ref = useRef(null);
  const a11yProps = OriginalDrawer.useA11yCloseButton(ref);

  return <CloseIcon className="close-icon" _ref={ref} {...a11yProps} />;
}

// Styled Components

const Wrapper = styled.div`
  .my-drawer {
    width: 100%;
    height: 100%;
    z-index: var(--z-drawer);
    background: rgb(var(--background));
    transition: margin-left 0.3s cubic-bezier(0.82, 0.085, 0.395, 0.895);
    overflow: hidden;
  }

  .my-drawer-container {
    position: relative;
    height: 100%;
    margin: auto;
    max-width: 70rem;
    padding: 0 1.2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .close-icon {
    position: absolute;
    right: 2rem;
    top: 2rem;
  }

  .drawer-closed {
    margin-left: -100%;
  }

  .drawer-opened {
    margin-left: 0;
  }

  ul {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
    list-style: none;

    & > *:not(:last-child) {
      margin-bottom: 3rem;
    }
  }
`;

const NavItem = styled.li`
  text-align: center;

  a {
    font-size: 3rem;
    text-transform: uppercase;
    display: block;
    color: rgb(var(--text));
    text-decoration: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;

    &:hover {
      background: rgba(var(--primary), 0.05);
    }
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  font-size: 1.6rem;
  line-height: 2.4rem;
  text-align: center;

  a {
    color: rgb(var(--text));
    text-decoration: none;
    margin: 0.4rem 0;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
    line-height: 2rem;
  }
`;

const ContactButton = styled.button`
  margin-bottom: 2rem;
  background: rgb(var(--primary));
  color: white;
  font-size: 1.6rem;
  padding: 1.2rem 2rem;
  border: none;
  border-radius: 0.6rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: rgb(var(--primary), 0.85);
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
    padding: 1rem 1.6rem;
  }
`;
