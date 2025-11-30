'use client'

import { Link } from '@/navigation'
import { NavItemProps } from './types'

const NavItem = ({ name, href, onClick, variant = 'desktop', ...rest }: NavItemProps) => {
  const baseStyles = 'transition-colors'
  const variantStyles = {
    desktop: 'text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium',
    mobile: 'text-gray-700 hover:text-gray-900 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium',
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]}`}
      {...rest}
    >
      {name}
    </Link>
  )
}

export default NavItem
