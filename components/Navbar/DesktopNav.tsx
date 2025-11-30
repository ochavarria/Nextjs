import NavItem from './NavItem'
import { DesktopNavProps } from './types'

const DesktopNav = ({ items, ...rest }: DesktopNavProps) => {
  return (
    <div className="hidden md:block" {...rest}>
      <div className="ml-10 flex items-baseline space-x-4">
        {items.map((item) => (
          <NavItem
            key={item.name}
            name={item.name}
            href={item.href}
            variant="desktop"
          />
        ))}
      </div>
    </div>
  )
}

export default DesktopNav
