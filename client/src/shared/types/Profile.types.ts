export interface IProfile {
  avatar?: string
  fullName?: string
  email?: string
  firstName?: string
  lastName?: string
  contactEmail?: string
  phoneNumber?: string
  saveAddress?: boolean
  createdAt?: Date
  address?: string
  country?: string
  state?: string
  city?: string
  postalCode?: string
}

export interface IProfileForm {
  firstName: string
  lastName: string
  address: string
  postalCode: string
  country: string
  state: string
  city: string
  contactEmail: string
  phoneNumber: string
  saveAddress: boolean
}

export type TGetProfileResponse = Omit<
  IProfileForm,
  'address' | 'country' | 'state' | 'city' | 'postalCode'
> & {
  address?: string
  country?: Option
  state?: Option
  city?: Option
  postalCode?: string
}

export type TUploadProfileAvatarRequest = FormData

export type TUploadProfileAvatarResponse = {
  avatar: string
}
