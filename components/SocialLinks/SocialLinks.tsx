'use client'

import { SocialLinksProps, SocialIconConfig } from './types'
import {
  GitHubIcon,
  LinkedInIcon,
  EmailIcon,
  TwitterIcon,
  InstagramIcon,
  MediumIcon,
  DiscordIcon,
  StackOverflowIcon,
  SteamIcon,
  WebsiteIcon,
} from './icons'

const getSocialIcon = (platform: string, size: number): SocialIconConfig => {
  const platformLower = platform.toLowerCase()
  const iconSize = size * 0.6
  
  const icons: Record<string, SocialIconConfig> = {
    github: { icon: <GitHubIcon size={iconSize} />, label: 'GitHub' },
    linkedin: { icon: <LinkedInIcon size={iconSize} />, label: 'LinkedIn' },
    email: { icon: <EmailIcon size={iconSize} />, label: 'Email' },
    twitter: { icon: <TwitterIcon size={iconSize} />, label: 'Twitter' },
    instagram: { icon: <InstagramIcon size={iconSize} />, label: 'Instagram' },
    medium: { icon: <MediumIcon size={iconSize} />, label: 'Medium' },
    discord: { icon: <DiscordIcon size={iconSize} />, label: 'Discord' },
    stackoverflow: { icon: <StackOverflowIcon size={iconSize} />, label: 'Stack Overflow' },
    steam: { icon: <SteamIcon size={iconSize} />, label: 'Steam' },
    website: { icon: <WebsiteIcon size={iconSize} />, label: 'Website' },
  }
  
  return icons[platformLower] || { icon: <WebsiteIcon size={iconSize} />, label: platform }
}

const SocialLinks = ({ socialLinks, variant = 'default', ...rest }: SocialLinksProps) => {
  if (!socialLinks || socialLinks.length === 0) {
    return null
  }

  const size = variant === 'compact' ? 40 : 48
  const sizeClasses = variant === 'compact' 
    ? 'w-8 h-8 sm:w-10 sm:h-10' 
    : 'w-10 h-10 sm:w-12 sm:h-12'
  
  const gapClasses = variant === 'compact' 
    ? 'gap-3 sm:gap-4' 
    : 'gap-4 sm:gap-6'

  return (
    <div className={`flex flex-wrap justify-center ${gapClasses}`} {...rest}>
      {socialLinks.map((link, index) => {
        const iconConfig = getSocialIcon(link.platform, size)
        return (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${sizeClasses} flex items-center justify-center rounded-full bg-tech-blue-800/80 hover:bg-tech-cyan-500 border-2 border-tech-blue-700 hover:border-tech-cyan-400 text-white hover:text-tech-blue-900 transition-all duration-200 hover:scale-110 shadow-lg hover:shadow-tech-cyan-500/50`}
            aria-label={iconConfig.label}
            title={iconConfig.label}
          >
            {iconConfig.icon}
          </a>
        )
      })}
    </div>
  )
}

export default SocialLinks

