import { getAboutMeData } from '@/lib/api/aboutMe'
import { getProjects } from '@/lib/api/projects'
import { getExperiences } from '@/lib/api/experiences'
import AboutMe from '@/components/AboutMe'
import Projects from '@/components/Projects'
import Timeline from '@/components/Timeline'
import { getLocale } from 'next-intl/server'

export default async function Home() {
  const locale = await getLocale()
  
  try {
    const [aboutMeData, projects, experiences] = await Promise.all([
      getAboutMeData(locale),
      getProjects('engineer', locale),
      getExperiences('engineer', locale),
    ])

    return (
      <main className="min-h-screen">
        <AboutMe
          name={aboutMeData.name}
          photo={aboutMeData.photo}
          bio={aboutMeData.bio}
          socialLinks={aboutMeData.socialLinks}
        />
        <Projects projects={projects} />
        <Timeline experiences={experiences} />
      </main>
    )
  } catch (error) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600">Error loading data</div>
      </main>
    )
  }
}
