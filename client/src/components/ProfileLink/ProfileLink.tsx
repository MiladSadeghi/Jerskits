import tw from 'twin.macro'
import { TProfileLink } from '../../utils/profile-links'
import { NavLink } from 'react-router-dom'

type Props = TProfileLink & { key?: number }

function ProfileLink({ link, title }: Props): JSX.Element {
  return (
    <Link to={link}>
      <h2 className='font-bold text-lg leading-[150%] text-primary-black'>
        {title}
      </h2>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='25'
        viewBox='0 0 24 25'
        fill='none'
      >
        <path
          d='M8.90997 20.4201L15.43 13.9001C16.2 13.1301 16.2 11.8701 15.43 11.1001L8.90997 4.58008'
          stroke='#B9B9B9'
          strokeWidth='1.5'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </Link>
  )
}

const Link = tw(NavLink)`
  flex justify-between ease-in-out duration-100 aria-[current=page]:(p-5 bg-neutral-light-grey)
`

export default ProfileLink
