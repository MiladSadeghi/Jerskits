import { MouseEventHandler, useRef, useState } from 'react'
import { IProduct, TBrand } from '../../../../shared/types/Product.types'
import { m } from 'framer-motion'
import { useLazyGetKidBrandCollectionQuery } from '../../../../services'
import KidCollectionController from './KidCollectionSlideController'
import KidCollectionSlider from './KidCollectionSlider'

type Props = {
  products: IProduct[] | undefined
  isError: boolean
  isLoading: boolean
}

type TBrandsIcon = {
  icon: string
  name: TBrand
}

const icons: TBrandsIcon[] = [
  {
    icon: '/images/nike-brand.png',
    name: 'nike'
  },
  {
    icon: '/images/adidas-brand.png',
    name: 'adidas'
  },
  {
    icon: '/images/jordan-brand.png',
    name: 'jordan'
  },
  {
    icon: '/images/puma-brand.png',
    name: 'puma'
  }
]

const KidCollection = ({ products, isError, isLoading }: Props) => {
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const [brand, setBrand] = useState<TBrand>('nike')
  const [leftBrandIndicator, setLeftBrandIndicator] = useState<number>(0)
  const [
    getKidBrandCollection,
    {
      isError: isKidCollectionError,
      data: kidCollectionProducts,
      isSuccess,
      isFetching
    }
  ] = useLazyGetKidBrandCollectionQuery()

  const controlSlide = (
    amount: string
  ): MouseEventHandler<HTMLButtonElement> => {
    return () => {
      if (sliderRef.current) {
        if (amount === 'plus') sliderRef.current.scrollLeft += 380
        if (amount === 'minus') sliderRef.current.scrollLeft -= 380
      }
    }
  }

  const changeBrand = (
    newBrand: TBrand,
    leftAmount: number
  ): MouseEventHandler<HTMLImageElement> => {
    return () => {
      if (brand !== newBrand) {
        setBrand(newBrand)
        setLeftBrandIndicator(leftAmount)
        getKidBrandCollection({ brand: newBrand }, true)
      }
    }
  }

  return (
    <div>
      <div className='container relative flex mx-auto'>
        <m.div
          className={
            'absolute top-0 w-20 sm:w-[155px] md:w-[187px] lg:w-[251px] xl:w-[320px] h-full bg-primary-black z-[5] mix-blend-color-burn duration-500 bg-opacity-70 ease-linear'
          }
          style={{ left: `${leftBrandIndicator}%` }}
        />
        {icons.map((icon, index: number) => (
          <div
            key={icon.name}
            className='flex justify-center w-full h-full py-24 bg-white mix-blend-screen'
          >
            <img
              className='opacity-30 z-[6] relative w-fit h-fit cursor-pointer'
              onClick={changeBrand(icon.name, index * 25)}
              src={icon.icon}
              alt={icon.name}
            />
          </div>
        ))}
      </div>
      <div className='flex py-24 flex-col w-full xl:flex-row gap-x-24'>
        <div className='ml-4 sm:ml-4 md:ml-10 lg:ml-14 xl:ml-16 2xl:ml-20 3xl:ml-28'>
          <KidCollectionController controlSlide={controlSlide} />
        </div>
        <KidCollectionSlider
          products={isSuccess ? kidCollectionProducts?.kidCollection : products}
          isLoading={isLoading || isFetching}
          isError={isError || isKidCollectionError}
          ref={sliderRef}
        />
      </div>
    </div>
  )
}

export default KidCollection
