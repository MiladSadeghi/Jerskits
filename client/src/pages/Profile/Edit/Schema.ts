import * as yup from 'yup'

const ProfileSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name cannot exceed 50 characters'),
  lastName: yup
    .string()
    .trim()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name cannot exceed 50 characters'),
  contactEmail: yup.string().trim().email('Invalid email format'),
  phoneNumber: yup
    .string()
    .trim()
    .matches(/^[0-9]{10}$/, {
      message: 'Phone number must be 10 digits',
      excludeEmptyString: true
    }),
  saveAddress: yup.boolean().default(false),
  address: yup.string().trim().max(100, 'Address cannot exceed 100 characters'),
  country: yup
    .string()
    .trim()
    .max(50, 'Country name cannot exceed 50 characters'),
  state: yup.string().trim().max(50, 'State name cannot exceed 50 characters'),
  city: yup.string().trim().max(50, 'City name cannot exceed 50 characters'),
  postalCode: yup
    .string()
    .trim()
    .matches(/^[0-9]{5}$/, {
      message: 'Postal code must be 5 digits',
      excludeEmptyString: true
    })
})

export type TProfileSchema = yup.InferType<typeof ProfileSchema>

export default ProfileSchema
