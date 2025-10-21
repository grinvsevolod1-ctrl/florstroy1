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
      </head>
      <body>{children}</body>
    </html>
  )
}
