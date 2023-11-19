import { Link } from 'react-router-dom'
import { useAppSelector } from '../../App/hooks'
import { RootState } from '../../App/store'
import ProductMiniCard from '../Products/ProductMiniCard'

const FavoritesPopup = () => {
  const favoritesProduct = useAppSelector(
    (state: RootState) => state.user.favorites
  )
  return (
    <div className='absolute flex flex-col right-0 bg-white top-[75px] w-96 p-[30px] gap-y-7'>
      <h1 className='text-lg font-bold text-primary-black'>Favorites</h1>
      <div className='flex flex-col gap-y-5'>
        {favoritesProduct.length ? (
          favoritesProduct.map((product) => (
            <ProductMiniCard key={product._id} product={product} />
          ))
        ) : (
          <p className='text-primary-black'>No favorites yet</p>
        )}
      </div>
      <Link
        to={'/profile/favorites'}
        className='py-4 font-bold text-center border border-primary-black text-primary-black'
      >
        VIEW FAVORITES ({favoritesProduct.length})
      </Link>
    </div>
  )
}

export default FavoritesPopup
