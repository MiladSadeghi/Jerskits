import { useForm } from 'react-hook-form'
import ProfileSchema, { TProfileSchema } from '../../pages/Profile/Edit/Schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, FormError, FormInput, FormLabel } from '..'
import { ErrorMessage } from '@hookform/error-message'
import { SpinnerCircular } from 'spinners-react'
import { cn } from '../../utils/utils'

import LocationDropdown from '../Dropdown/LocationDropdown'
import { TGetProfileResponse } from '../../shared/types/Profile.types'
import { useEffect } from 'react'

type Props = {
  handleSubmitForm: (e: TProfileSchema) => void
  isLoading: boolean
  buttonText: string
  profileData?: TGetProfileResponse
}

const UserForm = ({
  handleSubmitForm,
  isLoading,
  buttonText,
  profileData
}: Props) => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    setValue,
    getValues,
    watch
  } = useForm<TProfileSchema>({
    resolver: yupResolver(ProfileSchema),
    defaultValues: {
      ...profileData,
      ...{
        country: profileData?.country?.value,
        state: profileData?.state?.value,
        city: profileData?.city?.value
      }
    }
  })

  useEffect(() => {
    if (getValues('country') !== profileData?.country) {
      setValue('state', undefined)
      setValue('city', undefined)
    }
  }, [watch('country')])

  useEffect(() => {
    if (getValues('state') !== profileData?.state) {
      setValue('city', undefined)
    }
  }, [watch('state')])

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
            render={({ message }) => <FormError>{message}</FormError>}
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
              render={({ message }) => <FormError>{message}</FormError>}
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
            <FormLabel htmlFor='country-dropdown'>Country</FormLabel>
            <ErrorMessage
              errors={errors}
              name='country'
              render={({ message }) => <FormError>{message}</FormError>}
            />
          </div>
          <LocationDropdown
            control={control}
            name='country'
            menuPosition='right'
            defaultLocation={profileData?.country}
          />
        </div>

        <div className='space-y-2.5'>
          <div className='flex justify-between'>
            <FormLabel htmlFor='state-dropdown'>State</FormLabel>
            <ErrorMessage
              errors={errors}
              name='state'
              render={({ message }) => <FormError>{message}</FormError>}
            />
          </div>
          <LocationDropdown
            control={control}
            name='state'
            menuPosition='left'
            defaultLocation={profileData?.state}
          />
        </div>

        <div className='space-y-2.5'>
          <div className='flex justify-between'>
            <FormLabel htmlFor='state-dropdown'>City</FormLabel>
            <ErrorMessage
              errors={errors}
              name='city'
              render={({ message }) => <FormError>{message}</FormError>}
            />
          </div>
          <LocationDropdown
            control={control}
            name='city'
            menuPosition='right'
            defaultLocation={profileData?.city}
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
          id='contact-email-input'
          type='text'
          {...register('contactEmail')}
        />
      </div>

      <div className='space-y-2.5'>
        <div className='flex justify-between'>
          <FormLabel htmlFor='contact-input'>Phone Number</FormLabel>
          <ErrorMessage
            errors={errors}
            name='phoneNumber'
            render={({ message }) => <FormError>{message}</FormError>}
          />
        </div>
        <FormInput
          id='phoneNumber-input'
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
