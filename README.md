# CV Website

A modern, multilingual CV website built with Next.js, TypeScript, and Supabase. Features a component-based architecture, mobile-first design, and full internationalization support. The site showcases multiple professional facets (Engineer, Law, Music, Diver, Traveler) with role-based content management.

## 🚀 Tech Stack

### Core Framework
- **Next.js 16.0.4** (App Router)
  - Server-side rendering and static site generation
  - Built-in routing and API capabilities
  - Optimized performance and SEO

- **React 19.2.0**
  - Modern React with latest features
  - Component-based architecture
  - Server and client components

### Language & Type Safety
- **TypeScript 5**
  - Full type safety across the application
  - Enhanced developer experience with IntelliSense
  - Compile-time error detection

### Styling
- **Tailwind CSS v4**
  - Utility-first CSS framework
  - Mobile-first responsive design
  - Customizable design system
  - Custom color palette based on OCC logo (teal/cyan theme)
  - See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for color palette documentation

### Internationalization
- **next-intl 4.5.5**
  - Full i18n support for English and Spanish
  - Locale-based routing (`/` for English, `/es` for Spanish)
  - Dynamic message loading
  - Locale-aware navigation

### Database & Backend
- **Supabase**
  - PostgreSQL database hosted on Supabase
  - Real-time data fetching
  - Row Level Security (RLS) for data access control
  - RESTful API access via Supabase client

### Data Fetching
- **@supabase/supabase-js 2.85.0**
  - Official Supabase JavaScript client
  - Type-safe database queries
  - Automatic connection pooling
  - Server-side and client-side clients

### Analytics & Monitoring
- **@vercel/analytics 1.5.0**
  - Privacy-focused web analytics
  - Zero client-side JavaScript overhead
  - Real-time traffic monitoring
  - GDPR compliant

### Development Tools
- **ESLint 9**
  - Code quality and consistency
  - Next.js recommended rules
  - TypeScript-aware linting

- **PostCSS**
  - CSS processing and transformation
  - Tailwind CSS integration

## ✨ Features

