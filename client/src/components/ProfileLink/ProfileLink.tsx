import tw from 'twin.macro'
import { TProfileLink } from '../../utils/profile-links'
import { NavLink } from 'react-router-dom'
import { ArrowDown } from '../../icons'

type Props = TProfileLink & { key?: number }

function ProfileLink({ link, title }: Props): JSX.Element {
  return (
    <Link to={link}>
      <h2 className='font-bold text-lg leading-[150%] text-primary-black'>
        {title}
      </h2>
      <ArrowDown className='-rotate-90 opacity-30' width={22} height={22} />
    </Link>
  )
}

const Link = tw(NavLink)`
  flex justify-between ease-in-out duration-100 aria-[current=page]:(p-5 bg-neutral-light-grey)
`

export default ProfileLink
