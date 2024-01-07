import { ChangeEvent, ReactNode } from 'react'
import { BillingIcon } from '../../icons'
import { cn, isValidationError } from '../../utils/utils'
import { useForm } from 'react-hook-form'
import PaymentSchema, { TPaymentForm } from './CheckoutPayment.schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, FormError, FormInput, FormLabel } from '..'
import { ErrorMessage } from '@hookform/error-message'
import {
  ECheckoutSteps,
  TValidateCheckoutError,
  TValidatingError
} from '../../shared/types/Order.types'
import { SpinnerCircular } from 'spinners-react'
import { useValidateCheckoutPaymentMutation } from '../../services'
import { QueryStatus } from '@reduxjs/toolkit/query'
import { useAppSelector } from '../../App/hooks'

type Props = {
  onSubmit: (payment: TPaymentForm) => void
  children: ReactNode
  activeStep: ECheckoutSteps
  handleActiveStep: setState<ECheckoutSteps>
  placeOrderStatus: QueryStatus
}

const paymentMethod = [
  {
    title: 'Credit or Debit Card',
    icon: <BillingIcon strokeColor='#262D33' />,
    selected: true
  },
  {
    title: 'Credit or Debit Card',
    svg: '/images/paypal-icon.svg',
    selected: false
  }
]

const formatCreditCardNumber = (input: string): string => {
  const formatted =
    input
      .toString()
      .replace(/\s+/g, '')
      .match(/.{1,4}/g)
      ?.join('-') || ''
  return formatted
}

