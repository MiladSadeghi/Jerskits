import { BestQualityMaterial, FreeShipping, SecurePayments } from '../icons'

type Props = {
  color?: string
}

const FeatureContent = ({ color = 'white' }: Props): IFeature[] => {
  return [
    {
      background: '/images/best-quality-material.jpg',
      icon: <BestQualityMaterial color={color} />,
      title: 'Best Quality Material',
      description:
        'Our product is made from at least 75% recycled polyester fibres.'
    },
    {
      background: '/images/secure-payments.jpg',
      icon: <SecurePayments color={color} />,
      title: 'Secure payments',
      description:
        "Payments with a guaranteed level of security, you don't have to worry"
    },
    {
      background: '/images/free-shipping.jpg',
      icon: <FreeShipping color={color} />,
      title: 'Free shipping',
      description: 'Free all shipping worldwide, with applicable conditions'
    }
  ]
}

export default FeatureContent
