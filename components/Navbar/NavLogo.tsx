'use client'

import { Link } from '@/navigation'
import Image from 'next/image'
import { NavLogoProps } from './types'

const NavLogo = ({ ...rest }: NavLogoProps) => {
  return (
    <div className="flex-shrink-0">
      <Link href="/" className="flex items-center" {...rest}>
        <Image
          src="/assets/occ-logo.svg"
          alt="Oscar Chavarria"
          width={120}
          height={40}
          priority
          className="h-8 w-auto"
        />
      </Link>
    </div>
  )
}

export default NavLogo
