import { Project } from '@/lib/api/projects'

export interface ProjectsProps extends React.ComponentProps<'section'> {
  projects?: Project[]
}
