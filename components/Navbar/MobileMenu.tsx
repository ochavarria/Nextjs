'use client'

import NavItem from './NavItem'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useLocale } from 'next-intl'
import { MobileMenuProps } from './types'

const MobileMenu = ({ items, isOpen, onItemClick, ...rest }: MobileMenuProps) => {
  const locale = useLocale()

  if (!isOpen) return null

  return (
    <div className="md:hidden" {...rest}>
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
        {items.map((item) => (
          <NavItem
            key={item.name}
            name={item.name}
            href={item.href}
            onClick={onItemClick}
            variant="mobile"
          />
        ))}
        <div className="pt-3 border-t border-gray-200 mt-2">
          <LanguageSwitcher currentLocale={locale} />
        </div>
      </div>
    </div>
  )
}

export default MobileMenu
