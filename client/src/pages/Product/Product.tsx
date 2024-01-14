import { Navigate, useParams } from 'react-router-dom'
import { useGetProductQuery } from '../../services'
import toast from 'react-hot-toast'
import { ProductSkeleton } from '../../components'
import ProductImageSlider from './components/ProductImageSlider'
import ProductShopCard from './components/ProductShopCard'
import ProductInformation from './components/ProductInformation'
import { TDetailProduct } from '../../shared/types/Product.types'

type TError = {
  status: number
  data: {
    error: boolean
    message: string
  }
}

const Product = () => {
  const { slug } = useParams<{ slug: string }>()
  document.title = 'loading...'

  const { data, isFetching, isError, error } = useGetProductQuery(
    slug as string
  )

  if (data) {
    document.title = data.product.name
  }

  if (isError) {
    if ((error as TError)?.data?.message) {
      toast.error(
        "Unfortunately, we couldn't locate the product you were looking for."
      )
    }
    return <Navigate to={'/404'} />
  }

  if (isFetching || !data) {
    return <ProductSkeleton />
  }

  return (
    <div className='container mx-auto my-24'>
      <div className='relative grid lg:grid-cols-2 sm:gap-x-20 xl:gap-0'>
        <ProductImageSlider
          images={data.product.gallery}
          productName={data.product.name}
        />
        <ProductShopCard product={data.product} />
        <div className='mt-14'>
          <ProductInformation
            details={data?.product?.detail_product as TDetailProduct[]}
            reviews={data?.reviews}
          />
        </div>
      </div>
    </div>
  )
}

export default Product
