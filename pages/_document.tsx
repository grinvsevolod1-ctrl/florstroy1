import Document, { type DocumentContext, Head, Html, Main, NextScript } from "next/document"
import { ServerStyleSheet } from "styled-components"

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props) => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="ru">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

          <meta name="yandex-verification" content="986f667f9ff97b14" />
          <meta name="yandex-verification" content="021aaf25ce264d6e" />

          <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" />

          {/* Preconnect to external domains for performance */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

          {/* Fonts with display=swap for better performance */}
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />

          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />

          {/* Theme color for mobile browsers */}
          <meta name="theme-color" content="#0066cc" />
          <meta name="msapplication-TileColor" content="#0066cc" />

          <meta name="geo.region" content="RU-MOW" />
          <meta name="geo.placename" content="Москва" />
          <meta name="geo.position" content="55.751244;37.618423" />
          <meta name="ICBM" content="55.751244, 37.618423" />

          <meta name="format-detection" content="telephone=yes" />
          <meta name="HandheldFriendly" content="true" />
          <meta name="MobileOptimized" content="width" />
        </Head>
        <body className="next-light-theme">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
