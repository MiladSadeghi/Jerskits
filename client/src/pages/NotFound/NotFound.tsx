import { Link } from 'react-router-dom'
import { Button } from '../../components'
import { ArrowRight } from '../../icons'

const NotFound = () => {
  document.title = '404'
  return (
    <div className='container py-20 mx-auto'>
      <div className='flex flex-col items-center justify-center h-full text-center'>
        <img src='/images/404.png' width={470} height={317} />
        <h1 className='mb-10 text-6xl font-bold leading-snug text-primary-black'>
          This page could not be found!
        </h1>
        <p className='mb-10 text-xl font-medium text-primary-black'>
          We are sorry. But the page you are looking for is not available.
        </p>
        <Link to='/'>
          <Button className='px-10 rounded-lg'>
            Back to home <ArrowRight className='ml-5' />
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
