import { TProfileLink } from '../../utils/profile-links'
import { ArrowDown } from '../../icons'
import { Link } from 'react-router-dom'

type Props = TProfileLink & { key?: number }

function ProfileLink({ link, title }: Props): JSX.Element {
  return (
    <Link
      className='flex justify-between ease-in-out duration-100 aria-[current=page]:p-5 aria-[current=page]:bg-neutral-light-grey'
      to={link}
    >
      <h2 className='font-bold text-lg leading-[150%] text-primary-black'>
        {title}
      </h2>
      <ArrowDown className='-rotate-90 opacity-30' width={22} height={22} />
    </Link>
  )
}

export default ProfileLink
