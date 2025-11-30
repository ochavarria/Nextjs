'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/navigation'
import NavLogo from './NavLogo'
import DesktopNav from './DesktopNav'
import MenuButton from './MenuButton'
import MobileMenu from './MobileMenu'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { NavItemData } from './types'
import { getVisibleRoles } from '@/lib/config/roles'

type ComponentProps = React.ComponentProps<'nav'>

const Navbar = ({ ...rest }: ComponentProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations('nav')
  const locale = useLocale()

  const visibleRoles = getVisibleRoles()

  const allNavItems: NavItemData[] = [
    { name: t('home'), href: '/', slug: 'engineer' },
    { name: t('law'), href: '/law', slug: 'law' },
    { name: t('music'), href: '/music', slug: 'music' },
    { name: t('diver'), href: '/diver', slug: 'diver' },
    { name: t('traveler'), href: '/traveler', slug: 'traveler' },
  ]

  const navItems = allNavItems.filter((item) => {
    if (item.slug === 'engineer') return true
    return item.slug && visibleRoles.includes(item.slug)
  })

  const handleMenuToggle = () => setIsOpen(!isOpen)
  const handleMenuClose = () => setIsOpen(false)

  return (
    <nav
      {...rest}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <NavLogo />
          <div className="hidden md:flex items-center gap-4">
            <DesktopNav items={navItems} />
            <LanguageSwitcher currentLocale={locale} />
          </div>
          <div className="md:hidden">
            <MenuButton isOpen={isOpen} onClick={handleMenuToggle} />
          </div>
        </div>
      </div>
      <MobileMenu items={navItems} isOpen={isOpen} onItemClick={handleMenuClose} />
    </nav>
  )
}

export default Navbar
