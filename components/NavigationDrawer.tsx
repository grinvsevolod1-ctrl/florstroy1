import { useNewsletterModalContext } from 'contexts/newsletter-modal.context';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
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

const ContactButton = styled.button`
  margin-top: auto;
  margin-bottom: 4rem;
  background: rgb(var(--primary));
  color: white;
  font-size: 1.6rem;
  padding: 1.2rem 2rem;
  border: none;
  border-radius: 0.6rem;
  font-weight: bold;
  cursor: pointer;
`;