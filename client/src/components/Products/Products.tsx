import tw from 'twin.macro'
import FilterBar from '../FilterBar/FilterBar'
import { ProductCard, ProductCardSkeleton } from '..'
import {
  IProduct,
  Price,
  TBrand,
  TGender,
  TType
} from '../../shared/types/Product.types'
import { useLazyGetProductsQuery } from '../../services'
import { useEffect, useState } from 'react'
import { SpinnerCircular } from 'spinners-react'
import { useProductFilterQuery } from '../../hooks/useProductFilterQuery'

type Props = {
  title?: string
  gender?: TGender
}

const Products = ({ title, gender }: Props) => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [getProducts, { isError, data, isSuccess, isFetching }] =
    useLazyGetProductsQuery()
  const [page, setPage] = useState<number>(1)
  const [price, setPrice] = useState<Price>()
  const [color, setColor] = useState<string>()
  const [size, setSize] = useState<string>()
  const [brand, setBrand] = useState<TBrand>()
  const [type, setType] = useState<TType>()

  const [highestPrice, setHighestPrice] = useState<number>()
  const productCardSkeletonArray = new Array(6).fill(null)
  const { generateQuery } = useProductFilterQuery()

  useEffect(() => {
    getProducts(
      generateQuery({
        gender
      })
    ).then((result) => setHighestPrice(result.data?.highestPrice))
  }, [])

  useEffect(() => {
    if (isSuccess && data) {
      if (page !== data.currentPage) setProducts(data.products)
      if (page === data.currentPage)
        setProducts((prevProducts) => [...prevProducts, ...data.products])
      setHighestPrice(data.highestPrice)
    }
  }, [isSuccess, data])

  useEffect(() => {
    setPrice(undefined)
  }, [color, size, brand, type])

  const loadNextPage = () => {
    setPage(page + 1)
    getProducts(
      generateQuery({
        page: page + 1,
        gender,
        minPrice: price?.minPrice,
        maxPrice: price?.maxPrice,
        color,
        size,
        brand,
        type
      })
    )
  }

  const applyFilter = () => {
    setPage(1)
    getProducts(
      generateQuery({
        page: 1,
        gender,
        minPrice: price?.minPrice,
        maxPrice: price?.maxPrice,
        color,
        size,
        brand,
        type
      })
    )
  }

  return (
    <Wrapper>
      {title && <Title>{title}</Title>}
      <FilterBar
        price={price}
        setPrice={setPrice}
        color={color}
        setColor={setColor}
        size={size}
        setSize={setSize}
        brand={brand}
        setBrand={setBrand}
        type={type}
        setType={setType}
        highestPrice={highestPrice}
        applyHandler={applyFilter}
      />
      <ProductWrapper>
        {isFetching || isError
          ? productCardSkeletonArray.map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : products?.map((product: IProduct) => (
              <ProductCard product={product} key={product._id} />
            ))}
      </ProductWrapper>
      <LoadMore
        aria-label='Load more products'
        onClick={loadNextPage}
        disabled={data?.currentPage === data?.totalPages || isFetching}
      >
        {isFetching ? (
          <SpinnerCircular
            size={36}
            thickness={100}
            speed={100}
            color='rgba(38, 45, 51, 1)'
            secondaryColor='rgba(231, 231, 231, 1)'
            className='mx-auto'
          />
        ) : (
          'SEE MORE PRODUCT'
        )}
      </LoadMore>
    </Wrapper>
  )
}

const Wrapper = tw.div`container mx-auto py-24 flex flex-col`
const Title = tw.h1`mb-12 text-center text-7xl font-bold leading-[93.6px] text-primary-black`
const ProductWrapper = tw.div`gap-x-7 gap-y-12 grid grid-cols-3`
const LoadMore = tw.button`border border-neutral-soft-grey px-20 py-4 text-base font-bold leading-6 self-center mt-24 text-primary-black w-80 disabled:opacity-70 transition-all`

export default Products
