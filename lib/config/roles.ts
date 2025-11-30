export const roleConfig = {
  engineer: {
    slug: 'engineer',
    isPublic: true,
  },
  law: {
    slug: 'law',
    isPublic: false,
  },
  music: {
    slug: 'music',
    isPublic: false,
  },
  diver: {
    slug: 'diver',
    isPublic: false,
  },
  traveler: {
    slug: 'traveler',
    isPublic: false,
  },
} as const

export const getVisibleRoles = (): string[] => {
  const isProduction = process.env.NODE_ENV === 'production'
  const simulateProduction = process.env.NEXT_PUBLIC_SIMULATE_PRODUCTION === 'true'
  const showAllRoles = process.env.NEXT_PUBLIC_SHOW_ALL_ROLES === 'true'
  
  if (showAllRoles) {
    return Object.values(roleConfig).map((role) => role.slug)
  }
  
  const shouldFilter = isProduction || simulateProduction
  
  if (!shouldFilter) {
    return Object.values(roleConfig).map((role) => role.slug)
  }
  
  return Object.values(roleConfig)
    .filter((role) => role.isPublic)
    .map((role) => role.slug)
}

