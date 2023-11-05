import * as yup from 'yup'
import editProfileSchema from '../../pages/Profile/Edit/Edit.schema'

export type TEditProfileSchema = yup.InferType<typeof editProfileSchema>

interface IProfile {
  avatar?: string
  fullName?: string
  email?: string
  firstName?: string
  lastName?: string
  contactEmail?: string
  phoneNumber?: string
  saveAddress?: boolean
  shippingAddress?: {
    address?: string
    country?: string
    state?: string
    city?: string
    postalCode?: string
  }
}

type TGetProfileResponse = IProfile & {
  shippingAddress?: {
    address?: string
    country?: Option
    state?: Option
    city?: Option
  }
}

type TUploadProfileAvatarRequest = FormData

type TUploadProfileAvatarResponse = {
  avatar: string
}

export type {
  IProfile,
  TGetProfileResponse,
  TUploadProfileAvatarRequest,
  TUploadProfileAvatarResponse
}
