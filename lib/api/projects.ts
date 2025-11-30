import { createServerClient } from '@/lib/supabase/server'
import { getVisibleRoles } from '@/lib/config/roles'

export interface Project {
  id: string
  title: string
  company: string
  description: string
  contribution: string | null
  photo: string | null
  url: string | null
  githubUrl: string | null
  technologies: string[] | null
  period: string | null
}

export const getProjects = async (
  roleSlug: string = 'engineer',
  locale: string = 'en'
): Promise<Project[]> => {
  try {
    const supabase = createServerClient()
    
    // First get the role
    const { data: roleData, error: roleError } = await supabase
      .from('roles')
      .select('id')
      .eq('slug', roleSlug)
      .eq('locale', locale)
      .single()

    if (roleError || !roleData) {
      console.error('Error fetching role for projects:', roleError)
      return []
    }

    const visibleRoles = getVisibleRoles()
    const includePrivate = !visibleRoles.includes(roleSlug)

    let query = supabase
      .from('projects')
      .select('*')
      .eq('role_id', roleData.id)
      .eq('locale', locale)
      .order('order_index', { ascending: true })

    if (!includePrivate) {
      query = query.eq('is_public', true)
    }

    const { data: projectsData, error: projectsError } = await query

    if (projectsError) {
      console.error('Error fetching projects:', projectsError)
      return []
    }

    const projects: Project[] = (projectsData || []).map((project) => ({
      id: project.id,
      title: project.title || '',
      company: project.company || '',
      description: project.description || '',
      contribution: project.contribution || null,
      photo: project.photo || null,
      url: project.url || null,
      githubUrl: project.github_url || null,
      technologies: project.technologies || null,
      period: project.period || null,
    }))

    return projects
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

