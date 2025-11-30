import Facet from '@/components/Facet'
import { getRoleWithExperiences } from '@/lib/api/role'
import { getLocale } from 'next-intl/server'

export default async function Traveler() {
  const locale = await getLocale()
  
  try {
    const data = await getRoleWithExperiences('traveler', locale)

    if (!data) {
      return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center pt-16">
          <div className="text-red-600">Role not found</div>
        </main>
      )
    }

    return (
      <main className="min-h-screen bg-gray-50">
        <Facet
          roleName={data.name}
          description={data.description || undefined}
          experiences={data.experiences}
        />
      </main>
    )
  } catch (error) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center pt-16">
        <div className="text-red-600">Error loading data</div>
      </main>
    )
  }
}

