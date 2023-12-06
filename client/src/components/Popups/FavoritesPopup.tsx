import { Link } from 'react-router-dom'
import { useAppSelector } from '../../App/hooks'
import { RootState } from '../../App/store'
import ProductMiniCard from '../Products/ProductMiniCard'
import { forwardRef } from 'react'
import { Close } from '../../icons'

type Props = {
  handlePopup: (arg: keyof TPopups) => void
  isOpen: boolean
}

const FavoritesPopup = forwardRef<HTMLDialogElement, Props>(
  ({ handlePopup, isOpen }, ref) => {
    const favoritesProduct = useAppSelector(
      (state: RootState) => state.user.favorites
    )
    return (
      <dialog
        ref={ref}
        open={true}
        className={`fixed md:absolute z-[99] right-0 bg-white md:top-[75px] md:bottom-[unset] w-full md:w-96 p-[30px] space-y-7 transition-all ${
          isOpen
            ? 'bottom-0 md:block duration-500'
            : '-bottom-full md:hidden duration-1000'
        }`}
        css='inset-inline-start: unset;'
      >
        <div className='flex items-center justify-between'>
          <h1 className='text-lg font-bold text-primary-black'>Favorites</h1>
          <button
            onClick={() => handlePopup('favorites')}
            className='md:hidden'
          >
            <Close />
          </button>
        </div>
        <div className='flex flex-col gap-y-5 h-[276px] overflow-y-auto'>
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
  }
)

export default FavoritesPopup
