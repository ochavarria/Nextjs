import { SocialLink } from '@/lib/api/profile'

export interface AboutMeProps extends React.ComponentProps<'section'> {
  name?: string
  photo: string
  bio?: string
  socialLinks?: SocialLink[]
}

