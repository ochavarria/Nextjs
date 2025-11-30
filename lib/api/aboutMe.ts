import { getProfile, getSocialLinks, SocialLink } from './profile'

export interface AboutMeData {
  name: string
  photo: string
  bio: string
  socialLinks: SocialLink[]
}

export const getAboutMeData = async (locale: string = 'en'): Promise<AboutMeData> => {
  console.log('🚀 [getAboutMeData] Fetching data for locale:', locale)
  
  const [profile, socialLinks] = await Promise.all([
    getProfile(locale),
    getSocialLinks(locale),
  ])

  console.log('📦 [getAboutMeData] Results:', {
    profile: {
      name: profile.name,
      hasPhoto: !!profile.photo,
      hasBio: !!profile.description,
    },
    socialLinksCount: socialLinks.length,
  })

  return {
    name: profile.name,
    photo: profile.photo,
    bio: profile.description || '',
    socialLinks,
  }
}
