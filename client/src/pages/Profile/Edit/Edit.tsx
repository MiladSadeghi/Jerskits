import { useForm } from 'react-hook-form'
import { SpinnerCircular, SpinnerDiamond } from 'spinners-react'
import tw, { styled } from 'twin.macro'
import { css } from 'twin.macro'
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
import { useAppSelector } from '../../../App/hooks.ts'
import { RootState } from '../../../App/store.ts'

function Edit() {
  const profileAvatarRef = useRef<HTMLInputElement>(null)
  const userAvatar = useAppSelector((state: RootState) => state.profile.avatar)
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
    <Wrapper
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
          <div className='rounded-2xl bg-white w-full py-4 flex justify-center items-center'>
            <UploadCloud />
          </div>
        </div>
        {userAvatar !== '' ? (
          <ProfileImage
            crossOrigin='anonymous'
            src={`${import.meta.env.VITE_SERVER_URL.replace(
              '/api',
              ''
            )}/images/${userAvatar}`}
          />
        ) : (
          <div className='bg-[#e4e6e7] rounded-full w-[100px] h-[100px]'>
            <ProfileImage
              src='/images/blank-profile-picture.png'
              className='p-4'
            />
          </div>
        )}
        <div className='w-full ml-7'>
          <AvatarInput onClick={() => profileAvatarRef.current?.click()}>
            <p className='text-text-sm text-neutral-grey'>
              Upload Photo (Max 1 Mb)
            </p>
            <UploadFile />
          </AvatarInput>
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
          type='number'
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

const Wrapper = tw.form`flex flex-col space-y-7 relative px-5 py-5`

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
const ProfileImage = tw.img` rounded-full object-cover min-w-[100px] min-h-[100px]`
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
