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
import Drawer from './Drawer';
import { HamburgerIcon } from './HamburgerIcon';
import Logo from './Logo';
import CartIcon from './CartIcon';

const ColorSwitcher = dynamic(() => import('../components/ColorSwitcher'), { ssr: false });

type NavbarProps = { items: NavItems };
type ScrollingDirections = 'up' | 'down' | 'none';
type NavbarContainerProps = { hidden: boolean; transparent: boolean };

export default function Navbar({ items }: NavbarProps) {
  const router = useRouter();
  const { toggle } = Drawer.useDrawer();
  const { setIsModalOpened } = useNewsletterModalContext();
  const [scrollingDirection, setScrollingDirection] = useState<ScrollingDirections>('none');

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
        <ButtonGroup>
          <ContactButton onClick={() => setIsModalOpened(true)}>Оставить заявку</ContactButton>
        </ButtonGroup>
        <IconGroup>
          <IconWrapper>
            <ColorSwitcher />
          </IconWrapper>
          <IconWrapper>
            <CartIcon />
          </IconWrapper>
          <IconWrapper onClick={toggle}>
            <HamburgerIcon aria-label="Toggle menu" />
          </IconWrapper>
        </IconGroup>
      </Content>
    </NavbarContainer>
  );
}

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
  justify-content: flex-end;
  align-items: center;
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
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  z-index: 10;

  li {
    padding: 0.5rem 1.5rem;

    a {
      text-decoration: none;
      color: rgb(var(--text));
      font-weight: 500;
    }

    &:hover {
      background: rgba(var(--primary), 0.1);
    }
  }
`;

const LogoWrapper = styled.a`
  display: flex;
  margin-right: auto;
  text-decoration: none;
  color: rgb(var(--logoColor));
`;

const ButtonGroup = styled.div`
  margin-left: 2rem;
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
`;

const IconWrapper = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
    fill: rgb(var(--text));
  }
`;