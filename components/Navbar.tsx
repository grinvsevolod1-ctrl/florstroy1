import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { ScrollPositionEffectProps, useScrollPosition } from 'hooks/useScrollPosition';
import { NavItems } from 'types';
import { media } from 'utils/media';
import Container from './Container';
import { HamburgerIcon } from './HamburgerIcon';
import Logo from './Logo';
import CartIcon from './CartIcon';
import NavigationDrawer from './NavigationDrawer';
import OriginalDrawer from './Drawer';
import { useMediaQuery } from 'react-responsive';

const ColorSwitcher = dynamic(() => import('../components/ColorSwitcher'), { ssr: false });

type NavbarProps = { items: NavItems };
type ScrollingDirections = 'up' | 'down' | 'none';
type NavbarContainerProps = { hidden: boolean; transparent: boolean };

export default function Navbar({ items }: NavbarProps) {
  const router = useRouter();
  const { toggle, open } = OriginalDrawer.useDrawer();
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

  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggle(); // ✅ открывает корзину
  };

  const handleMenuClick = () => {
    open(); // ✅ открывает бургер-меню
  };

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
              item.submenu ? (
                <DropdownWrapper key={item.title}>
                  <DropdownToggle>{item.title}</DropdownToggle>
                  <DropdownMenu>
                    {item.submenu.map((sub) => (
                      <li key={sub.href}>
                        <NextLink href={sub.href!} passHref>
                          <a>{sub.title}</a>
                        </NextLink>
                      </li>
                    ))}
                  </DropdownMenu>
                </DropdownWrapper>
              ) : (
                <NavItemWrapper key={item.href}>
                  <NextLink href={item.href!} passHref>
                    <a>{item.title}</a>
                  </NextLink>
                </NavItemWrapper>
              )
            )}
          </NavItemList>
          <RightSide>
            <DesktopOnly>
              <ContactInfo>
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
              </ContactInfo>
            </DesktopOnly>
            <IconGroup>
              <IconCircle>
                <ColorSwitcher />
              </IconCircle>
              <IconCircle offsetX="-2px" offsetY="-2px" onClick={handleCartClick}>
                <CartIcon />
              </IconCircle>
              <MobileOnly>
                <IconCircle offsetY="2px" onClick={handleMenuClick}>
                  <HamburgerIcon aria-label="Toggle menu" />
                </IconCircle>
              </MobileOnly>
            </IconGroup>
          </RightSide>
        </Content>
      </NavbarContainer>
      <NavigationDrawer items={items} /> {/* ✅ подключено локально */}
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
  height: 8rem;
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

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const NavItemList = styled.ul`
  display: flex;
  list-style: none;
  align-items: center;
  margin-left: -1rem;

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

const DropdownWrapper = styled.li`
  position: relative;
  font-size: 1.3rem;
  text-transform: uppercase;
  line-height: 2;
  margin-right: 2rem;

  &:hover ul {
    display: block;
  }
`;

const DropdownToggle = styled.span`
  display: flex;
  color: rgb(var(--text), 0.75);
  letter-spacing: 0.025em;
  padding: 0.75rem 1.5rem;
  font-weight: 700;
  cursor: pointer;
`;

const DropdownMenu = styled.ul`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background: rgb(var(--background));
  list-style: none;
  padding: 0.5rem 0;
  box-shadow: 0.5rem 1rem;

    a {
      text-decoration: none;
      color: rgb(var(--text));
      font-weight: 500;

      &:hover {
        background: rgba(var(--primary), 0.1);
      }
    }
  }
`;

const LogoWrapper = styled.a`
  display: flex;
  margin-right: auto;
  text-decoration: none;
  color: rgb(var(--logoColor));
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

const DesktopOnly = styled.div`
  ${media('<desktop')} {
    display: none;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  font-size: 1.3rem;
  color: rgb(var(--text));
  text-align: left;
  min-width: 240px;
`;

const ContactLine = styled.a`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  transition: background 0.2s ease;
  padding: 0.4rem 0.6rem;
  border-radius: 0.4rem;

  &:hover {
    background: rgba(var(--primary), 0.05);
  }
`;

const ContactIcon = styled.svg`
  width: 1.8rem;
  height: 1.8rem;
  fill: rgb(var(--primary));
  flex-shrink: 0;
`;

const ContactLabel = styled.span`
  font-weight: 600;
  color: rgb(var(--text), 0.6);
  min-width: 90px;
`;

const ContactValue = styled.span`
  font-weight: 500;
  color: rgb(var(--primary));
  white-space: nowrap;
`;
