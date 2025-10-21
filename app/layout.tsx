import type { ReactNode } from "react"
import "./globals.css"

export const metadata = {
  metadataBase: new URL("https://florstroy.ru"),
  title: {
    default: "FlorStroy - Устройство бетонных полов в Москве и области | Промышленные полы",
    template: "%s | FlorStroy",
  },
  description:
    "Профессиональное устройство бетонных и промышленных полов в Москве и Московской области. Топпинговые полы, полимерные покрытия, шлифовка бетона. Гарантия качества. ☎ Звоните!",
  keywords: [
    "бетонные полы",
    "промышленные полы",
    "устройство полов",
    "топпинговые полы",
    "полимерные полы",
    "шлифовка бетона",
    "бетонные полы москва",
    "промышленные полы московская область",
    "устройство бетонных полов",
    "наливные полы",
    "эпоксидные полы",
    "полиуретановые полы",
    "бетонные полы цена",
    "промышленные полы под ключ",
    "упрочнение бетонных полов",
  ],
  authors: [{ name: "FlorStroy" }],
  creator: "FlorStroy",
  publisher: "FlorStroy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://florstroy.ru",
    siteName: "FlorStroy",
    title: "FlorStroy - Устройство бетонных полов в Москве и области",
    description:
      "Профессиональное устройство бетонных и промышленных полов. Топпинговые полы, полимерные покрытия, шлифовка бетона.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FlorStroy - Устройство бетонных полов",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FlorStroy - Устройство бетонных полов",
    description: "Профессиональное устройство бетонных и промышленных полов в Москве",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "97cdc553abf28d28",
  },
  alternates: {
    canonical: "https://florstroy.ru",
    languages: {
      "ru-RU": "https://florstroy.ru",
    },
  },
  category: "construction",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://florstroy.ru/#organization",
        name: "FlorStroy",
        url: "https://florstroy.ru",
        logo: {
          "@type": "ImageObject",
          url: "https://florstroy.ru/logo.png",
          width: 250,
          height: 60,
        },
        description: "Профессиональное устройство бетонных и промышленных полов",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Москва",
          addressRegion: "Московская область",
          addressCountry: "RU",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 55.751244,
          longitude: 37.618423,
        },
        areaServed: [
          {
            "@type": "City",
            name: "Москва",
          },
          {
            "@type": "State",
            name: "Московская область",
          },
          {
            "@type": "State",
            name: "Ленинградская область",
          },
          {
            "@type": "State",
            name: "Псковская область",
          },
          {
            "@type": "State",
            name: "Смоленская область",
          },
        ],
        sameAs: ["https://vk.com/florstroy", "https://t.me/florstroy"],
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://florstroy.ru/#localbusiness",
        name: "FlorStroy",
        image: "https://florstroy.ru/og-image.jpg",
        priceRange: "$$",
        telephone: "+7 (XXX) XXX-XX-XX",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Москва",
          addressCountry: "RU",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://florstroy.ru/#website",
        url: "https://florstroy.ru",
        name: "FlorStroy",
        description: "Устройство бетонных и промышленных полов",
        publisher: {
          "@id": "https://florstroy.ru/#organization",
        },
        inLanguage: "ru-RU",
      },
      {
        "@type": "Service",
        "@id": "https://florstroy.ru/#service",
        serviceType: "Устройство бетонных полов",
        provider: {
          "@id": "https://florstroy.ru/#organization",
        },
        areaServed: {
          "@type": "Country",
          name: "Россия",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Услуги по устройству полов",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Топпинговые полы",
                description: "Устройство топпинговых бетонных полов",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Полимерные полы",
                description: "Устройство полимерных покрытий",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Шлифовка бетона",
                description: "Профессиональная шлифовка бетонных полов",
              },
            },
          ],
        },
      },
    ],
  }

  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="geo.region" content="RU-MOW" />
        <meta name="geo.placename" content="Москва" />
        <meta name="geo.position" content="55.751244;37.618423" />
        <meta name="ICBM" content="55.751244, 37.618423" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
