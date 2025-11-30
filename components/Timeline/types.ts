import { Experience } from '@/lib/api/experiences'

export interface TimelineProps extends React.ComponentProps<'section'> {
  experiences?: Experience[]
}

