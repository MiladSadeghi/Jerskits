import { useEffect, useRef } from 'react'
import {
  BillingIcon,
  Checkmark,
  DeliveryIcon,
  InformationIcon,
  PaymentIcon
} from '../../icons'
import { cn } from '../../utils/utils'

type Props = {
  step: number
}

const steps = (step: number) => {
  return [
    {
      title: 'Information',
      icon: <InformationIcon strokeColor={step == 1 ? 'white' : '#262D33'} />
    },
    {
      title: 'Delivery',
      icon: <DeliveryIcon strokeColor={step == 2 ? 'white' : '#262D33'} />
    },
    {
      title: 'Billing',
      icon: <BillingIcon strokeColor={step == 3 ? 'white' : '#262D33'} />
    },
    {
      title: 'Payment',
      icon: <PaymentIcon strokeColor={step == 4 ? 'white' : '#262D33'} />
    }
  ]
}

const CheckoutSteps = ({ step }: Props) => {
  const stepContainerRef = useRef<HTMLDivElement>(null)

  const stepWidth = 768 / 4

  const scrollToStep = (index: number) => {
    if (stepContainerRef.current) {
      stepContainerRef.current.scrollTo({
        left: (index - 1) * stepWidth,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    scrollToStep(step)
  }, [step])

  return (
    <div
      className='px-4 overflow-x-hidden lg:px-0'
      style={{ scrollSnapType: 'x proximity' }}
      ref={stepContainerRef}
    >
      <ul className='flex items-center justify-between my-7 w-[48rem] mx-auto'>
        {steps(step).map((stepItem, index) => (
          <div
            key={index}
            className='flex items-center'
            style={{ scrollSnapAlign: 'start' }}
            id={`step-${index}`}
          >
            <li className='flex items-center'>
              <span
                className={cn(
                  'flex items-center justify-center w-12 h-12 mr-5 rounded-full bg-neutral-soft-grey',
                  {
                    'bg-primary-black': step >= index + 1
                  }
                )}
              >
                {step > index + 1 ? (
                  <Checkmark strokeColor='white' />
                ) : (
                  stepItem.icon
                )}
              </span>
              <div className='flex flex-col justify-between'>
                <p className='text-xs font-bold leading-5 text-neutral-dark-grey'>
                  {`STEP ${index + 1}`}
                </p>
                <h1 className='text-lg font-bold leading-7 text-primary-black'>
                  {stepItem.title}
                </h1>
              </div>
            </li>
            {index !== 3 && (
              <div className='w-12 min-w-[48px] h-px mx-10 lg:mx-4 bg-neutral-soft-grey' />
            )}
          </div>
        ))}
      </ul>
      <div className='container hidden max-w-3xl mx-auto lg:block'>
        <div className='h-px mx-auto my-12 bg-neutral-light-grey' />
      </div>
    </div>
  )
}

export default CheckoutSteps
