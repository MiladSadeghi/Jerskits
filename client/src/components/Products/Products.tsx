import FilterBar from '../FilterBar/FilterBar'
import { ProductCardContainer, ProductCardSkeleton } from '..'
import {
  IProduct,
  Price,
  TBrand,
  TGender,
  TSort,
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
    getProducts(generateQuery({ gender })).then((result) =>
      setHighestPrice(result.data?.highestPrice)
    )
  }, [gender])

  useEffect(() => {
    if (isSuccess && data) {
      if (data.currentPage <= 1) setProducts(data.products)
      if (data.currentPage > 1)
        setProducts((prevProducts) => [...prevProducts, ...data.products])
      if (
        data.currentPage <= 1 &&
        !price?.minPrice &&
        !price?.maxPrice &&
        (brand || color || size || type)
      ) {
        setHighestPrice(data?.highestPrice)
      }
    }
  }, [data, isSuccess])

  useEffect(() => {
    setPrice(undefined)
  }, [brand, color, size, type])

  const fetchProducts = async (page: number, sortValue?: TSort) => {
    await getProducts(
      generateQuery({
        page,
        gender,
        minPrice: price?.minPrice,
        maxPrice: price?.maxPrice,
        color,
        size,
        brand,
        type,
        sort: sortValue
      })
    )
    setPage(page)
  }

  const loadNextPage = () => {
    fetchProducts(page + 1)
  }

  const applyFilter = (sort?: TSort) => {
    fetchProducts(1, sort)
  }

  return (
    <div className='container flex flex-col py-24 mx-auto'>
      {title && (
        <h1 className='mb-12 text-center text-7xl font-bold leading-[93.6px] text-primary-black'>
          {title}
        </h1>
      )}
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
      <div className='grid grid-cols-1 gap-x-7 gap-y-12 md:grid-cols-2 2xl:grid-cols-3'>
        {isFetching || isError ? (
          productCardSkeletonArray.map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        ) : (
          <ProductCardContainer products={products} />
        )}
      </div>
      <button
        className='self-center px-20 py-4 mt-24 text-base font-bold leading-6 transition-all border border-neutral-soft-grey text-primary-black w-80 disabled:opacity-70'
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
      </button>
    </div>
  )
}

export default Products
