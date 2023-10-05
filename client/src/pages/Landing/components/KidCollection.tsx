import { MouseEventHandler, useRef, useState } from 'react'
import tw, { styled } from 'twin.macro'
import { IProduct, TBrand } from '../../../shared/types/Product.types'
import {
  KidCollectionController,
  KidCollectionSlider
} from '../../../components'
import { motion } from 'framer-motion'
import { useLazyGetKidBrandCollectionQuery } from '../../../services'

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
    <div className='mx-auto'>
      <div className='container relative flex mx-auto mb-24'>
        <BrandIndicator animate={{ left: `${leftBrandIndicator}%` }} />
        {icons.map((icon: TBrandsIcon, index: number) => (
          <div
            key={icon.name}
            className='flex justify-center w-full h-full py-24 bg-white mix-blend-screen'
          >
            <Brand
              onClick={changeBrand(icon.name, index * 25)}
              src={icon.icon}
              alt={icon.name}
            />
          </div>
        ))}
      </div>
      <div className='flex flex-col w-full mx-auto xl:flex-row gap-x-24'>
        <div className='ml-4 sm:ml-4 md:ml-10'>
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

const Brand = tw.img`opacity-30 z-[6] relative w-fit h-fit`
const BrandIndicator = styled(motion.div)`
  ${tw`absolute top-0 w-3/12 lg:w-2/12 h-full bg-primary-black z-[5] mix-blend-color-burn duration-200 bg-opacity-70 ease-linear`}
`

export default KidCollection
