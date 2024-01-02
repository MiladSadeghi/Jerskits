import { TProfileLink } from '../../utils/profile-links'
import { ArrowDown } from '../../icons'
import { NavLink } from 'react-router-dom'
import { cn } from '../../utils/utils'

type Props = TProfileLink & { key?: number }

function ProfileLink({ link, title }: Props): JSX.Element {
  return (
    <NavLink
      className={
        'flex justify-between ease-in-out duration-100 aria-[current=page]:p-5 aria-[current=page]:bg-neutral-light-grey'
      }
      to={link}
    >
      {({ isActive }) => (
        <>
          <h2
            className={cn(
              'font-bold text-lg leading-[150%] text-primary-black',
              { 'bg-neutral-light-grey px-5': isActive }
            )}
          >
            {title}
          </h2>
          <ArrowDown className='-rotate-90 opacity-30' width={22} height={22} />
        </>
      )}
    </NavLink>
  )
}

export default ProfileLink
