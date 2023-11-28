import { Link } from 'react-router-dom'
import { useAppSelector } from '../../App/hooks'
import { RootState } from '../../App/store'
import ProductMiniCard from '../Products/ProductMiniCard'
import { forwardRef } from 'react'

type Props = {
  open: boolean
}

const FavoritesPopup = forwardRef<HTMLDialogElement, Props>((props, ref) => {
  const { open } = props
  const favoritesProduct = useAppSelector(
    (state: RootState) => state.user.favorites
  )
  return (
    <dialog
      ref={ref}
      open={open}
      className='absolute z-[99] right-0 bg-white top-[75px] w-96 p-[30px] space-y-7'
      css='inset-inline-start: unset;'
    >
      <h1 className='text-lg font-bold text-primary-black'>Favorites</h1>
      <div className='flex flex-col gap-y-5'>
        {favoritesProduct.length !== 0 ? (
          favoritesProduct.map((product) => (
            <ProductMiniCard
              key={product._id}
              product={product}
              removable={false}
            />
          ))
        ) : (
          <p className='text-primary-black'>No favorites yet</p>
        )}
      </div>
      <Link
        to={'/profile/favorites'}
        className='flex justify-center py-4 font-bold border border-primary-black text-primary-black'
      >
        VIEW FAVORITES ({favoritesProduct.length})
      </Link>
    </dialog>
  )
})

export default FavoritesPopup
