import { TBrand } from '../../../shared/types/Product.types'
import provideBrandLogo from '../../../utils/brand-logo'
import { cn } from '../../../utils/utils'

type Props = {
  brand?: TBrand
  setBrand?: setState<TBrand>
}

const sizeFilterItems: TBrand[] = ['nike', 'adidas', 'jordan', 'puma']

const BrandFilter = ({ brand, setBrand }: Props) => {
  return (
    <div className='grid w-full grid-cols-3 gap-5'>
      {sizeFilterItems.map((item) => (
        <button
          className={cn(
            'flex items-center justify-center w-full py-4 border border-neutral-soft-grey',
            { 'border-primary-black': brand === item }
          )}
          key={item}
          onClick={() => setBrand(item)}
        >
          <img className='w-5 h-5' src={provideBrandLogo(item)} />
          <p className='text-base font-semibold ml-2.5'>{item}</p>
        </button>
      ))}
    </div>
  )
}

export default BrandFilter
