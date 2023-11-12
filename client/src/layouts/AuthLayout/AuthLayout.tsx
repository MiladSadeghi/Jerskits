import { IAuthenticationLayoutProps } from '../../shared/types/Auth.types'
import AuthLayoutSlider from './AuthLayoutSlider'

function AuthenticationLayout({ children }: IAuthenticationLayoutProps) {
  return (
    <div className='grid h-screen grid-cols-1 xl:grid-cols-12'>
      <div className='order-2 col-span-3 mt-12 xl:mt-0 xl:order-1'>
        <AuthLayoutSlider />
      </div>
      <div className='flex items-center justify-center order-1 col-span-9 mt-24 xl:mt-0 xl:order-2'>
        {children}
      </div>
    </div>
  )
}

export default AuthenticationLayout
