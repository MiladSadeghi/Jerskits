import * as yup from 'yup'

const editProfileSchema = yup.object().shape({
  firstName: yup
    .string()
    .test('min', 'Too Short!', (val) => !val || val.length >= 3)
    .test('max', 'Too Long!', (val) => !val || val.length <= 15)
    .nullable()
    .defined(),
  lastName: yup
    .string()
    .test('min', 'Too Short!', (val) => !val || val.length >= 3)
    .test('max', 'Too Long!', (val) => !val || val.length <= 15)
    .nullable()
    .defined(),
  contactEmail: yup.string().email('Invalid email').nullable().defined(),
  phoneNumber: yup
    .string()
    .test(
      'phone',
      'Phone number is not valid!',
      (val) => !val || /^(\+\d{1,3}[- ]?)?\d{10}$/.test(val)
    )
    .nullable()
    .defined(),
  saveAddress: yup.boolean().default(false),
  shippingAddress: yup
    .object()
    .shape({
      address: yup.string(),
      country: yup.string(),
      state: yup.string(),
      city: yup.string(),
      postalCode: yup.string()
    })
    .when('saveAddress', {
      is: true,
      then: () =>
        yup.object().shape({
          address: yup.string().required('required'),
          country: yup.string().required('required'),
          state: yup.string().notRequired(),
          city: yup.string().notRequired(),
          postalCode: yup.string().required('required')
        }),
      otherwise: () => yup.object().strip()
    })
})

export default editProfileSchema