const CheckoutPayment = ({
  onSubmit,
  children,
  activeStep,
  handleActiveStep,
  placeOrderStatus
}: Props) => {
  const userPayment = useAppSelector((state) => state.user.payment)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError
  } = useForm<TPaymentForm>({
    resolver: yupResolver(PaymentSchema),
    defaultValues: {
      nameOnCard: userPayment?.nameOnCard,
      cvv: userPayment?.cvv,
      cardNumber: userPayment?.cardNumber,
      expirationDate: userPayment?.expirationDate
    }
  })

  const [validatePayment, { isLoading: isValidatingPayment }] =
    useValidateCheckoutPaymentMutation()

  const handleExpiryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth() + 1
    let { value } = event.target
    const expireDateRegex = /^(0[1-9]|1[0-2])\/(20[2-9][0-9])$/
    value = value.replace(/\D/g, '')
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2)
      event.target.value = value
    }

    if (
      'inputType' in event.nativeEvent &&
      (event.nativeEvent.inputType === 'deleteContentBackward' ||
        event.nativeEvent.inputType === 'deleteContentForward')
    ) {
      if (value.endsWith('/')) {
        value = value.slice(0, -1)
        event.target.value = value
      }
    }

    const match = value.match(expireDateRegex)
    let isValidDate = true
    if (match) {
      const year = parseInt(match[2], 10)
      const month = parseInt(match[1], 10)
      if (year < currentYear && year === currentYear && month < currentMonth) {
        isValidDate = false
      }
    }
    if (isValidDate && value.length !== 8) {
      setValue('expirationDate', value)
    }
  }

  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const unformattedValue = e.target.value.replace(/-/g, '')
    const formattedValue = formatCreditCardNumber(unformattedValue)
    setValue('cardNumber', unformattedValue)
    e.target.value = formattedValue
  }

  const handleValidatePayment = async (e: TPaymentForm) => {
    try {
      await validatePayment(e).unwrap()
      onSubmit(e)
    } catch (error) {
      if (isValidationError(error)) {
        const { errors } = error.data as TValidatingError<
          TValidateCheckoutError<TPaymentForm>
        >['data']
        Object.keys(errors).map((error) => {
          const errorKey = error as keyof TPaymentForm
          setError(errorKey, { message: errors[errorKey] })
        })
      }
    }
  }

  return (
    <div className='space-y-7'>
      <div className='space-y-7'>
        <h1 className='font-bold leading-[48px] text-text-2xl text-primary-black'>
          Choose Payment
        </h1>
        {paymentMethod.map((method, idx) => (
          <button
            key={idx}
            disabled={!method.selected}
            className={cn(
              'px-5 py-8 border border-neutral-soft-grey flex items-center justify-between w-full relative disabled:opacity-50',
              { 'border-primary-black': method.selected }
            )}
          >
            <div className='flex items-center'>
              {method.icon ? (
                method.icon
              ) : (
                <img src={method?.svg} width={24} height={24} />
              )}
              <p className='ml-2.5 text-primary-black text-sm leading-5 font-semibold'>
                {method.title}
              </p>
            </div>
            {method.selected && (
              <input
                type='checkbox'
                defaultChecked={true}
                aria-checked={true}
                className={
                  'rounded-full !outline-none focus:!outline-none focus:!border-none text-primary-black w-5 h-5 border-none ring-1 ring-primary-black focus:ring-1 focus:ring-primary-black focus:ring-offset-0'
                }
              />
            )}
          </button>
        ))}
      </div>
      <form
        className='space-y-7'
        onSubmit={handleSubmit(handleValidatePayment)}
      >
        <h1 className='font-bold leading-[48px] text-text-2xl text-primary-black'>
          Payment Detail
        </h1>
        <div className='space-y-2.5'>
          <div className='flex justify-between'>
            <FormLabel htmlFor='card-name-input'>Name On Card</FormLabel>
            <ErrorMessage
              errors={errors}
              name='nameOnCard'
              render={({ message }) => <FormError>{message}</FormError>}
            />
          </div>
          <FormInput
            id='card-name-input'
            type='text'
            {...register('nameOnCard')}
          />
        </div>
        <div className='space-y-2.5'>
          <div className='flex justify-between'>
            <FormLabel htmlFor='card-number-input'>Card Number</FormLabel>
            <ErrorMessage
              errors={errors}
              name='cardNumber'
              render={({ message }) => <FormError>{message}</FormError>}
            />
          </div>
          <FormInput
            id='card-number-input'
            type='text'
            maxLength={19}
            onChange={handleCardNumberChange}
            defaultValue={formatCreditCardNumber(userPayment?.cardNumber ?? '')}
          />
        </div>
        <div className='grid grid-cols-2 gap-2.5'>
          <div className='space-y-2.5'>
            <FormLabel htmlFor='expire-date-input'>Expire Date</FormLabel>
            <div className='space-y-1'>
              <FormInput
                id='expire-date-input'
                type='text'
                placeholder='MM/YYYY'
                maxLength={7}
                defaultValue={userPayment?.expirationDate}
                onChange={handleExpiryChange}
              />
              <ErrorMessage
                errors={errors}
                name='expirationDate'
                render={({ message }) => <FormError>{message}</FormError>}
              />
            </div>
          </div>
          <div className='space-y-2.5'>
            <FormLabel htmlFor='cvv-input'>CVV</FormLabel>
            <div className='space-y-1'>
              <FormInput
                id='cvv-input'
                type='text'
                maxLength={4}
                {...register('cvv')}
              />
              <ErrorMessage
                errors={errors}
                name='cvv'
                render={({ message }) => <FormError>{message}</FormError>}
              />
            </div>
          </div>
        </div>
        <div className='flex items-center'>
          <input
            id='default-payment-checkbox'
            type='checkbox'
            {...register('saveAsDefault', { setValueAs: (value) => !!value })}
            className={cn(
              'rounded-full !outline-none focus:!outline-none focus:!border-none text-primary-black w-5 h-5 border-none ring-1 ring-primary-black focus:ring-1 focus:ring-primary-black focus:ring-offset-0'
            )}
          />
          <label
            htmlFor='default-payment-checkbox'
            className='text-text-sm text-primary-black leading-[18px] ml-3'
          >
            Save as default card
          </label>
        </div>
        <div className='w-full h-px bg-neutral-soft-grey' />
        {children}
        <div className='flex items-center gap-5'>
          <Button
            className='bg-white border text-primary-black border-neutral-soft-grey'
            onClick={() => handleActiveStep(activeStep - 1)}
          >
            BACK
          </Button>
          <Button
            type='submit'
            onClick={() => handleActiveStep(activeStep)}
            disabled={isValidatingPayment || placeOrderStatus === 'pending'}
          >
            <div
              className={cn(
                'overflow-hidden transition-all duration-300 ease-in-out w-0 max-w-0',
                {
                  'mr-2 w-fit max-w-fit':
                    isValidatingPayment || placeOrderStatus === 'pending'
                }
              )}
            >
              <SpinnerCircular
                size={25}
                thickness={260}
                speed={100}
                color='#fff'
                secondaryColor='#676c70'
              />
            </div>
            {isValidatingPayment
              ? 'Validating...'
              : placeOrderStatus === 'pending'
              ? 'Placing Order'
              : 'Place Order'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CheckoutPayment
