-- Database Schema
-- This file creates all tables, indexes, triggers, and RLS policies
-- Run this first to set up the database structure

-- Drop existing tables (in reverse dependency order)
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS experiences CASCADE;
DROP TABLE IF EXISTS social_links CASCADE;
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Drop functions and triggers
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Profiles Table
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  locale VARCHAR(10) NOT NULL,
  name VARCHAR(255),
  photo VARCHAR(500),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(locale)
);

-- Social Links Table
CREATE TABLE social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  platform VARCHAR(100),
  url VARCHAR(500),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Roles Table
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(100) NOT NULL,
  locale VARCHAR(10) NOT NULL,
  name VARCHAR(255),
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(slug, locale)
);

-- Experiences Table
CREATE TABLE experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  locale VARCHAR(10) NOT NULL,
  title VARCHAR(255),
  company VARCHAR(255),
  period VARCHAR(100),
  description JSONB DEFAULT '[]'::jsonb,
  is_public BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects Table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  locale VARCHAR(10) NOT NULL,
  title VARCHAR(255),
  company VARCHAR(255),
  description TEXT,
  contribution TEXT,
  image VARCHAR(500),
  photo VARCHAR(500),
  url VARCHAR(500),
  github_url VARCHAR(500),
  technologies TEXT[] DEFAULT '{}',
  period VARCHAR(100),
  is_public BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_profiles_locale ON profiles(locale);
CREATE INDEX IF NOT EXISTS idx_social_links_profile_id ON social_links(profile_id);
CREATE INDEX IF NOT EXISTS idx_social_links_order ON social_links(profile_id, order_index);
CREATE INDEX IF NOT EXISTS idx_roles_slug ON roles(slug);
CREATE INDEX IF NOT EXISTS idx_roles_locale ON roles(locale);
CREATE INDEX IF NOT EXISTS idx_roles_order ON roles(order_index);
CREATE INDEX IF NOT EXISTS idx_experiences_role_id ON experiences(role_id);
CREATE INDEX IF NOT EXISTS idx_experiences_locale ON experiences(locale);
CREATE INDEX IF NOT EXISTS idx_experiences_order ON experiences(role_id, order_index);
CREATE INDEX IF NOT EXISTS idx_projects_role_id ON projects(role_id);
CREATE INDEX IF NOT EXISTS idx_projects_locale ON projects(locale);
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(role_id, order_index);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_social_links_updated_at BEFORE UPDATE ON social_links
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_roles_updated_at BEFORE UPDATE ON roles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_experiences_updated_at BEFORE UPDATE ON experiences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access on profiles" ON profiles;
DROP POLICY IF EXISTS "Allow public read access on social_links" ON social_links;
DROP POLICY IF EXISTS "Allow public read access on roles" ON roles;
DROP POLICY IF EXISTS "Allow public read access on experiences" ON experiences;
DROP POLICY IF EXISTS "Allow public read access on projects" ON projects;

-- Profiles: Allow public read access
CREATE POLICY "Allow public read access on profiles"
  ON profiles
  FOR SELECT
  TO public
  USING (true);

-- Social Links: Allow public read access
CREATE POLICY "Allow public read access on social_links"
  ON social_links
  FOR SELECT
  TO public
  USING (true);

-- Roles: Allow public read access
CREATE POLICY "Allow public read access on roles"
  ON roles
  FOR SELECT
  TO public
  USING (true);

-- Experiences: Allow public read access
CREATE POLICY "Allow public read access on experiences"
  ON experiences
  FOR SELECT
  TO public
  USING (true);

-- Projects: Allow public read access
CREATE POLICY "Allow public read access on projects"
  ON projects
  FOR SELECT
  TO public
  USING (true);
