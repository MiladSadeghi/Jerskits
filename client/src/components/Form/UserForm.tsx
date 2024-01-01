import { useForm } from 'react-hook-form'
import ProfileSchema, { TProfileSchema } from '../../pages/Profile/Edit/Schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, FormError, FormInput, FormLabel } from '..'
import { ErrorMessage } from '@hookform/error-message'
import { SpinnerCircular } from 'spinners-react'
import { cn, isValidationError } from '../../utils/utils'

import LocationDropdown from '../Dropdown/LocationDropdown'
import { TGetProfileResponse } from '../../shared/types/Profile.types'
import { useCallback, useEffect } from 'react'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import {
  TValidateCheckoutError,
  TValidatingError
} from '../../shared/types/Order.types'
import { SerializedError } from '@reduxjs/toolkit'

type Props = {
  handleSubmitForm: (e: TProfileSchema) => void
  isLoading: boolean
  buttonText: string
  formFieldsValue?: TGetProfileResponse
  checkoutError?: FetchBaseQueryError | SerializedError
}

const UserForm = ({
  handleSubmitForm,
  isLoading,
  buttonText,
  formFieldsValue,
  checkoutError
}: Props) => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    setValue,
    getValues,
    watch,
    setError
  } = useForm<TProfileSchema>({
    resolver: yupResolver(ProfileSchema),
    defaultValues: {
      ...formFieldsValue,
      ...{
        country: formFieldsValue?.country?.value,
        state: formFieldsValue?.state?.value,
        city: formFieldsValue?.city?.value
      }
    }
  })

  useEffect(() => {
    if (getValues('country') !== formFieldsValue?.country?.value) {
      setValue('state', '', { shouldValidate: true })
      setValue('city', '', { shouldValidate: true })
    }
  }, [watch('country')])

  useEffect(() => {
    if (getValues('state') !== formFieldsValue?.state?.value) {
      setValue('city', '', { shouldValidate: true })
    }
  }, [watch('state')])

  const handleError = useCallback(() => {
    if (isValidationError(checkoutError)) {
      const { errors } = checkoutError.data as TValidatingError<
        TValidateCheckoutError<TProfileSchema>
      >['data']

      Object.keys(errors).map((error) => {
        const errorKey = error as keyof TProfileSchema
        setError(errorKey, { message: errors[errorKey] })
      })
    }
  }, [checkoutError])

  useEffect(() => {
    handleError()
  }, [handleError])

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className='space-y-7'>
      <div className='space-y-2.5'>
        <div className='flex justify-between'>
          <FormLabel htmlFor='first-name-input'>First Name</FormLabel>
          <ErrorMessage
            errors={errors}
            name='firstName'
            render={({ message }) => <FormError>{message}</FormError>}
          />
        </div>
        <FormInput
          id='first-name-input'
          type='text'
          {...register('firstName')}
        />
      </div>
      <div className='space-y-2.5'>
        <div className='flex justify-between'>
          <FormLabel htmlFor='last-name-input'>Last Name</FormLabel>
          <ErrorMessage
            errors={errors}
            name='lastName'
            render={({ message }) => <FormError>{message}</FormError>}
          />
        </div>
        <FormInput id='last-name-input' type='text' {...register('lastName')} />
      </div>

      <div className='space-y-2.5'>
        <div className='flex justify-between'>
          <FormLabel htmlFor='address-input'>Address</FormLabel>
          <ErrorMessage
            errors={errors}
            name='address'
            render={({ message }) => (
              <FormError data-testid='address-error'>{message}</FormError>
            )}
          />
        </div>
        <FormInput id='address-input' type='text' {...register('address')} />
      </div>
      <div className='grid grid-cols-2 gap-x-2.5 gap-y-[30px]'>
        <div className='space-y-2.5'>
          <div className='flex justify-between'>
            <FormLabel htmlFor='postal-code-input'>Postal Code</FormLabel>
            <ErrorMessage
              errors={errors}
              name='postalCode'
              render={({ message }) => (
                <FormError data-testid='postal-code-error'>{message}</FormError>
              )}
            />
          </div>
          <FormInput
            id='postal-code-input'
            type='text'
            {...register('postalCode')}
          />
        </div>

        <div className='space-y-2.5'>
          <div className='flex justify-between'>
            <FormLabel>Country</FormLabel>
            <ErrorMessage
              errors={errors}
              name='country'
              render={({ message }) => (
                <FormError data-testid='country-error'>{message}</FormError>
              )}
            />
          </div>
          <LocationDropdown
            control={control}
            name='country'
            menuPosition='right'
            defaultLocation={formFieldsValue?.country}
          />
        </div>

        <div className='space-y-2.5'>
          <div className='flex justify-between'>
            <FormLabel>State</FormLabel>
            <ErrorMessage
              errors={errors}
              name='state'
              render={({ message }) => (
                <FormError data-testid='state-error'>{message}</FormError>
              )}
            />
          </div>
          <LocationDropdown
            control={control}
            name='state'
            menuPosition='left'
            defaultLocation={formFieldsValue?.state}
          />
        </div>

        <div className='space-y-2.5'>
          <div className='flex justify-between'>
            <FormLabel>City</FormLabel>
            <ErrorMessage
              errors={errors}
              name='city'
              render={({ message }) => (
                <FormError data-testid='address-city'>{message}</FormError>
              )}
            />
          </div>
          <LocationDropdown
            control={control}
            name='city'
            menuPosition='right'
            defaultLocation={formFieldsValue?.city}
          />
        </div>
      </div>

      <div className='flex items-start gap-2'>
        <input
          type='checkbox'
          className={`form-checkbox rounded-full !outline-none focus:!outline-none focus:!border-none text-primary-black w-5 h-5 border-none ring-primary-black ring-1 focus:ring-primary-black ring-offset-0 focus:ring-offset-0 `}
          id='save-address'
          data-testid='save-address-checkbox'
          {...register('saveAddress')}
        />
        <FormLabel htmlFor='save-address' className='flex-1'>
          <p className={`text-text-xs text-neutral-dark-grey leading-[150%] `}>
            Save this address to my profile
          </p>
        </FormLabel>
      </div>

      <h2 className='font-bold text-text-2xl text-primary-black leading-[48px]'>
        Contact
      </h2>

      <div className='space-y-2.5'>
        <div className='flex justify-between'>
          <FormLabel htmlFor='contact-input'>Contact Email</FormLabel>
          <ErrorMessage
            errors={errors}
            name='contactEmail'
            render={({ message }) => <FormError>{message}</FormError>}
          />
        </div>
        <FormInput
          id='contact-input'
          type='text'
          {...register('contactEmail')}
        />
      </div>

      <div className='space-y-2.5'>
        <div className='flex justify-between'>
          <FormLabel htmlFor='phone-number-input'>Phone Number</FormLabel>
          <ErrorMessage
            errors={errors}
            name='phoneNumber'
            render={({ message }) => <FormError>{message}</FormError>}
          />
        </div>
        <FormInput
          id='phone-number-input'
          type='text'
          {...register('phoneNumber')}
        />
      </div>

      <Button type='submit' disabled={isLoading}>
        <div
          className={cn(
            'overflow-hidden transition-all duration-300 ease-in-out w-0 max-w-0',
            {
              'mr-2 w-fit max-w-fit': isLoading
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
        {isLoading ? 'LOADING...' : buttonText}
      </Button>
    </form>
  )
}

export default UserForm
