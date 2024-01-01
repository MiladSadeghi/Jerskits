import * as yup from 'yup'

const validateCardNumber = (cardNumber: string) => {
  const regex = new RegExp('^[0-9]{13,19}$')
  if (!regex.test(cardNumber)) {
    return false
  }

  let sum = 0
  let shouldDouble = false

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i))

    if (shouldDouble) {
      if ((digit *= 2) > 9) digit -= 9
    }

    sum += digit
    shouldDouble = !shouldDouble
  }

  return sum % 10 === 0
}

const PaymentSchema = yup
  .object()
  .shape({
    nameOnCard: yup
      .string()
      .required('Name on card is required')
      .min(2, 'Name is too short.'),
    cardNumber: yup
      .string()
      .required('Card number is required')
      .test('is-valid-card', 'Card number is invalid', (value) =>
        validateCardNumber(value)
      ),
    expirationDate: yup
      .string()
      .required('Expiration date is required')
      .matches(
        /^(0[1-9]|1[0-2])\/[0-9]{4}$/,
        'Expiration date is not valid. Format must be MM/YYYY'
      ),
    cvv: yup
      .string()
      .required('CVV is required')
      .matches(/^[0-9]{3,4}$/, 'CVV is invalid'),
    saveAsDefault: yup.boolean().default(false)
  })
  .required()

export type TPaymentForm = yup.InferType<typeof PaymentSchema>

export default PaymentSchema
