import { render, RenderOptions } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import enMessages from '@/messages/en.json'
import React from 'react'

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextIntlClientProvider messages={enMessages} locale="en">
      {children}
    </NextIntlClientProvider>
  )
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }

