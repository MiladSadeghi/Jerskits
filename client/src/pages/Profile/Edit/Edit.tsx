import toast from 'react-hot-toast'
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useUploadProfileAvatarMutation
} from '../../../services/profileApi.ts'
import { UploadCloud, UploadFile } from '../../../icons'
import { ChangeEvent, useRef, useEffect, useState, RefObject } from 'react'
import { Avatar, UserForm } from '../../../components/index.ts'
import { TProfileSchema } from './Schema.ts'
import { SpinnerDiamond } from 'spinners-react'
import { useOutletContext } from 'react-router-dom'
import { cn } from '../../../utils/utils.ts'

type OutletContextType = RefObject<HTMLDivElement | null>

function Edit() {
  const profileAvatarRef = useRef<HTMLInputElement>(null)
  const acceptedImageTypes = ['image/png', 'image/jpeg', 'image/jpg']
  const profileRef = useOutletContext<OutletContextType>()
  const [dragging, setDragging] = useState<boolean>(false)
  const dragRef = useRef<HTMLDivElement>(null)
  const avatarRef = useRef<HTMLDivElement>(null)
  const [uploadAvatar] = useUploadProfileAvatarMutation()

  const { data: profile, isLoading: isProfileLoading } =
    useGetUserProfileQuery()
  const [updateProfile, { isLoading: isProfileUpdateLoading }] =
    useUpdateUserProfileMutation()

  const handleUpdateAvatar = async (image: File) => {
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

  const handleAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files![0]
    await handleUpdateAvatar(image)
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
    profileRef?.current?.addEventListener('dragover', handleDragOver)
    profileRef?.current?.addEventListener('drop', handleDrop)
    profileRef?.current?.addEventListener('dragenter', handleDragEnter)
    profileRef?.current?.addEventListener('dragleave', handleDragLeave)

    return () => {
      profileRef?.current?.removeEventListener('dragover', handleDragOver)
      profileRef?.current?.removeEventListener('drop', handleDrop)
      profileRef?.current?.removeEventListener('dragenter', handleDragEnter)
      profileRef?.current?.removeEventListener('dragleave', handleDragLeave)
    }
  }, [])

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = async (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setDragging(false)

    const image = e.dataTransfer?.files[0]
    if (image) {
      await handleUpdateAvatar(image)
    }
  }

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.target !== dragRef?.current) {
      setDragging(true)
    }
  }

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.target === avatarRef?.current) {
      setDragging(false)
    }
  }

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
    <div className='relative flex flex-col px-5 py-5 space-y-7' ref={dragRef}>
      <h1 className='font-bold text-primary-black text-text-2xl leading-[150%]'>
        Edit Account
      </h1>
      <div className='flex items-center'>
        <div
          ref={avatarRef}
          className={cn(
            'absolute left-0 top-0 p-10 w-full duration-150 bg-gradient-to-b from-primary-black via-transparent to-transparent',
            {
              'h-3/4 opacity-100': dragging,
              'h-0 transition-[height,opacity] delay-[0s,50ms] opacity-0':
                !dragging
            }
          )}
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
            onChange={handleAvatar}
          />
        </div>
      </div>
      <UserForm
        handleSubmitForm={handleSubmitForm}
        isLoading={isProfileUpdateLoading}
        buttonText='Save'
        formFieldsValue={profile?.profile}
      />
    </div>
  )
}

export default Edit
