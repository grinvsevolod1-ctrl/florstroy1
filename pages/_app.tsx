import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import { AppProps } from 'next/dist/shared/lib/router/router';
import Head from 'next/head';
import { ColorModeScript } from 'nextjs-color-mode';
import React, { PropsWithChildren } from 'react';

import Footer from 'components/Footer';
import { GlobalStyle } from 'components/GlobalStyles';
import Navbar from 'components/Navbar';
import NavigationDrawer from 'components/NavigationDrawer';
import ApplicationModal from 'components/ApplicationModal';
import CalculatorModal from 'components/CalculatorModal';
import WaveCta from 'components/WaveCta';

import { NewsletterModalContextProvider, useNewsletterModalContext } from 'contexts/newsletter-modal.context';
import { CalculatorModalProvider, useCalculatorModalContext } from 'contexts/calculator-modal.context';

import { NavItems } from 'types';

const navItems: NavItems = [
  { title: 'Проекты', href: '/features' },
  { title: 'Услуги', href: '/pricing' },
  { title: 'Контакты', href: '/contact' },
];

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <ColorModeScript />
      <GlobalStyle />

      <Providers>
        <Modals />
        <Navbar items={navItems} />
        <Component {...pageProps} />
        <WaveCta />
        <Footer />
      </Providers>
    </>
  );
}

function Providers<T>({ children }: PropsWithChildren<T>) {
  return (
    <NewsletterModalContextProvider>
      <CalculatorModalProvider>
        <NavigationDrawer items={navItems}>{children}</NavigationDrawer>
      </CalculatorModalProvider>
    </NewsletterModalContextProvider>
  );
}

function Modals() {
  const { isModalOpened, setIsModalOpened } = useNewsletterModalContext();
  const { isCalculatorOpened, setIsCalculatorOpened } = useCalculatorModalContext();

  return (
    <>
      {isModalOpened && <ApplicationModal onClose={() => setIsModalOpened(false)} />}
      {isCalculatorOpened && <CalculatorModal onClose={() => setIsCalculatorOpened(false)} />}
    </>
  );
}

export default MyApp;
