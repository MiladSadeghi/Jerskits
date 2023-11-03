import * as yup from 'yup'
import editProfileSchema from '../../pages/Profile/Edit/Edit.schema'

export type TEditProfileSchema = yup.InferType<typeof editProfileSchema>

interface IProfile {
  fullName?: string
  email?: string
  firstName?: string
  lastName?: string
  avatar?: File | string
  contactEmail?: string
  phoneNumber?: string
  saveAddress?: boolean
  shippingAddress?: {
    address?: string
    country?: string
    state?: string
    city?: string
    postalCode?: number
  }
}

type TGetProfileResponse = IProfile & {
  shippingAddress?: {
    address?: string
    country?: Option
    state?: Option
    city?: Option
    postalCode?: number
  }
}

export type { IProfile, TGetProfileResponse }
