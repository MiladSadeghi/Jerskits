import { useForm } from 'react-hook-form'
import { SpinnerCircular, SpinnerDiamond } from 'spinners-react'
import { yupResolver } from '@hookform/resolvers/yup'
import editProfileSchema from './Edit.schema.ts'
import { ErrorMessage } from '@hookform/error-message'
import { ChangeEvent, DragEvent, useEffect, useRef, useState } from 'react'
import LocationProvider from '../../../components/Location/LocationProvider.tsx'
import toast from 'react-hot-toast'
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useUploadProfileAvatarMutation
} from '../../../services/profileApi.ts'
import {
  IProfile,
  TEditProfileSchema
} from '../../../shared/types/Profile.types.ts'
import { UploadCloud, UploadFile } from '../../../icons'
import {
  FormLabel,
  FormInput,
  FormError,
  Button,
  Avatar
} from '../../../components/'
import { cn } from '../../../utils/utils.ts'

function Edit() {
  const profileAvatarRef = useRef<HTMLInputElement>(null)
  const [isAvatarDragged, setIsAvatarDragged] = useState<boolean>(false)
  const [selectedCountry, setSelectedCountry] = useState<Option | null>(null)
  const [selectedState, setSelectedState] = useState<Option | null>(null)
  const [selectedCity, setSelectedCity] = useState<Option | null>(null)
  const acceptedImageTypes = ['image/png', 'image/jpeg', 'image/jpg']

  const { data: profileData, isFetching, isSuccess } = useGetUserProfileQuery()
  const [updateProfile, { isLoading, isSuccess: updateProfileSuccessfully }] =
    useUpdateUserProfileMutation()

  const [uploadAvatar] = useUploadProfileAvatarMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
    reset
  } = useForm<TEditProfileSchema>({
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

  const updateProfileHandler = async (data: TEditProfileSchema) => {
    if (data.saveAddress) {
      data.saveAddress = true
      data.shippingAddress = {
        ...data.shippingAddress,
        country: selectedCountry!.value,
        state: selectedState!.value,
        city: selectedCity!.value,
        postalCode: data.shippingAddress.postalCode
      }
    }

    await updateProfile(data as IProfile)
  }

  const uploadAvatarErrorHandler = async (image: File) => {
    if (!acceptedImageTypes.includes(image.type) || image.size > 1000000) {
      toast.error(
        "The image type isn't valid or image size is too bigger than 1MB.",
        {
          position: 'top-right'
        }
      )
      return
    }
    const formData = new FormData()
    formData.append('avatar', image)

    await uploadAvatar(formData)
  }

  const handleUploadInputAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files![0]
    uploadAvatarErrorHandler(image)
  }

  const handleAvatarDragOver = (e: DragEvent<HTMLFormElement>) => {
    e.stopPropagation()
    e.preventDefault()
    setIsAvatarDragged(true)
  }

  const handleAvatarDragLeave = () => {
    setIsAvatarDragged(false)
  }

  const handleDropAvatar = async (e: DragEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsAvatarDragged(true)

    const image = e.dataTransfer.files[0]
    await uploadAvatarErrorHandler(image)
    setIsAvatarDragged(false)
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
    <form
      className='relative flex flex-col px-5 py-5 space-y-7'
      onSubmit={handleSubmit(updateProfileHandler)}
      onDragOver={handleAvatarDragOver}
      onDragLeave={handleAvatarDragLeave}
      onDrop={handleDropAvatar}
    >
      <h5 className='font-bold text-primary-black text-text-2xl leading-[150%]'>
        Edit Account
      </h5>
      <div className='flex items-center '>
        <div
          className={`absolute left-0 top-0 p-10 w-full h-full transition-all duration-150 bg-gradient-to-b from-primary-black via-transparent to-transparent  ${
            isAvatarDragged ? 'opacity-100 z-10' : 'opacity-0 -z-10'
          }`}
        >
          <div className='flex items-center justify-center w-full py-4 bg-white rounded-2xl'>
            <UploadCloud />
          </div>
        </div>
        <Avatar avatarSizes={[100, 100]} />
        <div className='flex-1 ml-7'>
          <div
            className='div`w-full h-12 px-5 py-4 border outline-none border-neutral-grey flex items-center justify-between'
            onClick={() => profileAvatarRef.current?.click()}
          >
            <p className='text-text-sm text-neutral-grey'>
              Upload Photo (Max 1 Mb)
            </p>
            <UploadFile />
          </div>
          <input
            type='file'
            ref={profileAvatarRef}
            className='hidden'
            hidden
            accept={acceptedImageTypes.toString()}
            onChange={handleUploadInputAvatar}
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
        <FormInput
          id='first-name-input'
          type='text'
          {...register('firstName')}
        />
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
        <FormInput id='last-name-input' type='text' {...register('lastName')} />
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
          disabled={!watch('saveAddress')}
          id='address-input'
          type='text'
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
            disabled={!watch('saveAddress')}
            id='postal-code-input'
            placeholder='Postal Code'
            {...register('shippingAddress.postalCode')}
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
        <FormInput
          id='contact-email-input'
          type='text'
          {...register('contactEmail')}
        />
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
          type='number'
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
        {isLoading ? 'LOADING...' : 'SAVE'}
      </Button>
    </form>
  )
}

export default Edit
