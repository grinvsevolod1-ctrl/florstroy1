import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { NavItems } from 'types';
import ClientOnly from './ClientOnly';
import CloseIcon from './CloseIcon';
import OriginalDrawer from './Drawer';
import { media } from 'utils/media';

type NavigationDrawerProps = PropsWithChildren<{ items: NavItems }>;

export default function NavigationDrawer({ children, items }: NavigationDrawerProps) {
  const { close } = OriginalDrawer.useDrawer();

  return (
    <OriginalDrawer.Drawer>
      <Wrapper>
        <ClientOnly>
          <OriginalDrawer.Target openClass="drawer-opened" closedClass="drawer-closed">
            <div className="my-drawer">
              <div className="my-drawer-container">
                <DrawerCloseButton />
                <NavItemsList items={items} />
                <MobileOnly>
                  <ContactBlock>
                    <ContactTitle>Контакты</ContactTitle>
                    <Divider />
                    <ContactLine href="mailto:info@florstroy.ru">
                      <ContactIcon viewBox="0 0 24 24">
                        <path fill="currentColor" d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 18V8l8 5 8-5v10H4z" />
                      </ContactIcon>
                      <ContactLabel>Email:</ContactLabel>
                      <ContactValue>info@florstroy.ru</ContactValue>
                    </ContactLine>
                    <ContactLine href="tel:+79651686358">
                      <ContactIcon viewBox="0 0 24 24">
                        <path fill="currentColor" d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1v3.5a1 1 0 01-1 1C10.07 22 2 13.93 2 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.26 2.67.76 3.88a1 1 0 01-.21 1.11l-2.43 2.8z" />
                      </ContactIcon>
                      <ContactLabel>Телефон:</ContactLabel>
                      <ContactValue>+7 965 168-63-58</ContactValue>
                    </ContactLine>
                  </ContactBlock>
                </MobileOnly>
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    function handleRouteChangeComplete() {
      close();
    }

    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    return () => router.events.off('routeChangeComplete', handleRouteChangeComplete);
  }, [close, router]);

  return (
    <ul>
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;

        if (item.submenu) {
          return (
            <NavItem key={idx}>
              <DropdownToggle onClick={() => setOpenIndex(isOpen ? null : idx)}>
                {item.title}
                <Arrow isOpen={isOpen}>▾</Arrow>
              </DropdownToggle>
              {isOpen && (
                <Submenu>
                  {item.submenu.map((sub, subIdx) =>
                    sub.href ? (
                      <li key={subIdx}>
                        <NextLink href={sub.href} passHref>
                          <a>{sub.title}</a>
                        </NextLink>
                      </li>
                    ) : null
                  )}
                </Submenu>
              )}
            </NavItem>
          );
        }

        if (!item.href) return null;

        return (
          <NavItem key={idx}>
            <NextLink href={item.href} passHref>
              <a>{item.title}</a>
            </NextLink>
          </NavItem>
        );
      })}
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

  > a, > span {
    font-size: 3rem;
    text-transform: uppercase;
    display: block;
    color: rgb(var(--text));
    text-decoration: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
  }
`;

const DropdownToggle = styled.span`
  font-size: 3rem;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(var(--text));
  cursor: pointer;
  padding: 0.5rem 1rem;
`;

const Arrow = styled.span<{ isOpen: boolean }>`
  margin-left: 1rem;
  font-size: 2rem;
  transform: rotate(${(p) => (p.isOpen ? '180deg' : '0deg')});
  transition: transform 0.3s ease;
`;

const Submenu = styled.ul`
  margin-top: 1rem;
  list-style: none;
  padding: 0;

  li {
    margin: 0.5rem 0;

    a {
      font-size: 2rem;
      color: rgb(var(--text));
      text-decoration: none;
      padding: 0.5rem 1rem;
      display: block;
      border-radius: 0.4rem;

      &:hover {
        background: rgba(var(--primary), 0.1);
      }
    }
  }
`;

const MobileOnly = styled.div`
  ${media('>=desktop')} {
    display: none;
  }
`;

const ContactBlock = styled.div`
  margin-top: 3rem;
  padding: 2rem;
  text-align: center;
  border-top: 1px solid rgba(var(--text), 0.1);
  width: 100%;
`;

const ContactTitle = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1.6rem;
  color: rgb(var(--text));
`;

const Divider = styled.div`
  width: 40%;
  height: 1px;
  background: rgba(var(--text), 0.1);
  margin: 0 auto 2rem;
`;

const ContactLine = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  margin-bottom: 1.4rem;
  text-decoration: none;

  &:hover {
    background: rgba(var(--primary), 0.05);
  }
`;

const ContactIcon = styled.svg`
  width: 2rem;
  height: 2rem;
  fill: rgb(var(--primary));
  flex-shrink: 0;
`;

const ContactLabel = styled.span`
  font-weight: 600;
  color: rgb(var(--text), 0.6);
  min-width: 90px;
  font-size: 1.4rem;
`;

const ContactValue = styled.span`
  font-weight: 500;
  color: rgb(var(--primary));
  white-space: nowrap;
  font-size: 1.5rem;
`;
