import { Link, useNavigate } from 'react-router-dom'
import { ISignInForm } from './SignIn.types'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import SignInSchema from './SignIn.schema'
import { toast } from 'react-hot-toast'
import { SpinnerCircular } from 'spinners-react'
import { useSignInMutation } from '../../services'
import { useEffect } from 'react'
import { useAppDispatch } from '../../App/hooks'
import { setAuthStatus } from '../../App/feature/auth/authSlice'
import { setProfile } from '../../App/feature/profile/profileSlice'
import { Button, FormError, FormInput, FormLabel } from '../../components'
import { ErrorMessage } from '@hookform/error-message'

function SignIn() {
  const navigate = useNavigate()
  window.document.title = 'Jerskits - Sign In'
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ISignInForm>({
    resolver: yupResolver(SignInSchema)
  })
  const dispatch = useAppDispatch()

  const [signIn, { isLoading, isSuccess, data, isError, error }] =
    useSignInMutation()

  useEffect(() => {
    if (isSuccess && data) {
      toast.success(data.message, { position: 'bottom-center' })
      dispatch(setAuthStatus(true))
      dispatch(setProfile(data.profile))
      navigate('/')
    }
  }, [isSuccess])

  useEffect(() => {
    if (error && data) {
      toast.error(data?.message, { position: 'bottom-center' })
    }
  }, [isError])

  const signInHandler = async (data: ISignInForm) => {
    await signIn({
      email: data.email,
      password: data.password
    })
  }

  return (
    <div className='max-w-[400px] w-full'>
      <div className='space-y-5 mb-7'>
        <Link to='/' aria-label='go back to landing page'>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M11 6.5L5.5 12M5.5 12L11 17.5M5.5 12H20'
              stroke='#262D33'
              strokeWidth='1.2'
            />
          </svg>
        </Link>
        <h2 className='text-3xl font-bold text-text-3xl leading-[150%]'>
          Welcome to Jerskits
        </h2>
        <p className='text-lg text-neutral-dark-grey leading-[150%]'>
          Login to your account
        </p>
      </div>

      <div>
        <form className='space-y-7' onSubmit={handleSubmit(signInHandler)}>
          <div className='space-y-[8px]'>
            <FormLabel htmlFor='email'>Email</FormLabel>
            <FormInput
              type='text'
              id='email'
              autoComplete='off'
              {...register('email', { required: true })}
            />
            <ErrorMessage
              errors={errors}
              name='email'
              render={({ message }) => <FormError>{message}</FormError>}
            />
          </div>
          <div className='space-y-[8px]'>
            <FormLabel htmlFor='password'>Password</FormLabel>
            <FormInput
              type='password'
              id='password'
              autoComplete='password'
              {...register('password', { required: true })}
            />
            <ErrorMessage
              errors={errors}
              name='password'
              render={({ message }) => <FormError>{message}</FormError>}
            />
          </div>
          <Button type='submit' disabled={isLoading}>
            {isLoading ? (
              <SpinnerCircular
                size={45}
                thickness={117}
                speed={132}
                color='rgba(255, 255, 255, 1)'
                secondaryColor='rgba(38, 45, 51, 1)'
                className='m-auto'
              />
            ) : (
              'LOGIN'
            )}
          </Button>
        </form>

        <p className='text-neutral-dark-grey text-text-sm mt-7'>
          Don’t have an account?{' '}
          <Link
            to='/sign-up'
            className='text-sm font-medium text-primary-black'
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignIn
