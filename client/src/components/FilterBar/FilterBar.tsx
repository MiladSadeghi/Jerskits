import { useRef, useState, ReactNode, RefObject } from 'react'
import { Price, TBrand, TSort, TType } from '../../shared/types/Product.types'
import { FilterContentModal } from '../../modals'
import PriceFilter from './components/PriceFilter'
import ColorFilter from './components/ColorFilter'
import SizeFilter from './components/SizeFilter'
import TypeFilter from './components/TypeFilter'
import BrandFilter from './components/BrandFilter'
import SortDropdown from '../Dropdown/SortDropdown'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { ArrowDown } from '../../icons'
import { cn } from '../../utils/utils'

type Props = {
  price?: Price
  setPrice?: setState<Price>
  color?: string
  setColor?: setState<string>
  size?: string
  setSize?: setState<string>
  brand?: TBrand
  setBrand?: setState<TBrand>
  type?: TType
  setType?: setState<TType>
  setSort?: setState<TSort>
  highestPrice?: number
  applyHandler: (sortValue?: TSort) => void
}

type TFilterItems = {
  title: string
  modalTitle: string
  modalWidth: string
  filterContent: ReactNode
  resetFilter: () => void
  btnRef: RefObject<HTMLButtonElement>
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
  setType,
  highestPrice,
  applyHandler
}: Props) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [activeFilter, setActiveFilter] = useState<number | null>(null)
  const isLarge = useMediaQuery('only screen and (min-width: 768px)')
  const filterBtnRef = useRef<HTMLButtonElement>(null)

  const filterItems: TFilterItems[] = [
    {
      title: 'Price',
      modalTitle: 'Price Range',
      btnRef: useRef<HTMLButtonElement>(null),
      modalWidth: '380px',
      resetFilter: setPrice,
      filterContent: (
        <PriceFilter
          price={price}
          setPrice={setPrice}
          highestPrice={highestPrice}
        />
      )
    },
    {
      title: 'Color',
      modalTitle: 'Select Color',
      btnRef: useRef<HTMLButtonElement>(null),
      modalWidth: '400px',
      resetFilter: setColor,
      filterContent: <ColorFilter color={color} setColor={setColor} />
    },
    {
      title: 'Size',
      modalTitle: 'Select Size',
      btnRef: useRef<HTMLButtonElement>(null),
      modalWidth: '400px',
      resetFilter: setSize,
      filterContent: <SizeFilter size={size} setSize={setSize} />
    },
    {
      title: 'Brand',
      modalTitle: 'Select Brand',
      btnRef: useRef<HTMLButtonElement>(null),
      modalWidth: '400px',
      resetFilter: setBrand,
      filterContent: <BrandFilter brand={brand} setBrand={setBrand} />
    },
    {
      title: 'Type',
      modalTitle: 'Select Type',
      btnRef: useRef<HTMLButtonElement>(null),
      modalWidth: '380px',
      resetFilter: setType,
      filterContent: <TypeFilter type={type} setType={setType} />
    }
  ]

  const openModalHandler = (id: number): void => {
    setActiveFilter(id)
    setOpenModal(true)
  }

  const closeModalHandler = (): void => {
    setActiveFilter(null)
    setOpenModal(false)
  }

  return (
    <div className='container mx-auto mb-12 col-span-full lg:relative'>
      <div className='flex items-center justify-between px-12 border py-7 border-neutral-soft-grey'>
        {isLarge ? (
          <div className='flex items-center gap-x-7'>
            {filterItems.map((item, index: number) => (
              <div key={item.title} className='relative'>
                <button
                  className={cn(
                    'flex items-center font-bold text-lg leading-[27px] text-primary-black',
                    {
                      'text-primary-black': activeFilter === index,
                      'text-neutral-grey':
                        !!activeFilter && activeFilter !== index
                    }
                  )}
                  ref={item.btnRef}
                  aria-label={item.title}
                  onClick={() => openModalHandler(index)}
                >
                  {item.title}
                  <ArrowDown
                    className='ml-5 '
                    strokeClassName={cn('stroke-neutral-grey', {
                      'stroke-primary-black': activeFilter === index
                    })}
                  />
                </button>
                {activeFilter === index && (
                  <FilterContentModal
                    open={openModal}
                    btnRef={item.btnRef}
                    onClose={closeModalHandler}
                    width={item.modalWidth}
                    title={item.modalTitle}
                    applyHandler={applyHandler}
                    resetFilter={item.resetFilter}
                  >
                    {item.filterContent}
                  </FilterContentModal>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div>
            <button
              className='flex items-center font-bold text-lg leading-[27px] text-primary-black'
              ref={filterBtnRef}
              aria-label={'filter button'}
              onClick={() => openModalHandler(0)}
            >
              Filter
              <ArrowDown
                className='ml-5 stroke-primary-black'
                strokeClassName='stroke-primary-black'
              />
            </button>
            <FilterContentModal
              open={openModal}
              btnRef={filterBtnRef}
              onClose={() => closeModalHandler()}
              width={'100%'}
              applyHandler={applyHandler}
              resetFilter={filterItems[activeFilter ?? 0].resetFilter}
              activeFilter={activeFilter ?? 0}
              setActiveFilter={setActiveFilter}
              filterButtonLabel={[
                'Price Range',
                'Color',
                'Size',
                'Brand',
                'Type'
              ]}
            >
              {filterItems[activeFilter ?? 0].filterContent}
            </FilterContentModal>
          </div>
        )}

        <SortDropdown handleSort={applyHandler} />
      </div>
    </div>
  )
}

export default FilterBar
