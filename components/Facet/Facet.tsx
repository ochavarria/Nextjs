'use client'

import { useTranslations } from 'next-intl'
import { FacetProps } from './types'
import { Experience } from '@/components/Hero/types'

const Facet = ({ roleName, description, experiences, ...rest }: FacetProps) => {
  const t = useTranslations('facet')

  return (
    <section className="pt-16 min-h-screen" {...rest}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-center md:text-left">
            {roleName}
          </h1>
          {description && (
            <p className="text-xl text-gray-700 max-w-3xl leading-relaxed">
              {description}
            </p>
          )}
        </div>

        <div className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
            {t('experiences')}
          </h2>
          <div className="space-y-6">
            {experiences.length > 0 ? (
              experiences.map((exp, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {exp.title}
                    </h3>
                    <span className="text-sm text-gray-500 mt-1 sm:mt-0">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-lg text-gray-700 mb-3">{exp.company}</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="text-sm sm:text-base">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">
                {t('noExperiences')}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Facet

