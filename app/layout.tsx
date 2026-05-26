import type { Metadata, Viewport } from 'next'
import { Barlow_Condensed, DM_Sans, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

const barlowCondensed = Barlow_Condensed({ 
  subsets: ["latin"], 
  weight: ["800", "900"],
  variable: "--font-barlow-condensed",
  display: 'swap',
})

const dmSans = DM_Sans({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"], 
  weight: ["700"],
  variable: "--font-jetbrains-mono",
  display: 'swap',
})

export const metadata: Metadata = {
    title: 'WealthForger | Free Wealth Education',
  description: 'Free wealth education for everyone. No lectures. No subscriptions. Learn how money actually works.',
  openGraph: {
  title: 'WealthForger | Free Wealth Education',
    description: 'Free wealth education for everyone. No lectures. No subscriptions. Learn how money actually works.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${dmSans.variable} ${jetbrainsMono.variable} bg-[#0A0A0A]`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
