import { createServerClient } from '@/lib/supabase/server'
import { getVisibleRoles } from '@/lib/config/roles'

export interface Experience {
  id: string
  title: string
  company: string
  period: string
  description: string[]
}

export const getExperiences = async (
  roleSlug: string = 'engineer',
  locale: string = 'en'
): Promise<Experience[]> => {
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
      console.error('Error fetching role for experiences:', roleError)
      return []
    }

    const visibleRoles = getVisibleRoles()
    const includePrivate = !visibleRoles.includes(roleSlug)

    let query = supabase
      .from('experiences')
      .select('*')
      .eq('role_id', roleData.id)
      .eq('locale', locale)
      .order('order_index', { ascending: true })

    if (!includePrivate) {
      query = query.eq('is_public', true)
    }

    const { data: experiencesData, error: experiencesError } = await query

    if (experiencesError) {
      console.error('Error fetching experiences:', experiencesError)
      return []
    }

    const experiences: Experience[] = (experiencesData || []).map((exp) => ({
      id: exp.id,
      title: exp.title || '',
      company: exp.company || '',
      period: exp.period || '',
      description: Array.isArray(exp.description) ? exp.description : [],
    }))

    return experiences
  } catch (error) {
    console.error('Error fetching experiences:', error)
    return []
  }
}

