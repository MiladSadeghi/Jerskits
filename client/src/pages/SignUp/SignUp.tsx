import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import tw, { styled, css } from 'twin.macro'
import { ISignUpForm } from './SignUp.types'
import { yupResolver } from '@hookform/resolvers/yup'
import SignUpSchema from './SignUp.schema'
import { SpinnerCircular } from 'spinners-react'
import { toast } from 'react-hot-toast'
import { useSignUpMutation } from '../../services'
import { useEffect } from 'react'
import { ErrorMessage } from '@hookform/error-message'
import { TAuthResponseError } from '../../shared/types/Auth.types'

function SignUp() {
  const navigate = useNavigate()
  window.document.title = 'Jerskits - Sign Up'
  const [signUp, { isLoading, error, isSuccess, data }] = useSignUpMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setFocus
  } = useForm<ISignUpForm>({
    resolver: yupResolver(SignUpSchema)
  })

  const signUpHandler = async (data: ISignUpForm) => {
    await signUp({
      email: data.email,
      fullName: data.fullName,
      password: data.password
    })
  }

  useEffect(() => {
    if (isSuccess && data) {
      toast.success(data.message)
      navigate('/sign-in')
    }
  }, [isSuccess])

  useEffect(() => {
    if (error) {
      console.log(error)
      const SignUpError = error as TAuthResponseError
      if (
        SignUpError.status === 409 &&
        SignUpError.data.field.includes('email')
      ) {
        setError('email', { message: SignUpError.data.message })
        setFocus('email')
      } else if (SignUpError.status !== 409) {
        toast.error('Something bad happened, try again later!', {
          position: 'bottom-center'
        })
      }
    }
  }, [error])

  return (
    <div className='max-w-[400px] w-full'>
      <div className='space-y-5 mb-7'>
        <Link to='/'>
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
          Register Account
        </h2>
        <p className='text-lg text-neutral-dark-grey leading-[150%]'>
          Let’s create your account
        </p>
      </div>

      <div>
        <form className='space-y-7' onSubmit={handleSubmit(signUpHandler)}>
          <div className='space-y-[8px]'>
            <FormLabel htmlFor='email'>Email</FormLabel>
            <FormInput
              type='email'
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
            <FormLabel htmlFor='full-name'>Full Name</FormLabel>
            <FormInput
              type='text'
              id='full-name'
              autoComplete='off'
              {...register('fullName', { required: true })}
            />
            <ErrorMessage
              errors={errors}
              name='fullName'
              render={({ message }) => <FormError>{message}</FormError>}
            />
          </div>
          <div className='space-y-[8px]'>
            <FormLabel htmlFor='password'>Password</FormLabel>
            <FormInput
              type='password'
              id='password'
              autoComplete='new-password'
              {...register('password', { required: true })}
            />
            <ErrorMessage
              errors={errors}
              name='password'
              render={({ message }) => <FormError>{message}</FormError>}
            />
          </div>
          <div className='space-y-[8px]'>
            <FormLabel htmlFor='confirmation-password'>
              Confirmation Password
            </FormLabel>
            <FormInput
              type='password'
              id='confirmation-password'
              autoComplete='new-password'
              {...register('confirmPassword', { required: true })}
            />
            <ErrorMessage
              errors={errors}
              name='confirmPassword'
              render={({ message }) => <FormError>{message}</FormError>}
            />
          </div>
          <div className='flex items-start gap-2'>
            <input
              type='checkbox'
              className={`form-checkbox rounded-full !outline-none focus:!outline-none focus:!border-none text-primary-black w-5 h-5 border-none ring-primary-black ring-1 focus:ring-transparent ring-offset-0 focus:ring-offset-0 ${
                errors.acceptTerms ? ' !ring-red-500 focus:!ring-red-500' : ''
              }`}
              id='acceptTerms'
              data-testid='accept-terms'
              {...register('acceptTerms', { required: true })}
            />
            <FormLabel htmlFor='acceptTerms' className='flex-1'>
              <p
                className={`text-text-xs text-neutral-dark-grey leading-[150%] `}
              >
                By creating your account, you agree to our{' '}
                <span className='text-black'>Terms and Conditions</span> &{' '}
                <span className='text-black'>Privacy Policy</span>
              </p>
            </FormLabel>
          </div>
          <SubmitButton type='submit' disabled={isLoading}>
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
              'CREATE'
            )}
          </SubmitButton>
        </form>

        <p className='text-neutral-dark-grey text-text-sm mt-7'>
          Already have an account?{' '}
          <Link
            to='/sign-in'
            className='text-sm font-medium text-primary-black'
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

const FormLabel = tw.label`text-primary-black font-normal`
const FormInput = styled.input`
  ${tw`w-full h-12 px-5 py-4 border border-neutral-grey `}
  ${css`
    &:focus {
      border-color: #262d33;
      box-shadow: none;
    }
  `}
`
const FormError = tw.p`text-text-sm text-red-500`
const SubmitButton = styled.button`
  ${tw`w-full font-bold text-white h-14 bg-primary-black disabled:opacity-50`}
  ${css`
    &:disabled {
      opacity: 0.7;
    }
  `}
`

export default SignUp
