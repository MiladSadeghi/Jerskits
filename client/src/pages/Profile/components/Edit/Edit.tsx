import { useForm } from 'react-hook-form'
import { SpinnerCircular, SpinnerDiamond } from 'spinners-react'
import tw, { styled } from 'twin.macro'
import { css } from 'twin.macro'
import { yupResolver } from '@hookform/resolvers/yup'
import editProfileSchema from './Edit.schema'
import { ErrorMessage } from '@hookform/error-message'
import { useEffect, useRef, useState } from 'react'
import LocationProvider from '../../../../components/Location/LocationProvider.tsx'
import toast from 'react-hot-toast'
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation
} from '../../../../services/profileApi.ts'
import {
  Option,
  TeditProfileSchema
} from '../../../../shared/types/Profile.types.ts'

function Edit() {
  const profileAvatar = useRef<HTMLInputElement>(null)
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<Option | null>(null)
  const [selectedState, setSelectedState] = useState<Option | null>(null)
  const [selectedCity, setSelectedCity] = useState<Option | null>(null)

  const { data: profileData, isFetching, isSuccess } = useGetUserProfileQuery()
  const [updateProfile, { isLoading, isSuccess: updateProfileSuccessfully }] =
    useUpdateUserProfileMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    setValue,
    control,
    reset
  } = useForm<TeditProfileSchema>({
    resolver: yupResolver(editProfileSchema),
    reValidateMode: 'onChange',
    mode: 'onChange',
    shouldUnregister: true
  })

  useEffect(() => {
    if (isSuccess && profileData) {
      reset()
      if (profileData.profile.firstName)
        setValue('firstName', profileData.profile.firstName)
      if (profileData.profile.lastName)
        setValue('lastName', profileData.profile.lastName)
      if (profileData.profile.contactEmail)
        setValue('contactEmail', profileData.profile.contactEmail)
      if (profileData.profile.phoneNumber)
        setValue('phoneNumber', profileData.profile.phoneNumber)
      if (profileData.profile.shippingAddress?.address) {
        setValue('saveAddress', true)
        setValue(
          'shippingAddress.address',
          profileData.profile.shippingAddress?.address
        )
        if (profileData.profile.shippingAddress?.country) {
          setValue(
            'shippingAddress.country',
            profileData.profile.shippingAddress?.country.value
          )
          setSelectedCountry({
            label: profileData.profile.shippingAddress?.country.label,
            value: profileData.profile.shippingAddress?.country.value
          })
        }
        if (profileData.profile.shippingAddress?.state) {
          setValue(
            'shippingAddress.state',
            profileData.profile.shippingAddress?.state.value
          )
          setSelectedState({
            label: profileData.profile.shippingAddress?.state.label,
            value: profileData.profile.shippingAddress?.state.value
          })
        }
        if (profileData.profile.shippingAddress?.city) {
          setValue(
            'shippingAddress.city',
            profileData.profile.shippingAddress?.city.value
          )
          setSelectedCity({
            label: profileData.profile.shippingAddress?.city.label,
            value: profileData.profile.shippingAddress?.city.value
          })
        }
        if (profileData.profile.shippingAddress?.postalCode) {
          setValue(
            'shippingAddress.postalCode',
            profileData.profile.shippingAddress?.postalCode
          )
        }
      }
    }
  }, [isSuccess, profileData])

  useEffect(() => {
    if (updateProfileSuccessfully) {
      toast.success('Profile saved', { position: 'top-right' })
    }
  }, [updateProfileSuccessfully])

  const showProfilePreview = (file: File) => {
    if (file) {
      setValue('avatar', file)
      const reader = new FileReader()
      reader.onload = (event) => {
        const dataUrl = event.target?.result
        if (typeof dataUrl === 'string') {
          setPreviewAvatar(dataUrl)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const updateProfileHandler = async (data: TeditProfileSchema) => {
    const formData = new FormData()
    if (data.avatar) formData.append('avatar', data.avatar as File)
    if (data.firstName) formData.append('firstName', data.firstName)
    if (data.lastName) formData.append('lastName', data.lastName)
    if (data.contactEmail) formData.append('contactEmail', data.contactEmail)
    if (data.phoneNumber) formData.append('phoneNumber', data.phoneNumber)
    if (data.saveAddress) {
      formData.append('saveAddress', 'true')
      formData.append('shippingAddress[address]', data.shippingAddress.address)
      formData.append('shippingAddress[country]', selectedCountry!.value)
      formData.append(
        'shippingAddress[postalCode]',
        String(data.shippingAddress.postalCode)
      )
      if (selectedState)
        formData.append('shippingAddress[state]', selectedState.value)
      if (selectedCity)
        formData.append('shippingAddress[city]', selectedCity.value)
    }
    await updateProfile(formData)
  }

  if (isFetching) {
    return (
      <SpinnerDiamond
        size={50}
        thickness={100}
        speed={100}
        color='#262D33'
        secondaryColor='#00000033'
        className='mx-auto'
      />
    )
  }

  return (
    <Wrapper onSubmit={handleSubmit(updateProfileHandler)}>
      <h5 className='font-bold text-primary-black text-text-2xl leading-[150%]'>
        Edit Account
      </h5>
      <div className='flex items-center'>
        <div className='flex max-w-[100px] max-h-[100px]'>
          {previewAvatar ? (
            <ProfileImage src={previewAvatar} />
          ) : profileData &&
            profileData?.profile &&
            profileData?.profile?.avatar ? (
            <ProfileImage
              crossOrigin='anonymous'
              src={`${import.meta.env.VITE_SERVER_URL.replace(
                '/api',
                ''
              )}/images/${profileData.profile.avatar}`}
            />
          ) : (
            <div className='bg-[#e4e6e7] rounded-full'>
              <ProfileImage src='/blank-profile-picture.png' className='p-4' />
            </div>
          )}
        </div>
        <div className='w-full ml-7'>
          <AvatarInput
            onClick={() =>
              profileAvatar.current && profileAvatar?.current.click()
            }
          >
            <p className='text-text-sm text-neutral-grey'>
              {getValues('avatar') && typeof getValues('avatar') !== 'string'
                ? (getValues('avatar') as File).name
                : 'Upload Photo (Max 1 Mb)'}
            </p>
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M19 8L19.6 8C19.6 7.84087 19.5368 7.68826 19.4243 7.57574L19 8ZM14 3L14.4243 2.57574C14.3117 2.46321 14.1591 2.4 14 2.4L14 3ZM14 8L13.4 8L13.4 8.6L14 8.6L14 8ZM12 12L12.4243 11.5757L12 11.1515L11.5757 11.5757L12 12ZM13 13L13 13.6L14.4485 13.6L13.4243 12.5757L13 13ZM11 13L10.5757 12.5757L9.55147 13.6L11 13.6L11 13ZM19 20L19.6 20L19 20ZM6 21.6L18 21.6L18 20.4L6 20.4L6 21.6ZM4.4 4L4.4 20L5.6 20L5.6 4L4.4 4ZM19.6 20L19.6 8L18.4 8L18.4 20L19.6 20ZM14 2.4L6 2.4L6 3.6L14 3.6L14 2.4ZM19.4243 7.57574L14.4243 2.57574L13.5757 3.42426L18.5757 8.42426L19.4243 7.57574ZM13.4 3L13.4 8L14.6 8L14.6 3L13.4 3ZM14 8.6L19 8.6L19 7.4L14 7.4L14 8.6ZM11.4 12L11.4 18L12.6 18L12.6 12L11.4 12ZM11.5757 12.4243L12.5757 13.4243L13.4243 12.5757L12.4243 11.5757L11.5757 12.4243ZM13 12.4L11 12.4L11 13.6L13 13.6L13 12.4ZM11.4243 13.4243L12.4243 12.4243L11.5757 11.5757L10.5757 12.5757L11.4243 13.4243ZM18 21.6C18.8837 21.6 19.6 20.8837 19.6 20L18.4 20C18.4 20.2209 18.2209 20.4 18 20.4L18 21.6ZM6 20.4C5.77909 20.4 5.6 20.2209 5.6 20L4.4 20C4.4 20.8837 5.11634 21.6 6 21.6L6 20.4ZM5.6 4C5.6 3.77909 5.77909 3.6 6 3.6L6 2.4C5.11634 2.4 4.4 3.11634 4.4 4L5.6 4Z'
                fill='black'
              />
            </svg>
          </AvatarInput>
          <input
            type='file'
            ref={profileAvatar}
            className='hidden'
            hidden
            accept={'image/png, image/jpeg, image/jpg'}
            onChange={(e) => {
              if (e.target.files) {
                showProfilePreview(e.target.files[0])
              }
            }}
          />
          <ErrorMessage
            errors={errors}
            name='avatar'
            render={({ message }) => <FormError>{message}</FormError>}
          />
        </div>
      </div>
      <div className='space-y-[10px]'>
        <div className='flex justify-between'>
          <FormLabel htmlFor='first-name-input'>First Name</FormLabel>
          <ErrorMessage
            errors={errors}
            name='firstName'
            render={({ message }) => <FormError>{message}</FormError>}
          />
        </div>
        <FormInput id='first-name-input' {...register('firstName')} />
      </div>
      <div className='space-y-[10px]'>
        <div className='flex justify-between'>
          <FormLabel htmlFor='last-name-input'>Last Name</FormLabel>
          <ErrorMessage
            errors={errors}
            name='lastName'
            render={({ message }) => <FormError>{message}</FormError>}
          />
        </div>
        <FormInput id='last-name-input' {...register('lastName')} />
      </div>
      <div className='space-y-[10px]'>
        <div className='flex justify-between'>
          <FormLabel htmlFor='address-input'>Address</FormLabel>
          <ErrorMessage
            errors={errors}
            name='shippingAddress.address'
            render={({ message }) => (
              <FormError data-testid='address-error'>{message}</FormError>
            )}
          />
        </div>
        <FormInput
          $isDisabled={!watch('saveAddress')}
          disabled={!watch('saveAddress')}
          id='address-input'
          {...register('shippingAddress.address')}
        />
      </div>
      <div className='grid grid-cols-2 gap-x-[10px] gap-y-[30px]'>
        <div className='space-y-[10px]'>
          <div className='flex justify-between'>
            <FormLabel htmlFor='country-input'>Country</FormLabel>
            <ErrorMessage
              errors={errors}
              name='shippingAddress.country'
              render={({ message }) => (
                <FormError data-testid='country-error'>{message}</FormError>
              )}
            />
          </div>
          <LocationProvider
            name='country'
            dropdownDisable={!watch('saveAddress')}
            control={control}
            onSelect={setSelectedCountry}
            selectedValue={selectedCountry}
          />
        </div>
        <div className='space-y-[10px]'>
          <div className='flex justify-between'>
            <FormLabel htmlFor='state-input'>Province/State</FormLabel>
            <ErrorMessage
              errors={errors}
              name='shippingAddress.state'
              render={({ message }) => <FormError>{message}</FormError>}
            />
          </div>
          <LocationProvider
            name='state'
            dropdownDisable={!watch('saveAddress')}
            control={control}
            onSelect={setSelectedState}
            selectedValue={selectedState}
            selectedCountry={selectedCountry}
          />
        </div>
        <div className='space-y-[10px]'>
          <div className='flex justify-between'>
            <FormLabel htmlFor='city-input'>City</FormLabel>
            <ErrorMessage
              errors={errors}
              name='shippingAddress.city'
              render={({ message }) => <FormError>{message}</FormError>}
            />
          </div>
          <LocationProvider
            name='city'
            dropdownDisable={!watch('saveAddress')}
            control={control}
            onSelect={setSelectedCity}
            selectedValue={selectedCity}
            selectedCountry={selectedCountry}
            selectedState={selectedState}
          />
        </div>
        <div className='space-y-[10px]'>
          <div className='flex justify-between'>
            <FormLabel htmlFor='postal-code-input'>Postal Code</FormLabel>
            <ErrorMessage
              errors={errors}
              name='shippingAddress.postalCode'
              render={({ message }) => (
                <FormError data-testid='postal-code-error'>{message}</FormError>
              )}
            />
          </div>
          <FormInput
            type='number'
            $isDisabled={!watch('saveAddress')}
            disabled={!watch('saveAddress')}
            id='postal-code-input'
            placeholder='Postal Code'
            {...register('shippingAddress.postalCode', { valueAsNumber: true })}
          />
        </div>
      </div>
      <div className='flex items-start gap-2'>
        <input
          type='checkbox'
          className={`form-checkbox rounded-full !outline-none focus:!outline-none focus:!border-none text-primary-black w-5 h-5 border-none ring-primary-black ring-1 focus:ring-primary-black ring-offset-0 focus:ring-offset-0 `}
          id='save-address'
          data-testid='save-address'
          {...register('saveAddress')}
        />
        <FormLabel htmlFor='save-address' className='flex-1'>
          <p className={`text-text-xs text-neutral-dark-grey leading-[150%] `}>
            Save this address to my profile
          </p>
        </FormLabel>
      </div>
      <h3 className='text-text-2xl text-primary-black font-bold leading-[150%]'>
        Contact
      </h3>
      <div className='space-y-[10px] '>
        <div className='flex justify-between'>
          <FormLabel htmlFor='contact-email-input'>Email</FormLabel>
          <ErrorMessage
            errors={errors}
            name='contactEmail'
            render={({ message }) => <FormError>{message}</FormError>}
          />
        </div>
        <FormInput id='contact-email-input' {...register('contactEmail')} />
      </div>
      <div className='space-y-[10px]'>
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
          type='string'
          {...register('phoneNumber')}
        />
      </div>
      <SubmitButton type='submit' disabled={isLoading}>
        <SubmitButtonLoader $isLoading={isLoading}>
          <SpinnerCircular
            size={25}
            thickness={260}
            speed={100}
            color='#fff'
            secondaryColor='#676c70'
          />
        </SubmitButtonLoader>
        {isLoading ? 'LOADING...' : 'SAVE'}
      </SubmitButton>
    </Wrapper>
  )
}

const Wrapper = tw.form`flex flex-col space-y-7`

const FormLabel = tw.label`text-primary-black font-medium text-text-sm`
const FormInput = styled.input<{
  $isDisabled?: boolean
}>`
  ${tw`w-full h-12 px-5 py-4 border outline-none border-neutral-soft-grey`}
  ${({ $isDisabled }) => ($isDisabled ? tw`bg-[#f2f2f2]` : tw``)}
  ${css`
    &:focus {
      border-color: #262d33;
      box-shadow: none;
    }
  `}
`
const FormError = tw.p`text-red-600 text-sm`
const ProfileImage = tw.img` rounded-full object-contain`
const AvatarInput = tw.div`w-full h-12 px-5 py-4 border outline-none border-neutral-grey flex items-center justify-between`
const SubmitButton = styled.button`
  ${tw`w-full font-bold text-white h-14 bg-primary-black flex items-center justify-center`}
  ${css`
    &:disabled {
      opacity: 0.7;
    }
  `}
`

const SubmitButtonLoader = styled.div<{
  $isLoading?: boolean
}>`
  ${tw`overflow-hidden transition-all duration-300 ease-in-out`}
  ${({ $isLoading }) =>
    $isLoading ? tw`w-fit mr-2 max-w-fit` : tw`!w-0 max-w-0`}
`
export default Edit
