import { Link } from 'react-router-dom'
import { useAppSelector } from '../../App/hooks'
import { RootState } from '../../App/store'
import { forwardRef } from 'react'
import { Close } from '../../icons'
import { cn } from '../../utils/utils'
import { ProductCard } from '..'

type Props = {
  closePopup: () => void
  isOpen: boolean
}

const FavoritesPopup = forwardRef<HTMLDialogElement, Props>(
  ({ closePopup, isOpen }, ref) => {
    const favoritesProduct = useAppSelector(
      (state: RootState) => state.user.favorites
    )
    return (
      <dialog
        ref={ref}
        open={true}
        className={cn(
          'fixed md:absolute z-[99] right-0 bg-white md:top-[75px] md:bottom-[unset] w-full md:w-[460px] p-[30px] space-y-7 transition-all -bottom-full md:hidden duration-1000 m-0',
          { 'bottom-0 md:block duration-500': isOpen }
        )}
        style={{ insetInlineStart: 'unset' }}
        data-testid='favorites-popup'
      >
        <div className='flex items-center justify-between'>
          <h1 className='text-lg font-bold text-primary-black'>Favorites</h1>
          <button onClick={closePopup} className='md:hidden'>
            <Close />
          </button>
        </div>
        <div className='flex flex-col gap-y-5 h-[276px] overflow-y-auto'>
          {favoritesProduct?.length !== 0 ? (
            favoritesProduct.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                isLikeable={false}
                isMini={true}
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
