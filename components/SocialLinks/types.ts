import { SocialLink } from '@/lib/api/profile'
import { ReactNode } from 'react'

export interface SocialLinksProps extends React.ComponentProps<'div'> {
  socialLinks: SocialLink[]
  variant?: 'default' | 'compact'
}

export interface SocialIconConfig {
  icon: ReactNode
  label: string
}

