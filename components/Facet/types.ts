import { Experience } from '@/components/Hero/types'

export interface FacetProps extends React.ComponentProps<'section'> {
  roleName: string
  description?: string
  experiences: Experience[]
}

