'use client'

import { useRouter, usePathname } from '@/navigation'
import { LanguageSwitcherProps } from './types'

const LanguageSwitcher = ({ currentLocale, ...rest }: LanguageSwitcherProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (locale: string) => {
    router.replace(pathname, { locale })
  }

  return (
    <div className="flex items-center gap-2" {...rest}>
      <button
        onClick={() => switchLocale('en')}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          currentLocale === 'en'
            ? 'bg-gray-900 text-white'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => switchLocale('es')}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          currentLocale === 'es'
            ? 'bg-gray-900 text-white'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        ES
      </button>
    </div>
  )
}

export default LanguageSwitcher
