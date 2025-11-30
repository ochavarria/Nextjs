const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
}

export const getPublicUrl = (bucket: string, path: string): string => {
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`
}

