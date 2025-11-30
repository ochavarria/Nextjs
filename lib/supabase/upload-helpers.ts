import { getPublicUrl } from './storage'

const BUCKETS = {
  images: 'cv-images',
  videos: 'cv-videos',
} as const

export const getImageUrl = (path: string): string => {
  if (!path) return '/profile-photo.jpg'
  
  // If it's already a full URL, return it as-is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  
  // Otherwise, construct the URL from the path
  return getPublicUrl(BUCKETS.images, path)
}

export const getVideoUrl = (path: string): string => {
  return getPublicUrl(BUCKETS.videos, path)
}

