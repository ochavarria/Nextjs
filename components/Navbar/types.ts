export interface NavItemData {
  name: string
  href: string
  slug?: string
}

export interface NavItemProps {
  name: string
  href: string
  onClick?: () => void
  variant?: 'desktop' | 'mobile'
}

import { Link } from '@/navigation'

export interface NavLogoProps extends Omit<React.ComponentProps<typeof Link>, 'href'> {}

export interface MenuButtonProps extends React.ComponentProps<'button'> {
  isOpen: boolean
  onClick: () => void
}

export interface DesktopNavProps {
  items: NavItemData[]
}

export interface MobileMenuProps {
  items: NavItemData[]
  isOpen: boolean
  onItemClick: () => void
}

