'use client'

import { useTranslations } from 'next-intl'
import { TimelineProps } from './types'

const Timeline = ({ experiences = [], ...rest }: TimelineProps) => {
  const t = useTranslations('home')

  if (!experiences || experiences.length === 0) {
    return (
      <section 
        className="w-full min-h-screen py-16 sm:py-24 relative overflow-hidden" 
        style={{
          background: 'radial-gradient(ellipse at top, var(--color-tech-blue-900) 0%, var(--color-tech-cyan-900) 40%, var(--color-tech-blue-900) 100%)'
        }}
        {...rest}
      >
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                {t('experience')}
              </h2>
              <p className="text-lg text-tech-cyan-100 max-w-2xl mx-auto">
                {t('comingSoon')}
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section 
      className="w-full min-h-screen py-16 sm:py-24 relative overflow-hidden" 
      style={{
        background: 'radial-gradient(ellipse at top, var(--color-tech-blue-900) 0%, var(--color-tech-cyan-900) 40%, var(--color-tech-blue-900) 100%)'
      }}
      {...rest}
    >
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              {t('experience')}
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 w-0.5 h-full bg-tech-cyan-500/30"></div>
              
              {experiences.map((experience, index) => (
                <div
                  key={experience.id}
                  className={`relative mb-8 sm:mb-12 ${
                    index % 2 === 0 ? 'sm:pr-1/2 sm:pr-8' : 'sm:ml-1/2 sm:pl-8'
                  }`}
                >
                  <div className="flex items-start">
                    {/* Timeline dot */}
                    <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 w-4 h-4 bg-tech-cyan-500 rounded-full border-4 border-tech-blue-900 shadow-lg z-10"></div>
                    
                    {/* Experience card */}
                    <div className="ml-12 sm:ml-0 bg-white/10 backdrop-blur-sm rounded-lg p-6 sm:p-8 shadow-lg border border-tech-cyan-500/20 w-full hover:bg-white/15 transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                            {experience.title}
                          </h3>
                          <p className="text-tech-cyan-300 font-semibold text-sm sm:text-base">
                            {experience.company}
                          </p>
                        </div>
                        <p className="text-tech-cyan-200 text-sm sm:text-base mt-2 sm:mt-0 sm:ml-4 whitespace-nowrap">
                          {experience.period}
                        </p>
                      </div>
                      
                      {experience.description && experience.description.length > 0 && (
                        <ul className="space-y-2 mt-4">
                          {experience.description.map((item, idx) => (
                            <li key={idx} className="text-tech-cyan-100 text-sm sm:text-base flex items-start">
                              <span className="text-tech-cyan-400 mr-2 mt-1.5">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Timeline
