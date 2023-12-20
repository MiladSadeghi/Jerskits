import toast from 'react-hot-toast'
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useUploadProfileAvatarMutation
} from '../../../services/profileApi.ts'
import { UploadCloud, UploadFile } from '../../../icons'
import { ChangeEvent, useRef, useState, DragEvent, useEffect } from 'react'
import { Avatar, UserForm } from '../../../components/index.ts'
import { TProfileSchema } from './Schema.ts'
import { SpinnerDiamond } from 'spinners-react'

function Edit() {
  const profileAvatarRef = useRef<HTMLInputElement>(null)
  const [isAvatarDragged, setIsAvatarDragged] = useState<boolean>(false)
  const acceptedImageTypes = ['image/png', 'image/jpeg', 'image/jpg']
  const [uploadAvatar] = useUploadProfileAvatarMutation()

  const {
    data: profile,
    isLoading: isProfileLoading,
    error,
    isError
  } = useGetUserProfileQuery()
  const [updateProfile, { isLoading: isProfileUpdateLoading }] =
    useUpdateUserProfileMutation()

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

  const handleUploadInputAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files![0]
    await uploadAvatarErrorHandler(image)
  }

  const handleAvatarDragOver = (e: DragEvent<HTMLElement>) => {
    e.stopPropagation()
    e.preventDefault()
    setIsAvatarDragged(true)
  }

  const handleAvatarDragLeave = () => {
    setIsAvatarDragged(false)
  }

  const handleDropAvatar = async (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    setIsAvatarDragged(true)

    const image = e.dataTransfer.files[0]
    await uploadAvatarErrorHandler(image)
    setIsAvatarDragged(false)
  }

  const handleSubmitForm = async (e: TProfileSchema) => {
    const filteredValues = Object.fromEntries(
      Object.entries(e).filter(
        ([, value]) => value !== null && value !== undefined && value !== ''
      )
    )
    await updateProfile(filteredValues)
  }

  useEffect(() => {
    if (isError) {
      console.log(error)
    }
  }, [isError])

  if (isProfileLoading) {
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
    <div
      className='relative flex flex-col px-5 py-5 space-y-7'
      onDragOver={handleAvatarDragOver}
      onDragLeave={handleAvatarDragLeave}
      onDrop={handleDropAvatar}
    >
      <h5 className='font-bold text-primary-black text-text-2xl leading-[150%]'>
        Edit Account
      </h5>
      <div className='flex items-center '>
        <div
          className={`absolute left-0 top-0 p-10 w-full h-full transition-all duration-150 bg-gradient-to-b from-primary-black via-transparent to-transparent delay-300 ${
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
        </div>
      </div>
      <UserForm
        handleSubmitForm={handleSubmitForm}
        isLoading={isProfileUpdateLoading}
        buttonText='Save'
        profileData={profile?.profile}
      />
    </div>
  )
}

export default Edit
