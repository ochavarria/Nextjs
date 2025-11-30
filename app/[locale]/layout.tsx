import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Analytics } from '@vercel/analytics/react'
import Navbar from '@/components/Navbar'
import { routing } from '@/lib/routing'
import '../globals.css'

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as any)) notFound()

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
