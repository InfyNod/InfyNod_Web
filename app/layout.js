import './globals.css'
import { Sora, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import { Providers } from './providers'
import WhatsAppButton from '@/components/site/WhatsAppButton'

const sora = Sora({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-heading', display: 'swap' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-body', display: 'swap' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono', display: 'swap' })

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Infynod Tech Private Limited — IT Services & Product Company, Pune',
    template: '%s — Infynod Tech',
  },
  description:
    'Infynod Tech Private Limited is a Pune-based IT services and product company. We build custom software, web platforms, mobile apps, UI/UX, cloud infrastructure and AI automation for growing businesses.',
  keywords: ['IT services Pune', 'custom software development', 'web development company', 'mobile app development', 'Infynod'],
  openGraph: {
    type: 'website',
    siteName: 'Infynod Tech Private Limited',
    title: 'Infynod Tech — IT Services & Product Company, Pune',
    description: 'We design, build and scale digital products — custom software, web, mobile, cloud and AI.',
    url: BASE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Infynod Tech — IT Services & Product Company, Pune',
    description: 'We design, build and scale digital products — custom software, web, mobile, cloud and AI.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sora.variable} ${jakarta.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{__html:"document.documentElement.classList.add('js')"}} />
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
      </head>
      <body>
        <Providers>{children}</Providers>
        <WhatsAppButton />
      </body>
    </html>
  )
}
