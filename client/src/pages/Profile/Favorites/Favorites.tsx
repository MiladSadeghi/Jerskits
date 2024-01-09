import { SpinnerDiamond } from 'spinners-react'
import {
  useAddProductToFavoritesMutation,
  useGetUserFavoritesQuery,
  useRemoveProductFromFavoritesMutation
} from '../../../services'
import { useAppSelector } from '../../../App/hooks'
import { RootState } from '../../../App/store'
import { ProductCard } from '../../../components'

function Favorites() {
  const { isLoading } = useGetUserFavoritesQuery()
  const [remove, { isLoading: isRemoving }] =
    useRemoveProductFromFavoritesMutation()
  const [add, { isLoading: isAdding }] = useAddProductToFavoritesMutation()
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
    <div className='relative md:px-5 space-y-7'>
      <h1 className='text-primary-black text-[32px] font-bold leading-[48px]'>
        Favorites Product
      </h1>
      <div className='space-y-7'>
        {favoritesProduct.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            testId={'favorite-product'}
            isMini={true}
            isLikeable={true}
            isCurrentLiked={true}
            isLikeLoading={isRemoving || isAdding}
            addFavorite={() => add(product._id)}
            removeFavorite={() => remove(product._id)}
          />
        ))}
      </div>
    </div>
  )
}

export default Favorites
