import { RefObject, useRef, useState, ReactNode } from 'react'
import { Price, Sort, TBrand, TType } from '../../shared/types/Product.types'
import tw from 'twin.macro'
import { FilterContentModal } from '../../modals'
import PriceFilter from './components/PriceFilter'
import ColorFilter from './components/ColorFilter'
import SizeFilter from './components/SizeFilter'
import TypeFilter from './components/TypeFilter'
import BrandFilter from './components/BrandFilter'

type Props = {
  price: Price
  setPrice: setState<Price>
  color: string
  setColor: setState<string>
  size: string
  setSize: setState<string>
  brand: TBrand
  setBrand: setState<TBrand>
  type: TType
  setType: setState<TType>
  sort: Sort
  setSort: setState<Sort>
}

type TFilterItems = {
  title: string
  btnRef: RefObject<HTMLButtonElement>
  modalWidth: number
  filterContent: ReactNode
}

const FilterBar = ({
  price,
  setPrice,
  color,
  setColor,
  size,
  setSize,
  brand,
  setBrand,
  type,
  setType
}: Partial<Props>) => {
  const [openModal, setOpenModal] = useState<number | null>(null)

  const filterItems: TFilterItems[] = [
    {
      title: 'Price',
      btnRef: useRef<HTMLButtonElement>(null),
      modalWidth: 320,
      filterContent: <PriceFilter price={price} setPrice={setPrice} />
    },
    {
      title: 'Color',
      btnRef: useRef<HTMLButtonElement>(null),
      modalWidth: 320,
      filterContent: <ColorFilter color={color} setColor={setColor} />
    },
    {
      title: 'Size',
      btnRef: useRef<HTMLButtonElement>(null),
      modalWidth: 320,
      filterContent: <SizeFilter size={size} setSize={setSize} />
    },
    {
      title: 'Brand',
      btnRef: useRef<HTMLButtonElement>(null),
      modalWidth: 320,
      filterContent: <BrandFilter brand={brand} setBrand={setBrand} />
    },
    {
      title: 'Type',
      btnRef: useRef<HTMLButtonElement>(null),
      modalWidth: 320,
      filterContent: <TypeFilter type={type} setType={setType} />
    }
  ]

  const openModalHandler = (id: number) => {
    if (openModal !== id) setOpenModal(id)
  }

  return (
    <Wrapper>
      <div className='px-12 border py-7 border-neutral-soft-grey'>
        <div className='flex items-center gap-x-7'>
          {filterItems.map((item, index: number) => (
            <div key={item.title} className='relative'>
              <Button
                ref={item.btnRef}
                aria-label={item.title}
                onClick={() => openModalHandler(index)}
              >
                {item.title}
                <svg
                  width='14'
                  height='14'
                  viewBox='0 0 14 14'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className={`ml-[5px]`}
                >
                  <path
                    d='M1.75 4.08301L7 9.33301L12.25 4.08301'
                    stroke='#262D33'
                    strokeWidth='1.2'
                  />
                </svg>
              </Button>
              <div>
                <FilterContentModal
                  btnRef={item.btnRef}
                  open={openModal === index}
                  onClose={() => setOpenModal(null)}
                  width={item.modalWidth}
                >
                  {item.filterContent}
                </FilterContentModal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = tw.div`container mx-auto mb-12 col-span-full relative`
const Button = tw.button`flex items-center font-bold text-lg leading-[27px] text-primary-black`

export default FilterBar
