import { TInformation } from '../../shared/types/Order.types'

type Props = {
  information: TInformation
  editHandler: () => void
}

const InformationSummary = ({ information, editHandler }: Props) => {
  return (
    <div>
      <div className='flex items-center justify-between mb-7'>
        <h1 className='text-text-2xl font-bold leading-[48px] text-primary-black'>
          Information
        </h1>
        <button
          className='text-base leading-6 text-neutral-dark-grey'
          onClick={editHandler}
        >
          Edit
        </button>
      </div>
      <div className='space-y-2.5'>
        <p className='text-lg leading-7 text-neutral-dark-grey'>
          {information.firstName} {information.lastName}
        </p>
        <p className='text-lg leading-7 text-neutral-dark-grey'>
          {information.postalCode} {information.address},
          {information.state.label}, {information.city.label},
          {information.country.label}
        </p>
        <p className='text-lg leading-7 text-neutral-dark-grey'>
          {information.contactEmail}
        </p>
        <p className='text-lg leading-7 text-neutral-dark-grey'>
          {information.phoneNumber}
        </p>
      </div>
    </div>
  )
}

export default InformationSummary
