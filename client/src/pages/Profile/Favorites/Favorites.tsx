import { SpinnerDiamond } from 'spinners-react'
import { useGetUserFavoritesQuery } from '../../../services'
import ProductMiniCard from '../../../components/Products/ProductMiniCard'
import { useAppSelector } from '../../../App/hooks'
import { RootState } from '../../../App/store'

function Favorites() {
  const { isLoading } = useGetUserFavoritesQuery()
  const favoritesProduct = useAppSelector(
    (state: RootState) => state.user.favorites
  )

  if (isLoading) {
    return (
      <SpinnerDiamond
        size={50}
        thickness={100}
        speed={100}
        color='#262D33'
        secondaryColor='#00000033'
        className='mx-auto'
      />
    )
  }

  if (!isLoading && favoritesProduct?.length === 0) {
    return (
      <h1 className='text-3xl font-bold text-primary-black'>
        No favorites yet
      </h1>
    )
  }

  return (
    <div className='relative flex flex-col px-5 py-5 gap-y-7'>
      <h1 className='text-primary-black text-[32px] font-bold leading-[48px]'>
        Favorites Product
      </h1>
      <div className='flex flex-col'>
        {favoritesProduct.map((product) => (
          <ProductMiniCard
            key={product._id}
            product={product}
            removable={true}
            testId={'favorite-product'}
          />
        ))}
      </div>
    </div>
  )
}

export default Favorites
