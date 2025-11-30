# Database Setup Guide

This folder contains SQL scripts to set up your Supabase database for the CV website.

## Setup Order

Run these files in order in the Supabase SQL Editor:

1. **schema.sql** - Drops existing tables (if any) and creates all tables, indexes, triggers, and RLS policies
2. **seed-data.sql** - Inserts initial data (profiles, social links, and roles for English and Spanish)

## Database Structure

### Tables

1. **profiles** - Basic profile information (name, photo, description) - all fields allow NULL
2. **social_links** - Social media and external links (LinkedIn, GitHub, website, etc.)
3. **roles** - Role/facet definitions (engineer, law, music, diver, traveler)
4. **experiences** - Experiences linked to specific roles
5. **projects** - Projects linked to specific roles

### Relationships

- `social_links.profile_id` → `profiles.id`
- `experiences.role_id` → `roles.id`
- `projects.role_id` → `roles.id`

## How to Run

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy and paste the contents of each file in order
5. Click **Run** (or press Cmd/Ctrl + Enter)

## Row Level Security (RLS)

The `schema.sql` file sets up RLS:
- **Public read access** - Anyone can read all CV data (no authentication required)
- **No write access** - Only authenticated users can modify data (if you add those policies later)

This is perfect for a public CV website where anyone should be able to view your information.

## Updating Data

After running the seed data, you can update the content directly in Supabase:
- Go to **Table Editor**
- Select the table you want to edit
- Update the data as needed

## Notes

- All tables support multiple locales (English and Spanish)
- The `photo` field in profiles stores the path to the file in Supabase Storage (e.g., `profile/photo.jpg`)
- Use the storage helpers to convert paths to full URLs when fetching data

