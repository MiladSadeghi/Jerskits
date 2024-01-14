import { Link } from 'react-router-dom'
import { Button } from '../../components'
import { ArrowRight } from '../../icons'

const NotFound = () => {
  document.title = '404'
  return (
    <div className='container mx-auto py-20'>
      <div className='flex flex-col items-center justify-center h-full text-center'>
        <img src='/images/404.png' width={470} height={317} />
        <h1 className='text-6xl font-bold text-primary-black mb-10 leading-snug'>
          This page could not be found!
        </h1>
        <p className='text-primary-black text-xl mb-10 font-medium'>
          We are sorry. But the page you are looking for is not available.
        </p>
        <Link to='/'>
          <Button className='rounded-lg px-10'>
            Back to home <ArrowRight className='ml-5' />
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
