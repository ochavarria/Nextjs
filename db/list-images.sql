-- Query to get all image URLs from Supabase Storage
-- Run this in Supabase SQL Editor

-- Option 1: Get all images from cv-images bucket (root level only)
SELECT 
  name as filename,
  bucket_id as bucket,
  name as path,
  'https://dyjpxetgowxitpjykxsu.supabase.co/storage/v1/object/public/' || bucket_id || '/' || name as url,
  created_at,
  updated_at,
  metadata
FROM storage.objects
WHERE bucket_id = 'cv-images'
  AND name NOT LIKE '%/%'
ORDER BY created_at DESC;

-- Option 2: Get all images including subfolders
-- SELECT 
--   name as filename,
--   bucket_id as bucket,
--   name as path,
--   'https://dyjpxetgowxitpjykxsu.supabase.co/storage/v1/object/public/' || bucket_id || '/' || name as url,
--   created_at,
--   updated_at
-- FROM storage.objects
-- WHERE bucket_id = 'cv-images'
-- ORDER BY created_at DESC;

-- Option 3: Get images from a specific folder (e.g., 'profile/')
-- SELECT 
--   name as filename,
--   bucket_id as bucket,
--   name as path,
--   'https://dyjpxetgowxitpjykxsu.supabase.co/storage/v1/object/public/' || bucket_id || '/' || name as url,
--   created_at
-- FROM storage.objects
-- WHERE bucket_id = 'cv-images'
--   AND name LIKE 'profile/%'
-- ORDER BY created_at DESC;

-- Option 4: Get only image files (filter by extension)
-- SELECT 
--   name as filename,
--   bucket_id as bucket,
--   name as path,
--   'https://dyjpxetgowxitpjykxsu.supabase.co/storage/v1/object/public/' || bucket_id || '/' || name as url,
--   created_at
-- FROM storage.objects
-- WHERE bucket_id = 'cv-images'
--   AND (name LIKE '%.jpg' OR name LIKE '%.jpeg' OR name LIKE '%.png' OR name LIKE '%.gif' OR name LIKE '%.webp' OR name LIKE '%.svg')
-- ORDER BY created_at DESC;

