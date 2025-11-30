'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { ProjectsProps } from './types'
import { Project } from '@/lib/api/projects'
import { getImageUrl } from '@/lib/supabase/upload-helpers'

const Projects = ({ projects = [], ...rest }: ProjectsProps) => {
  const t = useTranslations('projects')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const firstFocusableRef = useRef<HTMLElement | null>(null)
  const lastFocusableRef = useRef<HTMLElement | null>(null)

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      // Save current scroll position
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }
  }, [selectedProject])

  // Focus trap
  useEffect(() => {
    if (!selectedProject) return

    const modal = modalRef.current
    if (!modal) return

    // Get all focusable elements
    const focusableElements = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    
    if (focusableElements.length === 0) return

    firstFocusableRef.current = focusableElements[0]
    lastFocusableRef.current = focusableElements[focusableElements.length - 1]

    // Focus first element
    firstFocusableRef.current?.focus()

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusableRef.current) {
          e.preventDefault()
          lastFocusableRef.current?.focus()
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusableRef.current) {
          e.preventDefault()
          firstFocusableRef.current?.focus()
        }
      }
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null)
      }
    }

    document.addEventListener('keydown', handleTabKey)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleTabKey)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [selectedProject])
  if (!projects || projects.length === 0) {
    return (
      <section 
        className="w-full min-h-screen bg-white py-16 sm:py-24" 
        {...rest}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-tech-blue-900 mb-4">
              {t('title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('comingSoon')}
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section 
      className="w-full min-h-screen bg-white py-16 sm:py-24" 
      {...rest}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-tech-blue-900 mb-4">
            {t('title')}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project) => {
            const imageUrl = project.photo ? getImageUrl(project.photo) : null
            
            return (
              <div
                key={project.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {imageUrl && (
                  <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-6 sm:p-8">
                  {project.company && (
                    <p className="text-sm font-semibold text-tech-blue-700 mb-1">
                      {project.company}
                    </p>
                  )}
                  <h3 className="text-xl font-bold text-tech-blue-900 mb-2">
                    {project.title}
                  </h3>
                  {project.description && (
                    <p className="text-gray-700 text-sm line-clamp-3 mb-4">
                      {project.description}
                    </p>
                  )}
                  <button className="text-tech-blue-600 hover:text-tech-blue-800 font-medium text-sm transition-colors">
                    {t('viewDetails')} →
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div
              ref={modalRef}
              className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 bg-gray-200">
                {selectedProject.photo && (
                  <Image
                    src={getImageUrl(selectedProject.photo)}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                  />
                )}
                <button
                  ref={closeButtonRef}
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                  aria-label={t('closeModal')}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-6 sm:p-8 overflow-y-auto max-h-[calc(90vh-16rem)]">
                {selectedProject.company && (
                  <p className="text-sm font-semibold text-tech-blue-700 mb-2">
                    {selectedProject.company}
                  </p>
                )}
                <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold text-tech-blue-900 mb-4">
                  {selectedProject.title}
                </h2>
                
                {selectedProject.description && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('description')}</h3>
                    <p className="text-gray-700 whitespace-pre-line">
                      {selectedProject.description}
                    </p>
                  </div>
                )}

                {selectedProject.contribution && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('contribution')}</h3>
                    <p className="text-gray-700 whitespace-pre-line">
                      {selectedProject.contribution}
                    </p>
                  </div>
                )}

                {selectedProject.url && (
                  <div className="flex gap-4">
                    <a
                      href={selectedProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-tech-blue-600 text-white rounded-lg hover:bg-tech-blue-700 font-medium transition-colors"
                    >
                      {t('visitProject')}
                      <svg
                        className="ml-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                      >
                        {t('viewCode')}
                        <svg
                          className="ml-2 w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects
