import { Navigate, useParams } from 'react-router-dom'
import { useGetProductQuery } from '../../services'
import toast from 'react-hot-toast'
import { Accordion, ProductSkeleton } from '../../components'
import { useState } from 'react'
import { ArrowRight } from '../../icons'
import provideBrandLogo from '../../utils/brand-logo'
import tw, { styled } from 'twin.macro'
import { TDetailProduct } from '../../shared/types/Product.types'

type TError = {
  status: number
  data: {
    error: boolean
    message: string
  }
}

function calculateDiscount(price: number, discountPrice: number): string {
  const discountPercent = (discountPrice / price) * 100
  return discountPercent.toFixed(0)
}

const Product = () => {
  const { slug } = useParams<{ slug: string }>()
  const [currentImageIdx, setCurrentImageIdx] = useState<number>(1)
  const [selectedSize, setSelectedSize] = useState<string>()
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0)

  const { data, isLoading, isError, error } = useGetProductQuery(slug as string)

  const changeImageIdx = (direction: number) => {
    if (
      currentImageIdx + direction <= (data?.product?.gallery?.length ?? 0) &&
      currentImageIdx + direction > 0
    ) {
      setCurrentImageIdx(currentImageIdx + direction)
    }
  }

  const changeActiveAccordion = (idx: number) => {
    if (activeAccordion === idx) {
      setActiveAccordion(null)
    } else {
      setActiveAccordion(idx)
    }
  }

  if (isError) {
    if ((error as TError).data.message) {
      toast.error(
        "Unfortunately, we couldn't locate the product you were looking for."
      )
    }
    return <Navigate to={'/404'} />
  }

  if (isLoading) {
    return <ProductSkeleton />
  }

  return (
    data && (
      <div className='container mx-auto my-24'>
        <div className='relative grid lg:grid-cols-2 sm:gap-x-20 xl:gap-0'>
          <div className='flex flex-col gap-y-3'>
            <div className='w-full bg-neutral-light-grey h-[470px] md:h-[600px]'>
              <img
                className='object-contain w-full h-full'
                src={data?.product.gallery[currentImageIdx - 1]}
                loading='lazy'
                key={`${data?.product.name}-${currentImageIdx}-image`}
                alt={`${data?.product.name}`}
              />
            </div>
            <div className='w-full h-[80px] bg-neutral-light-grey flex justify-between items-center px-4'>
              <div onClick={() => changeImageIdx(-1)}>
                <ArrowRight className='rotate-180' />
              </div>
              <p>
                {currentImageIdx}/{data?.product.gallery.length}
              </p>
              <div onClick={() => changeImageIdx(+1)}>
                <ArrowRight />
              </div>
            </div>
          </div>
          <div className='w-full row-span-2 mt-12 xl:w-96 lg:mt-0 xl:justify-self-end'>
            <div className='sticky top-0'>
              <img
                className='mb-6 opacity-40'
                width={50}
                height={50}
                src={provideBrandLogo(data?.product.brand)}
              />
              <h1 className='text-[32px] leading-[48px] font-bold mb-2.5'>
                {data.product.name}
              </h1>
              <div className='flex items-center justify-between w-full mb-2.5'>
                <h2 className='text-lg capitalize text-neutral-dark-grey'>
                  {data.product.type}
                </h2>
              </div>
              <div className='flex items-center'>
                <Price $isDiscount={data.product.offPrice !== 0}>
                  ${data.product.price}
                </Price>
                {data.product.offPrice !== 0 && (
                  <div className='flex items-center justify-between w-full'>
                    <DiscountPrice>${data.product.offPrice}</DiscountPrice>
                    <DiscountPercent>
                      {calculateDiscount(
                        data.product.price,
                        data.product.offPrice
                      )}
                      % Off
                    </DiscountPercent>
                  </div>
                )}
              </div>
              <div className='h-0.5 my-7 border-bottom-1 bg-neutral-light-grey' />
              <div className='flex justify-between mb-5'>
                <h4 className='text-lg font-bold text-primary-black'>
                  Select Size
                </h4>
                <h4 className='text-lg font-semibold text-neutral-grey'>
                  Size Guide
                </h4>
              </div>
              <div className='mb-7 grid grid-cols-4 gap-x-2.5 gap-y-5'>
                {data.product.size.map((size) => (
                  <SizeBtn
                    $activeSize={size === selectedSize}
                    onClick={() => setSelectedSize(size)}
                    key={size}
                  >
                    {size}
                  </SizeBtn>
                ))}
              </div>
              <Button className='mb-4 text-white bg-primary-black'>
                ADD TO BAG
              </Button>
              <Button className='border border-neutral-soft-grey'>
                FAVORITE
              </Button>
            </div>
          </div>
          <div className='mt-14'>
            {data?.product?.detail_product?.map(
              (item: TDetailProduct, idx: number) => (
                <Accordion
                  detailProduct={item}
                  active={activeAccordion === idx}
                  handleActive={() => changeActiveAccordion(idx)}
                  key={idx}
                />
              )
            )}
          </div>
        </div>
      </div>
    )
  )
}

const Price = styled.h3<{ $isDiscount: boolean }>`
  ${tw`relative font-bold leading-9 text-text-xl`}
  ${({ $isDiscount }) =>
    $isDiscount
      ? tw`text-neutral-grey before:(absolute top-1/2 left-0 w-full h-0.5 bg-neutral-grey)`
      : tw`text-primary-black`}
`
const DiscountPrice = tw.h3`ml-2.5 font-bold text-primary-black text-text-xl`
const DiscountPercent = tw.p`font-bold text-text-lg text-secondary-red leading-7`
const SizeBtn = styled.button<{ $activeSize: boolean }>`
  ${tw`w-full py-4 border border-neutral-soft-grey h-14`}
  ${({ $activeSize }) => $activeSize && tw` border-primary-black`}}
`

const Button = tw.button`h-14 flex items-center justify-center w-full font-bold`

export default Product
