'use client'

import Image from 'next/image'
import { AboutMeProps } from './types'
import InteractiveBackground from './InteractiveBackground'
import SocialLinks from '@/components/SocialLinks'

const AboutMe = ({ name, photo, bio, socialLinks, ...rest }: AboutMeProps) => {
  const hasSocialLinks = socialLinks && socialLinks.length > 0

  return (
    <section 
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-tech-blue-900" 
      style={{
        background: 'linear-gradient(135deg, var(--color-tech-blue-900) 0%, var(--color-tech-blue-800) 50%, var(--color-tech-blue-900) 100%)'
      }}
      {...rest}
    >
      <InteractiveBackground />
      
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
        {photo && (
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mb-8">
            <div className="relative w-full h-full rounded-full bg-tech-blue-800 border-4 border-tech-blue-700 overflow-hidden shadow-2xl ring-4 ring-tech-cyan-500/30">
              <Image
                src={photo}
                alt={name || 'Profile'}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 256px"
              />
            </div>
          </div>
        )}

        {name && (
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            {name}
          </h1>
        )}

        {bio && (
          <p className="text-lg sm:text-xl md:text-2xl text-tech-cyan-100 mb-12 max-w-2xl">
            {bio}
          </p>
        )}

        {hasSocialLinks && (
          <SocialLinks socialLinks={socialLinks} />
        )}
      </div>
    </section>
  )
}

export default AboutMe

