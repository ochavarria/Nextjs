import { createServerClient } from '@/lib/supabase/server'
import { Experience } from '@/components/Hero/types'
import { getVisibleRoles } from '@/lib/config/roles'

export interface Role {
  id: string
  slug: string
  name: string
  description: string | null
  isPublic: boolean
}

export interface RoleWithExperiences extends Role {
  experiences: Experience[]
}

export const getRole = async (slug: string, locale: string = 'en'): Promise<Role | null> => {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('roles')
      .select('*')
      .eq('slug', slug)
      .eq('locale', locale)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }

    return {
      id: data.id,
      slug: data.slug || '',
      name: data.name || '',
      description: data.description,
      isPublic: data.is_public || false,
    }
  } catch (error) {
    console.error('Error fetching role:', error)
    throw error
  }
}

export const getRoleWithExperiences = async (
  slug: string,
  locale: string = 'en'
): Promise<RoleWithExperiences | null> => {
  try {
    const supabase = createServerClient()
    const role = await getRole(slug, locale)
    if (!role) return null

    const visibleRoles = getVisibleRoles()
    const includePrivate = !visibleRoles.includes(slug)

    let query = supabase
      .from('experiences')
      .select('*')
      .eq('role_id', role.id)
      .eq('locale', locale)
      .order('order_index', { ascending: true })

    if (!includePrivate) {
      query = query.eq('is_public', true)
    }

    const { data: experiencesData, error: experiencesError } = await query

    if (experiencesError) throw experiencesError

    const experiences: Experience[] = (experiencesData || []).map((exp) => ({
      title: exp.title || '',
      company: exp.company || '',
      period: exp.period || '',
      description: exp.description || [],
    }))

    return {
      ...role,
      experiences,
    }
  } catch (error) {
    console.error('Error fetching role with experiences:', error)
    throw error
  }
}
