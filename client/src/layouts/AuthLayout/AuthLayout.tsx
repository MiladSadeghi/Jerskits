import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css/pagination'
import './AuthLayout.style.scss'
import Card from './AuthLayout.card'
import { IAuthenticationLayoutProps } from '../../shared/types/Auth.types'
import FeatureContent from '../../shared/FeatureContent'

function AuthenticationLayout({ children }: IAuthenticationLayoutProps) {
  const featureContent = FeatureContent({ color: 'white' })
  return (
    <div className='grid h-screen grid-cols-12'>
      <div className='col-span-3'>
        <Swiper
          autoplay={{
            delay: 2500,
            disableOnInteraction: false
          }}
          pagination={{
            clickable: true,
            renderBullet: function (_, className) {
              return `<div class="h-[0.2px] w-[30px] bg-white ${className} rounded-none !-mt-[40px]"></div>`
            }
          }}
          className='h-full'
          modules={[Pagination, Autoplay]}
        >
          <SwiperSlide>
            <Card {...featureContent[0]} />
          </SwiperSlide>
          <SwiperSlide>
            <Card {...featureContent[1]} />
          </SwiperSlide>
          <SwiperSlide>
            <Card {...featureContent[2]} />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className='flex items-center justify-center col-span-9'>
        {children}
      </div>
    </div>
  )
}

export default AuthenticationLayout
