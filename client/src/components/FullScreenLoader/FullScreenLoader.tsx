import { SpinnerDotted } from 'spinners-react'

const FullScreenLoader = () => {
  return (
    <div className='flex items-center justify-center w-full h-screen bg-white'>
      <SpinnerDotted size={70} thickness={100} speed={100} color='#262D33' />
    </div>
  )
}

export default FullScreenLoader
