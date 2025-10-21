// Navbar.tsx
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useNewsletterModalContext } from 'contexts/newsletter-modal.context';
import { ScrollPositionEffectProps, useScrollPosition } from 'hooks/useScrollPosition';
import { NavItems } from 'types';
import { media } from 'utils/media';
import Container from './Container';
import { HamburgerIcon } from './HamburgerIcon';
import Logo from './Logo';
import NavigationDrawer from './NavigationDrawer';
import OriginalDrawer from './Drawer';
import { useMediaQuery } from 'react-responsive';

const ColorSwitcher = dynamic(() => import('../components/ColorSwitcher'), { ssr: false });

type NavbarProps = { items: NavItems };
type ScrollingDirections = 'up' | 'down' | 'none';
type NavbarContainerProps = { hidden: boolean; transparent: boolean };

export default function Navbar({ items }: NavbarProps) {
  const router = useRouter();
  const { toggle } = OriginalDrawer.useDrawer();
  const { setIsModalOpened } = useNewsletterModalContext();
  const [scrollingDirection, setScrollingDirection] = useState<ScrollingDirections>('none');
  const isMobile = useMediaQuery({ maxWidth: 1023 });

  let lastScrollY = useRef(0);
  const lastRoute = useRef('');
  const stepSize = useRef(50);

  useScrollPosition(scrollPositionCallback, [router.asPath], undefined, undefined, 50);

  function scrollPositionCallback({ currPos }: ScrollPositionEffectProps) {
    const routerPath = router.asPath;
    const hasRouteChanged = routerPath !== lastRoute.current;

    if (hasRouteChanged) {
      lastRoute.current = routerPath;
      setScrollingDirection('none');
      return;
    }

    const currentScrollY = currPos.y;
    const scrollDifference = Math.abs(lastScrollY.current - currentScrollY);
    const isScrollingUp = currentScrollY > lastScrollY.current;
    const hasScrolledWholeStep = scrollDifference >= stepSize.current;
    const isInNonCollapsibleArea = lastScrollY.current > -50;

    if (isInNonCollapsibleArea) {
      setScrollingDirection('none');
      lastScrollY.current = currentScrollY;
      return;
    }

    if (!hasScrolledWholeStep) {
      lastScrollY.current = currentScrollY;
      return;
    }

    setScrollingDirection(isScrollingUp ? 'up' : 'down');
    lastScrollY.current = currentScrollY;
  }

  const isNavbarHidden = scrollingDirection === 'down';
  const isTransparent = scrollingDirection === 'none';

  return (
    <>
      <NavbarContainer hidden={isNavbarHidden} transparent={isTransparent}>
        <Content>
          <NextLink href="/" passHref>
            <LogoWrapper>
              <Logo />
            </LogoWrapper>
          </NextLink>

          <NavItemList>
            {items.map((item) =>
              item.href ? (
                <NavItemWrapper key={item.href}>
                  <NextLink href={item.href} passHref>
                    <a>{item.title}</a>
                  </NextLink>
                </NavItemWrapper>
              ) : null
            )}
          </NavItemList>

          <RightSide>
            <ContactBlock>
              <a href="tel:+79651686358">📞 +7 965 168-63-58</a>
              <a href="mailto:info@florstroy.ru">✉️ info@florstroy.ru</a>
              <a
                href="https://yandex.by/maps/10743/odincovo/house/mozhayskoye_shosse_8g/Z04YdABgTEEDQFtvfXp3eH5gYA==/?ll=37.270544%2C55.669234&z=15"
                target="_blank"
                rel="noopener noreferrer"
              >
                📍 Одинцово, Можайское шоссе д.8Г
              </a>
            </ContactBlock>

            <ButtonGroup>
              <ContactButton onClick={() => setIsModalOpened(true)}>Оставить заявку</ContactButton>
            </ButtonGroup>

            <IconGroup>
              <IconCircle>
                <ColorSwitcher />
              </IconCircle>
              <MobileOnly>
                <IconCircle offsetY="2px" onClick={toggle}>
                  <HamburgerIcon aria-label="Toggle menu" />
                </IconCircle>
              </MobileOnly>
            </IconGroup>
          </RightSide>
        </Content>
      </NavbarContainer>

      <NavigationDrawer items={items} />
    </>
  );
}

// Styled Components

const NavbarContainer = styled.div<NavbarContainerProps>`
  display: flex;
  position: sticky;
  top: 0;
  padding: 1.5rem 0;
  width: 100%;
  height: auto;
  z-index: var(--z-navbar);
  background-color: rgb(var(--navbarBackground));
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
  visibility: ${(p) => (p.hidden ? 'hidden' : 'visible')};
  transform: ${(p) => (p.hidden ? `translateY(-8rem)` : 'translateY(0)')};
  transition: transform 0.15s ease-in-out, visibility 0.15s ease-in-out;
`;

const Content = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const NavItemList = styled.ul`
  display: flex;
  list-style: none;
  align-items: center;

  ${media('<desktop')} {
    display: none;
  }
`;

const NavItemWrapper = styled.li`
  font-size: 1.3rem;
  text-transform: uppercase;
  line-height: 2;

  a {
    display: flex;
    color: rgb(var(--text), 0.75);
    letter-spacing: 0.025em;
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    font-weight: 700;
  }

  &:not(:last-child) {
    margin-right: 2rem;
  }
`;

const LogoWrapper = styled.a`
  display: flex;
  margin-right: auto;
  text-decoration: none;
  color: rgb(var(--logoColor));
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

const ContactBlock = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
  line-height: 1.8;
  text-align: right;

  a {
    color: rgb(var(--text));
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  ${media('<desktop')} {
    display: none;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;

  ${media('<desktop')} {
    display: none;
  }
`;

const ContactButton = styled.button`
  background: rgb(var(--primary));
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.3rem;
  font-weight: 700;
  text-transform: uppercase;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: rgb(var(--primary), 0.85);
  }
`;

const IconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (min-width: 1024px) {
    margin-right: 2rem;
  }
`;

const IconCircle = styled.div<{ offsetX?: string; offsetY?: string }>`
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  background: rgba(var(--text), 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s;
  position: relative;

  &:hover {
    background: rgba(var(--primary), 0.1);
  }

  svg {
    width: 2.4rem;
    height: 2.4rem;
    fill: rgb(var(--text));
    position: relative;
    top: ${(p) => p.offsetY || '0'};
    left: ${(p) => p.offsetX || '0'};
  }
`;

const MobileOnly = styled.div`
  ${media('>=desktop')} {
    display: none;
  }
`;
