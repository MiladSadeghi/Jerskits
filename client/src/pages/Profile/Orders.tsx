import { useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { cn } from '../../utils/utils'
import { useGetOrdersQuery } from '../../services'
import { SpinnerDiamond } from 'spinners-react'

function Orders() {
  const { data, isLoading } = useGetOrdersQuery()
  const navigate = useNavigate()
  const location = window.location

  useEffect(() => {
    if (
      !location.pathname.includes('history') &&
      location.pathname.includes('orders')
    )
      navigate('ongoing')
  }, [])

  if (isLoading || !data) {
    return (
      <SpinnerDiamond
        size={50}
        thickness={100}
        speed={100}
        color='#262D33'
        secondaryColor='#00000033'
        className='mx-auto'
      />
    )
  }

  return (
    <div className='space-y-7 md:px-5'>
      <h1 className='font-bold leading-[48px] text-primary-black text-text-2xl '>
        My Orders
      </h1>
      <div className='flex items-center gap-x-7'>
        <NavLink
          to={'ongoing'}
          className={({ isActive }) =>
            cn(
              'font-bold text-lg leading-[27px] text-neutral-dark-grey relative pb-5',
              {
                'text-primary-black after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary-black':
                  isActive
              }
            )
          }
        >
          Ongoing
        </NavLink>
        <NavLink
          to={'history'}
          className={({ isActive }) =>
            cn(
              'font-bold text-lg leading-[27px] text-neutral-dark-grey relative pb-5',
              {
                'text-primary-black after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary-black':
                  isActive
              }
            )
          }
        >
          History
        </NavLink>
      </div>
      <Outlet context={data?.orders} />
    </div>
  )
}

export default Orders