- 🌍 **Multilingual Support** - English and Spanish with easy locale switching
- 📱 **Mobile-First Design** - Responsive layout optimized for all devices
- 🎨 **Modern UI** - Clean, professional design with Tailwind CSS and consistent color palette
- 🎨 **Design System** - Comprehensive color palette documented in [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
- 🗄️ **Database-Driven** - All content managed through Supabase
- 🔒 **Secure** - Row Level Security policies for data access
- ⚡ **Fast** - Optimized performance with Next.js App Router
- 🧩 **Component-Based** - Modular, reusable component architecture
- 🔄 **Type-Safe** - Full TypeScript coverage for reliability
- 🎭 **Role-Based Content** - Multiple professional facets with visibility control
- 🚀 **Production Simulation** - Test production visibility settings locally
- ⚡ **Server-Side Rendering** - React Server Components for optimal performance
- 📊 **Analytics** - Built-in Vercel Analytics for traffic monitoring

## 📋 Prerequisites

- **Node.js** 20.19.0+ (see `.nvmrc`)
- **npm**, **yarn**, **pnpm**, or **bun**
- **Supabase Account** (free tier available)

## 🛠️ Getting Started

### 1. Clone and Install

```bash
# Install dependencies
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** in your Supabase dashboard
3. Run the SQL scripts in order:
   - `db/schema.sql` - Creates all tables and indexes
   - `db/seed-data.sql` - Inserts sample data
   - `db/rls.sql` - Sets up Row Level Security policies

See `db/README.md` for detailed database setup instructions.

### 4. Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

**Simulate Production Mode:**

To test production visibility settings (only public roles visible):

```bash
npm run prod
```

### 5. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
cv-website/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # Locale-based routing
│   │   ├── layout.tsx           # Locale layout with i18n provider
│   │   ├── page.tsx             # Home page (About Me)
│   │   ├── law/                 # Law facet page
│   │   ├── music/               # Music facet page
│   │   ├── diver/               # Diver facet page
│   │   └── traveler/            # Traveler facet page
│   ├── globals.css              # Global styles
│   └── layout.tsx               # Root layout
├── components/                   # React components
│   ├── AboutMe/                 # About Me section component
│   ├── Facet/                   # Reusable facet/role component
│   ├── Navbar/                  # Navigation bar with sub-components
│   │   ├── Navbar.tsx
│   │   ├── NavItem.tsx
│   │   ├── NavLogo.tsx
│   │   ├── DesktopNav.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── MenuButton.tsx
│   │   ├── types.ts
│   │   └── index.ts
│   ├── LanguageSwitcher/        # Language switcher component
│   └── Hero/                    # Experience type definitions
│       └── types.ts
├── hooks/                       # Custom React hooks (legacy, for client-side use)
│   ├── useAboutMe.ts            # About Me data fetching hook
│   └── useFacet.ts              # Facet/role data fetching hook
├── lib/                         # Library code
│   ├── api/                     # API functions
│   │   ├── aboutMe.ts           # About Me API (client-side)
│   │   ├── aboutMe-server.ts    # About Me API (server-side)
│   │   ├── profile.ts           # Profile & social links API (client-side)
│   │   ├── profile-server.ts    # Profile & social links API (server-side)
│   │   ├── role.ts              # Role & experiences API (client-side)
│   │   ├── role-server.ts       # Role & experiences API (server-side)
│   │   └── projects.ts          # Projects API
│   ├── config/                  # Configuration files
│   │   └── roles.ts             # Role visibility configuration
│   ├── supabase/                # Supabase utilities
│   │   ├── client.ts            # Supabase client instance (client-side)
│   │   ├── server.ts            # Supabase server client (server-side)
│   │   ├── storage.ts           # Storage helpers
│   │   └── upload-helpers.ts    # Image/Video URL helpers
│   ├── i18n.ts                  # next-intl configuration
│   └── routing.ts               # Locale routing configuration
├── messages/                     # Translation files
│   ├── en.json                  # English translations
│   └── es.json                  # Spanish translations
├── db/                          # Database scripts
│   ├── schema.sql               # Database schema
│   ├── seed-data.sql            # Sample data
│   ├── rls.sql                  # Security policies
│   └── README.md                # Database setup guide
├── navigation.ts                 # Locale-aware navigation utilities
├── proxy.ts                     # Next.js proxy for locale routing
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies and scripts
```

## 🏗️ Architecture

### Component Structure

Components follow a consistent pattern:
- Each component has its own folder
- `index.ts` exports the main component
- `types.ts` contains component-specific TypeScript types
- Sub-components are nested within parent component folders

Example:
```
components/
└── Navbar/
    ├── Navbar.tsx          # Main component
    ├── NavItem.tsx         # Sub-component
    ├── NavLogo.tsx         # Sub-component
    ├── DesktopNav.tsx      # Sub-component
    ├── MobileMenu.tsx      # Sub-component
    ├── MenuButton.tsx      # Sub-component
    ├── types.ts            # Type definitions
    └── index.ts            # Export file
```

### Data Flow

**Server Components (Primary):**
1. **Pages** are Server Components that fetch data directly
2. **Server API functions** (e.g., `getAboutMeDataServer()`, `getRoleWithExperiencesServer()`) query Supabase database
3. **Data** is fetched on the server before rendering
4. **Components** receive data as props and render with translations
5. **Result**: Faster initial load, smaller client bundle, better SEO

**Client Components (When Needed):**
- Used for interactive components (Navbar, LanguageSwitcher)
- Can use hooks for client-side data fetching if needed
- Components using `useTranslations` remain client-side for i18n support

### Internationalization

- **Routing**: Locale-based routes (`/` for English, `/es` for Spanish)
- **Translations**: JSON files in `messages/` directory
- **Database**: Locale-aware queries filter by `locale` column
- **Navigation**: `next-intl` provides locale-aware `Link` and routing

### Role Visibility Control

The application supports controlling which roles/facets are visible in production:

- **Configuration**: `lib/config/roles.ts` defines role visibility
- **Development**: All roles are visible by default
- **Production**: Only roles with `isPublic: true` are visible
- **Override**: Set `NEXT_PUBLIC_SHOW_ALL_ROLES=true` to show all roles in production

To mark a role as public, update `lib/config/roles.ts`:
```typescript
engineer: {
  slug: 'engineer',
  isPublic: true,  // Visible in production
}
```

## 🗄️ Database Schema

The database consists of the following tables:

- `profiles` - Main profile information (name, photo, description)
- `social_links` - Social media and external links (LinkedIn, GitHub, email, etc.)
- `roles` - Role/facet definitions (engineer, law, music, diver, traveler)
- `experiences` - Work/activity experiences linked to roles
- `projects` - Projects linked to roles

All tables support:
- Multiple locales (English and Spanish)
- Visibility control via `is_public` boolean flag
- Ordering via `order_index` column
- Automatic timestamp tracking (`created_at`, `updated_at`)

## ⚡ Performance Optimizations

### Implemented Optimizations

1. **React Server Components**
   - All pages use Server Components for data fetching
   - Data fetched on server before rendering
   - Reduced client-side JavaScript bundle
   - Faster initial page load and better SEO

2. **Image Optimization**
   - Next.js Image component with automatic optimization
   - Supabase storage domain configured for image optimization
   - Responsive image sizes with `sizes` attribute
   - Priority loading for above-the-fold images

3. **Enhanced Metadata & SEO**
   - Open Graph tags for social sharing
   - Twitter Card metadata
   - Dynamic metadata per page
   - Comprehensive SEO configuration

4. **Next.js Configuration**
   - Compression enabled (`compress: true`)
   - Security headers optimized
   - Remote image patterns configured

5. **Analytics**
   - Vercel Analytics integrated
   - Privacy-focused, zero overhead
   - Real-time traffic monitoring

### Performance Metrics

Target Core Web Vitals:
- **First Contentful Paint (FCP)** - Target: < 1.8s
- **Largest Contentful Paint (LCP)** - Target: < 2.5s
- **Time to Interactive (TTI)** - Target: < 3.8s
- **Cumulative Layout Shift (CLS)** - Target: < 0.1
- **Total Blocking Time (TBT)** - Target: < 200ms

See `PERFORMANCE.md` for detailed performance documentation.

## 🔐 Security

- **Row Level Security (RLS)** enabled on all tables
- **Public read access** for CV data (no authentication required)
- **Environment variables** for sensitive credentials
- **Type-safe queries** prevent SQL injection
- **Security headers** optimized in Next.js config

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy with one click

Vercel automatically detects Next.js and configures build settings.

### Other Platforms

This Next.js app can be deployed to any platform that supports Node.js:
- Netlify
- AWS Amplify
- Railway
- Render

## 📝 Scripts

- `npm run dev` - Start development server (shows all roles)
- `npm run prod` - Simulate production mode (only public roles visible)
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 Configuration Files

- `next.config.ts` - Next.js configuration with next-intl plugin
- `tsconfig.json` - TypeScript compiler options
- `eslint.config.mjs` - ESLint rules
- `postcss.config.mjs` - PostCSS configuration
- `.nvmrc` - Node.js version specification
- `.cursorrules` - Cursor AI editor rules

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app)
- [Supabase Documentation](https://supabase.com/docs)

## 📄 License

This project is private.
