import { createServerClient } from '@/lib/supabase/server'
import { getImageUrl } from '@/lib/supabase/upload-helpers'

export interface Profile {
  name: string
  photo: string
  description: string | null
}

export interface SocialLink {
  platform: string
  url: string
}

export const getProfile = async (locale: string = 'en'): Promise<Profile> => {
  try {
    console.log('🔍 [getProfile] Starting fetch for locale:', locale)
    
    const supabase = createServerClient()
    console.log('✅ [getProfile] Supabase client created')
    
    // First, check what's actually in the database
    const { data: allProfiles, error: allError } = await supabase
      .from('profiles')
      .select('locale, name')
    
    console.log('📋 [getProfile] All profiles query:', {
      count: allProfiles?.length || 0,
      profiles: allProfiles,
      error: allError ? {
        code: allError.code,
        message: allError.message,
        details: allError.details,
        hint: allError.hint,
      } : null,
    })
    
    if (allError) {
      console.error('❌ [getProfile] Error fetching all profiles:', allError)
      if (allError.code === '42501') {
        console.error('❌ [getProfile] PERMISSION DENIED - RLS is blocking access!')
        console.error('❌ [getProfile] Run db/rls.sql in Supabase SQL Editor to fix this')
      }
    }
    
    // Now try the specific query
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('locale', locale)
      .single()

    console.log('📊 [getProfile] Query result for locale "' + locale + '":', {
      hasData: !!data,
      hasError: !!error,
      errorCode: error?.code,
      errorMessage: error?.message,
      errorDetails: error?.details,
      errorHint: error?.hint,
      dataPreview: data ? { name: data.name, locale: data.locale } : null,
    })

    if (error) {
      if (error.code === 'PGRST116') {
        console.warn('⚠️ [getProfile] No profile found (PGRST116) - table is empty or no matching locale')
        return {
          name: '',
          photo: '/profile-photo.jpg',
          description: null,
        }
      }
      
      if (error.code === '42P01') {
        console.error('❌ [getProfile] Table does not exist - run db/schema.sql first!')
      }
      
      if (error.code === '42501') {
        console.error('❌ [getProfile] Permission denied - check RLS policies (run db/rls.sql)')
      }
      
      console.error('❌ [getProfile] Error:', error)
      throw error
    }

    if (!data) {
      console.warn('⚠️ [getProfile] No data returned')
      return {
        name: '',
        photo: '/profile-photo.jpg',
        description: null,
      }
    }

    console.log('✅ [getProfile] Profile data received:', {
      name: data.name,
      hasPhoto: !!data.photo,
      hasDescription: !!data.description,
    })

    let photoUrl = '/profile-photo.jpg'
    if (data?.photo) {
      photoUrl = getImageUrl(data.photo)
      console.log('🖼️ [getProfile] Photo URL:', photoUrl)
    }

    const result = {
      name: data?.name || '',
      photo: photoUrl,
      description: data?.description || null,
    }
    
    console.log('✅ [getProfile] Returning:', result)
    return result
  } catch (error) {
    console.error('❌ [getProfile] Exception caught:', error)
    return {
      name: '',
      photo: '/profile-photo.jpg',
      description: null,
    }
  }
}

export const getSocialLinks = async (locale: string = 'en'): Promise<SocialLink[]> => {
  try {
    const supabase = createServerClient()
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('locale', locale)
      .single()

    if (profileError || !profile) {
      return []
    }

    const { data, error } = await supabase
      .from('social_links')
      .select('*')
      .eq('profile_id', profile.id)
      .order('order_index', { ascending: true })

    if (error) {
      return []
    }

    return (data || []).map((link) => ({
      platform: link.platform || '',
      url: link.url || '',
    }))
  } catch {
    return []
  }
}

