import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../App/hooks'
import toast from 'react-hot-toast'
import {
  ECheckoutSteps,
  IOrderDelivery,
  TPlaceOrderError
} from '../../shared/types/Order.types'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Button,
  CheckoutDelivery,
  CheckoutSteps,
  DeliverySummary,
  CheckoutSummary,
  UserForm
} from '../../components'
import { ArrowRight, Bag } from '../../icons'
import { BagModal } from '../../modals'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import { calculateDateDuration, cn, isValidationError } from '../../utils/utils'
import {
  usePlaceOrderMutation,
  useValidateCheckoutDeliveryMutation,
  useValidateCheckoutInformationMutation
} from '../../services'
import InformationSummary from '../../components/Checkout/InformationSummary'
import { IProfileForm } from '../../shared/types/Profile.types'
import { SpinnerCircular } from 'spinners-react'
import CheckoutPayment from '../../components/Checkout/CheckoutPayment'
import { TPaymentForm } from '../../components/Checkout/CheckoutPayment.schema'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { clearBag } from '../../App/feature/userSlice'

const Checkout = () => {
  document.title = 'Checkout'
  const userBag = useAppSelector((state) => state.user.bag)
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState<ECheckoutSteps>(
    ECheckoutSteps.INFORMATION
  )
  const [openBagModal, setOpenBagModal] = useState(false)
  const bagBtnRef = useRef<HTMLButtonElement>(null)
  const bagModalRef = useOutsideClick<HTMLDialogElement, HTMLButtonElement>({
    callback: () => setOpenBagModal(false)
  })
  const [delivery, setDelivery] = useState<IOrderDelivery>({
    type: 'standard',
    arriveTime: calculateDateDuration(new Date(), 5),
    price: 10
  })
  const [isBillingMatch, setIsBillingMatch] = useState<boolean>(false)
  const [informationError, setInformationError] = useState<
    FetchBaseQueryError | SerializedError
  >()
  const dispatch = useAppDispatch()
  const isBagItemsEmpty = useMemo(() => !userBag.items.length, [userBag.items])

  const [
    validateInformation,
    { isLoading: isValidatingInformation, data: validateInformationData }
  ] = useValidateCheckoutInformationMutation()

  const [validateDelivery, { isLoading: isValidatingDelivery }] =
    useValidateCheckoutDeliveryMutation()

  const [placeOrder, { status, isSuccess }] = usePlaceOrderMutation()

  const handleValidateInformation = async (e: Partial<IProfileForm>) => {
    try {
      await validateInformation(e as IProfileForm).unwrap()
      setActiveStep(ECheckoutSteps.DELIVERY)
    } catch (error) {
      setInformationError(error as FetchBaseQueryError | SerializedError)
    }
  }

  const validatedInformationData = useMemo(() => {
    if (validateInformationData) {
      return validateInformationData
    }
  }, [validateInformationData])

  const checkoutInformationData = useMemo(() => {
    if (validateInformationData) {
      return {
        ...validateInformationData,
        country: validateInformationData.country.value,
        state: validateInformationData.state.value,
        city: validateInformationData.city.value
      }
    }
  }, [validateInformationData])

  useEffect(() => {
    if (isBagItemsEmpty && !isSuccess) {
      navigate('/')
      toast.error(
        'Your bag is empty! Please add items to your bag before proceeding'
      )
    }
  }, [userBag.items])

  const handleArrivalTime = (delivery: IOrderDelivery) => {
    setDelivery(delivery)
  }

  const handleSteps = (step: number) => {
    if (step === 2) handleValidateDelivery()
    if (step === 3) setActiveStep(ECheckoutSteps.PAYMENT)
  }

  const handleValidateDelivery = async () => {
    if (delivery) {
      try {
        await validateDelivery(delivery).unwrap()
        setActiveStep(ECheckoutSteps.BILLING)
      } catch {
        toast.error("Can't validate delivery!, try again later.")
      }
    }
  }

  const handlePlaceOrder = async (payment: TPaymentForm) => {
    try {
      const data = await placeOrder({
        information: checkoutInformationData,
        delivery,
        payment
      }).unwrap()
      navigate(`/checkout/${data.orderId}`)
      dispatch(clearBag())
    } catch (error) {
      if (isValidationError(error)) {
        const err = error.data as TPlaceOrderError
        toast.error(err.message)
        if (err.step === 1) {
          setInformationError(error)
        }
        setActiveStep(err.step)
      }
    }
  }

  return (
    <div className='relative'>
      <div
        className={cn(
          'fixed top-0 right-0  w-full h-full bg-transparent-30 z-50',
          { hidden: !openBagModal }
        )}
      />
      <BagModal
        isBagModal={[openBagModal, setOpenBagModal]}
        ref={bagModalRef}
      />
      <nav className='container w-full max-w-3xl mx-auto flex items-center justify-between h-[90px] px-4 lg:px-0'>
        <button onClick={() => navigate('/')}>
          <ArrowRight className='rotate-180' />
        </button>
        <img src={'/images/jerskits-black.jpg'} alt='Jerskits' />
        <div className='w-5 h-5 leading-none'>
          <button
            aria-label='open bag popup'
            name='openShoppingBag'
            ref={bagBtnRef}
            onClick={() => setOpenBagModal(true)}
          >
            <Bag />
          </button>
        </div>
      </nav>
      <div className='pb-28 lg:pb-24 lg:py-24'>
        <div className='px-4 lg:px-0'>
          <CheckoutSteps step={activeStep} />
        </div>
        <div className='container grid max-w-3xl grid-cols-1 mx-auto lg:grid-cols-2 lg:gap-36'>
          <div className='px-4 space-y-7 lg:px-0'>
            {activeStep == ECheckoutSteps.INFORMATION && (
              <div>
                <h1 className='font-bold text-primary-black leading-[48px] text-text-2xl mb-7'>
                  Name & Address
                </h1>
                <UserForm
                  buttonText='Continue'
                  isLoading={isValidatingInformation}
                  handleSubmitForm={handleValidateInformation}
                  checkoutError={informationError}
                  formFieldsValue={validatedInformationData}
                />
              </div>
            )}
            {activeStep == ECheckoutSteps.DELIVERY && (
              <CheckoutDelivery
                delivery={delivery}
                onChange={handleArrivalTime}
              />
            )}
            {activeStep === ECheckoutSteps.BILLING && (
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  checked={isBillingMatch}
                  aria-checked={isBillingMatch}
                  id='match-billing-input'
                  onChange={() => setIsBillingMatch(!isBillingMatch)}
                  className={cn(
                    'rounded-full !outline-none focus:!outline-none focus:!border-none text-primary-black w-5 h-5 border-none ring-1 ring-primary-black focus:ring-1 focus:ring-primary-black focus:ring-offset-0'
                  )}
                />
                <label
                  htmlFor='match-billing-input'
                  className='ml-2.5 text-text-xs leading-5 text-primary-black select-none'
                >
                  Billing matches shipping address
                </label>
              </div>
            )}
            {activeStep === ECheckoutSteps.PAYMENT && (
              <CheckoutPayment
                placeOrderStatus={status}
                onSubmit={handlePlaceOrder}
                activeStep={activeStep}
                handleActiveStep={setActiveStep}
              >
                {validatedInformationData && (
                  <InformationSummary
                    information={validatedInformationData}
                    editHandler={() =>
                      setActiveStep(ECheckoutSteps.INFORMATION)
                    }
                  />
                )}
                <DeliverySummary
                  delivery={delivery}
                  editHandler={() => setActiveStep(ECheckoutSteps.DELIVERY)}
                />
              </CheckoutPayment>
            )}
            {activeStep > 1 && activeStep < 4 && validatedInformationData && (
              <InformationSummary
                information={validatedInformationData}
                editHandler={() => setActiveStep(ECheckoutSteps.INFORMATION)}
              />
            )}
            {activeStep > 2 && activeStep < 4 && (
              <DeliverySummary
                delivery={delivery}
                editHandler={() => setActiveStep(ECheckoutSteps.DELIVERY)}
              />
            )}

            {activeStep > 1 && activeStep < 4 && (
              <div className='flex items-center gap-5'>
                <Button
                  className='bg-white border text-primary-black border-neutral-soft-grey'
                  onClick={() => setActiveStep(activeStep - 1)}
                >
                  BACK
                </Button>
                <Button
                  type='button'
                  onClick={() => handleSteps(activeStep)}
                  disabled={
                    isValidatingDelivery ||
                    (activeStep === 3 && !isBillingMatch)
                  }
                >
                  <div
                    className={cn(
                      'overflow-hidden transition-all duration-300 ease-in-out w-0 max-w-0',
                      {
                        'mr-2 w-fit max-w-fit': isValidatingDelivery
                      }
                    )}
                  >
                    <SpinnerCircular
                      size={25}
                      thickness={260}
                      speed={100}
                      color='#fff'
                      secondaryColor='#676c70'
                    />
                  </div>
                  {isValidatingDelivery ? 'LOADING...' : 'CONTINUE'}
                </Button>
              </div>
            )}
          </div>

          <CheckoutSummary bag={userBag} deliveryPrice={delivery.price} />
        </div>
      </div>
    </div>
  )
}

export default Checkout
